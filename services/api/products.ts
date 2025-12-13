/**
 * Products API Service
 */

import { get } from './client';

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
    createdAt: string;
}

export interface ProductFilters {
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    limit?: number;
    offset?: number;
}

export interface ProductsResponse {
    products: Product[];
    total: number;
    limit: number;
    offset: number;
}

export interface CategoriesResponse {
    categories: string[];
}

// ============================================
// HELPERS
// ============================================

function buildQueryString(filters?: ProductFilters): string {
    if (!filters) return '';

    const params = new URLSearchParams();

    if (filters.category) params.set('category', filters.category);
    if (filters.search) params.set('search', filters.search);
    if (filters.minPrice !== undefined) params.set('minPrice', filters.minPrice.toString());
    if (filters.maxPrice !== undefined) params.set('maxPrice', filters.maxPrice.toString());
    if (filters.limit !== undefined) params.set('limit', filters.limit.toString());
    if (filters.offset !== undefined) params.set('offset', filters.offset.toString());

    const query = params.toString();
    return query ? `?${query}` : '';
}

// ============================================
// API METHODS
// ============================================

export const productsApi = {
    /**
     * Get all products with optional filters
     */
    getAll: (filters?: ProductFilters): Promise<ProductsResponse> =>
        get(`/products${buildQueryString(filters)}`),

    /**
     * Get a single product by ID
     */
    getById: (id: string): Promise<Product> =>
        get(`/products/${id}`),

    /**
     * Get all product categories
     */
    getCategories: (): Promise<CategoriesResponse> =>
        get('/products/categories'),

    /**
     * Search products by query
     */
    search: (query: string, limit = 20): Promise<ProductsResponse> =>
        get(`/products?search=${encodeURIComponent(query)}&limit=${limit}`),
};
