import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
    React.ComponentRef<typeof TabsPrimitive.List>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.List
        ref={ref}
        className={cn(
            'inline-flex items-center gap-0 border-b border-[var(--border-default)] bg-[var(--bg-surface)]',
            className,
        )}
        style={{ borderRadius: 'var(--radius-sm)' }}
        {...props}
    />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
    React.ComponentRef<typeof TabsPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
            'inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] font-[family-name:var(--font-mono)]',
            'border border-b-0 border-[var(--border-default)]',
            'text-[var(--fg-muted)] bg-[var(--bg-primary)]',
            'transition-all duration-[var(--duration-fast)]',
            'hover:text-[var(--fg-primary)] hover:bg-[var(--bg-muted)]',
            'data-[state=active]:bg-[var(--fg-primary)] data-[state=active]:text-[var(--fg-inverse)]',
            'data-[state=active]:border-[var(--fg-primary)]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-focus)]',
            'disabled:pointer-events-none disabled:opacity-40',
            className,
        )}
        style={{ borderRadius: 'var(--radius-sm)' }}
        {...props}
    />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
    React.ComponentRef<typeof TabsPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Content
        ref={ref}
        className={cn(
            'mt-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-focus)]',
            className,
        )}
        {...props}
    />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
