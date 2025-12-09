import { z } from 'zod';

// Lead/Contact form schema
export const leadSchema = z.object({
    fullName: z
        .string()
        .min(1, 'Full name is required')
        .max(100, 'Name is too long'),
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email address'),
    message: z
        .string()
        .min(1, 'Message is required')
        .max(1000, 'Message is too long'),
});

export type LeadFormData = z.infer<typeof leadSchema>;

// Try-on request schema
export const tryOnSchema = z.object({
    modelImageUrl: z.string().url('Invalid model image URL'),
    garmentImageUrl: z.string().url('Invalid garment image URL'),
    settings: z.object({
        preserveIdentity: z.boolean().default(true),
        highResolution: z.boolean().default(false),
        creativity: z.number().min(0).max(100).default(50),
    }),
});

export type TryOnFormData = z.infer<typeof tryOnSchema>;

// User signup schema
export const signupSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email address'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[a-z]/, 'Password must contain a lowercase letter')
        .regex(/[A-Z]/, 'Password must contain an uppercase letter')
        .regex(/[0-9]/, 'Password must contain a number'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

export type SignupFormData = z.infer<typeof signupSchema>;

// Login schema
export const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email address'),
    password: z
        .string()
        .min(1, 'Password is required'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
