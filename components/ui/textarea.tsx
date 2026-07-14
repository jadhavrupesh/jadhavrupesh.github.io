import * as React from 'react';
import { cn } from '@/lib/utils';

const Textarea = React.forwardRef<
    HTMLTextAreaElement,
    React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
    <textarea
        ref={ref}
        className={cn(
            'flex min-h-[80px] w-full border border-[var(--border-default)] bg-[var(--bg-primary)] px-3 py-2',
            'text-xs text-[var(--fg-primary)] font-[family-name:var(--font-mono)] leading-relaxed',
            'placeholder:text-[var(--fg-muted)]',
            'transition-colors duration-[var(--duration-fast)]',
            'hover:border-[var(--border-strong)]',
            'focus:border-[var(--border-focus)] focus:outline-none focus:ring-1 focus:ring-[var(--ring-focus)]',
            'disabled:cursor-not-allowed disabled:opacity-40',
            'resize-y',
            className,
        )}
        style={{ borderRadius: 'var(--radius-md)' }}
        {...props}
    />
));
Textarea.displayName = 'Textarea';

export { Textarea };
