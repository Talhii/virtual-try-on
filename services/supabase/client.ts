import { createBrowserClient as createSupabaseBrowserClient } from '@supabase/ssr';
import { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

let browserClient: SupabaseClient<Database> | null = null;

export const createBrowserClient = (): SupabaseClient<Database> => {
    if (browserClient) return browserClient;

    if (!supabaseUrl || !supabaseAnonKey) {
        console.warn('Supabase environment variables not configured');
        // Fallback or error handling
        throw new Error('Supabase environment variables missing');
    }

    browserClient = createSupabaseBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
    return browserClient;
};

// For backward compatibility
export const createClientComponentClient = createBrowserClient;
