import { createServerClient } from '@/services/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
    params: Promise<{ path: string[] }>;
}

// DELETE /api/upload/[...path] - Delete an uploaded file
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const { path } = await params;
        const fullPath = path.join('/');

        const { searchParams } = new URL(request.url);
        const bucket = searchParams.get('bucket') || 'model-images';

        const supabase = createServerClient();

        if (!supabase) {
            return NextResponse.json(
                { error: 'Storage service unavailable' },
                { status: 503 }
            );
        }

        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 }
            );
        }

        // Security: Ensure user can only delete their own files
        if (!fullPath.startsWith(user.id.substring(0, 8))) {
            return NextResponse.json(
                { error: 'Unauthorized to delete this file' },
                { status: 403 }
            );
        }

        const { error } = await supabase.storage
            .from(bucket)
            .remove([fullPath]);

        if (error) {
            console.error('Delete error:', error);
            return NextResponse.json(
                { error: 'Failed to delete file' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'File deleted successfully',
        });
    } catch (error) {
        console.error('Delete upload error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
