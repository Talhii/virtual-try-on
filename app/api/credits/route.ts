import { createServerClient } from '@/services/supabase/server';
import { NextResponse } from 'next/server';

// GET /api/credits - Get user's credit balance
export async function GET() {
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

        const { data, error } = await supabase
            .from('user_profiles')
            .select('credits_remaining, credits_used_total, plan')
            .eq('id', user.id)
            .single();

        if (error) {
            console.error('Error fetching credits:', error);
            return NextResponse.json(
                { error: 'Failed to fetch credits' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            remaining: data?.credits_remaining ?? 0,
            usedTotal: data?.credits_used_total ?? 0,
            plan: data?.plan ?? 'starter',
        });
    } catch (error) {
        console.error('Credits error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
