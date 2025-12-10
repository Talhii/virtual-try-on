'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'success' | 'warning' | 'error' | 'gradient';
    size?: 'sm' | 'md';
}

export function Badge({
    className,
    variant = 'default',
    size = 'md',
    children,
    ...props
}: Readonly<BadgeProps>) {
    const variants = {
        default: 'bg-white/10 text-white/70 border-white/10',
        success: 'bg-green-500/20 text-green-400 border-green-500/30',
        warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        error: 'bg-red-500/20 text-red-400 border-red-500/30',
        gradient:
            'bg-gradient-to-r from-violet-500/20 to-pink-500/20 text-violet-300 border-violet-500/30',
    };

    const sizes = {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1.5 text-sm',
    };

    return (
        <div
            className={cn(
                'inline-flex items-center gap-1.5 rounded-full border font-medium',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

// Tag component for section headers
interface TagProps {
    className?: string;
    children: React.ReactNode;
}

export function Tag({ className, children }: Readonly<TagProps>) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
                'inline-flex items-center gap-2 px-4 py-2 rounded-full',
                'bg-white/5 border border-white/10 text-sm text-white/70',
                className
            )}
        >
            {children}
        </motion.div>
    );
}
