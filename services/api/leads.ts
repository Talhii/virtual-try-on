/**
 * Leads API Service
 */

import { post } from './client';

// ============================================
// TYPES
// ============================================

export interface LeadSubmission {
    fullName: string;
    email: string;
    message: string;
}

export interface LeadResponse {
    success: boolean;
    message: string;
}

// ============================================
// API METHODS
// ============================================

export const leadsApi = {
    /**
     * Submit a contact form / lead
     */
    submit: (data: LeadSubmission): Promise<LeadResponse> =>
        post('/leads', data),
};
