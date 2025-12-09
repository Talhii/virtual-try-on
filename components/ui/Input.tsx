'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, leftIcon, rightIcon, id, ...props }, ref) => {
        const inputId = id || props.name;

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium text-white/60 mb-2"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    {leftIcon && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none">
                            {leftIcon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        id={inputId}
                        className={cn(
                            'w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30',
                            'focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20',
                            'transition-all duration-200',
                            leftIcon && 'pl-12',
                            rightIcon && 'pr-12',
                            error && 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20',
                            className
                        )}
                        {...props}
                    />
                    {rightIcon && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30">
                            {rightIcon}
                        </div>
                    )}
                </div>
                {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';

export { Input };
