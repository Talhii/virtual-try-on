import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

let browserClient: SupabaseClient<Database> | null = null;

export const createBrowserClient = (): SupabaseClient<Database> => {
    // Return existing client if already created
    if (browserClient) {
        return browserClient;
    }

    // Check if environment variables are configured
    if (!supabaseUrl || !supabaseAnonKey) {
        // Return a mock client for SSG/build time
        // This will be replaced with real client at runtime
        console.warn('Supabase environment variables not configured');
        return createClient<Database>('http://localhost', 'placeholder', {
            auth: { persistSession: false }
        });
    }

    browserClient = createClient<Database>(supabaseUrl, supabaseAnonKey);
    return browserClient;
};

// For backward compatibility
export const createClientComponentClient = createBrowserClient;
