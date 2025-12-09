'use client';

import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'glass' | 'solid';
    hover?: boolean;
}

export function Card({
    className,
    variant = 'default',
    hover = true,
    ...props
}: CardProps) {
    const variants = {
        default:
            'bg-canvas-subtle/50 border border-white/5 backdrop-blur-sm',
        glass:
            'bg-white/5 border border-white/10 backdrop-blur-xl',
        solid:
            'bg-canvas-light border border-white/5',
    };

    return (
        <div
            className={cn(
                'rounded-2xl p-6 transition-all duration-300',
                variants[variant],
                hover && 'hover:border-white/10',
                className
            )}
            {...props}
        />
    );
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> { }

export function CardHeader({ className, ...props }: CardHeaderProps) {
    return <div className={cn('mb-4', className)} {...props} />;
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> { }

export function CardTitle({ className, ...props }: CardTitleProps) {
    return (
        <h3 className={cn('text-xl font-bold', className)} {...props} />
    );
}

interface CardDescriptionProps
    extends React.HTMLAttributes<HTMLParagraphElement> { }

export function CardDescription({ className, ...props }: CardDescriptionProps) {
    return (
        <p className={cn('text-white/60 text-sm', className)} {...props} />
    );
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> { }

export function CardContent({ className, ...props }: CardContentProps) {
    return <div className={cn('', className)} {...props} />;
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> { }

export function CardFooter({ className, ...props }: CardFooterProps) {
    return (
        <div
            className={cn('mt-4 pt-4 border-t border-white/5', className)}
            {...props}
        />
    );
}
