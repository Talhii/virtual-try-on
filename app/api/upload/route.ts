import { createServerClient } from '@/services/supabase/server';
import { apiConfig } from '@/config/site';
import { NextRequest, NextResponse } from 'next/server';

function validateImage(file: File): { valid: boolean; error?: string } {
    if (file.size > apiConfig.uploadMaxSize) {
        const maxMB = Math.round(apiConfig.uploadMaxSize / 1024 / 1024);
        return { valid: false, error: `File size exceeds ${maxMB}MB limit.` };
    }

    if (!apiConfig.supportedFormats.includes(file.type)) {
        return { valid: false, error: 'Unsupported file format. Please use JPEG, PNG, or WebP.' };
    }

    return { valid: true };
}

function generateFilename(originalName: string, userId?: string): string {
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 10);
    const extension = originalName.split('.').pop()?.toLowerCase() || 'jpg';
    const prefix = userId ? userId.substring(0, 8) : 'anon';
    return `${prefix}/${timestamp}-${randomId}.${extension}`;
}

// POST /api/upload - Upload an image
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File | null;
        const bucket = (formData.get('bucket') as string) || 'model-images';

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        // Validate file
        const validation = validateImage(file);
        if (!validation.valid) {
            return NextResponse.json(
                { error: validation.error },
                { status: 400 }
            );
        }

        const supabase = createServerClient();

        if (!supabase) {
            return NextResponse.json(
                { error: 'Storage service unavailable' },
                { status: 503 }
            );
        }

        // Get user if authenticated
        const { data: { user } } = await supabase.auth.getUser();
        const filename = generateFilename(file.name, user?.id);

        // Convert file to buffer
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
            return NextResponse.json(
                { error: 'Failed to upload file' },
                { status: 500 }
            );
        }

        // Get public URL
        const { data: urlData } = supabase.storage
            .from(bucket)
            .getPublicUrl(data.path);

        return NextResponse.json({
            success: true,
            url: urlData.publicUrl,
            path: data.path,
            size: file.size,
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
