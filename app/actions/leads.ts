'use server';

import { createServerClient } from '@/lib/supabase/server';
import { leadSchema } from '@/lib/validations';
import type { FormState } from '@/types';

export async function submitLead(
    prevState: FormState | null,
    formData: FormData
): Promise<FormState> {
    // Validate form data
    const validatedFields = leadSchema.safeParse({
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        message: formData.get('message'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Please fix the errors below.',
            success: false,
        };
    }

    // Check if Supabase is configured
    const supabase = createServerClient();

    if (!supabase) {
        console.warn('Supabase not configured - lead submission simulated');
        // Return success for demo purposes
        return {
            message: 'Thank you! We will get back to you soon.',
            success: true,
        };
    }

    try {
        const { error } = await supabase.from('leads').insert({
            full_name: validatedFields.data.fullName,
            email: validatedFields.data.email,
            message: validatedFields.data.message,
        });

        if (error) {
            console.error('Supabase error:', error);
            return {
                message: 'Failed to submit. Please try again.',
                success: false,
            };
        }

        return {
            message: 'Thank you! We will get back to you within 24 hours.',
            success: true,
        };
    } catch (error) {
        console.error('Submission error:', error);
        return {
            message: 'An unexpected error occurred. Please try again.',
            success: false,
        };
    }
}
