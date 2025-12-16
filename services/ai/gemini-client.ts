/**
 * Gemini AI Client for Virtual Try-On
 * Integrates with Google Gemini API for image generation
 */

import type { TryOnSettings } from '@/types';

// ============================================
// TYPES
// ============================================

export interface GeminiImageRequest {
    modelImage: string;
    garmentImage: string;
    settings: TryOnSettings;
}

export interface GeminiImageResponse {
    success: boolean;
    imageUrl?: string;
    error?: string;
    metadata?: {
        processingTime: number;
        model: string;
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

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Model selection based on environment
const isDevelopment = process.env.NODE_ENV === 'development';
const GEMINI_IMAGE_MODEL = isDevelopment
    ? (process.env.GEMINI_IMAGE_MODEL_DEV || 'gemini-2.5-flash-image')
    : (process.env.GEMINI_IMAGE_MODEL_PROD || 'gemini-3-pro-image-preview');

// ============================================
// GEMINI API CLIENT
// ============================================

class GeminiClient {
    private readonly apiKey: string;
    private readonly baseUrl: string;
    private readonly model: string;
    private readonly maxRetries: number;
    private readonly timeout: number;

    constructor() {
        if (!GEMINI_API_KEY) {
            throw new Error('GEMINI_API_KEY environment variable is not set');
        }
        this.apiKey = GEMINI_API_KEY;
        this.baseUrl = GEMINI_API_URL;
        this.model = GEMINI_IMAGE_MODEL;
        this.maxRetries = 3;
        this.timeout = 120000; // 2 minutes
    }

    /**
     * Make a request to Gemini API
     */
    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${this.baseUrl}${endpoint}?key=${this.apiKey}`;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Gemini API error (${response.status}): ${errorText}`);
            }

