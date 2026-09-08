import React from 'react';

interface ThemeTransitionOverlayProps {
  toTheme: 'ascii' | 'pixel';
  origin: { x: number; y: number };
}

export default function ThemeTransitionOverlay({ toTheme, origin }: ThemeTransitionOverlayProps) {
  const isPixel = toTheme === 'pixel';

  return (
    <div
      className="theme-transition-overlay pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none"
      style={{
        '--origin-x': `${origin.x}px`,
        '--origin-y': `${origin.y}px`,
      } as React.CSSProperties}
      aria-hidden="true"
    >
      {/* 1. Fullscreen expanding iris ripple from die coordinates */}
      <div
        className="theme-transition-iris absolute inset-0"
        style={{
          background: isPixel
            ? 'radial-gradient(circle at var(--origin-x) var(--origin-y), #260558 0%, #1d0245 45%, #09051c 80%, #000000 100%)'
            : 'radial-gradient(circle at var(--origin-x) var(--origin-y), #1e1e1e 0%, #0c0d0c 45%, #000000 80%, #000000 100%)',
        }}
      />

      {/* 2. Luminous CRT laser beam sweep */}
      <div
        className="theme-transition-laser absolute left-0 right-0 h-[3px]"
        style={{
          background: isPixel
            ? 'linear-gradient(90deg, transparent 0%, #0fd3d3 25%, #e1308d 50%, #0fd3d3 75%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, #ffffff 30%, #a3e635 50%, #ffffff 70%, transparent 100%)',
          boxShadow: isPixel
            ? '0 0 24px 4px rgba(15, 211, 211, 0.9), 0 0 45px rgba(225, 48, 141, 0.7)'
            : '0 0 24px 4px rgba(255, 255, 255, 0.95), 0 0 35px rgba(163, 230, 53, 0.6)',
        }}
      />

      {/* 3. CRT phosphor flash bloom */}
      <div className="theme-transition-flash absolute inset-0 bg-white" />

      {/* 4. Fine retro scanline grid texture during transition */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.75) 50%)',
          backgroundSize: '100% 4px',
        }}
      />
    </div>
  );
}
