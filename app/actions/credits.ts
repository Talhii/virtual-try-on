'use server';

import { createServerClient } from '@/services/supabase/server';
import { getCurrentUser } from './auth';
import type { FormState } from '@/types';

// ============================================
// TYPES
// ============================================

export interface CreditBalance {
    remaining: number;
    usedTotal: number;
    plan: string;
}

export interface CreditTransaction {
    id: string;
    amount: number;
    description: string;
    createdAt: string;
}

// ============================================
// GET CREDIT BALANCE
// ============================================
export async function getCredits(): Promise<CreditBalance | null> {
    const supabase = createServerClient();
    const user = await getCurrentUser();

    if (!supabase || !user) {
        return null;
    }

    const { data, error } = await supabase
        .from('user_profiles')
        .select('credits_remaining, credits_used_total, plan')
        .eq('id', user.id)
        .single();

    if (error) {
        console.error('Error fetching credits:', error);
        return {
            remaining: 0,
            usedTotal: 0,
            plan: 'starter',
        };
    }

    return {
        remaining: data.credits_remaining ?? 0,
        usedTotal: data.credits_used_total ?? 0,
        plan: data.plan ?? 'starter',
    };
}

// ============================================
// GET CREDIT HISTORY
// ============================================
export async function getCreditHistory(
    limit: number = 50,
    offset: number = 0
): Promise<{ transactions: CreditTransaction[]; total: number }> {
    const supabase = createServerClient();
    const user = await getCurrentUser();

    if (!supabase || !user) {
        return { transactions: [], total: 0 };
    }

    const { data, count, error } = await supabase
        .from('credit_transactions')
        .select('*', { count: 'exact' })
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

    if (error) {
        console.error('Error fetching credit history:', error);
        return { transactions: [], total: 0 };
    }

    const transactions = (data || []).map((row: {
        id: string;
        amount: number;
        description: string | null;
        created_at: string;
    }) => ({
        id: row.id,
        amount: row.amount,
        description: row.description || '',
        createdAt: row.created_at,
    }));

    return { transactions, total: count || 0 };
}

// ============================================
// ADD CREDITS (INTERNAL USE)
// ============================================
export async function addCredits(
    userId: string,
    amount: number,
    description: string
): Promise<FormState> {
    const supabase = createServerClient();

    if (!supabase) {
        return {
            message: 'Service unavailable',
            success: false,
        };
    }

    // Get current credits
    const { data: profile, error: fetchError } = await supabase
        .from('user_profiles')
        .select('credits_remaining')
        .eq('id', userId)
        .single();

    if (fetchError) {
        console.error('Error fetching profile:', fetchError);
        return {
            message: 'Failed to add credits',
            success: false,
        };
    }

    const currentCredits = profile?.credits_remaining ?? 0;

    // Update credits
    const { error: updateError } = await supabase
        .from('user_profiles')
        .update({
            credits_remaining: currentCredits + amount,
        })
        .eq('id', userId);

    if (updateError) {
        console.error('Error updating credits:', updateError);
        return {
            message: 'Failed to add credits',
            success: false,
        };
    }

    // Log transaction
    await supabase.from('credit_transactions').insert({
        user_id: userId,
        amount: amount,
        description: description,
    });

    return {
        message: `Added ${amount} credits successfully`,
        success: true,
    };
}

// ============================================
// CONSUME CREDITS (INTERNAL USE)
// ============================================
export async function consumeCredits(
    userId: string,
    amount: number,
    description: string,
    tryOnId?: string
): Promise<{ success: boolean; remaining?: number; message?: string }> {
    const supabase = createServerClient();

    if (!supabase) {
        return { success: false, message: 'Service unavailable' };
    }

    // Get current credits
    const { data: profile, error: fetchError } = await supabase
        .from('user_profiles')
        .select('credits_remaining, credits_used_total')
        .eq('id', userId)
        .single();

    if (fetchError || !profile) {
        return { success: false, message: 'User not found' };
    }

    const currentCredits = profile.credits_remaining ?? 0;
    const usedTotal = profile.credits_used_total ?? 0;

    if (currentCredits < amount) {
        return {
            success: false,
            remaining: currentCredits,
            message: 'Insufficient credits',
        };
    }

    // Deduct credits
    const { error: updateError } = await supabase
        .from('user_profiles')
        .update({
            credits_remaining: currentCredits - amount,
            credits_used_total: usedTotal + amount,
        })
        .eq('id', userId);

    if (updateError) {
        console.error('Error consuming credits:', updateError);
        return { success: false, message: 'Failed to consume credits' };
    }

    // Log transaction
    await supabase.from('credit_transactions').insert({
        user_id: userId,
        amount: -amount,
        description: description,
        try_on_id: tryOnId || null,
    });

    return {
        success: true,
        remaining: currentCredits - amount,
    };
}

// ============================================
// REFUND CREDITS (INTERNAL USE)
// ============================================
export async function refundCredits(
    userId: string,
    amount: number,
    description: string
): Promise<FormState> {
    return addCredits(userId, amount, `Refund: ${description}`);
}

// ============================================
// CHECK IF USER HAS ENOUGH CREDITS
// ============================================
export async function hasEnoughCredits(
    userId: string,
    required: number = 1
): Promise<boolean> {
    const supabase = createServerClient();

    if (!supabase) {
        return true; // Allow if service unavailable
    }

    const { data, error } = await supabase
        .from('user_profiles')
        .select('credits_remaining')
        .eq('id', userId)
        .single();

    if (error || !data) {
        return false;
    }

    return (data.credits_remaining ?? 0) >= required;
}
