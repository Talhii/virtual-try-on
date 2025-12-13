/**
 * Try-On API Service
 */

import { get, post, del } from './client';

// ============================================
// TYPES
// ============================================

export interface TryOnSettings {
    preserveIdentity: boolean;
    highResolution: boolean;
    creativity: number;
}

export interface TryOnResult {
    id: string;
    resultImageUrl: string;
    modelImageUrl?: string;
    garmentImageUrl?: string;
    processingTime: number;
    createdAt: string;
    settings?: TryOnSettings;
}

export interface GenerateRequest {
    modelImageUrl: string;
    garmentImageUrl: string;
    settings: TryOnSettings;
}

export interface GenerateResponse {
    success: boolean;
    result: TryOnResult;
}

export interface HistoryResponse {
    results: TryOnResult[];
    total: number;
    limit: number;
    offset: number;
}

export interface DeleteResponse {
    success: boolean;
    message: string;
}

// ============================================
// API METHODS
// ============================================

export const tryonApi = {
    /**
     * Generate a virtual try-on image
     */
    generate: (request: GenerateRequest): Promise<GenerateResponse> =>
        post('/tryon/generate', request),

    /**
     * Get try-on history for the current user
     */
    getHistory: (limit = 20, offset = 0): Promise<HistoryResponse> =>
        get(`/tryon/history?limit=${limit}&offset=${offset}`),

    /**
     * Get a specific try-on result by ID
     */
    getById: (id: string): Promise<TryOnResult> =>
        get(`/tryon/${id}`),

    /**
     * Delete a try-on result
     */
    delete: (id: string): Promise<DeleteResponse> =>
        del(`/tryon/${id}`),
};
