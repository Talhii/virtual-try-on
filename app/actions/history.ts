'use server';

import { createServerClient } from '@/services/supabase/server';
import { getCurrentUser } from './auth';
import type { TryOnResult, FormState } from '@/types';

// ============================================
// TYPES
// ============================================

export interface HistoryItem extends TryOnResult {
    modelImageUrl: string;
    garmentImageUrl: string;
    settings: {
        preserveIdentity?: boolean;
        highResolution?: boolean;
        creativity?: number;
    };
}

// ============================================
// GET TRY-ON HISTORY (DETAILED)
// ============================================

export async function getDetailedHistory(
    limit: number = 20,
    offset: number = 0
): Promise<{ items: HistoryItem[]; total: number }> {
    const supabase = createServerClient();
    const user = await getCurrentUser();

    if (!supabase || !user) {
        return { items: [], total: 0 };
    }

    const { data, count, error } = await supabase
        .from('try_on_results')
        .select('*', { count: 'exact' })
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

    if (error) {
        console.error('Error fetching history:', error);
        return { items: [], total: 0 };
    }

    const items: HistoryItem[] = (data || []).map((row) => ({
        id: row.id,
        resultImageUrl: row.result_image_url,
        processingTime: (row.processing_time_ms || 0) / 1000,
        createdAt: row.created_at,
        modelImageUrl: row.model_image_url,
        garmentImageUrl: row.garment_image_url,
        settings: (row.settings as HistoryItem['settings']) || {},
    }));

    return { items, total: count || 0 };
}

// ============================================
// GET SINGLE HISTORY ITEM
// ============================================

export async function getHistoryItem(id: string): Promise<HistoryItem | null> {
    const supabase = createServerClient();
    const user = await getCurrentUser();

    if (!supabase || !user) {
        return null;
    }

    const { data, error } = await supabase
        .from('try_on_results')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

    if (error || !data) {
        console.error('Error fetching history item:', error);
        return null;
    }

    return {
        id: data.id,
        resultImageUrl: data.result_image_url,
        processingTime: (data.processing_time_ms || 0) / 1000,
        createdAt: data.created_at,
        modelImageUrl: data.model_image_url,
        garmentImageUrl: data.garment_image_url,
        settings: (data.settings as HistoryItem['settings']) || {},
    };
}

// ============================================
// DELETE HISTORY ITEM
// ============================================

export async function deleteHistoryItem(id: string): Promise<FormState> {
    const supabase = createServerClient();
    const user = await getCurrentUser();

    if (!supabase || !user) {
        return {
            message: 'Not authenticated.',
            success: false,
        };
    }

    const { error } = await supabase
        .from('try_on_results')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

    if (error) {
        console.error('Error deleting history item:', error);
        return {
            message: 'Failed to delete item.',
            success: false,
        };
    }

    return {
        message: 'Item deleted successfully.',
        success: true,
    };
}

// ============================================
// CLEAR ALL HISTORY
// ============================================

export async function clearHistory(): Promise<FormState> {
    const supabase = createServerClient();
    const user = await getCurrentUser();

    if (!supabase || !user) {
        return {
            message: 'Not authenticated.',
            success: false,
        };
    }

    const { error } = await supabase
        .from('try_on_results')
        .delete()
        .eq('user_id', user.id);

    if (error) {
        console.error('Error clearing history:', error);
        return {
            message: 'Failed to clear history.',
            success: false,
        };
    }

    return {
        message: 'History cleared successfully.',
        success: true,
    };
}

// ============================================
// GET HISTORY STATS
// ============================================

export async function getHistoryStats(): Promise<{
    totalTryOns: number;
    totalProcessingTime: number;
    averageProcessingTime: number;
    mostUsedSettings: {
        highResolution: number;
        preserveIdentity: number;
    };
}> {
    const supabase = createServerClient();
    const user = await getCurrentUser();

    if (!supabase || !user) {
        return {
            totalTryOns: 0,
            totalProcessingTime: 0,
            averageProcessingTime: 0,
            mostUsedSettings: {
                highResolution: 0,
                preserveIdentity: 0,
            },
        };
    }

    const { data, error } = await supabase
        .from('try_on_results')
        .select('processing_time_ms, settings')
        .eq('user_id', user.id);

    if (error || !data) {
        console.error('Error fetching history stats:', error);
        return {
            totalTryOns: 0,
            totalProcessingTime: 0,
            averageProcessingTime: 0,
            mostUsedSettings: {
                highResolution: 0,
                preserveIdentity: 0,
            },
        };
    }

    const totalTryOns = data.length;
    const totalProcessingTime = data.reduce((sum, row) => sum + (row.processing_time_ms || 0), 0) / 1000;
    const averageProcessingTime = totalTryOns > 0 ? totalProcessingTime / totalTryOns : 0;

    const highResCount = data.filter((row) => {
        const settings = row.settings as { highResolution?: boolean } | null;
        return settings?.highResolution === true;
    }).length;

    const preserveIdCount = data.filter((row) => {
        const settings = row.settings as { preserveIdentity?: boolean } | null;
        return settings?.preserveIdentity === true;
    }).length;

    return {
        totalTryOns,
        totalProcessingTime,
        averageProcessingTime,
        mostUsedSettings: {
            highResolution: highResCount,
            preserveIdentity: preserveIdCount,
        },
    };
}

// ============================================
// CREATE SHAREABLE LINK
// ============================================

export async function createShareableLink(
    id: string
): Promise<{ shareUrl?: string; error?: string }> {
    const supabase = createServerClient();
    const user = await getCurrentUser();

    if (!supabase || !user) {
        return { error: 'Not authenticated.' };
    }

    // Verify ownership
    const { data: item, error: fetchError } = await supabase
        .from('try_on_results')
        .select('id, result_image_url')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

    if (fetchError || !item) {
        return { error: 'Item not found.' };
    }

    // For now, we'll just return the direct image URL
    // In a production app, you might create a shareable page
    const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/share/${id}`;

    return { shareUrl };
}

// ============================================
// FAVORITE HISTORY ITEM (FUTURE FEATURE)
// ============================================

export async function toggleFavorite(_id: string): Promise<FormState & { isFavorite?: boolean }> {
    // This would require adding a 'favorites' column or table
    // Placeholder for future implementation
    return {
        message: 'Feature coming soon!',
        success: false,
    };
}
