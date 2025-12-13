import { createServerClient } from '@/services/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
    params: Promise<{ id: string }>;
}

// GET /api/tryon/[id] - Get a single try-on result
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
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

        const { data, error } = await supabase
            .from('try_on_results')
            .select('*')
            .eq('id', id)
            .eq('user_id', user.id)
            .single();

        if (error || !data) {
            return NextResponse.json(
                { error: 'Result not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            id: data.id,
            modelImageUrl: data.model_image_url,
            garmentImageUrl: data.garment_image_url,
            resultImageUrl: data.result_image_url,
            settings: data.settings || {},
            processingTime: (data.processing_time_ms || 0) / 1000,
            createdAt: data.created_at,
        });
    } catch (error) {
        console.error('Get try-on error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// DELETE /api/tryon/[id] - Delete a try-on result
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
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

        const { error } = await supabase
            .from('try_on_results')
            .delete()
            .eq('id', id)
            .eq('user_id', user.id);

        if (error) {
            console.error('Delete try-on error:', error);
            return NextResponse.json(
                { error: 'Failed to delete result' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Result deleted successfully',
        });
    } catch (error) {
        console.error('Delete try-on error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
