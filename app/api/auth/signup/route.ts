import { createServerClient } from '@/services/supabase/server';
import { signupSchema } from '@/lib/validations';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate input
        const validatedFields = signupSchema.safeParse(body);

        if (!validatedFields.success) {
            console.error('Signup validation failed:', JSON.stringify(validatedFields.error.issues, null, 2));
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
            console.error('Supabase client not initialized');
            return NextResponse.json(
                { error: 'Authentication service unavailable' },
                { status: 503 }
            );
        }

        const { data, error } = await supabase.auth.signUp({
            email: validatedFields.data.email,
            password: validatedFields.data.password,
            options: {
                emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/callback`,
            },
        });

        if (error) {
            console.error('Supabase signup error:', error.message, error);
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            );
        }

        return NextResponse.json({
            success: true,
            message: data.user?.confirmed_at
                ? 'Account created successfully'
                : 'Check your email to confirm your account',
            user: data.user ? { id: data.user.id, email: data.user.email } : null,
        });
    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
