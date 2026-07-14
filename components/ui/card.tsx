import * as React from 'react';
import { cn } from '@/lib/utils';

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                'border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--fg-primary)] transition-colors duration-[var(--duration-fast)]',
                className,
            )}
            style={{ borderRadius: 'var(--radius-md)' }}
            {...props}
        />
    );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn('space-y-1.5 p-4 border-b border-[var(--border-default)]', className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h3
            className={cn('text-sm font-semibold uppercase tracking-[0.08em] text-[var(--fg-primary)]', className)}
            {...props}
        />
    );
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn('p-4', className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
    return <p className={cn('text-xs text-[var(--fg-secondary)]', className)} {...props} />;
}
