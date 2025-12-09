'use server';

import { apiConfig } from '@/config/site';
import type { TryOnRequest, TryOnResult, FormState } from '@/types';
import { tryOnSchema } from '@/lib/validations';
import { generateId, delay } from '@/lib/utils';

// Simulated try-on processing (replace with real API call)
async function processWithAI(request: TryOnRequest): Promise<TryOnResult> {
    // Simulate processing delay
    await delay(1500);

    // Return mock result (replace with actual API integration)
    return {
        id: generateId(),
        resultImageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop',
        processingTime: 1.5,
        createdAt: new Date().toISOString(),
    };
}

export async function generateTryOn(
    prevState: (FormState & { result?: TryOnResult }) | null,
    formData: FormData
): Promise<FormState & { result?: TryOnResult }> {
    // Parse form data
    const rawData = {
        modelImageUrl: formData.get('modelImageUrl') as string,
        garmentImageUrl: formData.get('garmentImageUrl') as string,
        settings: {
            preserveIdentity: formData.get('preserveIdentity') === 'true',
            highResolution: formData.get('highResolution') === 'true',
            creativity: parseInt(formData.get('creativity') as string) || 50,
        },
    };

    // Validate
    const validatedFields = tryOnSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Invalid input. Please check your selections.',
            success: false,
        };
    }

    try {
        // Check if real API is configured
        if (apiConfig.tryOnApiUrl) {
            // TODO: Replace with real API call
            // const response = await fetch(apiConfig.tryOnApiUrl, {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(validatedFields.data),
            // });
            // const result = await response.json();
        }

        // Use simulated processing for now
        const result = await processWithAI(validatedFields.data);

        return {
            message: 'Try-on generated successfully!',
            success: true,
            result,
        };
    } catch (error) {
        console.error('Try-on generation error:', error);
        return {
            message: 'Failed to generate try-on. Please try again.',
            success: false,
        };
    }
}
