'use server';

import { createServerClient } from '@/services/supabase/server';
import { getCurrentUser } from './auth';
import type { FormState } from '@/types';
import { apiConfig } from '@/config/site';

// ============================================
// TYPES
// ============================================

export interface UploadResult {
    url: string;
    path: string;
    size: number;
}

export interface SignedUploadUrl {
    signedUrl: string;
    path: string;
    token: string;
}

type ImageBucket = 'model-images' | 'garment-images' | 'results';

// ============================================
// VALIDATE IMAGE
// ============================================

function validateImage(
    file: File
): { valid: boolean; error?: string } {
    // Check size
    if (file.size > apiConfig.uploadMaxSize) {
        const maxMB = Math.round(apiConfig.uploadMaxSize / 1024 / 1024);
        return {
            valid: false,
            error: `File size exceeds ${maxMB}MB limit.`,
        };
    }

    // Check type
    if (!apiConfig.supportedFormats.includes(file.type)) {
        return {
            valid: false,
            error: 'Unsupported file format. Please use JPEG, PNG, or WebP.',
        };
    }

    return { valid: true };
}

// ============================================
// GENERATE UNIQUE FILENAME
// ============================================

function generateFilename(originalName: string, userId?: string): string {
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 10);
    const extension = originalName.split('.').pop()?.toLowerCase() || 'jpg';
    const prefix = userId ? userId.substring(0, 8) : 'anon';

    return `${prefix}/${timestamp}-${randomId}.${extension}`;
}

// ============================================
// UPLOAD IMAGE TO SUPABASE STORAGE
// ============================================

export async function uploadImage(
    formData: FormData,
    bucket: ImageBucket = 'model-images'
): Promise<FormState & { result?: UploadResult }> {
    const file = formData.get('file') as File | null;

    if (!file) {
        return {
            message: 'No file provided.',
            success: false,
        };
    }

    // Validate file
    const validation = validateImage(file);
    if (!validation.valid) {
        return {
            message: validation.error || 'Invalid file.',
            success: false,
        };
    }

    const supabase = createServerClient();

    if (!supabase) {
        return {
            message: 'Storage service unavailable.',
            success: false,
        };
    }

    const user = await getCurrentUser();
    const filename = generateFilename(file.name, user?.id);

    try {
        // Convert File to ArrayBuffer for upload
        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);

        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(filename, buffer, {
                contentType: file.type,
                cacheControl: '3600',
                upsert: false,
            });

        if (error) {
            console.error('Storage upload error:', error);
            return {
                message: 'Failed to upload file. Please try again.',
                success: false,
            };
        }

        // Get public URL
        const { data: urlData } = supabase.storage
            .from(bucket)
            .getPublicUrl(data.path);

        return {
            message: 'File uploaded successfully.',
            success: true,
            result: {
                url: urlData.publicUrl,
                path: data.path,
                size: file.size,
            },
        };
    } catch (error) {
        console.error('Upload error:', error);
        return {
            message: 'An error occurred during upload.',
            success: false,
        };
    }
}

// ============================================
// UPLOAD MODEL IMAGE
// ============================================

export async function uploadModelImage(
    formData: FormData
): Promise<FormState & { result?: UploadResult }> {
    return uploadImage(formData, 'model-images');
}

// ============================================
// UPLOAD GARMENT IMAGE
// ============================================

export async function uploadGarmentImage(
    formData: FormData
): Promise<FormState & { result?: UploadResult }> {
    return uploadImage(formData, 'garment-images');
}

// ============================================
// DELETE IMAGE
// ============================================

export async function deleteImage(
    path: string,
    bucket: ImageBucket = 'model-images'
): Promise<FormState> {
    const supabase = createServerClient();
    const user = await getCurrentUser();

    if (!supabase) {
        return {
            message: 'Storage service unavailable.',
            success: false,
        };
    }

    // Security: Ensure user can only delete their own files
    if (user && !path.startsWith(user.id.substring(0, 8))) {
        return {
            message: 'Unauthorized to delete this file.',
            success: false,
        };
    }

    const { error } = await supabase.storage
        .from(bucket)
        .remove([path]);

    if (error) {
        console.error('Delete error:', error);
        return {
            message: 'Failed to delete file.',
            success: false,
        };
    }

    return {
        message: 'File deleted successfully.',
        success: true,
    };
}

// ============================================
// GET SIGNED UPLOAD URL (for large uploads)
// ============================================

export async function getSignedUploadUrl(
    filename: string,
    bucket: ImageBucket = 'model-images'
): Promise<{ signedUrl?: string; path?: string; error?: string }> {
    const supabase = createServerClient();
    const user = await getCurrentUser();

    if (!supabase) {
        return { error: 'Storage service unavailable.' };
    }

    const path = generateFilename(filename, user?.id);

    const { data, error } = await supabase.storage
        .from(bucket)
        .createSignedUploadUrl(path);

    if (error) {
        console.error('Signed URL error:', error);
        return { error: 'Failed to generate upload URL.' };
    }

    return {
        signedUrl: data.signedUrl,
        path: data.path,
    };
}

// ============================================
// LIST USER UPLOADS
// ============================================

export async function listUserUploads(
    bucket: ImageBucket = 'model-images',
    limit: number = 20
): Promise<{ files: Array<{ name: string; url: string; createdAt: string }>; error?: string }> {
    const supabase = createServerClient();
    const user = await getCurrentUser();

    if (!supabase || !user) {
        return { files: [], error: 'Not authenticated.' };
    }

    const userPrefix = user.id.substring(0, 8);

    const { data, error } = await supabase.storage
        .from(bucket)
        .list(userPrefix, {
            limit,
            sortBy: { column: 'created_at', order: 'desc' },
        });

    if (error) {
        console.error('List files error:', error);
        return { files: [], error: 'Failed to list files.' };
    }

    const files = (data || []).map((file) => {
        const { data: urlData } = supabase.storage
            .from(bucket)
            .getPublicUrl(`${userPrefix}/${file.name}`);

        return {
            name: file.name,
            url: urlData.publicUrl,
            createdAt: file.created_at || new Date().toISOString(),
        };
    });

    return { files };
}
