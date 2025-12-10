'use client';

import {
    createContext,
    useEffect,
    useState,
    useCallback,
    useMemo,
    useRef,
    type ReactNode,
} from 'react';
import { createBrowserClient } from '@/services/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

// ============================================
// CONSTANTS
// ============================================

const DEFAULT_PLAN = 'starter';
const DEFAULT_CREDITS = 10;
const DEFAULT_CREDITS_USED = 0;

// ============================================
// TYPES
// ============================================

export interface UserProfile {
    id: string;
    email: string | undefined;
    full_name: string | null;
    avatar_url: string | null;
    plan: string;
    credits_remaining: number;
    credits_used_total: number;
}

export interface AuthContextType {
    user: User | null;
    profile: UserProfile | null;
    session: Session | null;
    isLoading: boolean;
    error: Error | null;
    refreshProfile: () => Promise<void>;
}

interface AuthProviderProps {
    readonly children: ReactNode;
}

interface ProfileRow {
    full_name: string | null;
    avatar_url: string | null;
    plan: string | null;
    credits_remaining: number | null;
    credits_used_total: number | null;
}

// ============================================
// CONTEXT (null default for proper hook validation)
// ============================================

export const AuthContext = createContext<AuthContextType | null>(null);

// ============================================
// PROVIDER
// ============================================

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    // Use ref to track latest fetch request and prevent race conditions
    const fetchIdRef = useRef(0);

    // Memoize supabase client to prevent recreation on every render
    const supabase = useMemo(() => createBrowserClient(), []);

    const fetchProfile = useCallback(async (userId: string, userEmail: string | undefined) => {
        // Increment fetch ID to track this request
        const currentFetchId = ++fetchIdRef.current;

        try {
            setError(null);

            const { data, error: fetchError } = await supabase
                .from('user_profiles')
                .select('full_name, avatar_url, plan, credits_remaining, credits_used_total')
                .eq('id', userId)
                .single();

            // Check if this is still the latest request (prevent race condition)
            if (currentFetchId !== fetchIdRef.current) {
                return;
            }

            if (fetchError && fetchError.code !== 'PGRST116') {
                console.error('Error fetching profile:', fetchError);
                setError(new Error(fetchError.message));
            }

            if (data) {
                const profileData = data as ProfileRow;
                setProfile({
                    id: userId,
                    email: userEmail,
                    full_name: profileData.full_name,
                    avatar_url: profileData.avatar_url,
                    plan: profileData.plan || DEFAULT_PLAN,
                    credits_remaining: profileData.credits_remaining ?? DEFAULT_CREDITS,
                    credits_used_total: profileData.credits_used_total ?? DEFAULT_CREDITS_USED,
                });
            } else {
                // Set default profile for new users
                setProfile({
                    id: userId,
                    email: userEmail,
                    full_name: null,
                    avatar_url: null,
                    plan: DEFAULT_PLAN,
                    credits_remaining: DEFAULT_CREDITS,
                    credits_used_total: DEFAULT_CREDITS_USED,
                });
            }
        } catch (err) {
            // Check if this is still the latest request
            if (currentFetchId !== fetchIdRef.current) {
                return;
            }

            const errorMessage = err instanceof Error ? err : new Error('Failed to fetch profile');
            console.error('Failed to fetch profile:', err);
            setError(errorMessage);
        }
    }, [supabase]);

    const refreshProfile = useCallback(async () => {
        if (user) {
            await fetchProfile(user.id, user.email);
        }
    }, [user, fetchProfile]);

    useEffect(() => {
        // Get initial session
        const initializeAuth = async () => {
            try {
                setError(null);
                const { data: { session: initialSession } } = await supabase.auth.getSession();

                setSession(initialSession);
                setUser(initialSession?.user ?? null);

                if (initialSession?.user) {
                    await fetchProfile(initialSession.user.id, initialSession.user.email);
                }
            } catch (err) {
                const errorMessage = err instanceof Error ? err : new Error('Auth initialization failed');
                console.error('Auth initialization error:', err);
                setError(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };

        initializeAuth();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, currentSession) => {
                setSession(currentSession);
                setUser(currentSession?.user ?? null);

                if (currentSession?.user) {
                    await fetchProfile(currentSession.user.id, currentSession.user.email);
                } else {
                    setProfile(null);
                }
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, [supabase, fetchProfile]);

    const contextValue = useMemo(
        () => ({
            user,
            profile,
            session,
            isLoading,
            error,
            refreshProfile,
        }),
        [user, profile, session, isLoading, error, refreshProfile]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}
