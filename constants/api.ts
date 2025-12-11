/**
 * API configuration constants
 * Centralized API-related constants and endpoints
 */

export const API_CONFIG = {
    // Upload limits
    UPLOAD_MAX_SIZE: 20 * 1024 * 1024, // 20MB
    SUPPORTED_IMAGE_FORMATS: ['image/jpeg', 'image/png', 'image/webp', 'image/heic'] as const,

    // Credits
    MAX_CREDITS_PER_REQUEST: 1,

    // Timeouts
    REQUEST_TIMEOUT: 30000, // 30 seconds
    VIDEO_GENERATION_TIMEOUT: 120000, // 2 minutes
} as const;

/**
 * HTTP status codes
 */
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
} as const;

/**
 * API error messages
 */
export const API_ERRORS = {
    UNAUTHORIZED: 'You must be logged in to perform this action',
    FORBIDDEN: 'You do not have permission to perform this action',
    NOT_FOUND: 'The requested resource was not found',
    INVALID_REQUEST: 'Invalid request parameters',
    SERVER_ERROR: 'An unexpected error occurred. Please try again later.',
    RATE_LIMITED: 'Too many requests. Please try again later.',
    INSUFFICIENT_CREDITS: 'Insufficient credits to perform this action',
} as const;
