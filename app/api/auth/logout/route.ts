import { createServerClient } from '@/services/supabase/server';
import { NextResponse } from 'next/server';

export async function POST() {
    try {
        const supabase = createServerClient();

        if (!supabase) {
            return NextResponse.json(
                { error: 'Authentication service unavailable' },
                { status: 503 }
            );
        }

        await supabase.auth.signOut();

        return NextResponse.json({
            success: true,
            message: 'Logged out successfully',
        });
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
