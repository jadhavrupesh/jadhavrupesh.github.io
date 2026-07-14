import * as React from 'react';
import { cn } from '@/lib/utils';

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
    return (
        <span
            className={cn(
                'inline-flex items-center gap-1.5 border border-[var(--border-strong)] bg-[var(--bg-surface)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--fg-secondary)] font-[var(--font-mono)]',
                className,
            )}
            style={{ borderRadius: 'var(--radius-sm)' }}
            {...props}
        />
    );
}
