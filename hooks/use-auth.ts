'use client';

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext, type AuthContextType } from '@/providers/auth-provider';

/**
 * Hook to access authentication state and user profile.
 * Must be used within an AuthProvider.
 * 
 * @throws {Error} If used outside of AuthProvider
 * @returns {AuthContextType} The authentication context including user, profile, session, loading state, and error
 */
export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);

    if (context === null) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

/**
 * Hook that requires authentication - redirects to login if not authenticated.
 * Uses Next.js router for client-side navigation without full page reload.
 * 
 * @returns {{ user: User | null, isLoading: boolean, error: Error | null }}
 */
export function useRequireAuth() {
    const { user, isLoading, error } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
        }
    }, [user, isLoading, router]);

    return { user, isLoading, error };
}
