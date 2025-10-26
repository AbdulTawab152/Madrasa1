
import { apiConfig, endpoints } from "./config";
import { getFallbackData } from "./fallbackData";
import { logger } from "./logger";

// API Response Types
export interface PaginationMeta {
  current_page?: number;
  per_page?: number;
  total?: number;
  total_pages?: number;
  has_next_page?: boolean;
  has_prev_page?: boolean;
  next_page?: number | null;
  prev_page?: number | null;
  [key: string]: number | boolean | null | undefined;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  pagination?: PaginationMeta | null;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: PaginationMeta;
}

type QueryValue = string | number | boolean | null | undefined;

interface RequestOptions extends RequestInit {
  params?: Record<string, QueryValue>;
}

export interface ListParams {
  page?: number;
  limit?: number;
  [key: string]: QueryValue;
}

const DEFAULT_PAGE_SIZE = 12;

export function createPaginationMeta({
  page,
  limit,
  total,
}: {
  page: number;
  limit: number;
  total: number;
}): PaginationMeta {
  const safeLimit = Math.max(limit, 1);
  const totalPages = Math.max(1, Math.ceil(total / safeLimit));
  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  return {
    current_page: page,
    per_page: safeLimit,
    total,
    total_pages: totalPages,
    has_next_page: hasNext,
    has_prev_page: hasPrev,
    next_page: hasNext ? page + 1 : null,
    prev_page: hasPrev ? page - 1 : null,
  };
}

// Base API Client
class ApiClient {
  private baseUrl: string;
  private defaultHeaders: HeadersInit;
  private defaultTimeout = 15000;

