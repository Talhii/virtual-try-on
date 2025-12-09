// Common types used across the application

export interface TryOnSettings {
    preserveIdentity: boolean;
    highResolution: boolean;
    creativity: number;
}

export interface TryOnRequest {
    modelImageUrl: string;
    garmentImageUrl: string;
    settings: TryOnSettings;
}

export interface TryOnResult {
    id: string;
    resultImageUrl: string;
    processingTime: number;
    createdAt: string;
}

export interface PricingPlan {
    name: string;
    description: string;
    price: {
        monthly: number | null;
        yearly: number | null;
    };
    credits: string;
    features: string[];
    popular?: boolean;
}

export interface Testimonial {
    id: number;
    user: {
        name: string;
        role: string;
        handle: string;
        image: string;
        verified: boolean;
    };
    content: string;
    rating: number;
    metric: {
        label: string;
        value: string;
    };
}

export interface FAQ {
    question: string;
    answer: string;
}

export interface FAQCategory {
    category: string;
    questions: FAQ[];
}

// Form state types
export interface FormState {
    errors?: Record<string, string[]>;
    message?: string;
    success?: boolean;
}

// API response types
export interface ApiResponse<T> {
    data?: T;
    error?: string;
    success: boolean;
}
