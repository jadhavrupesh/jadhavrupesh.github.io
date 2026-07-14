import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<
    React.ComponentRef<typeof SheetPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <SheetPrimitive.Overlay
        ref={ref}
        className={cn(
            'fixed inset-0 z-50 bg-black/80',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
            className,
        )}
        {...props}
    />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
    'fixed z-50 border-[var(--border-strong)] bg-[var(--bg-surface)] shadow-[var(--shadow-elevated)] transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-300',
    {
        variants: {
            side: {
                top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
                bottom: 'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
                left: 'inset-y-0 left-0 h-full w-3/4 max-w-sm border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
                right: 'inset-y-0 right-0 h-full w-3/4 max-w-sm border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
            },
        },
        defaultVariants: {
            side: 'right',
        },
    },
);

interface SheetContentProps
    extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
        VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
    React.ComponentRef<typeof SheetPrimitive.Content>,
    SheetContentProps
>(({ side = 'right', className, children, ...props }, ref) => (
    <SheetPortal>
        <SheetOverlay />
        <SheetPrimitive.Content
            ref={ref}
            className={cn(sheetVariants({ side }), 'p-6', className)}
            {...props}
        >
            <SheetPrimitive.Close
                className={cn(
                    'absolute right-4 top-4 p-1',
                    'border border-transparent text-[var(--fg-muted)]',
                    'transition-colors duration-[var(--duration-fast)]',
                    'hover:text-[var(--fg-primary)] hover:border-[var(--border-default)]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-focus)]',
                    'disabled:pointer-events-none',
                )}
                style={{ borderRadius: 'var(--radius-sm)' }}
            >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
            </SheetPrimitive.Close>
            {children}
        </SheetPrimitive.Content>
    </SheetPortal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

function SheetHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                'flex flex-col gap-2 border-b border-[var(--border-default)] pb-4 mb-4',
                className,
            )}
            {...props}
        />
    );
}

function SheetTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <SheetPrimitive.Title
            className={cn(
                'text-sm font-bold uppercase tracking-[0.1em] text-[var(--fg-primary)] font-[family-name:var(--font-pixel)]',
                className,
            )}
            {...props}
        />
    );
}

function SheetDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <SheetPrimitive.Description
            className={cn(
                'text-xs text-[var(--fg-secondary)] font-[family-name:var(--font-mono)]',
                className,
            )}
            {...props}
        />
    );
}

export {
    Sheet,
    SheetPortal,
    SheetOverlay,
    SheetTrigger,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
};
