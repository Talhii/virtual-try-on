/**
 * AI Try-On Client
 * Integrates with Replicate API for virtual try-on processing
 */

import type { TryOnSettings } from '@/types';

// ============================================
// TYPES
// ============================================

export interface TryOnAPIRequest {
    model_image: string;
    garment_image: string;
    garment_type?: 'upper' | 'lower' | 'full';
    num_inference_steps?: number;
    guidance_scale?: number;
    seed?: number;
}

export interface TryOnAPIResponse {
    id: string;
    status: 'starting' | 'processing' | 'succeeded' | 'failed' | 'canceled';
    output?: string | string[];
    error?: string;
    metrics?: {
        predict_time?: number;
    };
}

export interface PredictionResult {
    success: boolean;
    resultImageUrl?: string;
    processingTime?: number;
    error?: string;
}

// ============================================
// CONFIGURATION
// ============================================

const REPLICATE_API_URL = 'https://api.replicate.com/v1';
const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

// IDM-VTON model on Replicate (popular choice for virtual try-on)
const TRYON_MODEL_VERSION = process.env.REPLICATE_MODEL_VERSION ||
    'cuuupid/idm-vton:c871bb9b046c6c3da73b2dde3c79bcf6a798dbba0c3cc6fa44a499fd33be1b41';

// ============================================
// API CLIENT
// ============================================

class ReplicateClient {
    private readonly apiToken: string;
    private readonly baseUrl: string;
    private readonly maxRetries: number;
    private readonly pollInterval: number;
    private readonly maxPollTime: number;

    constructor() {
        if (!REPLICATE_API_TOKEN) {
            throw new Error('REPLICATE_API_TOKEN environment variable is not set');
        }
        this.apiToken = REPLICATE_API_TOKEN;
        this.baseUrl = REPLICATE_API_URL;
        this.maxRetries = 3;
        this.pollInterval = 2000; // 2 seconds
        this.maxPollTime = 120000; // 2 minutes
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;

        const response = await fetch(url, {
            ...options,
            headers: {
                'Authorization': `Bearer ${this.apiToken}`,
                'Content-Type': 'application/json',
                'Prefer': 'wait',
                ...options.headers,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Replicate API error (${response.status}): ${errorText}`);
        }

        return response.json();
    }

    /**
     * Create a new prediction (try-on generation)
     */
    async createPrediction(input: TryOnAPIRequest): Promise<TryOnAPIResponse> {
        const parts = TRYON_MODEL_VERSION.split(/[/:]/);
        const version = parts.at(-1);

        return this.request<TryOnAPIResponse>('/predictions', {
            method: 'POST',
            body: JSON.stringify({
                version,
                input: {
                    human_img: input.model_image,
                    garm_img: input.garment_image,
                    garment_des: input.garment_type || 'A garment',
                    is_checked: true,
                    is_checked_crop: false,
                    denoise_steps: input.num_inference_steps || 30,
                    seed: input.seed || Math.floor(Math.random() * 999999),
                },
            }),
        });
    }

    /**
     * Get prediction status
     */
    async getPrediction(id: string): Promise<TryOnAPIResponse> {
        return this.request<TryOnAPIResponse>(`/predictions/${id}`);
    }

    /**
     * Poll for prediction completion
     */
    async waitForPrediction(id: string): Promise<TryOnAPIResponse> {
        const startTime = Date.now();

        while (Date.now() - startTime < this.maxPollTime) {
            const prediction = await this.getPrediction(id);

            if (prediction.status === 'succeeded' || prediction.status === 'failed' || prediction.status === 'canceled') {
                return prediction;
            }

            // Wait before next poll
            await new Promise(resolve => setTimeout(resolve, this.pollInterval));
        }

        throw new Error('Prediction timed out');
    }

    /**
     * Cancel a prediction
     */
    async cancelPrediction(id: string): Promise<void> {
        await this.request(`/predictions/${id}/cancel`, {
            method: 'POST',
        });
    }
}

// ============================================
// EXPORTED FUNCTIONS
// ============================================

let client: ReplicateClient | null = null;

function getClient(): ReplicateClient {
    client ??= new ReplicateClient();
    return client;
}

/**
 * Check if AI service is configured
 */
export function isAIServiceConfigured(): boolean {
    return !!REPLICATE_API_TOKEN;
}

/**
 * Generate a virtual try-on image
 */
export async function generateTryOnImage(
    modelImageUrl: string,
    garmentImageUrl: string,
    settings: TryOnSettings
): Promise<PredictionResult> {
    try {
        const replicateClient = getClient();

        // Create the prediction
        const prediction = await replicateClient.createPrediction({
            model_image: modelImageUrl,
            garment_image: garmentImageUrl,
            num_inference_steps: settings.highResolution ? 50 : 30,
        });

        // Wait for completion
        const result = await replicateClient.waitForPrediction(prediction.id);

        if (result.status === 'failed') {
            return {
                success: false,
                error: result.error || 'Generation failed',
            };
        }

        if (result.status === 'canceled') {
            return {
                success: false,
                error: 'Generation was canceled',
            };
        }

        // Extract result URL
        const resultUrl = Array.isArray(result.output)
            ? result.output[0]
            : result.output;

        if (!resultUrl) {
            return {
                success: false,
                error: 'No output image generated',
            };
        }

        return {
            success: true,
            resultImageUrl: resultUrl,
            processingTime: result.metrics?.predict_time,
        };
    } catch (error) {
        console.error('AI generation error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred',
        };
    }
}

/**
 * Validate image URL is accessible
 */
export async function validateImageUrl(url: string): Promise<boolean> {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        const contentType = response.headers.get('content-type');
        return response.ok && (contentType?.startsWith('image/') ?? false);
    } catch {
        return false;
    }
}

/**
 * Estimate generation time based on settings
 */
export function estimateGenerationTime(settings: TryOnSettings): number {
    // Base time: 20-30 seconds
    let estimatedSeconds = 25;

    if (settings.highResolution) {
        estimatedSeconds += 15;
    }

    return estimatedSeconds;
}
