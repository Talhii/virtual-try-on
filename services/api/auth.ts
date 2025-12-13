/**
 * Authentication API Service
 */

import { get, post } from './client';

// ============================================
// TYPES
// ============================================

export interface User {
    id: string;
    email: string;
    full_name?: string | null;
    avatar_url?: string | null;
    plan?: string;
    credits_remaining?: number;
    credits_used_total?: number;
}

export interface AuthSession {
    access_token: string;
    refresh_token: string;
    expires_at: number;
}

export interface SignupResponse {
    success: boolean;
    message: string;
    user?: { id: string; email: string };
}

export interface LoginResponse {
    success: boolean;
    user: {
        id: string;
        email: string;
    };
    session: AuthSession;
}

export interface LogoutResponse {
    success: boolean;
    message: string;
}

export interface MeResponse {
    user: User;
}

// ============================================
// API METHODS
// ============================================

export const authApi = {
    /**
     * Register a new user
     */
    signup: (email: string, password: string): Promise<SignupResponse> =>
        post('/auth/signup', { email, password, confirmPassword: password }),

    /**
     * Login with email and password
     */
    login: (email: string, password: string): Promise<LoginResponse> =>
        post('/auth/login', { email, password }),

    /**
     * Logout the current user
     */
    logout: (): Promise<LogoutResponse> =>
        post('/auth/logout'),

    /**
     * Get the current authenticated user
     */
    getMe: (): Promise<MeResponse> =>
        get('/auth/me'),
};