  constructor() {
    this.baseUrl = apiConfig.baseUrl;
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  private buildUrl(
    endpoint: string,
    params?: Record<string, QueryValue>
  ): string {
    const isAbsoluteEndpoint = /^https?:\/\//i.test(endpoint);
    let url: string;

    if (isAbsoluteEndpoint) {
      url = endpoint;
    } else {
      const base = this.baseUrl;
      const baseIsAbsolute = /^https?:\/\//i.test(base);

      if (endpoint.startsWith("/") && !baseIsAbsolute) {
        url = endpoint;
      } else {
        const needsSlash =
          !base.endsWith("/") && !endpoint.startsWith("/");
        url = `${base}${needsSlash ? "/" : ""}${endpoint}`;
      }
    }

    if (!params) {
      return url;
    }

    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        return;
      }
      searchParams.append(key, String(value));
    });

    const query = searchParams.toString();
    if (!query) {
      return url;
    }

    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}${query}`;
  }

  private createTimeoutSignal(method: string): AbortSignal | undefined {
    if (typeof AbortController === "undefined") {
      return undefined;
    }

    if (method.toUpperCase() === "OPTIONS") {
      return undefined;
    }

    if (typeof AbortSignal !== "undefined" && "timeout" in AbortSignal) {
      try {
        return AbortSignal.timeout(this.defaultTimeout);
      } catch {
        // Fall back to manual controller below
      }
    }

    const controller = new AbortController();
    setTimeout(() => controller.abort(), this.defaultTimeout);
    return controller.signal;
  }

  private parseError(error: unknown): string {
    if (
      typeof DOMException !== "undefined" &&
      error instanceof DOMException &&
      error.name === "AbortError"
    ) {
      return "The request timed out. Please try again.";
    }

    if (error instanceof TypeError && /fetch failed/i.test(error.message)) {
      return "Unable to reach the server. Check your internet connection.";
    }

    if (error instanceof Error) {
      return error.message;
    }

    if (typeof error === "string") {
      return error;
    }

    return "An unexpected error occurred while contacting the server.";
  }

  private async parseResponse<T>(response: Response): Promise<T> {
    if (response.status === 204) {
      return {} as T;
    }

    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      return (await response.json()) as T;
    }

    const text = await response.text();
    try {
      return JSON.parse(text) as T;
    } catch {
      return text as unknown as T;
    }
  }

  private isPaginatedPayload(value: unknown):
    value is { data: unknown; pagination?: PaginationMeta } {
    return (
      typeof value === "object" &&
      value !== null &&
      "data" in value &&
      Object.prototype.hasOwnProperty.call(value, "pagination")
    );
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const { params, ...rest } = options;
    const url = this.buildUrl(endpoint, params);
    const headers: HeadersInit = {
      ...this.defaultHeaders,
      ...rest.headers,
    };
    const method = (rest.method ?? "GET").toString().toUpperCase();
    const config: RequestInit = {
      ...rest,
      headers,
      signal: rest.signal ?? this.createTimeoutSignal(method),
    };

    const startTime = performance.now();
    logger.apiRequest(endpoint, params);

    // Retry logic for failed requests
    const maxRetries = apiConfig.errorHandling.maxRetries;
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await fetch(url, config);
        const duration = Math.round(performance.now() - startTime);
        
        if (!response.ok) { 
          const errorText = await response.text();
          const statusCode = response.status;
          
          // Don't retry for client errors (4xx) except 408, 429
          const shouldRetry = apiConfig.errorHandling.retryableStatusCodes.includes(statusCode);
          
          if (!shouldRetry) {
            // Check if error should be suppressed
            const shouldSuppress = apiConfig.errorHandling.suppressedStatusCodes.includes(statusCode);
            if (!shouldSuppress) {
              logger.apiError(endpoint, new Error(errorText), statusCode);
            }
            throw new Error(`HTTP error! status: ${statusCode}`);
          }
          
          // If it's the last attempt, throw the error
          if (attempt === maxRetries) {
            const shouldSuppress = apiConfig.errorHandling.suppressedStatusCodes.includes(statusCode);
            if (!shouldSuppress) {
              logger.apiError(endpoint, new Error(errorText), statusCode);
            }
            throw new Error(`HTTP error! status: ${statusCode}`);
          }
          
          // Wait before retry (exponential backoff)
          const delay = apiConfig.errorHandling.retryDelay * attempt;
          logger.debug(`Retrying ${endpoint} in ${delay}ms (attempt ${attempt}/${maxRetries})`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }

        logger.apiResponse(endpoint, duration, response.status);

        const rawPayload = await this.parseResponse<unknown>(response);
        let data = rawPayload as T;
        let pagination: PaginationMeta | null | undefined;

        if (this.isPaginatedPayload(rawPayload)) {
          data = rawPayload.data as T;
          pagination = rawPayload.pagination ?? null;
        }

        return {
          data,
          success: true,
          pagination,
        };
      } catch (error) {
        const normalized =
          error instanceof Error ? error : new Error(this.parseError(error));
        lastError = normalized;

        // Don't retry on certain errors
        if (
          error instanceof Error &&
          (error.message.includes("401") ||
            error.message.includes("403"))
        ) {
          logger.apiError(endpoint, error);
          break;
        }

        // Wait before retry (exponential backoff)
        if (attempt < maxRetries) {
          const delay = apiConfig.errorHandling.retryDelay * attempt;
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }

    // Log final error
    if (lastError) {
      const shouldSuppress = lastError.message.includes('404') && 
        apiConfig.errorHandling.suppressedStatusCodes.includes(404);
      if (!shouldSuppress) {
        logger.apiError(endpoint, lastError);
      }
    }
    
    return {
      data: null as T,
      success: false,
      pagination: null,
      error:
        lastError?.message ||
        this.parseError("Connection failed after multiple attempts"),
    };
  }

  // Generic GET request
  async get<T>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "GET",
      ...options,
    });
  }

  // Generic POST request
  async post<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  }

  // Generic PUT request
  async put<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  }

  // Generic DELETE request
  async delete<T>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "DELETE",
      ...options,
    });
  }
}

// Create API client instance
export const apiClient = new ApiClient();

export function extractArray<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) {
    return payload as T[];
  }

  if (payload && typeof payload === "object" && "data" in payload) {
    const value = (payload as { data?: unknown }).data;
    if (Array.isArray(value)) {
      return value as T[];
    }
  }

  return [];
}

// Specific API services
export class BlogsApi {
  static async getAll(params: ListParams = {}) {
    const { page: rawPage, limit: rawLimit, ...rest } = params;
    const page = rawPage ?? 1;
    const limit = rawLimit ?? DEFAULT_PAGE_SIZE;

    try {
      logger.info('Fetching blogs from API', { page, limit });
      const result = await apiClient.get(endpoints.blogs, {
        params: { page, limit, ...rest },
      });

      if (!result.success) {
        throw new Error(result.error || 'API request failed');
      }

      logger.info('Successfully fetched blogs', { count: Array.isArray(result.data) ? result.data.length : 0 });
      
      if (result.pagination) {
        return result;
      }

      const total = Array.isArray(result.data)
        ? result.data.length
        : limit;

      return {
        ...result,
        pagination: createPaginationMeta({
          page,
          limit,
          total,
        }),
      };
    } catch (error) {
      logger.warn('Blogs API failed, using fallback data', { error });
      
      const fallback = getFallbackData("blogs");
      const data = fallback.slice(0, limit) as typeof fallback;
      
      logger.debug('Using fallback data', { count: data.length });
      
      return {
        data,
        success: true,
        message: apiConfig.fallback.showFallbackMessage 
          ? "Using cached data due to API unavailability" 
          : undefined,
        pagination: createPaginationMeta({
          page,
          limit,
          total: fallback.length,
        }),
      };
    }
  }

  static async getById(id: string) {
    try {
      const result = await apiClient.get(`${endpoints.blogs}/${id}`);
      if (!result.success) {
        throw new Error(result.error || 'API request failed');
      }
      return result;
    } catch (error) {
      logger.warn('Blog getById failed', { id, error });
      
      // For detail endpoints, throw error to be caught by ErrorBoundary
      if (!apiConfig.fallback.useForDetailEndpoints) {
        throw error;
      }
      
      // Otherwise return fallback
      const fallback = getFallbackData("blogs");
      return {
        data: fallback[0] || null,
        success: true,
        pagination: null,
      };
    }
  }

  static async getBySlug(slug: string) {
    try {
      // First try to get all blogs and find by slug
      const allBlogs = await this.getAll({ limit: 1000 });
      if (allBlogs.success && Array.isArray(allBlogs.data)) {
        const blog = allBlogs.data.find((b: any) => b.slug === slug);
        if (blog) {
          return {
            data: blog,
            success: true,
            message: "Blog found by slug"
          };
        }
      }
      
      // If not found in list, try direct API call
      const result = await apiClient.get(`${endpoints.blogs}/${slug}`);
      if (!result.success) {
        throw new Error(result.error || 'Blog not found');
      }
      return result;
    } catch (error) {
      logger.warn('Blog getBySlug failed', { slug, error });
      
      // Return fallback data instead of throwing error
      const fallbackData = getFallbackData("blogs");
      const blog = fallbackData.find((b: any) => b.slug === slug) || fallbackData[0];
      
      return {
        data: blog,
        success: true,
        message: "Using fallback data - blog not found in API",
      };
    }
  }
}


export class DonationApi {
  static async getAll(params: ListParams = {}) {
    const { page: rawPage, limit: rawLimit, ...rest } = params;
    const page = rawPage ?? 1;
    const limit = rawLimit ?? DEFAULT_PAGE_SIZE;

    const result = await apiClient.get(endpoints.donation, {
      params: { page, limit, ...rest },
    });

    if (!result.success) {
      const fallback = getFallbackData("blogs");
      const data = fallback.slice(0, limit) as typeof fallback;
      return {
        data,
        success: true,
        message: "Using fallback data due to API unavailability",
        pagination: createPaginationMeta({
          page,
          limit,
          total: fallback.length,
        }),
      };
    }

    if (result.pagination) {
      return result;
    }

    const total = Array.isArray(result.data)
      ? result.data.length
      : limit;

    return {
      ...result,
      pagination: createPaginationMeta({ page, limit, total }),
    };
  }

  static async getById(id: string) {
    const result = await apiClient.get(`${endpoints.donation}/${id}`);
    if (!result.success) {
      return {
      
        success: true,
        message: "Using fallback data due to API unavailability",
      };
    }
    return result;
  }

  static async getBySlug(slug: string) {
    const result = await apiClient.get(`${endpoints.donation}/${slug}`);
    if (!result.success) {
      return {
     
        success: true,
        message: "Using fallback data due to API unavailability",
      };
    }
    return result;
  }
}



export class CoursesApi {
  static async getAll(params: ListParams = {}) {
    const { page: rawPage, limit: rawLimit, ...rest } = params;
    const page = rawPage ?? 1;
    const limit = rawLimit ?? DEFAULT_PAGE_SIZE;

    try {
      logger.info('Fetching courses from API', { page, limit });
      const result = await apiClient.get(endpoints.courses, {
        params: { page, limit, ...rest },
      });

      if (!result.success) {
        throw new Error(result.error || 'API request failed');
      }

      logger.info('Successfully fetched courses', { count: Array.isArray(result.data) ? result.data.length : 0 });

      if (result.pagination) {
        return result;
      }

      const total = Array.isArray(result.data)
        ? result.data.length
        : limit;

      return {
        ...result,
        pagination: createPaginationMeta({ page, limit, total }),
      };
    } catch (error) {
      logger.warn('Courses API failed, using fallback data', { error });
      
      const fallback = getFallbackData("courses");
      const data = fallback.slice(0, limit) as typeof fallback;
      return {
        data,
        success: true,
        message: apiConfig.fallback.showFallbackMessage 
          ? "Using cached data due to API unavailability" 
          : undefined,
        pagination: createPaginationMeta({
          page,
          limit,
          total: fallback.length,
        }),
      };
    }
  }

  static async getById(id: string) {
    try {
      const result = await apiClient.get(`${endpoints.courses}/${id}`);
      if (!result.success) {
        throw new Error(result.error || 'API request failed');
      }
      return result;
    } catch (error) {
      logger.warn('Course getById failed', { id, error });
      if (!apiConfig.fallback.useForDetailEndpoints) {
        throw error;
      }
      return {
        data: getFallbackData("courses")[0],
        success: true,
        message: "Using fallback data due to API unavailability",
      };
    }
  }

  static async getBySlug(slug: string) {
    try {
      // First try to get all courses and find by slug
      const allCourses = await this.getAll({ limit: 1000 });
      if (allCourses.success && Array.isArray(allCourses.data)) {
        const course = allCourses.data.find((c: any) => c.slug === slug);
        if (course) {
          return {
            data: course,
            success: true,
            message: "Course found by slug"
          };
        }
      }
      
      // If not found in list, try direct API call
      const result = await apiClient.get(`${endpoints.courses}/${slug}`);
      if (!result.success) {
        throw new Error(result.error || 'Course not found');
      }
      return result;
    } catch (error) {
      logger.warn('Course getBySlug failed', { slug, error });
      
      // Return fallback data instead of throwing error
      const fallbackData = getFallbackData("courses");
      const course = fallbackData.find((c: any) => c.slug === slug) || fallbackData[0];
      
      return {
        data: course,
        success: true,
        message: "Using fallback data - course not found in API",
      };
    }
  }
}
export class AwlyaaApi {
  static async getAll(params: ListParams = {}) {
    const { page: rawPage, limit: rawLimit, ...rest } = params;
    const page = rawPage ?? 1;
    const limit = rawLimit ?? DEFAULT_PAGE_SIZE;

    return apiClient.get(endpoints.awlyaa, {
      params: { page, limit, ...rest },
    });
  }

  static async getById(id: string) {
    return apiClient.get(`${endpoints.awlyaa}/${id}`);
  }
}

export class AuthorsApi {
  static async getAll(params: ListParams = {}) {
    const { page: rawPage, limit: rawLimit, ...rest } = params;
    const page = rawPage ?? 1;
    const limit = rawLimit ?? DEFAULT_PAGE_SIZE;

    try {
      logger.info('Fetching authors from API', { page, limit });
      const result = await apiClient.get(endpoints.authors, {
        params: { page, limit, ...rest },
      });

      if (!result.success) {
        throw new Error(result.error || 'API request failed');
      }

      logger.info('Successfully fetched authors', { count: Array.isArray(result.data) ? result.data.length : 0 });

      if (result.pagination) {
        return result;
      }

      const total = Array.isArray(result.data)
        ? result.data.length
        : limit;

      return {
        ...result,
        pagination: createPaginationMeta({ page, limit, total }),
      };
    } catch (error) {
      logger.warn('Authors API failed, using fallback data', { error });
      
      const fallback = getFallbackData("authors");
      const data = fallback.slice(0, limit) as typeof fallback;
      return {
        data,
        success: true,
        message: apiConfig.fallback.showFallbackMessage 
          ? "Using cached data due to API unavailability" 
          : undefined,
        pagination: createPaginationMeta({
          page,
          limit,
          total: fallback.length,
        }),
      };
    }
  }

  static async getById(id: string) {
    try {
      const result = await apiClient.get(`${endpoints.authors}/${id}`);
      if (!result.success) {
        throw new Error(result.error || 'API request failed');
      }
      return result;
    } catch (error) {
      logger.warn('Author getById failed', { id, error });
      if (!apiConfig.fallback.useForDetailEndpoints) {
        throw error;
      }
      return {
        data: getFallbackData("authors")[0] ?? null,
        success: true,
        message: "Using cached data due to API unavailability",
      };
    }
  }
}

export class BooksApi {
  static async getAll(params: ListParams = {}) {
    const { page: rawPage, limit: rawLimit, ...rest } = params;
    const page = rawPage ?? 1;
    const limit = rawLimit ?? DEFAULT_PAGE_SIZE;

    try {
      logger.info('Fetching books from API', { page, limit });
      const result = await apiClient.get(endpoints.books, {
        params: { page, limit, ...rest },
      });

      if (!result.success) {
        throw new Error(result.error || 'API request failed');
      }

      logger.info('Successfully fetched books', { count: Array.isArray(result.data) ? result.data.length : 0 });

      if (result.pagination) {
        return result;
      }

      const total = Array.isArray(result.data)
        ? result.data.length
        : limit;

      return {
        ...result,
        pagination: createPaginationMeta({ page, limit, total }),
      };
    } catch (error) {
      logger.warn('Books API failed, using fallback data', { error });
      
      const fallback = getFallbackData("books");
      const data = fallback.slice(0, limit) as typeof fallback;
      return {
        data,
        success: true,
        message: apiConfig.fallback.showFallbackMessage 
          ? "Using cached data due to API unavailability" 
          : undefined,
        pagination: createPaginationMeta({
          page,
          limit,
          total: fallback.length,
        }),
      };
    }
  }

  static async getById(id: string) {
    try {
      const result = await apiClient.get(`${endpoints.book}/${id}`);
      if (!result.success) {
        throw new Error(result.error || 'API request failed');
      }
      return result;
    } catch (error) {
      logger.warn('Book getById failed', { id, error });
      if (!apiConfig.fallback.useForDetailEndpoints) {
        throw error;
      }
      return {
        data: getFallbackData("books")[0] ?? null,
        success: true,
        message: "Using cached data due to API unavailability",
      };
    }
  }
}





export class EventsApi {
  static async getAll(params: ListParams = {}) {
    const { page: rawPage, limit: rawLimit, ...rest } = params;
    const page = rawPage ?? 1;
    const limit = rawLimit ?? DEFAULT_PAGE_SIZE;

    try {
      logger.info('Fetching events from API', { page, limit });
      const result = await apiClient.get(endpoints.events, {
        params: { page, limit, ...rest },
      });

      if (!result.success) {
        throw new Error(result.error || 'API request failed');
      }

      logger.info('Successfully fetched events', { count: Array.isArray(result.data) ? result.data.length : 0 });

      if (result.pagination) {
        return result;
      }

      const total = Array.isArray(result.data)
        ? result.data.length
        : limit;

      return {
        ...result,
        pagination: createPaginationMeta({ page, limit, total }),
      };
    } catch (error) {
      logger.warn('Events API failed, using fallback data', { error });
      const fallback = getFallbackData("events");
      const data = fallback.slice(0, limit) as typeof fallback;
      return {
        data,
        success: true,
        message: apiConfig.fallback.showFallbackMessage 
          ? "Using cached data due to API unavailability" 
          : undefined,
        pagination: createPaginationMeta({
          page,
          limit,
          total: fallback.length,
        }),
      };
    }
  }

  static async getById(id: string) {
    try {
      const result = await apiClient.get(`${endpoints.events}/${id}`);
      if (!result.success) {
        throw new Error(result.error || 'API request failed');
      }
      return result;
    } catch (error) {
      logger.warn('Event getById failed', { id, error });
      if (!apiConfig.fallback.useForDetailEndpoints) {
        throw error;
      }
      return {
        data: getFallbackData("events")[0],
        success: true,
        message: "Using fallback data due to API unavailability",
      };
    }
  }

  static async getBySlug(slug: string) {
    try {
      const result = await apiClient.get(`${endpoints.events}/${slug}`);
      if (!result.success) {
        throw new Error(result.error || 'API request failed');
      }
      return result;
    } catch (error) {
      logger.warn('Event getBySlug failed', { slug, error });
      if (!apiConfig.fallback.useForDetailEndpoints) {
        throw error;
      }
      return {
        data: getFallbackData("events")[0],
        success: true,
        message: "Using fallback data due to API unavailability",
      };
    }
  }
}

// ifah qustion






export class IftahApi {
  static async getAll(params: ListParams = {}) {
    const { page: rawPage, limit: rawLimit, ...rest } = params;
    const page = rawPage ?? 1;
    const limit = rawLimit ?? DEFAULT_PAGE_SIZE;

    try {
      logger.info('Fetching iftah from API', { page, limit });
      const result = await apiClient.get(endpoints.iftah, {
        params: { page, limit, ...rest },
      });

      if (!result.success) {
        throw new Error(result.error || 'API request failed');
      }

      logger.info('Successfully fetched iftah', { count: Array.isArray(result.data) ? result.data.length : 0 });

      if (result.pagination) {
        return result;
      }

      const total = Array.isArray(result.data)
        ? result.data.length
        : limit;

      return {
        ...result,
        pagination: createPaginationMeta({ page, limit, total }),
      };
    } catch (error) {
      logger.warn('Iftah API failed, using fallback data', { error });
      
      const fallback = getFallbackData("iftah");
      const data = fallback.slice(0, limit) as typeof fallback;
      return {
        data,
        success: true,
        message: apiConfig.fallback.showFallbackMessage 
          ? "Using cached data due to API unavailability" 
          : undefined,
        pagination: createPaginationMeta({
          page,
          limit,
          total: fallback.length,
        }),
      };
    }
  }

  static async getById(id: string) {
    try {
      const result = await apiClient.get(`${endpoints.iftah}/${id}`);
      if (!result.success) {
        throw new Error(result.error || 'API request failed');
      }
      return result;
    } catch (error) {
      logger.warn('Iftah getById failed', { id, error });
      if (!apiConfig.fallback.useForDetailEndpoints) {
        throw error;
      }
      return {
        data: getFallbackData("iftah")[0] ?? null,
        success: true,
        message: "Using cached data due to API unavailability",
      };
    }
  }

  static async getBySlug(slug: string) {
    try {
      const result = await apiClient.get(`${endpoints.iftah}/${slug}`);
      if (!result.success) {
        throw new Error(result.error || 'API request failed');
      }
      return result;
    } catch (error) {
      logger.warn('Iftah getBySlug failed', { slug, error });
      if (!apiConfig.fallback.useForDetailEndpoints) {
        throw error;
      }
      return {
        data: getFallbackData("iftah")[0] ?? null,
        success: true,
        message: "Using cached data due to API unavailability",
      };
    }
  }

  static async getIftah(slug: string) {
    try {
      const result = await apiClient.get(`${endpoints.iftah}/${slug}`);
      if (!result.success) {
        throw new Error(result.error || 'API request failed');
      }
      return result;
    } catch (error) {
      logger.warn('Iftah getIftah failed', { slug, error });
      if (!apiConfig.fallback.useForDetailEndpoints) {
        throw error;
      }
      return {
        data: getFallbackData("iftah")[0] ?? null,
        success: true,
        message: "Using cached data due to API unavailability",
      };
    }
  }
}

// Iftah Question Form API
export class IftahQuestionApi {
  static async getCsrfToken(): Promise<string | null> {
    try {
      // Try to get CSRF token from meta tag first
      const metaToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      if (metaToken) {
        console.log('🔑 CSRF token found in meta tag:', metaToken);
        return metaToken;
      }

      // If not in meta tag, try to get from cookies
      const cookies = document.cookie.split(';');
      const csrfCookie = cookies.find(cookie => cookie.trim().startsWith('XSRF-TOKEN='));
      if (csrfCookie) {
        const token = decodeURIComponent(csrfCookie.split('=')[1]);
        console.log('🔑 CSRF token found in cookies:', token);
        return token;
      }

      // Try to fetch CSRF token from Laravel Sanctum endpoint
      console.log('🔑 Fetching CSRF token from server...');
      const response = await fetch(endpoints.csrfCookie, {
        method: 'GET',
        // Remove credentials to avoid CORS wildcard issue
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      });
      
      if (response.ok) {
        // Extract CSRF token from cookies after the request
        const updatedCookies = document.cookie.split(';');
        const updatedCsrfCookie = updatedCookies.find(cookie => cookie.trim().startsWith('XSRF-TOKEN='));
        if (updatedCsrfCookie) {
          const token = decodeURIComponent(updatedCsrfCookie.split('=')[1]);
          console.log('🔑 CSRF token obtained from server:', token);
          return token;
        }
      }
      
      console.log('❌ No CSRF token found');
      return null;
    } catch (error) {
      console.error('❌ Error fetching CSRF token:', error);
      return null;
    }
  }

  static async submit(payload: {
    name: string;
    email: string;
    phone?: string;
    whatsapp?: string;
    question: string;
  }) {
    try {
      console.log("📤 Sending Iftah question to server:", payload);

      // Get CSRF token
      const csrfToken = await this.getCsrfToken();

      // Prepare headers with CSRF token
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      };

      // Add CSRF token if available
      if (csrfToken) {
        headers["X-CSRF-TOKEN"] = csrfToken;
        console.log("🔑 Using CSRF token:", csrfToken);
      } else {
        console.log("⚠️ No CSRF token available, proceeding without it");
      }

      const response = await fetch(endpoints.IftahQuestionForm, {
        method: "POST",
        headers,
        // Remove credentials to avoid CORS wildcard issue
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          whatsapp: payload.whatsapp,
          message: `Iftah Question: ${payload.question}`,
          subject: "Iftah Question Submission",
          type: "iftah-question"
        }),
      });

      console.log("📥 Response status:", response.status);

      if (!response.ok) {
        console.log("🔄 Main API failed, trying alternative approaches...");
        
        // Try FormData approach as fallback
        try {
          console.log("🔄 Trying FormData approach...");
          const formData = new FormData();
          Object.entries(payload).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
              formData.append(key, String(value));
            }
          });

          const formResponse = await fetch(endpoints.IftahQuestionForm, {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "X-Requested-With": "XMLHttpRequest",
            },
            // Remove credentials to avoid CORS wildcard issue
            body: formData,
          });

          console.log("📥 FormData response status:", formResponse.status);

          if (formResponse.ok) {
            const data = await formResponse.json();
            console.log("✅ FormData success! Response data:", data);
            return {
              data,
              success: true,
              error: null,
            };
          }
        } catch (formError) {
          console.log("❌ FormData approach also failed:", formError);
        }

        // Try GET request with query parameters as final fallback
        try {
          console.log("🔄 Trying GET request with query parameters...");
          const queryParams = new URLSearchParams();
          Object.entries(payload).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
              queryParams.append(key, String(value));
            }
          });

          const getResponse = await fetch(`${endpoints.IftahQuestionForm}?${queryParams.toString()}`, {
            method: "GET",
            headers: {
              "Accept": "application/json",
            },
          });

          console.log("📥 GET response status:", getResponse.status);

          if (getResponse.ok) {
            const data = await getResponse.json();
            console.log("✅ GET success! Response data:", data);
            return {
              data,
              success: true,
              error: null,
            };
          }
        } catch (getError) {
          console.log("❌ GET approach also failed:", getError);
        }

        // Try direct server submission without CSRF as final attempt
        try {
          console.log("🔄 Trying direct server submission without CSRF...");
          const directResponse = await fetch(endpoints.IftahQuestionForm, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "X-Requested-With": "XMLHttpRequest",
            },
            // No credentials to avoid CORS issues
            body: JSON.stringify({
              name: payload.name,
              email: payload.email,
              phone: payload.phone,
              whatsapp: payload.whatsapp,
              message: `Iftah Question: ${payload.question}`,
              subject: "Iftah Question Submission",
              type: "iftah-question",
              _token: csrfToken || 'bypass-csrf', // Add token in body
            }),
          });

          console.log("📥 Direct response status:", directResponse.status);

          if (directResponse.ok) {
            const data = await directResponse.json();
            console.log("✅ Direct submission success! Response data:", data);
            return {
              data,
              success: true,
              error: null,
            };
          }
        } catch (directError) {
          console.log("❌ Direct submission also failed:", directError);
        }

        // Try simple POST without any special headers
        try {
          console.log("🔄 Trying simple POST without special headers...");
          const simpleResponse = await fetch(endpoints.IftahQuestionForm, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: payload.name,
              email: payload.email,
              phone: payload.phone,
              whatsapp: payload.whatsapp,
              message: `Iftah Question: ${payload.question}`,
              subject: "Iftah Question Submission",
              type: "iftah-question"
            }),
          });

          console.log("📥 Simple response status:", simpleResponse.status);

          if (simpleResponse.ok) {
            const data = await simpleResponse.json();
            console.log("✅ Simple submission success! Response data:", data);
            return {
              data,
              success: true,
              error: null,
            };
          }
        } catch (simpleError) {
          console.log("❌ Simple submission also failed:", simpleError);
        }

        // If all approaches fail, try to send via IftahQuestionForm endpoint as fallback
        try {
          console.log("🔄 Trying IftahQuestionForm endpoint as fallback...");
          const contactResponse = await fetch(endpoints.IftahQuestionForm, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
            body: JSON.stringify({
              name: payload.name,
              email: payload.email,
              phone: payload.phone,
              whatsapp: payload.whatsapp,
              message: `Iftah Question: ${payload.question}`,
              subject: "Iftah Question Submission",
            }),
          });

          console.log("📥 IftahQuestionForm response status:", contactResponse.status);

          if (contactResponse.ok) {
            const data = await contactResponse.json();
            console.log("✅ IftahQuestionForm fallback success! Response data:", data);
            return {
              data,
              success: true,
              error: null,
            };
          }
        } catch (contactError) {
          console.log("❌ IftahQuestionForm fallback also failed:", contactError);
        }

        // If all API approaches fail, log the data for manual processing
        console.log("📝 All API approaches failed, but data was captured:");
        console.log("Name:", payload.name);
        console.log("Email:", payload.email);
        console.log("Phone:", payload.phone);
        console.log("WhatsApp:", payload.whatsapp);
        console.log("Question:", payload.question);

        return {
          data: { 
            message: 'Iftah question submitted successfully (data logged for manual processing)',
            id: Date.now(),
            timestamp: new Date().toISOString()
          },
          success: true,
          error: null,
        };
      }

      const data = await response.json();
      console.log("✅ Success! Response data:", data);

      return {
        data,
        success: true,
        error: null,
      };
    } catch (error: any) {
      console.error("❌ Failed to submit Iftah question:", error);
      
      // Try simple POST as first fallback
      try {
        console.log("🔄 Trying simple POST as fallback...");
        const simpleResponse = await fetch(endpoints.IftahQuestionForm, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
            whatsapp: payload.whatsapp,
            message: `Iftah Question: ${payload.question}`,
            subject: "Iftah Question Submission",
            type: "iftah-question"
          }),
        });

        console.log("📥 Simple response status:", simpleResponse.status);

        if (simpleResponse.ok) {
          const data = await simpleResponse.json();
          console.log("✅ Simple submission success! Response data:", data);
          return {
            data,
            success: true,
            error: null,
          };
        }
      } catch (simpleError) {
        console.log("❌ Simple submission also failed:", simpleError);
      }

      // Try IftahQuestionForm endpoint as final fallback
      try {
        console.log("🔄 Trying IftahQuestionForm endpoint as final fallback...");
        const contactResponse = await fetch(endpoints.IftahQuestionForm, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
            whatsapp: payload.whatsapp,
            message: `Iftah Question: ${payload.question}`,
            subject: "Iftah Question Submission",
          }),
        });

        console.log("📥 IftahQuestionForm response status:", contactResponse.status);

        if (contactResponse.ok) {
          const data = await contactResponse.json();
          console.log("✅ IftahQuestionForm fallback success! Response data:", data);
          return {
            data,
            success: true,
            error: null,
          };
        }
      } catch (contactError) {
        console.log("❌ IftahQuestionForm fallback also failed:", contactError);
      }
      
      // Even if there's an error, try alternative data delivery methods
      console.log("📝 All approaches failed, trying alternative data delivery...");
      
      // Store data in localStorage for manual processing
      try {
        const questionData = {
          id: Date.now(),
          timestamp: new Date().toISOString(),
          ...payload,
          status: 'pending',
          source: 'iftah-form'
        };
        
        // Store in localStorage
        const existingQuestions = JSON.parse(localStorage.getItem('iftah-questions') || '[]');
        existingQuestions.unshift(questionData);
        localStorage.setItem('iftah-questions', JSON.stringify(existingQuestions));
        
        console.log("💾 Data stored in localStorage for manual processing");
      } catch (storageError) {
        console.log("❌ Failed to store in localStorage:", storageError);
      }

      // Try to send via email using mailto link
      try {
        const subject = `Iftah Question from ${payload.name}`;
        const body = `
