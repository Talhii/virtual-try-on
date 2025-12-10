'use server';

import { createServerClient } from '@/services/supabase/server';
import { signupSchema, loginSchema } from '@/lib/validations';
import type { FormState } from '@/types';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

// ============================================
// SIGN UP
// ============================================
export async function signUp(
    prevState: FormState | null,
    formData: FormData
): Promise<FormState> {
    const validatedFields = signupSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
    });

    if (!validatedFields.success) {
        const errors: Record<string, string[]> = {};
        for (const issue of validatedFields.error.issues) {
            const path = issue.path[0] as string;
            if (!errors[path]) errors[path] = [];
            errors[path].push(issue.message);
        }
        return {
            errors,
            message: 'Please fix the errors below.',
            success: false,
        };
    }

    const supabase = createServerClient();

    if (!supabase) {
        return {
            message: 'Authentication service unavailable. Please try again later.',
            success: false,
        };
    }

    const { data, error } = await supabase.auth.signUp({
        email: validatedFields.data.email,
        password: validatedFields.data.password,
        options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        },
    });

    if (error) {
        console.error('Signup error:', error);
        return {
            message: error.message || 'Failed to create account. Please try again.',
            success: false,
        };
    }

    if (data.user && !data.user.confirmed_at) {
        return {
            message: 'Check your email to confirm your account.',
            success: true,
        };
    }

    revalidatePath('/', 'layout');
    redirect('/dashboard');
}

// ============================================
// SIGN IN
// ============================================
export async function signIn(
    prevState: FormState | null,
    formData: FormData
): Promise<FormState> {
    const validatedFields = loginSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if (!validatedFields.success) {
        const errors: Record<string, string[]> = {};
        for (const issue of validatedFields.error.issues) {
            const path = issue.path[0] as string;
            if (!errors[path]) errors[path] = [];
            errors[path].push(issue.message);
        }
        return {
            errors,
            message: 'Please fix the errors below.',
            success: false,
        };
    }

    const supabase = createServerClient();

    if (!supabase) {
        return {
            message: 'Authentication service unavailable. Please try again later.',
            success: false,
        };
    }

    const { error } = await supabase.auth.signInWithPassword({
        email: validatedFields.data.email,
        password: validatedFields.data.password,
    });

    if (error) {
        console.error('Login error:', error);
        return {
            message: 'Invalid email or password.',
            success: false,
        };
    }

    revalidatePath('/', 'layout');
    redirect('/dashboard');
}

// ============================================
// SIGN IN WITH OAUTH
// ============================================
export async function signInWithOAuth(provider: 'google' | 'github') {
    const supabase = createServerClient();

    if (!supabase) {
        return { error: 'Authentication service unavailable.' };
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        },
    });

    if (error) {
        console.error('OAuth error:', error);
        return { error: error.message };
    }

    if (data.url) {
        redirect(data.url);
    }

    return { error: 'Failed to initialize OAuth flow.' };
}

// ============================================
// SIGN OUT
// ============================================
export async function signOut() {
    const supabase = createServerClient();

    if (!supabase) {
        redirect('/');
    }

    await supabase.auth.signOut();
    revalidatePath('/', 'layout');
    redirect('/');
}

// ============================================
// RESET PASSWORD REQUEST
// ============================================
export async function resetPassword(
    prevState: FormState | null,
    formData: FormData
): Promise<FormState> {
    const email = formData.get('email') as string;

    if (!email?.includes('@')) {
        return {
            errors: { email: ['Please enter a valid email address.'] },
            message: 'Invalid email address.',
            success: false,
        };
    }

    const supabase = createServerClient();

    if (!supabase) {
        return {
            message: 'Authentication service unavailable. Please try again later.',
            success: false,
        };
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/update-password`,
    });

    if (error) {
        console.error('Password reset error:', error);
        // Don't reveal if email exists
        return {
            message: 'If an account exists, you will receive a password reset email.',
            success: true,
        };
    }

    return {
        message: 'Check your email for a password reset link.',
        success: true,
    };
}

// ============================================
// UPDATE PASSWORD
// ============================================
export async function updatePassword(
    prevState: FormState | null,
    formData: FormData
): Promise<FormState> {
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password.length < 8) {
        return {
            errors: { password: ['Password must be at least 8 characters.'] },
            message: 'Password too short.',
            success: false,
        };
    }

    if (password !== confirmPassword) {
        return {
            errors: { confirmPassword: ['Passwords do not match.'] },
            message: 'Passwords do not match.',
            success: false,
        };
    }

    const supabase = createServerClient();

    if (!supabase) {
        return {
            message: 'Authentication service unavailable. Please try again later.',
            success: false,
        };
    }

    const { error } = await supabase.auth.updateUser({
        password,
    });

    if (error) {
        console.error('Update password error:', error);
        return {
            message: 'Failed to update password. Please try again.',
            success: false,
        };
    }

    return {
        message: 'Password updated successfully!',
        success: true,
    };
}

// ============================================
// GET CURRENT USER
// ============================================
export async function getCurrentUser() {
    const supabase = createServerClient();

    if (!supabase) {
        return null;
    }

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        return null;
    }

    return user;
}

// ============================================
// GET USER PROFILE
// ============================================
export async function getUserProfile() {
    const supabase = createServerClient();

    if (!supabase) {
        return null;
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        return null;
    }

    const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    if (profileError) {
        // Profile might not exist yet, return basic user info
        return {
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || null,
            avatar_url: user.user_metadata?.avatar_url || null,
            plan: 'starter',
            credits_remaining: 10,
            credits_used_total: 0,
        };
    }

    return {
        id: user.id,
        email: user.email,
        ...profile,
    };
}

// ============================================
// UPDATE USER PROFILE
// ============================================
export async function updateProfile(
    prevState: FormState | null,
    formData: FormData
): Promise<FormState> {
    const fullName = formData.get('fullName') as string;

    const supabase = createServerClient();

    if (!supabase) {
        return {
            message: 'Service unavailable. Please try again later.',
            success: false,
        };
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        return {
            message: 'You must be logged in to update your profile.',
            success: false,
        };
    }

    // Update auth metadata
    await supabase.auth.updateUser({
        data: { full_name: fullName },
    });

    // Update profile table
    const { error } = await supabase
        .from('user_profiles')
        .upsert({
            id: user.id,
            full_name: fullName,
        });

    if (error) {
        console.error('Profile update error:', error);
        return {
            message: 'Failed to update profile. Please try again.',
            success: false,
        };
    }

    revalidatePath('/dashboard', 'layout');

    return {
        message: 'Profile updated successfully!',
        success: true,
    };
}
