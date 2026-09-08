import type { ReactElement } from 'react';

/**
 * An original pixel-art squid agent (not Jules's trademarked mascot).
 * Drawn on a 16x16 grid so it stays crisp at any size. Tentacles are split
 * into their own group so they can wiggle via CSS while the body bobs.
 */

type Props = { className?: string; state?: 'idle' | 'writing' | 'thinking' };

// Pixel rows for the head/body (1 = purple body, 2 = light highlight, 3 = eye).
const BODY: string[] = [
  '................',
  '.....222222.....',
  '...2211111122...',
  '..211111111112..',
  '..111111111111..',
  '.11113111311111.',
  '.11113111311111.',
  '.11111111111111.',
  '.11111111111111.',
  '.11111111111111.',
  '..111111111111..',
  '..111111111111..',
];

// Tentacle rows sit below the body and animate.
const TENTACLES: string[] = [
  '.11.11.11.11.11.',
  '.11.11.11.11.11.',
  '1..1.11.11.1..1.',
];

const COLORS: Record<string, string> = { '1': '#784fcf', '2': '#a184e6', '3': '#0d0524' };

function grid(rows: string[], yOffset: number) {
  const cells: ReactElement[] = [];
  rows.forEach((row, y) => {
    [...row].forEach((c, x) => {
      if (c === '.') return;
      cells.push(<rect key={`${x}-${y}-${yOffset}`} x={x} y={y + yOffset} width={1} height={1} fill={COLORS[c]} />);
    });
  });
  return cells;
}

export default function PixelSquid({ className, state = 'idle' }: Props) {
  return (
    <svg
      className={`pixel-squid pixel-squid-${state} ${className ?? ''}`}
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <g className="pixel-squid-body">{grid(BODY, 0)}</g>
      <g className="pixel-squid-legs">{grid(TENTACLES, 12)}</g>
    </svg>
  );
}