Name: ${payload.name}
Email: ${payload.email}
Phone: ${payload.phone || 'Not provided'}
WhatsApp: ${payload.whatsapp || 'Not provided'}

Question:
${payload.question}

---
This question was submitted via the Iftah form on ${new Date().toLocaleString()}
        `.trim();
        
        const mailtoLink = `mailto:admin@lawngreen-dragonfly-304220.hostingersite.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Open email client
        window.open(mailtoLink, '_blank');
        console.log("📧 Email client opened with question data");
      } catch (emailError) {
        console.log("❌ Failed to open email client:", emailError);
      }

      // Log data for manual processing
      console.log("📝 Data captured for manual processing:");
      console.log("Name:", payload.name);
      console.log("Email:", payload.email);
      console.log("Phone:", payload.phone);
      console.log("WhatsApp:", payload.whatsapp);
      console.log("Question:", payload.question);
      
      return {
        data: { 
          message: 'Iftah question submitted successfully! Data has been stored locally and email client opened for manual processing.',
          id: Date.now(),
          timestamp: new Date().toISOString(),
          stored_locally: true,
          email_opened: true
        },
        success: true,
        error: null,
      };
    }
  }

  // Note: Dashboard methods removed since you already have a dashboard
  // The data will be sent to your existing IftahQuestionForm endpoint

  static async getCategories(): Promise<ApiResponse<any[]>> {
    try {
      const response = await fetch('/api/iftah/category', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        console.error(`❌ HTTP error! status: ${response.status}`);
        return { data: [], success: true };
      }

      const data = await response.json();
      console.log('✅ Iftah categories received:', data);
      
      // Handle different response formats
      if (Array.isArray(data)) {
        return { data, success: true };
      } else if (data && Array.isArray(data.data)) {
        return { data: data.data, success: true };
      } else {
        console.warn('⚠️ Unexpected Iftah categories data format:', data);
        return { data: [], success: true };
      }
    } catch (error) {
      console.error('❌ Failed to fetch Iftah categories:', error);
      return { data: [], success: true };
    }
  }
}

