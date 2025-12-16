// Export AI services - using Gemini by default
export {
    generateTryOnImage,
    isAIServiceConfigured,
    validateImageUrl,
    estimateGenerationTime,
    getModelInfo,
} from './gemini-client';

export type {
    GeminiImageRequest,
    GeminiImageResponse,
    PredictionResult,
} from './gemini-client';

// Keep Replicate client available for fallback if needed
export type {
    TryOnAPIRequest,
    TryOnAPIResponse,
} from './replicate-client';
