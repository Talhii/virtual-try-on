'use server';

import { featureFlags } from '@/config/site';
import type { TryOnRequest, TryOnResult, FormState } from '@/types';
import { tryOnSchema } from '@/lib/validations';
import { generateId, delay } from '@/lib/utils';
import { generateTryOnImage, isAIServiceConfigured } from '@/services/ai';
import { createServerClient } from '@/services/supabase/server';
import { getCurrentUser } from './auth';

// ============================================
// SIMULATED PROCESSING (FALLBACK)
// ============================================
async function processWithSimulation(_request: TryOnRequest): Promise<TryOnResult> {
    // Simulate processing delay
    await delay(2000);

    // Return mock result
    return {
        id: generateId(),
        resultImageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop',
        processingTime: 2,
        createdAt: new Date().toISOString(),
    };
}

// ============================================
// REAL AI PROCESSING
// ============================================
async function processWithAI(request: TryOnRequest): Promise<TryOnResult> {
    const result = await generateTryOnImage(
        request.modelImageUrl,
        request.garmentImageUrl,
        request.settings
    );

    if (!result.success || !result.resultImageUrl) {
        throw new Error(result.error || 'AI generation failed');
    }

    return {
        id: generateId(),
        resultImageUrl: result.resultImageUrl,
        processingTime: result.processingTime || 0,
        createdAt: new Date().toISOString(),
    };
}

// ============================================
// SAVE RESULT TO DATABASE
// ============================================
async function saveResult(
    request: TryOnRequest,
    result: TryOnResult,
    userId?: string,
    sessionId?: string
): Promise<void> {
    const supabase = createServerClient();

    if (!supabase) {
        console.warn('Supabase not configured - result not saved');
        return;
    }

    try {
        await supabase.from('try_on_results').insert({
            id: result.id,
            user_id: userId || null,
            session_id: sessionId || null,
            model_image_url: request.modelImageUrl,
            garment_image_url: request.garmentImageUrl,
            result_image_url: result.resultImageUrl,
            settings: request.settings,
            processing_time_ms: Math.round(result.processingTime * 1000),
        });
    } catch (error) {
        console.error('Failed to save try-on result:', error);
    }
}

// ============================================
// CHECK USER CREDITS
// ============================================
async function checkAndConsumeCredits(userId: string): Promise<{ allowed: boolean; message?: string }> {
    const supabase = createServerClient();

    if (!supabase) {
        return { allowed: true }; // Allow if Supabase not configured
    }

    // Get user's current credits
    const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('credits_remaining')
        .eq('id', userId)
        .single();

    if (error) {
        console.error('Error fetching user credits:', error);
        return { allowed: true }; // Allow on error to not block users
    }

    if (!profile || profile.credits_remaining < 1) {
        return {
            allowed: false,
            message: 'Insufficient credits. Please purchase more credits to continue.',
        };
    }

    // Consume one credit
    const { error: updateError } = await supabase
        .from('user_profiles')
        .update({
            credits_remaining: profile.credits_remaining - 1,
            credits_used_total: (profile.credits_remaining || 0) + 1,
        })
        .eq('id', userId);

    if (updateError) {
        console.error('Error consuming credit:', updateError);
    }

    // Log the transaction
    await supabase.from('credit_transactions').insert({
        user_id: userId,
        amount: -1,
        description: 'Virtual try-on generation',
    });

    return { allowed: true };
}

// ============================================
// HELPER: Extract field errors from Zod
// ============================================
function extractFieldErrors(issues: { path: PropertyKey[]; message: string }[]): Record<string, string[]> {
    const errors: Record<string, string[]> = {};
    for (const issue of issues) {
        const path = String(issue.path[0]);
        if (!errors[path]) errors[path] = [];
        errors[path].push(issue.message);
    }
    return errors;
}

// ============================================
// HELPER: Refund credits on failure
// ============================================
async function refundCreditsOnFailure(userId: string): Promise<void> {
    const supabase = createServerClient();
    if (!supabase) return;

    await supabase
        .from('user_profiles')
        .update({
            credits_remaining: supabase.rpc('increment_credits', { user_id: userId }),
        })
        .eq('id', userId);

    await supabase.from('credit_transactions').insert({
        user_id: userId,
        amount: 1,
        description: 'Refund - generation failed',
    });
}

// ============================================
// MAIN GENERATE FUNCTION
// ============================================
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
            creativity: Number.parseInt(formData.get('creativity') as string, 10) || 50,
        },
    };

    // Validate input
    const validatedFields = tryOnSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            errors: extractFieldErrors(validatedFields.error.issues),
            message: 'Invalid input. Please check your selections.',
            success: false,
        };
    }

    // Get current user (if authenticated)
    const user = await getCurrentUser();
    const sessionId = formData.get('sessionId') as string | null;

    // Check credits for authenticated users
    if (user) {
        const creditCheck = await checkAndConsumeCredits(user.id);
        if (!creditCheck.allowed) {
            return {
                message: creditCheck.message || 'Unable to process request.',
                success: false,
            };
        }
    }

    try {
        // Determine whether to use real AI or simulation
        const useRealAI = featureFlags.enableRealTryOn && isAIServiceConfigured();
        const result = useRealAI
            ? await processWithAI(validatedFields.data)
            : await processWithSimulation(validatedFields.data);

        // Save result to database
        await saveResult(
            validatedFields.data,
            result,
            user?.id,
            sessionId || undefined
        );

        return {
            message: 'Try-on generated successfully!',
            success: true,
            result,
        };
    } catch (error) {
        console.error('Try-on generation error:', error);

        // Refund credit on failure if user was charged
        if (user) {
            await refundCreditsOnFailure(user.id);
        }

        return {
            message: error instanceof Error ? error.message : 'Failed to generate try-on. Please try again.',
            success: false,
        };
    }
}

// ============================================
// GET TRY-ON HISTORY
// ============================================
export async function getTryOnHistory(
    limit: number = 20,
    offset: number = 0
): Promise<{ results: TryOnResult[]; total: number }> {
    const supabase = createServerClient();
    const user = await getCurrentUser();

    if (!supabase) {
        return { results: [], total: 0 };
    }

    const query = supabase
        .from('try_on_results')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

    if (user) {
        query.eq('user_id', user.id);
    }

    const { data, count, error } = await query;

    if (error) {
        console.error('Error fetching try-on history:', error);
        return { results: [], total: 0 };
    }

    const results = (data || []).map(row => ({
        id: row.id,
        resultImageUrl: row.result_image_url,
        processingTime: (row.processing_time_ms || 0) / 1000,
        createdAt: row.created_at,
    }));

    return { results, total: count || 0 };
}

// ============================================
// DELETE TRY-ON RESULT
// ============================================
export async function deleteTryOnResult(id: string): Promise<FormState> {
    const supabase = createServerClient();
    const user = await getCurrentUser();

    if (!supabase || !user) {
        return {
            message: 'Unauthorized',
            success: false,
        };
    }

    const { error } = await supabase
        .from('try_on_results')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

    if (error) {
        console.error('Error deleting try-on result:', error);
        return {
            message: 'Failed to delete result.',
            success: false,
        };
    }

    return {
        message: 'Result deleted successfully.',
        success: true,
    };
}