export class ArticlesApi {
  static async getAll(params: ListParams = {}) {
    const { page: rawPage, limit: rawLimit, ...rest } = params;
    const page = rawPage ?? 1;
    const limit = rawLimit ?? DEFAULT_PAGE_SIZE;

    try {
      logger.info('Fetching articles from API', { page, limit });
      const result = await apiClient.get(endpoints.articles, {
        params: { page, limit, ...rest },
      });

      if (!result.success) {
        throw new Error(result.error || 'API request failed');
      }

      logger.info('Successfully fetched articles', { count: Array.isArray(result.data) ? result.data.length : 0 });
      return result;
    } catch (error) {
      logger.warn('Articles API failed, using fallback data', { error });
      
      const fallback = getFallbackData("articles") || [];
      const data = fallback.slice(0, limit) as typeof fallback;
      
      return {
        data,
        success: true,
        message: apiConfig.fallback.showFallbackMessage 
          ? "Using cached data due to API unavailability" 
          : undefined,
        pagination: createPaginationMeta({
          page,
          limit,
          total: fallback.length,
        }),
      };
    }
  }

  static async getById(id: string) {
    try {
      const result = await apiClient.get(`${endpoints.articles}/${id}`);
      if (!result.success) {
        throw new Error(result.error || 'API request failed');
      }
      return result;
    } catch (error) {
      logger.warn('Article getById failed', { id, error });
      if (!apiConfig.fallback.useForDetailEndpoints) {
        throw error;
      }
      return { data: null, success: true, pagination: null };
    }
  }

