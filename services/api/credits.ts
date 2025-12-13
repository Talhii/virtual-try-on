/**
 * Credits API Service
 */

import { get } from './client';

// ============================================
// TYPES
// ============================================

export interface CreditBalance {
    remaining: number;
    usedTotal: number;
    plan: string;
}

export interface CreditTransaction {
    id: string;
    amount: number;
    description: string;
    createdAt: string;
}

export interface HistoryResponse {
    transactions: CreditTransaction[];
    total: number;
    limit: number;
    offset: number;
}

// ============================================
// API METHODS
// ============================================

export const creditsApi = {
    /**
     * Get the current user's credit balance
     */
    getBalance: (): Promise<CreditBalance> =>
        get('/credits'),

    /**
     * Get the user's credit transaction history
     */
    getHistory: (limit = 50, offset = 0): Promise<HistoryResponse> =>
        get(`/credits/history?limit=${limit}&offset=${offset}`),
};
