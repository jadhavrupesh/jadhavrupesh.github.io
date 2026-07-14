import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
    React.ComponentRef<typeof DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
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
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
    React.ComponentRef<typeof DialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
            ref={ref}
            className={cn(
                'fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2',
                'border border-[var(--border-strong)] bg-[var(--bg-surface)] p-6',
                'shadow-[var(--shadow-elevated)]',
                'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
                'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
                'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
                'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
                className,
            )}
            style={{ borderRadius: 'var(--radius-lg)' }}
            {...props}
        >
            {children}
            <DialogPrimitive.Close
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
            </DialogPrimitive.Close>
        </DialogPrimitive.Content>
    </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
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

function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <DialogPrimitive.Title
            className={cn(
                'text-sm font-bold uppercase tracking-[0.1em] text-[var(--fg-primary)] font-[family-name:var(--font-pixel)]',
                className,
            )}
            {...props}
        />
    );
}

function DialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <DialogPrimitive.Description
            className={cn(
                'text-xs text-[var(--fg-secondary)] font-[family-name:var(--font-mono)]',
                className,
            )}
            {...props}
        />
    );
}

export {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogTrigger,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
};