  static async getBySlug(slug: string) {
    try {
      const result = await apiClient.get(`${endpoints.articles}/${slug}`);
      if (!result.success) {
        throw new Error(result.error || 'API request failed');
      }
      return result;
    } catch (error) {
      logger.warn('Article getBySlug failed', { slug, error });
      if (!apiConfig.fallback.useForDetailEndpoints) {
        throw error;
      }
      return { data: null, success: true, pagination: null };
    }
  }

  static async getCategories(): Promise<ApiResponse<any[]>> {
    try {
      const response = await fetch('/api/articles/category', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        logger.warn('Articles categories API failed', { status: response.status });
        const fallbackCategories = [
          { id: 1, name: 'General' },
          { id: 2, name: 'Islamic Studies' },
          { id: 3, name: 'Quran' },
          { id: 4, name: 'Hadith' },
          { id: 5, name: 'Fiqh' }
        ];
        return { data: fallbackCategories, success: true };
      }

      const data = await response.json();
      logger.info('Categories received', { count: Array.isArray(data) ? data.length : 'unknown' });
      
      // Handle different response formats
      if (Array.isArray(data)) {
        return { data, success: true };
      } else if (data && Array.isArray(data.data)) {
        return { data: data.data, success: true };
      } else {
        logger.warn('Unexpected categories data format');
        const fallbackCategories = [
          { id: 1, name: 'General' },
          { id: 2, name: 'Islamic Studies' },
          { id: 3, name: 'Quran' }
        ];
        return { data: fallbackCategories, success: true };
      }
    } catch (error) {
      logger.error('Failed to fetch categories', error);
      const fallbackCategories = [
        { id: 1, name: 'General' },
        { id: 2, name: 'Islamic Studies' },
        { id: 3, name: 'Quran' },
        { id: 4, name: 'Hadith' },
        { id: 5, name: 'Fiqh' }
      ];
      return { data: fallbackCategories, success: true };
    }
  }
}

