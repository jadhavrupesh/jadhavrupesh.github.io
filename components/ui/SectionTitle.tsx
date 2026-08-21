import React from 'react';

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export function SectionTitle({ eyebrow, title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <div
          className="text-xs font-mono mb-2 tracking-wide"
          style={{ color: 'var(--accent-text)' }}
        >
          {eyebrow}
        </div>
      )}
      <h2
        className="text-2xl sm:text-3xl font-bold tracking-tight"
        style={{ color: 'var(--text)' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
