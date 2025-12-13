import { createServerClient as createSupabaseServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { SupabaseClient } from '@supabase/supabase-js';

let supabaseClient: SupabaseClient | null = null;

export const createServerClient = (): SupabaseClient | null => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
        return null;
    }

    return createSupabaseServerClient(supabaseUrl, supabaseServiceKey, {
        cookies: {
            async getAll() {
                return (await cookies()).getAll();
            },
            async setAll(cookiesToSet) {
                try {
                    const cookieStore = await cookies();
                    cookiesToSet.forEach(({ name, value, options }) => {
                        cookieStore.set(name, value, options);
                    });
                } catch {
                    // The `setAll` method was called from a Server Component.
                    // This can be ignored if you have middleware refreshing user sessions.
                }
            },
        },
    });
};
