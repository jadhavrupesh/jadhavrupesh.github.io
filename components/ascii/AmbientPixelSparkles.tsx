import { useMemo } from 'react';

interface SparkleData {
  id: number;
  top: number; // percentage
  left: number; // percentage
  char: string;
  color: string;
  size: number;
  duration: number;
  delay: number;
}

const SPARKLE_CHARS = ['✦', '*', '·', '✧', '+'];
const SPARKLE_COLORS = [
  '#0FD3D3', // electric cyan
  '#F0C642', // cyber yellow
  '#E1308D', // neon pink/magenta
  '#A855F7', // vivid purple
  '#FFFBEB', // star cream
];

export default function AmbientPixelSparkles({ count = 48 }: { count?: number }) {
  // Deterministically generate ambient sparkles so they don't re-randomize on re-renders
  const sparkles = useMemo<SparkleData[]>(() => {
    const list: SparkleData[] = [];
    // Pseudo-random generator for consistent, well-distributed layout
    let seed = 42;
    const rnd = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    for (let i = 0; i < count; i++) {
      list.push({
        id: i,
        top: Math.round(rnd() * 96 * 10) / 10 + 2, // 2% to 98%
        left: Math.round(rnd() * 96 * 10) / 10 + 2, // 2% to 98%
        char: SPARKLE_CHARS[Math.floor(rnd() * SPARKLE_CHARS.length)],
        color: SPARKLE_COLORS[Math.floor(rnd() * SPARKLE_COLORS.length)],
        size: Math.floor(rnd() * 8) + 11, // 11px to 18px
        duration: Math.round((2.6 + rnd() * 3.4) * 10) / 10, // 2.6s to 6.0s
        delay: Math.round((rnd() * 4.5) * 10) / 10, // 0s to 4.5s
      });
    }
    return list;
  }, [count]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {sparkles.map(sp => (
        <span
          key={sp.id}
          className="pixel-ambient-sparkle"
          style={{
            top: `${sp.top}%`,
            left: `${sp.left}%`,
            color: sp.color,
            fontSize: `${sp.size}px`,
            filter: `drop-shadow(0 0 5px ${sp.color}88)`,
            animationDuration: `${sp.duration}s`,
            animationDelay: `${sp.delay}s`,
          }}
        >
          {sp.char}
        </span>
      ))}
    </div>
  );
}
