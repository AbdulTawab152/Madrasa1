"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { extractArray, type ApiResponse, type ListParams } from "@/lib/api";

type Fetcher = (params: ListParams) => Promise<ApiResponse<unknown>>;

interface UsePaginatedResourceOptions {
  pageSize?: number;
  initialPage?: number;
  enabled?: boolean;
}

interface UsePaginatedResourceResult<T> {
  items: T[];
  isLoadingInitial: boolean;
  isFetchingMore: boolean;
  error: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  reload: () => Promise<void>;
  loadNextPage: () => Promise<void>;
  goToPage: (page: number) => Promise<void>;
  page: number;
  totalPages: number | null;
}

export function usePaginatedResource<T>(
  fetcher: Fetcher,
  { pageSize = 12, initialPage = 1, enabled = true }: UsePaginatedResourceOptions = {}
): UsePaginatedResourceResult<T> {
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(initialPage);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [totalPages, setTotalPages] = useState<number | null>(null);

  const optionsRef = useRef({ pageSize, initialPage, enabled });
  const fetcherRef = useRef(fetcher);
  const requestInProgressRef = useRef(false);
  const isFirstLoadRef = useRef(true);
  
  optionsRef.current = { pageSize, initialPage, enabled };
  fetcherRef.current = fetcher;

  const performFetch = useCallback(async (targetPage: number, replace: boolean) => {
    if (!optionsRef.current.enabled || requestInProgressRef.current) {
      return;
    }

    requestInProgressRef.current = true;
    const useInitialLoader = replace && isFirstLoadRef.current;
    if (useInitialLoader) {
      setIsLoadingInitial(true);
    } else {
      setIsFetchingMore(true);
    }
    setError(null);

    try {
      const response = await fetcherRef.current({
        page: targetPage,
        limit: optionsRef.current.pageSize,
      });

      if (!response.success) {
        throw new Error(
          response.error ||
            response.message ||
            "Unable to load data from the server."
        );
      }

      const pagination = response.pagination ?? null;
      const configuredPageSize = Math.max(1, optionsRef.current.pageSize);
      const effectivePerPage = Math.max(
        1,
        typeof pagination?.per_page === "number" && pagination.per_page > 0
          ? Math.floor(pagination.per_page)
          : configuredPageSize
      );

      const rawItems = extractArray<T>(response.data);

      let totalItemsHint: number | null = null;
      let totalPagesHint: number | null = null;

      if (pagination) {
        if (typeof pagination.total === "number" && pagination.total >= 0) {
          totalItemsHint = pagination.total;
        }
        if (typeof pagination.total_pages === "number" && pagination.total_pages > 0) {
          totalPagesHint = Math.max(1, Math.floor(pagination.total_pages));
        }
      }

      if (totalItemsHint === null && totalPagesHint !== null) {
        totalItemsHint = totalPagesHint * effectivePerPage;
      }
      if (totalPagesHint === null && totalItemsHint !== null) {
        totalPagesHint = Math.max(1, Math.ceil(totalItemsHint / effectivePerPage));
      }

      let normalizedItems = rawItems;

      if (rawItems.length > effectivePerPage) {
        if (totalItemsHint === null) {
          totalItemsHint = rawItems.length;
          totalPagesHint = Math.max(1, Math.ceil(totalItemsHint / effectivePerPage));
        } else if (totalPagesHint === null && totalItemsHint !== null) {
          totalPagesHint = Math.max(1, Math.ceil(totalItemsHint / effectivePerPage));
        }

        const startIndex = Math.max(0, (targetPage - 1) * effectivePerPage);
        normalizedItems = rawItems.slice(startIndex, startIndex + effectivePerPage);
      }

      setItems((prev) => (replace ? normalizedItems : [...prev, ...normalizedItems]));

      let nextPage = pagination?.current_page ?? targetPage;
      nextPage = Math.max(1, Math.floor(nextPage));

      let hasNext =
        typeof pagination?.has_next_page === "boolean"
          ? pagination.has_next_page
          : undefined;
      let hasPrev =
        typeof pagination?.has_prev_page === "boolean"
          ? pagination.has_prev_page
          : undefined;

      if (typeof hasNext !== "boolean") {
        if (totalPagesHint !== null) {
          hasNext = nextPage < totalPagesHint;
        } else {
          hasNext = normalizedItems.length === effectivePerPage;
        }
      }

      if (typeof hasPrev !== "boolean") {
        hasPrev = nextPage > 1;
      }

      const tentativeTotalPages = totalPagesHint ?? (hasNext ? nextPage + 1 : nextPage);
      const finalTotalPages = Math.max(1, Math.floor(tentativeTotalPages));
      const clampedPage = Math.min(nextPage, finalTotalPages);
      const resolvedHasPrev = clampedPage > 1;
      const resolvedHasNext = clampedPage < finalTotalPages;

      setPage(clampedPage);
      setHasNextPage(resolvedHasNext);
      setHasPreviousPage(resolvedHasPrev);
      setTotalPages(finalTotalPages);
    } catch (fetchError) {
      const message =
        fetchError instanceof Error
          ? fetchError.message
          : "Unknown error occurred while loading data.";
      setError(message);
      setHasNextPage(false);
      setHasPreviousPage(false);
    } finally {
      if (useInitialLoader) {
        setIsLoadingInitial(false);
      } else {
        setIsFetchingMore(false);
      }
      requestInProgressRef.current = false;
      isFirstLoadRef.current = false;
    }
  }, []);

  const loadNextPage = useCallback(async () => {
    if (
      !hasNextPage ||
      optionsRef.current.enabled === false ||
      requestInProgressRef.current
    ) {
      return;
    }

    if (isLoadingInitial || isFetchingMore) {
      return;
    }

    const nextPage = page + 1;
    await performFetch(nextPage, false);
  }, [hasNextPage, isLoadingInitial, isFetchingMore, page, performFetch]);

  const goToPage = useCallback(async (targetPage: number) => {
    const safePage = Number.isFinite(targetPage) ? Math.max(1, Math.floor(targetPage)) : 1;
    await performFetch(safePage, true);
  }, [performFetch]);

  const reload = useCallback(async () => {
    setItems([]);
    setHasNextPage(true);
    setHasPreviousPage(false);
    setPage(optionsRef.current.initialPage);
    setTotalPages(null);
    setError(null);
    isFirstLoadRef.current = true;
    await performFetch(optionsRef.current.initialPage, true);
  }, [performFetch]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    setItems([]);
    setHasNextPage(true);
    setHasPreviousPage(false);
    setError(null);
    setPage(initialPage);
    setTotalPages(null);
    isFirstLoadRef.current = true;

    void performFetch(initialPage, true);
  }, [enabled, pageSize, initialPage, performFetch]);

  return {
    items,
    isLoadingInitial,
    isFetchingMore,
    error,
    hasNextPage,
    hasPreviousPage,
    reload,
    loadNextPage,
    goToPage,
    page,
    totalPages,
  };
}
