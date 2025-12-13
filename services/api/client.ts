/**
 * Base API Client
 * Handles HTTP requests with error handling, authentication, and response parsing
 */

const API_BASE = '/api';

// ============================================
// TYPES
// ============================================

export interface ApiErrorData {
    error: string;
    details?: unknown;
}

export class ApiError extends Error {
    status: number;
    details?: unknown;

    constructor(message: string, status: number, details?: unknown) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.details = details;
    }

    get isUnauthorized(): boolean {
        return this.status === 401;
    }

    get isForbidden(): boolean {
        return this.status === 403;
    }

    get isNotFound(): boolean {
        return this.status === 404;
    }

    get isServerError(): boolean {
        return this.status >= 500;
    }
}

// ============================================
// REQUEST HELPERS
// ============================================

type RequestOptions = Omit<RequestInit, 'body' | 'method'>;

async function handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');

    if (!response.ok) {
        if (isJson) {
            const errorData = await response.json() as ApiErrorData;
            throw new ApiError(
                errorData.error || `Request failed with status ${response.status}`,
                response.status,
                errorData.details
            );
        }
        throw new ApiError(`Request failed with status ${response.status}`, response.status);
    }

    if (isJson) {
        return response.json() as Promise<T>;
    }

    return {} as T;
}

// ============================================
// REQUEST METHODS
// ============================================

export async function get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
        credentials: options?.credentials,
        cache: options?.cache,
        mode: options?.mode,
        signal: options?.signal,
    });

    return handleResponse<T>(response);
}

export async function post<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
        body: data ? JSON.stringify(data) : undefined,
        credentials: options?.credentials,
        cache: options?.cache,
        mode: options?.mode,
        signal: options?.signal,
    });

    return handleResponse<T>(response);
}

export async function put<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
        body: data ? JSON.stringify(data) : undefined,
        credentials: options?.credentials,
        cache: options?.cache,
        mode: options?.mode,
        signal: options?.signal,
    });

    return handleResponse<T>(response);
}

export async function del<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
        credentials: options?.credentials,
        cache: options?.cache,
        mode: options?.mode,
        signal: options?.signal,
    });

    return handleResponse<T>(response);
}

export async function uploadFile<T>(
    endpoint: string,
    formData: FormData,
    options?: RequestOptions
): Promise<T> {
    const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        body: formData,
        credentials: options?.credentials,
        cache: options?.cache,
        mode: options?.mode,
        signal: options?.signal,
        // Don't set Content-Type - browser will set it with boundary for FormData
    });

    return handleResponse<T>(response);
}

