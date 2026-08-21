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
        <div className="badge-tag font-mono text-[11px] mb-3 uppercase tracking-wider">
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight gradient-text-subtle">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2.5 text-base leading-relaxed max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
