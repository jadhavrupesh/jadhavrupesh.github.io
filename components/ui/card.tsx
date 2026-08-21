import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <div
      className={`glass-card p-6 ${hover ? 'hover:scale-[1.01]' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
