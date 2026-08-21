import React, { useRef } from 'react';

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: string; // e.g. "col-span-1", "col-span-2", "sm:col-span-2"
  onClick?: () => void;
}

export function BentoCard({
  children,
  className = '',
  colSpan = 'col-span-1',
  onClick,
}: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={`bento-card ${colSpan} ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
