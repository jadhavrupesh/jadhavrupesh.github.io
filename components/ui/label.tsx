import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cn } from '@/lib/utils';

const Label = React.forwardRef<
    React.ComponentRef<typeof LabelPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
    <LabelPrimitive.Root
        ref={ref}
        className={cn(
            'text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--fg-secondary)] font-[family-name:var(--font-mono)]',
            'peer-disabled:cursor-not-allowed peer-disabled:opacity-40',
            className,
        )}
        {...props}
    />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
