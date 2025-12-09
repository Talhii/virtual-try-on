// Database types for Supabase
// Generated types should be replaced with actual types from Supabase CLI: npx supabase gen types typescript

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export interface Database {
    public: {
        Tables: {
            products: {
                Row: {
                    id: string;
                    name: string;
                    description: string | null;
                    image_url: string | null;
                    category: string | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    name: string;
                    description?: string | null;
                    image_url?: string | null;
                    category?: string | null;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    name?: string;
                    description?: string | null;
                    image_url?: string | null;
                    category?: string | null;
                    created_at?: string;
                };
            };
            leads: {
                Row: {
                    id: string;
                    full_name: string | null;
                    email: string;
                    message: string | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    full_name?: string | null;
                    email: string;
                    message?: string | null;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    full_name?: string | null;
                    email?: string;
                    message?: string | null;
                    created_at?: string;
                };
            };
            try_on_results: {
                Row: {
                    id: string;
                    user_id: string | null;
                    model_image_url: string;
                    garment_image_url: string;
                    result_image_url: string;
                    settings: Json | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    user_id?: string | null;
                    model_image_url: string;
                    garment_image_url: string;
                    result_image_url: string;
                    settings?: Json | null;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string | null;
                    model_image_url?: string;
                    garment_image_url?: string;
                    result_image_url?: string;
                    settings?: Json | null;
                    created_at?: string;
                };
            };
        };
        Views: Record<string, never>;
        Functions: Record<string, never>;
        Enums: Record<string, never>;
    };
}

// Helper types
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];