            return response.json();
        } catch (error) {
            clearTimeout(timeoutId);
            throw error;
        }
    }

    /**
     * Convert image URL to base64
     */
    private async imageUrlToBase64(url: string): Promise<string> {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch image: ${response.statusText}`);
            }
            const arrayBuffer = await response.arrayBuffer();
            const base64 = Buffer.from(arrayBuffer).toString('base64');
            const contentType = response.headers.get('content-type') || 'image/jpeg';
            return `data:${contentType};base64,${base64}`;
        } catch (error) {
            console.error('Error converting image to base64:', error);
            throw error;
        }
    }

    /**
     * Generate virtual try-on image using Gemini
     */
    async generateTryOnImage(request: GeminiImageRequest): Promise<GeminiImageResponse> {
        const startTime = Date.now();

        try {
            // Convert images to base64 if they're URLs
            const modelImageData = request.modelImage.startsWith('http')
                ? await this.imageUrlToBase64(request.modelImage)
                : request.modelImage;

            const garmentImageData = request.garmentImage.startsWith('http')
                ? await this.imageUrlToBase64(request.garmentImage)
                : request.garmentImage;

            // Build the prompt for virtual try-on
            const prompt = this.buildTryOnPrompt(request.settings);

            // Prepare the API request
            const payload = {
                contents: [
                    {
                        parts: [
                            { text: prompt },
                            {
                                inline_data: {
                                    mime_type: this.getMimeType(modelImageData),
                                    data: this.extractBase64(modelImageData),
                                },
                            },
                            {
                                inline_data: {
                                    mime_type: this.getMimeType(garmentImageData),
                                    data: this.extractBase64(garmentImageData),
                                },
                            },
                        ],
                    },
                ],
                generationConfig: {
                    temperature: request.settings.creativity / 100,
                    topK: request.settings.highResolution ? 40 : 32,
                    topP: 0.95,
                    maxOutputTokens: 8192,
                },
            };

            // Make the API call
            const response = await this.request<any>(
                `/models/${this.model}:generateContent`,
                {
                    method: 'POST',
                    body: JSON.stringify(payload),
                }
            );

            // Extract the generated image
            const imageUrl = this.extractImageFromResponse(response);

            if (!imageUrl) {
                return {
                    success: false,
                    error: 'No image generated in response',
                };
            }

            const processingTime = (Date.now() - startTime) / 1000;

            return {
                success: true,
                imageUrl,
                metadata: {
                    processingTime,
                    model: this.model,
                },
            };
        } catch (error) {
            console.error('Gemini generation error:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error occurred',
            };
        }
    }

    /**
     * Build the prompt for virtual try-on
     */
    private buildTryOnPrompt(settings: TryOnSettings): string {
        let prompt = `Create a photorealistic virtual try-on image where the person from the first image is wearing the clothing item from the second image. `;

        if (settings.preserveIdentity) {
            prompt += `Preserve the person's facial features, body proportions, pose, and overall appearance exactly as shown in the original image. `;
        }

        if (settings.highResolution) {
            prompt += `Generate a high-resolution, detailed image with sharp textures and realistic lighting. `;
        }

        prompt += `The clothing should fit naturally on the person's body, with proper wrinkles, shadows, and fabric draping. `;
        prompt += `Maintain the background and lighting from the original model image. `;
        prompt += `Ensure the result looks natural and professionally edited, as if the person is actually wearing the garment.`;

        return prompt;
    }

    /**
     * Extract base64 data from data URL
     */
    private extractBase64(dataUrl: string): string {
        if (dataUrl.includes('base64,')) {
            return dataUrl.split('base64,')[1];
        }
        return dataUrl;
    }

    /**
     * Get MIME type from data URL
     */
    private getMimeType(dataUrl: string): string {
        if (dataUrl.startsWith('data:')) {
            const regex = /data:([^;]+);/;
            const match = regex.exec(dataUrl);
            return match?.[1] ?? 'image/jpeg';
        }
        return 'image/jpeg';
    }

    /**
     * Extract image URL from Gemini response
     */
    private extractImageFromResponse(response: any): string | null {
        try {
            // Gemini response structure may vary; adjust based on actual API response
            if (response.candidates?.[0]) {
                const candidate = response.candidates[0];

                // Check for inline image data
                if (candidate.content?.parts) {
                    for (const part of candidate.content.parts) {
                        if (part.inline_data) {
                            const mimeType = part.inline_data.mime_type ?? 'image/jpeg';
                            const base64Data = part.inline_data.data;
                            return `data:${mimeType};base64,${base64Data}`;
                        }
                    }
                }
            }

            // Alternative: if response contains a URL
            if (response.imageUrl) {
                return response.imageUrl;
            }

            return null;
        } catch (error) {
            console.error('Error extracting image from response:', error);
            return null;
        }
    }

    /**
     * Retry logic for failed requests
     */
    private async retryRequest<T>(
        fn: () => Promise<T>,
        retries: number = this.maxRetries
    ): Promise<T> {
        try {
            return await fn();
        } catch (error) {
            if (retries > 0) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                return this.retryRequest(fn, retries - 1);
            }
            throw error;
        }
    }
}

// ============================================
// EXPORTED FUNCTIONS
// ============================================

let client: GeminiClient | null = null;

function getClient(): GeminiClient {
    client ??= new GeminiClient();
    return client;
}

/**
 * Check if Gemini AI service is configured
 */
export function isAIServiceConfigured(): boolean {
    return !!GEMINI_API_KEY;
}

/**
 * Generate a virtual try-on image using Gemini
 */
export async function generateTryOnImage(
    modelImageUrl: string,
    garmentImageUrl: string,
    settings: TryOnSettings
): Promise<PredictionResult> {
    try {
        const geminiClient = getClient();

        const result = await geminiClient.generateTryOnImage({
            modelImage: modelImageUrl,
            garmentImage: garmentImageUrl,
            settings,
        });

        if (!result.success || !result.imageUrl) {
            return {
                success: false,
                error: result.error || 'Image generation failed',
            };
        }

        return {
            success: true,
            resultImageUrl: result.imageUrl,
            processingTime: result.metadata?.processingTime || 0,
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
    // Base time: 15-20 seconds for Gemini
    let estimatedSeconds = isDevelopment ? 15 : 20;

    if (settings.highResolution) {
        estimatedSeconds += 10;
    }

    return estimatedSeconds;
}

/**
 * Get current model information
 */
export function getModelInfo(): { model: string; environment: string } {
    return {
        model: GEMINI_IMAGE_MODEL,
        environment: isDevelopment ? 'development' : 'production',
    };
}
