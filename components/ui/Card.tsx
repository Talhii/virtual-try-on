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
}: Readonly<CardProps>) {
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

type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export function CardHeader({ className, ...props }: Readonly<CardHeaderProps>) {
    return <div className={cn('mb-4', className)} {...props} />;
}

type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

export function CardTitle({ className, children, ...props }: Readonly<CardTitleProps>) {
    return (
        <h3 className={cn('text-xl font-bold', className)} {...props}>{children}</h3>
    );
}

type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

export function CardDescription({ className, ...props }: Readonly<CardDescriptionProps>) {
    return (
        <p className={cn('text-white/60 text-sm', className)} {...props} />
    );
}

type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

export function CardContent({ className, ...props }: Readonly<CardContentProps>) {
    return <div className={cn('', className)} {...props} />;
}

type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

export function CardFooter({ className, ...props }: Readonly<CardFooterProps>) {
    return (
        <div
            className={cn('mt-4 pt-4 border-t border-white/5', className)}
            {...props}
        />
    );
}

