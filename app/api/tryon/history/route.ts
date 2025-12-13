import { createServerClient } from '@/services/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/tryon/history - Get user's try-on history
export async function GET(request: NextRequest) {
    try {
        const supabase = createServerClient();

        if (!supabase) {
            return NextResponse.json(
                { error: 'Service unavailable' },
                { status: 503 }
            );
        }

        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 }
            );
        }

        // Parse query params
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '20', 10);
        const offset = parseInt(searchParams.get('offset') || '0', 10);

        const { data, count, error } = await supabase
            .from('try_on_results')
            .select('*', { count: 'exact' })
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1);

        if (error) {
            console.error('Error fetching try-on history:', error);
            return NextResponse.json(
                { error: 'Failed to fetch history' },
                { status: 500 }
            );
        }

        const results = (data || []).map((row) => ({
            id: row.id,
            modelImageUrl: row.model_image_url,
            garmentImageUrl: row.garment_image_url,
            resultImageUrl: row.result_image_url,
            settings: row.settings || {},
            processingTime: (row.processing_time_ms || 0) / 1000,
            createdAt: row.created_at,
        }));

        return NextResponse.json({
            results,
            total: count || 0,
            limit,
            offset,
        });
    } catch (error) {
        console.error('History error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
