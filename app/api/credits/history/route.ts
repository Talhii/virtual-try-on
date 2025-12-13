import { createServerClient } from '@/services/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/credits/history - Get user's credit transaction history
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
        const limit = parseInt(searchParams.get('limit') || '50', 10);
        const offset = parseInt(searchParams.get('offset') || '0', 10);

        const { data, count, error } = await supabase
            .from('credit_transactions')
            .select('*', { count: 'exact' })
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1);

        if (error) {
            console.error('Error fetching credit history:', error);
            return NextResponse.json(
                { error: 'Failed to fetch credit history' },
                { status: 500 }
            );
        }

        const transactions = (data || []).map((row) => ({
            id: row.id,
            amount: row.amount,
            description: row.description || '',
            createdAt: row.created_at,
        }));

        return NextResponse.json({
            transactions,
            total: count || 0,
            limit,
            offset,
        });
    } catch (error) {
        console.error('Credit history error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