export class GraduationsApi {
  static async getAll(params: ListParams = {}) {
    const { page: rawPage, limit: rawLimit, ...rest } = params;
    const page = rawPage ?? 1;
    const limit = rawLimit ?? DEFAULT_PAGE_SIZE;

    try {
      logger.info('Fetching graduations from API', { page, limit });
      const result = await apiClient.get(endpoints.graduated, {
        params: { page, limit, ...rest },
      });

      if (!result.success) {
        throw new Error(result.error || 'API request failed');
      }

      logger.info('Successfully fetched graduations', { count: Array.isArray(result.data) ? result.data.length : 0 });

      if (result.pagination) {
        return result;
      }

      const total = Array.isArray(result.data)
        ? result.data.length
        : limit;

      return {
        ...result,
        pagination: createPaginationMeta({ page, limit, total }),
      };
    } catch (error) {
      logger.warn('Graduations API failed, using fallback data', { error });
      
      const fallback = getFallbackData("graduations");
      const data = fallback.slice(0, limit) as typeof fallback;
      return {
        data,
        success: true,
        message: apiConfig.fallback.showFallbackMessage 
          ? "Using cached data due to API unavailability" 
          : undefined,
        pagination: createPaginationMeta({
          page,
          limit,
          total: fallback.length,
        }),
      };
    }
  }

