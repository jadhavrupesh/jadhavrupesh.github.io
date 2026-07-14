import React from 'react';
import { cn } from '@/lib/utils';
import { AsciiTextLoader } from '@/components/retro/AsciiTextLoader';

interface SectionHeadingProps {
    number?: string;
    title: string;
    subtitle?: string;
    className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ number, title, subtitle, className }) => (
    <div className={cn('mb-6', className)}>
        <div className="flex items-center gap-3">
            {number && (
                <span className="text-[10px] font-semibold text-[var(--fg-muted)] tracking-[0.15em] uppercase">
                    [{number}]
                </span>
            )}
            <h2 className="font-pixel text-sm tracking-[0.05em] uppercase text-[var(--fg-primary)]">
                <AsciiTextLoader text={title} delay={50} speed={25} />
            </h2>
        </div>
        {subtitle && (
            <p className="mt-1 text-xs text-[var(--fg-muted)] ml-0">
                <AsciiTextLoader text={subtitle} delay={100} speed={15} />
            </p>
        )}
        <div className="mt-3 h-px bg-[var(--border-default)]" />
    </div>
);

interface StatBarProps {
    label: string;
    level?: 'PRIMARY' | 'ADVANCED' | 'WORKING KNOWLEDGE' | 'TOOLS';
    className?: string;
}

export const StatBar: React.FC<StatBarProps> = ({ label, level = 'WORKING KNOWLEDGE', className }) => {
    const levelWidths = {
        'PRIMARY': 'w-full',
        'ADVANCED': 'w-3/4',
        'WORKING KNOWLEDGE': 'w-1/2',
        'TOOLS': 'w-1/3',
    };

    return (
        <div className={cn('flex items-center gap-3', className)}>
            <span className="w-32 shrink-0 text-xs text-[var(--fg-secondary)] truncate">{label}</span>
            <div className="flex-1 h-2 bg-[var(--bg-muted)] border border-[var(--border-default)]" style={{ borderRadius: 'var(--radius-sm)' }}>
                <div
                    className={cn('h-full bg-[var(--fg-primary)]', levelWidths[level])}
                    style={{ borderRadius: 'var(--radius-sm)' }}
                />
            </div>
            <span className="w-28 shrink-0 text-[9px] text-[var(--fg-muted)] uppercase tracking-[0.1em] text-right">
                {level}
            </span>
        </div>
    );
};

interface StatusIndicatorProps {
    active?: boolean;
    label: string;
    className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ active = true, label, className }) => (
    <span className={cn('inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.1em]', className)}>
        <span
            className={cn(
                'h-1.5 w-1.5 rounded-full',
                active ? 'bg-[var(--fg-primary)] cursor-blink' : 'bg-[var(--fg-disabled)]'
            )}
        />
        <span className={active ? 'text-[var(--fg-primary)]' : 'text-[var(--fg-muted)]'}>
            {label}
        </span>
    </span>
);

interface TerminalPanelProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export const TerminalPanel: React.FC<TerminalPanelProps> = ({ title, children, className }) => (
    <div
        className={cn('border border-[var(--border-default)] bg-[var(--bg-surface)]', className)}
        style={{ borderRadius: 'var(--radius-md)' }}
    >
        {title && (
            <div className="flex items-center gap-2 border-b border-[var(--border-default)] px-3 py-1.5">
                <span className="text-[9px] text-[var(--fg-muted)] uppercase tracking-[0.15em]">
                    ┌─ {title} ─┐
                </span>
            </div>
        )}
        <div className="p-4 text-xs text-[var(--fg-secondary)] leading-relaxed">
            {children}
        </div>
    </div>
);

interface PixelFrameProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
}

export const PixelFrame: React.FC<PixelFrameProps> = ({ children, className, title }) => (
    <div
        className={cn(
            'border-2 border-[var(--border-strong)] bg-[var(--bg-surface)] relative',
            className
        )}
        style={{ borderRadius: 'var(--radius-lg)' }}
    >
        {title && (
            <div className="absolute -top-2.5 left-3 px-2 bg-[var(--bg-surface)]">
                <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--fg-muted)]">
                    {title}
                </span>
            </div>
        )}
        {children}
    </div>
);
