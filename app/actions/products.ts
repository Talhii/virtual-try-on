'use server';

import { createServerClient } from '@/services/supabase/server';

// ============================================
// TYPES
// ============================================

export interface Product {
    id: string;
    name: string;
    description: string | null;
    imageUrl: string | null;
    category: string | null;
    price: number | null;
    isActive: boolean;
    createdAt: string;
}

export interface ProductFilters {
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    isActive?: boolean;
}

// ============================================
// GET ALL PRODUCTS
// ============================================

export async function getProducts(
    filters: ProductFilters = {},
    limit: number = 50,
    offset: number = 0
): Promise<{ products: Product[]; total: number }> {
    const supabase = createServerClient();

    if (!supabase) {
        return { products: [], total: 0 };
    }

    let query = supabase
        .from('products')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

    // Apply filters
    if (filters.category) {
        query = query.eq('category', filters.category);
    }

    if (filters.isActive === undefined) {
        // By default, only show active products
        query = query.eq('is_active', true);
    } else {
        query = query.eq('is_active', filters.isActive);
    }

    if (filters.minPrice !== undefined) {
        query = query.gte('price', filters.minPrice);
    }

    if (filters.maxPrice !== undefined) {
        query = query.lte('price', filters.maxPrice);
    }

    if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    const { data, count, error } = await query;

    if (error) {
        console.error('Error fetching products:', error);
        return { products: [], total: 0 };
    }

    const products = (data || []).map((row) => ({
        id: row.id,
        name: row.name,
        description: row.description,
        imageUrl: row.image_url,
        category: row.category,
        price: row.price ? Number.parseFloat(row.price) : null,
        isActive: row.is_active ?? true,
        createdAt: row.created_at,
    }));

    return { products, total: count || 0 };
}

// ============================================
// GET SINGLE PRODUCT
// ============================================

export async function getProduct(id: string): Promise<Product | null> {
    const supabase = createServerClient();

    if (!supabase) {
        return null;
    }

    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !data) {
        console.error('Error fetching product:', error);
        return null;
    }

    return {
        id: data.id,
        name: data.name,
        description: data.description,
        imageUrl: data.image_url,
        category: data.category,
        price: data.price ? Number.parseFloat(data.price) : null,
        isActive: data.is_active ?? true,
        createdAt: data.created_at,
    };
}

// ============================================
// GET PRODUCT CATEGORIES
// ============================================

export async function getCategories(): Promise<string[]> {
    const supabase = createServerClient();

    if (!supabase) {
        return [];
    }

    const { data, error } = await supabase
        .from('products')
        .select('category')
        .eq('is_active', true)
        .not('category', 'is', null);

    if (error) {
        console.error('Error fetching categories:', error);
        return [];
    }

    // Get unique categories
    const categories = [...new Set((data || []).map((row) => row.category).filter(Boolean))] as string[];

    return categories.sort((a, b) => a.localeCompare(b));
}

// ============================================
// SEARCH PRODUCTS
// ============================================

export async function searchProducts(
    query: string,
    limit: number = 20
): Promise<Product[]> {
    const supabase = createServerClient();

    if (!supabase || !query.trim()) {
        return [];
    }

    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)
        .limit(limit);

    if (error) {
        console.error('Error searching products:', error);
        return [];
    }

    return (data || []).map((row) => ({
        id: row.id,
        name: row.name,
        description: row.description,
        imageUrl: row.image_url,
        category: row.category,
        price: row.price ? Number.parseFloat(row.price) : null,
        isActive: row.is_active ?? true,
        createdAt: row.created_at,
    }));
}

// ============================================
// GET FEATURED PRODUCTS
// ============================================

export async function getFeaturedProducts(limit: number = 8): Promise<Product[]> {
    const supabase = createServerClient();

    if (!supabase) {
        return [];
    }

    // For now, just return the most recent active products
    // In a real app, you might have a 'featured' flag
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) {
        console.error('Error fetching featured products:', error);
        return [];
    }

    return (data || []).map((row) => ({
        id: row.id,
        name: row.name,
        description: row.description,
        imageUrl: row.image_url,
        category: row.category,
        price: row.price ? Number.parseFloat(row.price) : null,
        isActive: row.is_active ?? true,
        createdAt: row.created_at,
    }));
}

// ============================================
// GET PRODUCTS BY CATEGORY
// ============================================

export async function getProductsByCategory(
    category: string,
    limit: number = 20
): Promise<Product[]> {
    const { products } = await getProducts({ category }, limit);
    return products;
}