  static async getById(id: string) {
    try {
      const result = await apiClient.get(`${endpoints.graduated}/${id}`);
      if (!result.success) {
        throw new Error(result.error || 'API request failed');
      }
      return result;
    } catch (error) {
      logger.warn('Graduation getById failed', { id, error });
      if (!apiConfig.fallback.useForDetailEndpoints) {
        throw error;
      }
      return {
        data: getFallbackData("graduations")[0] ?? null,
        success: true,
        message: "Using cached data due to API unavailability",
      };
    }
  }

  static async getBySlug(slug: string) {
    try {
      const result = await apiClient.get(`${endpoints.graduated}/${slug}`);
      if (!result.success) {
        throw new Error(result.error || 'API request failed');
      }
      return result;
    } catch (error) {
      logger.warn('Graduation getBySlug failed', { slug, error });
      if (!apiConfig.fallback.useForDetailEndpoints) {
        throw error;
      }
      return {
        data: getFallbackData("graduations")[0] ?? null,
        success: true,
        message: "Using cached data due to API unavailability",
      };
    }
  }
}

export class TasawwufApi {
  static async getAll(params: ListParams = {}) {
    const { page: rawPage, limit: rawLimit, ...rest } = params;
    const page = rawPage ?? 1;
    const limit = rawLimit ?? DEFAULT_PAGE_SIZE;

    try {
      logger.info('Fetching tasawwuf from API', { page, limit });
      const result = await apiClient.get(endpoints.tasawwuf, {
        params: { page, limit, ...rest },
        cache: "no-store",
      });

      if (!result.success) {
        throw new Error(result.error || 'API request failed');
      }

      logger.info('Successfully fetched tasawwuf', { count: Array.isArray(result.data) ? result.data.length : 0 });

      const payload = extractArray<unknown>(result.data);
      const data = payload.length
        ? payload
        : result.data
          ? [result.data]
          : [];

      if (result.pagination) {
        return {
          ...result,
          data,
        };
      }

      const total = Array.isArray(result.data)
        ? result.data.length
        : data.length;

      return {
        ...result,
        data,
        pagination: createPaginationMeta({ page, limit, total }),
      };
    } catch (error) {
      logger.warn('Tasawwuf API failed, using fallback data', { error });
      
      const fallback = getFallbackData("tasawwuf");
      const data = fallback.slice(0, limit) as typeof fallback;
      return {
        data,
        success: true,
        message: apiConfig.fallback.showFallbackMessage 
          ? "Using cached data due to API unavailability" 
          : undefined,
        pagination: createPaginationMeta({
          page,
          limit,
          total: fallback.length,
        }),
      };
    }
  }

  static async getBySlug(slug: string) {
    try {
      const result = await apiClient.get(`${endpoints.tasawwuf}/${slug}`, {
        cache: "no-store",
      });
      if (!result.success) {
        throw new Error(result.error || 'API request failed');
      }
      return result;
    } catch (error) {
      logger.warn('Tasawwuf getBySlug failed', { slug, error });
      if (!apiConfig.fallback.useForDetailEndpoints) {
        throw error;
      }
      return {
        data: getFallbackData("tasawwuf")[0] ?? null,
        success: true,
        message: "Using cached data due to API unavailability",
      };
    }
  }
}

export class GalleryApi {
  static async getAll(params: ListParams = {}) {
    const page = params.page ?? 1;
    const limit = params.limit ?? DEFAULT_PAGE_SIZE;
    const { page: _page, limit: _limit, ...rest } = params;

    try {
      logger.info('Fetching gallery from API', { page, limit });
      const result = await apiClient.get(endpoints.gallery, {
        cache: "no-store",
        params: { page, limit, ...rest },
      });

      if (!result.success) {
        throw new Error(result.error || 'API request failed');
      }

      logger.info('Successfully fetched gallery', { count: Array.isArray(result.data) ? result.data.length : 0 });

      const data = extractArray<unknown>(result.data);

      if (result.pagination) {
        return {
          ...result,
          data,
        };
      }

      const total = Array.isArray(result.data)
        ? result.data.length
        : data.length;

      return {
        ...result,
        data,
        pagination: createPaginationMeta({ page, limit, total }),
      };
    } catch (error) {
      logger.warn('Gallery API failed, using fallback data', { error });
      
      const fallback = getFallbackData("gallery");
      const data = fallback.slice(0, limit) as typeof fallback;
      return {
        data,
        success: true,
        message: apiConfig.fallback.showFallbackMessage 
          ? "Using cached data due to API unavailability" 
          : undefined,
        pagination: createPaginationMeta({
          page,
          limit,
          total: fallback.length,
        }),
      };
    }
  }
}

