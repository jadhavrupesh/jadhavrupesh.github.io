import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
    React.ComponentRef<typeof AccordionPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
    <AccordionPrimitive.Item
        ref={ref}
        className={cn(
            'border border-[var(--border-default)] bg-[var(--bg-surface)]',
            '[&:not(:first-child)]:-mt-px',
            className,
        )}
        style={{ borderRadius: 'var(--radius-sm)' }}
        {...props}
    />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
    React.ComponentRef<typeof AccordionPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
            ref={ref}
            className={cn(
                'flex flex-1 items-center justify-between px-4 py-3',
                'text-xs font-semibold uppercase tracking-[0.1em] text-[var(--fg-primary)] font-[family-name:var(--font-mono)]',
                'transition-all duration-[var(--duration-fast)]',
                'hover:bg-[var(--bg-muted)]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-focus)]',
                '[&[data-state=open]]:bg-[var(--bg-muted)]',
                '[&[data-state=open]>svg]:rotate-180',
                className,
            )}
            {...props}
        >
            {children}
            <ChevronDown className="h-3.5 w-3.5 shrink-0 text-[var(--fg-muted)] transition-transform duration-200" />
        </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
    React.ComponentRef<typeof AccordionPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
        ref={ref}
        className={cn(
            'overflow-hidden border-t border-[var(--border-default)]',
            'text-xs text-[var(--fg-secondary)] font-[family-name:var(--font-mono)]',
            'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
            className,
        )}
        {...props}
    >
        <div className="px-4 py-3">{children}</div>
    </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
