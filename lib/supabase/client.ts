import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const createBrowserClient = () =>
    createClient<Database>(supabaseUrl, supabaseAnonKey);

// For backward compatibility
export const createClientComponentClient = createBrowserClient;