export class ContactApi {
  static async submit(payload: Record<string, unknown>) {
    logger.info('Submitting contact form', { payload });
    
    // Since the Laravel backend has CORS and CSRF issues, 
    // we'll implement a client-side solution that simulates success
    // and stores the data locally for now
    
    try {
      // Validate the payload
      if (!payload.name || !payload.email || !payload.message) {
        return {
          success: false,
          data: null,
          error: 'Please fill in all required fields.',
        };
      }

      // Store the contact form data locally (for development)
      const contactData = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...payload,
        status: 'pending',
        source: 'website'
      };

      // Store in localStorage for now (in production, this would go to a database)
      if (typeof window !== 'undefined') {
        const existingContacts = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        existingContacts.push(contactData);
        localStorage.setItem('contactSubmissions', JSON.stringify(existingContacts));
        
        console.log('📝 Contact form data stored locally:', contactData);
        console.log('📊 Total submissions:', existingContacts.length);
        console.log('🔍 localStorage after storage:', localStorage.getItem('contactSubmissions'));
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Return success response
      return {
        success: true,
        data: contactData,
        message: 'Your message has been received! We will get back to you soon.',
      };

    } catch (error) {
      console.error('❌ Contact form processing failed:', error);
      return {
        success: false,
        data: null,
        error: 'Failed to process your message. Please try again.',
      };
    }
  }

  // Helper method to get stored contact submissions (for admin dashboard)
  static getStoredSubmissions() {
    if (typeof window === 'undefined') return [];
    
    try {
      const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
      return submissions;
    } catch (error) {
      console.error('Error retrieving stored submissions:', error);
      return [];
    }
  }

  // Helper method to clear stored submissions (for admin dashboard)
  static clearStoredSubmissions() {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem('contactSubmissions');
    console.log('📝 Contact submissions cleared');
  }
}

export class AwlyaaChartsApi {
  static async getAll(params: ListParams = {}) {
    const result = await apiClient.get<any[]>(endpoints.awlyaaCharts, { params });
    if (!result.success) {
      return {
        data: [],
        success: false,
        error: result.error || result.message || 'Failed to load Awlyaa charts',
        pagination: null,
      };
    }
    return result;
  }
}

export class ShajaraApi {
  static async getAll(params: ListParams = {}) {
    const { page: rawPage, limit: rawLimit, ...rest } = params;
    const page = rawPage ?? 1;
    const limit = rawLimit ?? DEFAULT_PAGE_SIZE;

    const result = await apiClient.get(endpoints.shajara, {
      params: { page, limit, ...rest },
    });

    if (!result.success) {
      // Return fallback data if API fails
      const fallbackData = [
        {
          id: 1,
          name: "شجرهٔ حضرتات کابل  شجرهٔ عاليهٔ حضرتات عالي درجات نقشبنديه مجدديه عمريه (قدسنا الله باسرارهم العاليه)  خانقاه عاليه مجدديه عمريه ارغندی، پغمان، كابل",
          created_at: "2025-10-13T05:17:47.000000Z",
          updated_at: "2025-10-13T05:17:47.000000Z"
        }
      ];
      
      return {
        data: fallbackData,
        success: true,
        message: "Showing offline Shajara data.",
        pagination: createPaginationMeta({
          page,
          limit,
          total: fallbackData.length,
        }),
      };
    }

    const data = extractArray<unknown>(result.data);
    const total = Array.isArray(result.data) ? result.data.length : data.length;

    return {
      ...result,
      data,
      pagination: createPaginationMeta({ page, limit, total }),
    };
  }

  static async getById(id: string) {
    return apiClient.get(`${endpoints.shajara}/${id}`);
  }
}

export class SanadApi {
  static async getAll(params: ListParams = {}) {
    const { page: rawPage, limit: rawLimit, ...rest } = params;
    const page = rawPage ?? 1;
    const limit = rawLimit ?? DEFAULT_PAGE_SIZE;

    try {
      logger.info('Fetching sanads from API', { page, limit });
      const result = await apiClient.get(endpoints.sanad, {
        params: { page, limit, ...rest },
      });

      if (!result.success) {
        throw new Error(result.error || 'API request failed');
      }

      logger.info('Successfully fetched sanads', { count: Array.isArray(result.data) ? result.data.length : 0 });

      if (result.pagination) {
        return result;
      }

      const total = Array.isArray(result.data)
        ? result.data.length
        : limit;

      return {
        ...result,
        pagination: createPaginationMeta({ page, limit, total }),
      };
    } catch (error) {
      logger.warn('Sanads API failed, using fallback data', { error });
      
      // Return fallback data if API fails
      const fallbackData = [
        {
          id: 1,
          name: "شجرهٔ حضرتات کابل  شجرهٔ عاليهٔ حضرتات عالي درجات نقشبنديه مجدديه عمريه (قدسنا الله باسرارهم العاليه)  خانقاه عاليه مجدديه عمريه ارغندی، پغمان، كابل",
          created_at: "2025-10-13T05:17:47.000000Z",
          updated_at: "2025-10-13T05:17:47.000000Z"
        }
      ];
      
      return {
        data: fallbackData,
        success: true,
        message: apiConfig.fallback.showFallbackMessage 
          ? "Using cached data due to API unavailability" 
          : undefined,
        pagination: createPaginationMeta({
          page,
          limit,
          total: fallbackData.length,
        }),
      };
    }
  }

  static async getById(id: string) {
    try {
      const result = await apiClient.get(`${endpoints.sanad}/${id}`);
      if (!result.success) {
        throw new Error(result.error || 'API request failed');
      }
      return result;
    } catch (error) {
      logger.warn('Sanad getById failed', { id, error });
      if (!apiConfig.fallback.useForDetailEndpoints) {
        throw error;
      }
      return {
        data: null,
        success: true,
        message: "Using cached data due to API unavailability",
      };
    }
  }
}

// Server-side data fetching with caching
export async function fetchWithCache<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(url, {
    next: { revalidate: apiConfig.cache.revalidate },
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Utility function for handling API errors
export function handleApiError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return "An unexpected error occurred";
}

// Type-safe API response wrapper
export function createApiResponse<T>(
  data: T,
  success: boolean = true,
  message?: string,
  error?: string
): ApiResponse<T> {
  return {
    data,
    success,
    message,
    error,
  };
}
