import { apiConfig, endpoints } from "./config";
import { getFallbackData } from "./fallbackData";

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Base API Client
class ApiClient {
  private baseUrl: string;
  private defaultHeaders: HeadersInit;

  constructor() {
    this.baseUrl = apiConfig.baseUrl;
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = endpoint.startsWith("http")
      ? endpoint
      : `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
      // Add timeout and retry logic
      signal: AbortSignal.timeout(15000), // 15 second timeout
      ...options,
    };

    // Retry logic for failed requests
    let lastError: Error | null = null;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const response = await fetch(url, config);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return {
          data,
          success: true,
        };
      } catch (error) {
        lastError = error instanceof Error ? error : new Error("Unknown error");

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
      error: lastError?.message || "Connection failed after multiple attempts",
    };
  }

  // Generic GET request
  async get<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "GET",
      ...options,
    });
  }

  // Generic POST request
  async post<T>(
    endpoint: string,
    data?: any,
    options?: RequestInit
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
    data?: any,
    options?: RequestInit
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
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "DELETE",
      ...options,
    });
  }
}

// Create API client instance
export const apiClient = new ApiClient();

// Specific API services
export class BlogsApi {
  static async getAll() {
    const result = await apiClient.get(endpoints.blogs);
    if (!result.success) {
      return {
        data: getFallbackData("blogs"),
        success: true,
        message: "Using fallback data due to API unavailability",
      };
    }
    return result;
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

export class CoursesApi {
  static async getAll() {
    const result = await apiClient.get(endpoints.courses);
    if (!result.success) {
      return {
        data: getFallbackData("courses"),
        success: true,
        message: "Using fallback data due to API unavailability",
      };
    }
    return result;
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
  static async getAll() {
    return apiClient.get(endpoints.awlyaa);
  }

  static async getById(id: string) {
    return apiClient.get(`${endpoints.awlyaa}/${id}`);
  }
}

export class AuthorsApi {
  static async getAll() {
    return apiClient.get(endpoints.authors);
  }

  static async getById(id: string) {
    return apiClient.get(`${endpoints.authors}/${id}`);
  }
}

export class BooksApi {
  static async getAll() {
    return apiClient.get(endpoints.books);
  }

  static async getById(id: string) {
    return apiClient.get(`${endpoints.book}/${id}`);
  }
}

export class EventsApi {
  static async getAll() {
    const result = await apiClient.get(endpoints.events);
    if (!result.success) {
      return {
        data: getFallbackData("events"),
        success: true,
        message: "Using fallback data due to API unavailability",
      };
    }
    return result;
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
  static async getAll() {
    return apiClient.get(endpoints.iftah);
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
  static async getAll() {
    return apiClient.get(endpoints.articles);
  }

  static async getById(id: string) {
    return apiClient.get(`${endpoints.articles}/${id}`);
  }
}

export class GraduationsApi {
  static async getAll() {
    return apiClient.get(endpoints.graduated);
  }

  static async getById(id: string) {
    return apiClient.get(`${endpoints.graduated}/${id}`);
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
export function handleApiError(error: any): string {
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
