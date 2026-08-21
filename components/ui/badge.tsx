import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center text-xs px-2.5 py-1 rounded-md font-medium ${className}`}
      style={{
        background: 'var(--bg-elevated)',
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
      className={`inline-flex items-center text-xs px-2.5 py-1 rounded-md font-medium ${className}`}
      style={{
        background: 'var(--accent-dim)',
        color: 'var(--accent-text)',
        border: '1px solid var(--border-accent)',
      }}
    >
      {children}
    </span>
  );
}
