/**
 * Upload API Service
 */

import { uploadFile, del } from './client';

// ============================================
// TYPES
// ============================================

export type ImageBucket = 'model-images' | 'garment-images' | 'results';

export interface UploadResponse {
    success: boolean;
    url: string;
    path: string;
    size: number;
}

export interface DeleteResponse {
    success: boolean;
    message: string;
}

// ============================================
// API METHODS
// ============================================

export const uploadApi = {
    /**
     * Upload an image file
     */
    uploadImage: async (file: File, bucket: ImageBucket = 'model-images'): Promise<UploadResponse> => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('bucket', bucket);
        return uploadFile('/upload', formData);
    },

    /**
     * Upload a model image
     */
    uploadModelImage: (file: File): Promise<UploadResponse> =>
        uploadApi.uploadImage(file, 'model-images'),

    /**
     * Upload a garment image
     */
    uploadGarmentImage: (file: File): Promise<UploadResponse> =>
        uploadApi.uploadImage(file, 'garment-images'),

    /**
     * Delete an uploaded image
     */
    deleteImage: (path: string, bucket: ImageBucket = 'model-images'): Promise<DeleteResponse> =>
        del(`/upload/${path}?bucket=${bucket}`),
};
