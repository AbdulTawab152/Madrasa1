import { apiConfig, endpoints } from "./config";
import { getFallbackData } from "./fallbackData";

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
      return null as T;
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

    // Retry logic for failed requests
    let lastError: Error | null = null;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const response = await fetch(url, config);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

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
          (error.message.includes("404") ||
            error.message.includes("401") ||
            error.message.includes("403"))
        ) {
          break;
        }

        // Wait before retry (exponential backoff)
        if (attempt < 3) {
          await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
        }
      }
    }

    console.error(
      `API request failed for ${endpoint} after 3 attempts:`,
      lastError
    );
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

    const result = await apiClient.get(endpoints.blogs, {
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
      pagination: createPaginationMeta({
        page,
        limit,
        total,
      }),
    };
  }

  static async getById(id: string) {
    const result = await apiClient.get(`${endpoints.blogs}/${id}`);
    if (!result.success) {
      return {
        data: getFallbackData("blogs")[0],
        success: true,
        message: "Using fallback data due to API unavailability",
      };
    }
    return result;
  }

  static async getBySlug(slug: string) {
    const result = await apiClient.get(`${endpoints.blogs}/slug/${slug}`);
    if (!result.success) {
      return {
        data: getFallbackData("blogs")[0],
        success: true,
        message: "Using fallback data due to API unavailability",
      };
    }
    return result;
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
      const fallback = getFallbackData("donation");
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
    const result = await apiClient.get(`${endpoints.donation}/slug/${slug}`);
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

    const result = await apiClient.get(endpoints.courses, {
      params: { page, limit, ...rest },
    });

    if (!result.success) {
      const fallback = getFallbackData("courses");
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
    const result = await apiClient.get(`${endpoints.courses}/${id}`);
    if (!result.success) {
      return {
        data: getFallbackData("courses")[0],
        success: true,
        message: "Using fallback data due to API unavailability",
      };
    }
    return result;
  }

  static async getBySlug(slug: string) {
    const result = await apiClient.get(`${endpoints.courses}/slug/${slug}`);
    if (!result.success) {
      return {
        data: getFallbackData("courses")[0],
        success: true,
        message: "Using fallback data due to API unavailability",
      };
    }
    return result;
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

    const result = await apiClient.get(endpoints.authors, {
      params: { page, limit, ...rest },
    });

    if (!result.success) {
      const fallback = getFallbackData("authors");
      const data = fallback.slice(0, limit) as typeof fallback;
      return {
        data,
        success: true,
        message: "Showing offline author data.",
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
    const result = await apiClient.get(`${endpoints.authors}/${id}`);
    if (!result.success) {
      const fallback = getFallbackData("authors")[0];
      return {
        data: fallback ?? null,
        success: true,
        message: "Showing offline author data.",
      };
    }
    return result;
  }
}

export class BooksApi {
  static async getAll(params: ListParams = {}) {
    const { page: rawPage, limit: rawLimit, ...rest } = params;
    const page = rawPage ?? 1;
    const limit = rawLimit ?? DEFAULT_PAGE_SIZE;

    const result = await apiClient.get(endpoints.books, {
      params: { page, limit, ...rest },
    });

    if (!result.success) {
      const fallback = getFallbackData("books");
      const data = fallback.slice(0, limit) as typeof fallback;
      return {
        data,
        success: true,
        message: "Showing offline books.",
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
    const result = await apiClient.get(`${endpoints.book}/${id}`);
    if (!result.success) {
      const fallback = getFallbackData("books")[0];
      return {
        data: fallback ?? null,
        success: true,
        message: "Showing offline books.",
      };
    }
    return result;
  }
}

export class EventsApi {
  static async getAll(params: ListParams = {}) {
    const { page: rawPage, limit: rawLimit, ...rest } = params;
    const page = rawPage ?? 1;
    const limit = rawLimit ?? DEFAULT_PAGE_SIZE;

    const result = await apiClient.get(endpoints.events, {
      params: { page, limit, ...rest },
    });

    if (!result.success) {
      const fallback = getFallbackData("events");
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
    const result = await apiClient.get(`${endpoints.events}/${id}`);
    if (!result.success) {
      return {
        data: getFallbackData("events")[0],
        success: true,
        message: "Using fallback data due to API unavailability",
      };
    }
    return result;
  }

  static async getBySlug(slug: string) {
    const result = await apiClient.get(`${endpoints.events}/slug/${slug}`);
    if (!result.success) {
      return {
        data: getFallbackData("events")[0],
        success: true,
        message: "Using fallback data due to API unavailability",
      };
    }
    return result;
  }
}

export class IftahApi {
  static async getAll(params: ListParams = {}) {
    const { page: rawPage, limit: rawLimit, ...rest } = params;
    const page = rawPage ?? 1;
    const limit = rawLimit ?? DEFAULT_PAGE_SIZE;

    return apiClient.get(endpoints.iftah, {
      params: { page, limit, ...rest },
    });
  }

  static async getById(id: string) {
    return apiClient.get(`${endpoints.iftah}/${id}`);
  }

  static async getBySlug(slug: string) {
    return apiClient.get(`${endpoints.iftah}/slug/${slug}`);
  }

  static async getIftah(slug: string) {
    return apiClient.get(`${endpoints.iftah}/${slug}`);
  }
}

export class ArticlesApi {
  static async getAll(params: ListParams = {}) {
    const { page: rawPage, limit: rawLimit, ...rest } = params;
    const page = rawPage ?? 1;
    const limit = rawLimit ?? DEFAULT_PAGE_SIZE;

    return apiClient.get(endpoints.articles, {
      params: { page, limit, ...rest },
    });
  }

  static async getById(id: string) {
    return apiClient.get(`${endpoints.articles}/${id}`);
  }

  static async getBySlug(slug: string) {
    return apiClient.get(`${endpoints.articles}/slug/${slug}`);
  }
}

export class GraduationsApi {
  static async getAll(params: ListParams = {}) {
    const { page: rawPage, limit: rawLimit, ...rest } = params;
    const page = rawPage ?? 1;
    const limit = rawLimit ?? DEFAULT_PAGE_SIZE;

    return apiClient.get(endpoints.graduated, {
      params: { page, limit, ...rest },
    });
  }

  static async getById(id: string) {
    return apiClient.get(`${endpoints.graduated}/${id}`);
  }

  static async getBySlug(slug: string) {
    return apiClient.get(`${endpoints.graduated}/${slug}`);
  }
}

export class TasawwufApi {
  static async getAll(params: ListParams = {}) {
    const { page: rawPage, limit: rawLimit, ...rest } = params;
    const page = rawPage ?? 1;
    const limit = rawLimit ?? DEFAULT_PAGE_SIZE;

    const result = await apiClient.get(endpoints.tasawwuf, {
      params: { page, limit, ...rest },
      cache: "no-store",
    });

    if (!result.success) {
      const fallback = getFallbackData("tasawwuf");
      const data = fallback.slice(0, limit) as typeof fallback;
      return {
        data,
        success: true,
        message: "Showing offline Tasawwuf content.",
        pagination: createPaginationMeta({
          page,
          limit,
          total: fallback.length,
        }),
      };
    }

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
  }

  static async getBySlug(slug: string) {
    const result = await apiClient.get(`${endpoints.tasawwuf}/${slug}`, {
      cache: "no-store",
    });
    if (!result.success) {
      return {
        data: getFallbackData("tasawwuf")[0] ?? null,
        success: true,
        message: "Showing offline Tasawwuf content.",
      };
    }
    return result;
  }
}

export class GalleryApi {
  static async getAll(params: ListParams = {}) {
    const page = params.page ?? 1;
    const limit = params.limit ?? DEFAULT_PAGE_SIZE;
    const { page: _page, limit: _limit, ...rest } = params;

    const result = await apiClient.get(endpoints.gallery, {
      cache: "no-store",
      params: { page, limit, ...rest },
    });

    if (!result.success) {
      const fallback = getFallbackData("gallery");
      const data = fallback.slice(0, limit) as typeof fallback;
      return {
        data,
        success: true,
        message: "Showing offline gallery items.",
        pagination: createPaginationMeta({
          page,
          limit,
          total: fallback.length,
        }),
      };
    }

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
  }
}

export class ContactApi {
  static async submit(payload: Record<string, unknown>) {
    const result = await apiClient.post(endpoints.contact, payload);
    if (!result.success) {
      return {
        data: null,
        success: false,
        error: result.error,
      };
    }
    return result;
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
