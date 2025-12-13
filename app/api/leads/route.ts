import { createServerClient } from '@/services/supabase/server';
import { leadSchema } from '@/lib/validations';
import { NextRequest, NextResponse } from 'next/server';

// POST /api/leads - Submit a contact form / lead
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate input
        const validatedFields = leadSchema.safeParse(body);

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
            // Return success for demo purposes when Supabase not configured
            console.warn('Supabase not configured - lead submission simulated');
            return NextResponse.json({
                success: true,
                message: 'Thank you! We will get back to you soon.',
            });
        }

        const { error } = await supabase.from('leads').insert({
            full_name: validatedFields.data.fullName,
            email: validatedFields.data.email,
            message: validatedFields.data.message,
        });

        if (error) {
            console.error('Lead submission error:', error);
            return NextResponse.json(
                { error: 'Failed to submit. Please try again.' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Thank you! We will get back to you within 24 hours.',
        });
    } catch (error) {
        console.error('Lead error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
