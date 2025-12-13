import { createServerClient } from '@/services/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/products - Get all products with optional filters
export async function GET(request: NextRequest) {
    try {
        const supabase = createServerClient();

        if (!supabase) {
            return NextResponse.json(
                { error: 'Service unavailable' },
                { status: 503 }
            );
        }

        // Parse query params
        const { searchParams } = new URL(request.url);
        const limit = Number.parseInt(searchParams.get('limit') || '50', 10);
        const offset = Number.parseInt(searchParams.get('offset') || '0', 10);
        const category = searchParams.get('category');
        const search = searchParams.get('search');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');

        let query = supabase
            .from('products')
            .select('*', { count: 'exact' })
            .eq('is_active', true)
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1);

        // Apply filters
        if (category) {
            query = query.eq('category', category);
        }

        if (minPrice) {
            query = query.gte('price', Number.parseFloat(minPrice));
        }

        if (maxPrice) {
            query = query.lte('price', Number.parseFloat(maxPrice));
        }

        if (search) {
            query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
        }

        const { data, count, error } = await query;

        if (error) {
            console.error('Error fetching products:', error);
            return NextResponse.json(
                { error: 'Failed to fetch products' },
                { status: 500 }
            );
        }

        const products = (data || []).map((row) => ({
            id: row.id,
            name: row.name,
            description: row.description,
            imageUrl: row.image_url,
            category: row.category,
            price: row.price ? Number.parseFloat(row.price) : null,
            createdAt: row.created_at,
        }));

        return NextResponse.json({
            products,
            total: count || 0,
            limit,
            offset,
        });
    } catch (error) {
        console.error('Products error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
