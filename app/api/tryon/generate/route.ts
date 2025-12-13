import { createServerClient } from '@/services/supabase/server';
import { tryOnSchema } from '@/lib/validations';
import { featureFlags } from '@/config/site';
import { generateTryOnImage, isAIServiceConfigured } from '@/services/ai';
import { generateId, delay } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';
import type { TryOnSettings, TryOnResult } from '@/types';

// Simulated processing for demo/fallback
async function processWithSimulation(): Promise<TryOnResult> {
    await delay(2000);
    return {
        id: generateId(),
        resultImageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop',
        processingTime: 2,
        createdAt: new Date().toISOString(),
    };
}

// Real AI processing
async function processWithAI(
    modelImageUrl: string,
    garmentImageUrl: string,
    settings: TryOnSettings
): Promise<TryOnResult> {
    const result = await generateTryOnImage(modelImageUrl, garmentImageUrl, settings);

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

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate input
        const validatedFields = tryOnSchema.safeParse(body);

        if (!validatedFields.success) {
            return NextResponse.json(
                {
                    error: 'Validation failed',
                    details: validatedFields.error.issues,
                },
                { status: 400 }
            );
        }

        const supabase = createServerClient();
        let userId: string | null = null;

        // Check if user is authenticated
        if (supabase) {
            const { data: { user } } = await supabase.auth.getUser();
            userId = user?.id || null;

            // Check credits for authenticated users
            if (userId) {
                const { data: profile, error } = await supabase
                    .from('user_profiles')
                    .select('credits_remaining')
                    .eq('id', userId)
                    .single();

                if (error || !profile || profile.credits_remaining < 1) {
                    return NextResponse.json(
                        { error: 'Insufficient credits. Please purchase more credits to continue.' },
                        { status: 402 }
                    );
                }

                // Consume credit
                await supabase
                    .from('user_profiles')
                    .update({
                        credits_remaining: profile.credits_remaining - 1,
                        credits_used_total: (profile.credits_remaining || 0) + 1,
                    })
                    .eq('id', userId);

                // Log transaction
                await supabase.from('credit_transactions').insert({
                    user_id: userId,
                    amount: -1,
                    description: 'Virtual try-on generation',
                });
            }
        }

        // Generate try-on
        const useRealAI = featureFlags.enableRealTryOn && isAIServiceConfigured();
        let result: TryOnResult;

        try {
            result = useRealAI
                ? await processWithAI(
                    validatedFields.data.modelImageUrl,
                    validatedFields.data.garmentImageUrl,
                    validatedFields.data.settings
                )
                : await processWithSimulation();
        } catch (genError) {
            // Refund credit on failure
            if (userId && supabase) {
                const { data: profile } = await supabase
                    .from('user_profiles')
                    .select('credits_remaining')
                    .eq('id', userId)
                    .single();

                if (profile) {
                    await supabase
                        .from('user_profiles')
                        .update({
                            credits_remaining: profile.credits_remaining + 1,
                        })
                        .eq('id', userId);

                    await supabase.from('credit_transactions').insert({
                        user_id: userId,
                        amount: 1,
                        description: 'Refund - generation failed',
                    });
                }
            }

            throw genError;
        }

        // Save result to database
        if (supabase) {
            await supabase.from('try_on_results').insert({
                id: result.id,
                user_id: userId,
                model_image_url: validatedFields.data.modelImageUrl,
                garment_image_url: validatedFields.data.garmentImageUrl,
                result_image_url: result.resultImageUrl,
                settings: validatedFields.data.settings,
                processing_time_ms: Math.round(result.processingTime * 1000),
            });
        }

        return NextResponse.json({
            success: true,
            result,
        });
    } catch (error) {
        console.error('Try-on generation error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to generate try-on' },
            { status: 500 }
        );
    }
}
