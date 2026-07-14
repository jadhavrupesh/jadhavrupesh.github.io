import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.1em] transition-all duration-[var(--duration-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-focus)] disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0 font-[family-name:var(--font-mono)]',
    {
        variants: {
            variant: {
                default: 'border border-[var(--fg-primary)] bg-[var(--fg-primary)] text-[var(--fg-inverse)] hover:bg-transparent hover:text-[var(--fg-primary)]',
                outline: 'border border-[var(--border-strong)] bg-transparent text-[var(--fg-primary)] hover:bg-[var(--fg-primary)] hover:text-[var(--fg-inverse)]',
                ghost: 'border border-transparent text-[var(--fg-secondary)] hover:border-[var(--border-default)] hover:text-[var(--fg-primary)]',
                retro: 'border-2 border-[var(--fg-primary)] bg-transparent text-[var(--fg-primary)] hover:bg-[var(--fg-primary)] hover:text-[var(--fg-inverse)] shadow-[2px_2px_0px_var(--fg-primary)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]',
            },
            size: {
                default: 'h-10 px-5 py-2',
                sm: 'h-8 px-3 text-[10px]',
                lg: 'h-12 px-8',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    };

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} style={{ borderRadius: 'var(--radius-md)' }} {...props} />;
}

export { buttonVariants };
