import { createServerClient } from '@/services/supabase/server';
import { loginSchema } from '@/lib/validations';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate input
        const validatedFields = loginSchema.safeParse(body);

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

        if (!supabase) {
            return NextResponse.json(
                { error: 'Authentication service unavailable' },
                { status: 503 }
            );
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email: validatedFields.data.email,
            password: validatedFields.data.password,
        });

        if (error) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        return NextResponse.json({
            success: true,
            user: {
                id: data.user.id,
                email: data.user.email,
            },
            session: {
                access_token: data.session.access_token,
                refresh_token: data.session.refresh_token,
                expires_at: data.session.expires_at,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
