import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({ className, type, ...props }, ref) => (
        <input
            type={type}
            ref={ref}
            className={cn(
                'flex h-10 w-full border border-[var(--border-default)] bg-[var(--bg-primary)] px-3 py-2',
                'text-xs text-[var(--fg-primary)] font-[family-name:var(--font-mono)]',
                'placeholder:text-[var(--fg-muted)]',
                'transition-colors duration-[var(--duration-fast)]',
                'hover:border-[var(--border-strong)]',
                'focus:border-[var(--border-focus)] focus:outline-none focus:ring-1 focus:ring-[var(--ring-focus)]',
                'disabled:cursor-not-allowed disabled:opacity-40',
                'file:border-0 file:bg-transparent file:text-xs file:font-medium file:text-[var(--fg-primary)]',
                className,
            )}
            style={{ borderRadius: 'var(--radius-md)' }}
            {...props}
        />
    ),
);
Input.displayName = 'Input';

export { Input };
