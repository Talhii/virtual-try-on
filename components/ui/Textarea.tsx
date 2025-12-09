'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, error, id, ...props }, ref) => {
        const textareaId = id || props.name;

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={textareaId}
                        className="block text-sm font-medium text-white/60 mb-2"
                    >
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    id={textareaId}
                    className={cn(
                        'w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30',
                        'focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20',
                        'transition-all duration-200 resize-none',
                        error && 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20',
                        className
                    )}
                    {...props}
                />
                {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
            </div>
        );
    }
);

Textarea.displayName = 'Textarea';

export { Textarea };
