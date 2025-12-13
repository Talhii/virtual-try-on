import { createServerClient } from '@/services/supabase/server';
import { NextResponse } from 'next/server';

// GET /api/products/categories - Get all product categories
export async function GET() {
    try {
        const supabase = createServerClient();

        if (!supabase) {
            return NextResponse.json(
                { error: 'Service unavailable' },
                { status: 503 }
            );
        }

        const { data, error } = await supabase
            .from('products')
            .select('category')
            .eq('is_active', true)
            .not('category', 'is', null);

        if (error) {
            console.error('Error fetching categories:', error);
            return NextResponse.json(
                { error: 'Failed to fetch categories' },
                { status: 500 }
            );
        }

        // Get unique categories
        const categories = [...new Set((data || []).map((row) => row.category).filter(Boolean))] as string[];
        categories.sort((a, b) => a.localeCompare(b));

        return NextResponse.json({ categories });
    } catch (error) {
        console.error('Categories error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
