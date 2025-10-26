"use client";

import { useState, useCallback, useEffect, useRef } from 'react';
import { ApiResponse, ListParams } from '@/lib/api';
import { classifyError, ErrorType } from '@/components/ErrorDisplay';
import { logger } from '@/lib/logger';

// Try to use toast if available, but don't require it
let toastInstance: any = null;
if (typeof window !== 'undefined') {
  try {
    const { useToast } = require('@/components/Toast');
    // We'll initialize this in components that use it
  } catch {
    // Toast not available, will fall back to console
  }
}

interface UseApiOptions<T> {
  // Initial data to show while loading
  initialData?: T;
  // Whether to fetch on mount
  enabled?: boolean;
  // Whether to show toast notifications
  showToast?: boolean;
  // Whether this is a detail endpoint (throws on error) or list endpoint (returns fallback)
  isDetail?: boolean;
  // Custom error handler
  onError?: (error: Error) => void;
  // Custom success handler
  onSuccess?: (data: T) => void;
}

interface UseApiResult<T> {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  errorType: ErrorType;
  refetch: () => Promise<void>;
  mutate: (newData: T) => void;
}

/**
 * Universal API hook for fetching data with built-in loading, error handling, and toast notifications
 * 
 * @example
 * // List endpoint with fallback
 * const { data, isLoading, error } = useApi(
 *   () => BlogsApi.getAll({ page: 1 }),
 *   { isDetail: false }
 * );
 * 
 * @example
 * // Detail endpoint that throws on error
 * const { data, isLoading, error } = useApi(
 *   () => BlogsApi.getBySlug(slug),
 *   { isDetail: true }
 * );
 */
export function useApi<T>(
  fetcher: () => Promise<ApiResponse<T>>,
  options: UseApiOptions<T> = {}
): UseApiResult<T> {
  const {
    initialData = null,
    enabled = true,
    showToast = false,
    isDetail = false,
    onError,
    onSuccess,
  } = options;

  const [data, setData] = useState<T | null>(initialData);
  const [isLoading, setIsLoading] = useState(enabled);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [errorType, setErrorType] = useState<ErrorType>('unknown');

  const isMountedRef = useRef(true);
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const performFetch = useCallback(async () => {
    if (!isMountedRef.current) return;

    setIsLoading(true);
    setIsError(false);
    setError(null);

    const startTime = Date.now();

    try {
      const response = await fetcherRef.current();
      const duration = Date.now() - startTime;

      logger.apiResponse('API Call', duration, 200);

      if (!isMountedRef.current) return;

      if (!response.success) {
        throw new Error(response.error || response.message || 'API request failed');
      }

      setData(response.data);
      setIsError(false);
      setError(null);

      if (onSuccess) {
        onSuccess(response.data);
      }

      // Show success toast if enabled and there's a message
      if (showToast && response.message && toastInstance) {
        try {
          toastInstance.success(response.message);
        } catch {
          logger.debug('Toast not available');
        }
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      const type = classifyError(error);

      logger.apiError('API Call', error);

      if (!isMountedRef.current) return;

      setIsError(true);
      setError(error);
      setErrorType(type);

      if (onError) {
        onError(error);
      }

      // For detail endpoints, throw the error so ErrorBoundary can catch it
      if (isDetail) {
        throw error;
      }

      // For list endpoints, show toast notification (non-blocking)
      if (showToast && toastInstance) {
        try {
          const errorMessage = type === 'network'
            ? 'Connection error. Showing cached data.'
            : type === 'not-found'
            ? 'Content not found'
            : 'Failed to load data. Showing cached data.';
          
          toastInstance.warning(errorMessage);
        } catch {
          logger.debug('Toast not available');
        }
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [isDetail, showToast, onError, onSuccess]);

  const refetch = useCallback(async () => {
    await performFetch();
  }, [performFetch]);

  const mutate = useCallback((newData: T) => {
    setData(newData);
  }, []);

  useEffect(() => {
    isMountedRef.current = true;

    if (enabled) {
      performFetch();
    }

    return () => {
      isMountedRef.current = false;
    };
  }, [enabled, performFetch]);

  return {
    data,
    isLoading,
    isError,
    error,
    errorType,
    refetch,
    mutate,
  };
}

/**
 * Hook for paginated API calls
 * Combines useApi with pagination logic
 */
export function usePaginatedApi<T>(
  fetcher: (params: ListParams) => Promise<ApiResponse<T[]>>,
  options: UseApiOptions<T[]> & { pageSize?: number; initialPage?: number } = {}
) {
  const { pageSize = 12, initialPage = 1, ...apiOptions } = options;
  const [page, setPage] = useState(initialPage);
  const [params, setParams] = useState<ListParams>({ page, limit: pageSize });

  const paginatedFetcher = useCallback(() => {
    return fetcher(params);
  }, [fetcher, params]);

  const result = useApi(paginatedFetcher, apiOptions);

  const goToPage = useCallback((newPage: number) => {
    setPage(newPage);
    setParams(prev => ({ ...prev, page: newPage }));
  }, []);

  const nextPage = useCallback(() => {
    goToPage(page + 1);
  }, [page, goToPage]);

  const prevPage = useCallback(() => {
    if (page > 1) {
      goToPage(page - 1);
    }
  }, [page, goToPage]);

  return {
    ...result,
    page,
    goToPage,
    nextPage,
    prevPage,
    setParams,
  };
}

/**
 * Hook for form submissions
 * Provides submit function and submission state
 */
export function useApiMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<ApiResponse<TData>>,
  options: {
    onSuccess?: (data: TData) => void;
    onError?: (error: Error) => void;
    showSuccessToast?: boolean;
    showErrorToast?: boolean;
  } = {}
) {
  const { onSuccess, onError, showSuccessToast = true, showErrorToast = true } = options;

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<TData | null>(null);

  const mutate = useCallback(
    async (variables: TVariables) => {
      setIsLoading(true);
      setIsError(false);
      setError(null);

      try {
        const response = await mutationFn(variables);

        if (!response.success) {
          throw new Error(response.error || 'Mutation failed');
        }

        setData(response.data);
        setIsError(false);

        if (onSuccess) {
          onSuccess(response.data);
        }

        if (showSuccessToast && toastInstance) {
          try {
            toastInstance.success(response.message || 'Success!');
          } catch {
            logger.debug('Toast not available');
          }
        }

        return response.data;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setIsError(true);
        setError(error);

        if (onError) {
          onError(error);
        }

        if (showErrorToast && toastInstance) {
          try {
            toastInstance.error(error.message || 'Something went wrong');
          } catch {
            logger.debug('Toast not available');
          }
        }

        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [mutationFn, onSuccess, onError, showSuccessToast, showErrorToast]
  );

  const reset = useCallback(() => {
    setIsLoading(false);
    setIsError(false);
    setError(null);
    setData(null);
  }, []);

  return {
    mutate,
    isLoading,
    isError,
    error,
    data,
    reset,
  };
}

// Helper to initialize toast in components
export function initializeToast(toast: any) {
  toastInstance = toast;
}

