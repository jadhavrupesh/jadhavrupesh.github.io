import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center text-xs px-3 py-1 rounded-full font-medium transition-all duration-200 ${className}`}
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        color: 'var(--text-secondary)',
        border: '1px solid var(--border)',
      }}
    >
      {children}
    </span>
  );
}

export function AccentBadge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center text-xs px-3.5 py-1 rounded-full font-medium transition-all duration-200 ${className}`}
      style={{
        background: 'rgba(99, 102, 241, 0.12)',
        color: 'var(--accent-light)',
        border: '1px solid var(--border-accent)',
        boxShadow: '0 0 12px rgba(99, 102, 241, 0.15)',
      }}
    >
      {children}
    </span>
  );
}
