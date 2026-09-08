import React, { useEffect, useRef, useState, useCallback } from 'react';

// 3x3 dot matrix patterns matching Jules
const PATTERNS: number[][][] = [
  [[0, 0, 0], [0, 1, 0], [0, 0, 0]], // 0: single center dot
  [[1, 0, 1], [0, 0, 0], [1, 0, 1]], // 1: 4 corner dots
  [[0, 1, 0], [1, 1, 1], [0, 1, 0]], // 2: cross plus
  [[0, 0, 0], [1, 1, 1], [0, 0, 0]], // 3: horizontal bar
  [[0, 1, 0], [0, 1, 0], [0, 1, 0]], // 4: vertical bar
  [[0, 0, 0], [0, 0, 0], [0, 0, 0]], // 5: blank / clear
  [[1, 0, 1], [0, 1, 0], [1, 0, 1]], // 6: X pattern
];

// Pixel fish sprite definitions (4 columns wide, 3 rows tall)
const FISH_WIDTH_PIXELS = 4;
const FISH_HEIGHT_PIXELS = 3;

// Facing right (dx === 1)
// Tail fins at left (c=0), tail stalk (c=1), body (c=2), snout pointing right (c=3)
const FISH_SPRITE_RIGHT = [
  { c: 0, r: 0 }, { c: 2, r: 0 },
  { c: 1, r: 1 }, { c: 2, r: 1 }, { c: 3, r: 1 },
  { c: 0, r: 2 }, { c: 2, r: 2 },
];

// Facing left (dx === -1)
const FISH_SPRITE_LEFT = FISH_SPRITE_RIGHT.map(p => ({
  c: FISH_WIDTH_PIXELS - 1 - p.c,
  r: p.r,
}));

const DEFAULT_FISH_COLORS = ['#52e7fb', '#642cc2'];

export interface Fish {
  id: string;
  x: number;
  y: number;
  dx: 1 | -1;
  color: string;
}

export interface PixelWaveCanvasProps {
  enableWaveTop?: boolean;
  waveAmplitude?: number;
  waveFrequency?: number;
  waveVerticalOffset?: number;
  wavePhaseShift?: number;
  animateVariants?: boolean;
  animationInterval?: number;
  cellsToAnimatePerTick?: number;
  enableFish?: boolean;
  numFish?: number;
  fishColors?: string[];
  fishMoveInterval?: number;
  targetDensity?: number;
  minPixelSize?: number;
  maxPixelSize?: number;
  baseColor?: string;
  dotColor?: string;
  variantChance?: number;
  basePatternIndex?: number;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function PixelWaveCanvas({
  enableWaveTop = false,
  waveAmplitude = 2.5,
  waveFrequency = 2,
  waveVerticalOffset = 4,
  wavePhaseShift = 0,
  animateVariants = true,
  animationInterval = 750,
  cellsToAnimatePerTick = 20,
  enableFish = false,
  numFish = 8,
  fishColors = DEFAULT_FISH_COLORS,
  fishMoveInterval = 220,
  targetDensity = 100,
  minPixelSize = 3,
  maxPixelSize = 8,
  baseColor = 'transparent',
  dotColor = '#36087b',
  variantChance = 0.15,
  basePatternIndex = 0,
  children,
  className = '',
  style = {},
}: PixelWaveCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Store layout dimensions; only trigger state change if values actually differ
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Refs for animation state: pure canvas animation with NO setState calls in the animation loop!
  const gridRef = useRef<{ cells: number[][]; rows: number; cols: number }>({
    cells: [],
    rows: 0,
    cols: 0,
  });
  const fishesRef = useRef<Fish[]>([]);
  const dimensionsRef = useRef(dimensions);
  const inViewRef = useRef(true);
  const lastVariantTick = useRef(0);
  const lastFishTick = useRef(0);
  const animFrameId = useRef<number | null>(null);

  // Compute adaptive pixel size synchronously from width
  const pixelSize = dimensions.width > 0
    ? Math.max(minPixelSize, Math.min(maxPixelSize, Math.round(dimensions.width / targetDensity)))
    : maxPixelSize;
  const pixelSizeRef = useRef(pixelSize);

  useEffect(() => {
    dimensionsRef.current = dimensions;
  }, [dimensions]);

  useEffect(() => {
    pixelSizeRef.current = pixelSize;
  }, [pixelSize]);

  // Resize Observer with change guard
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver(entries => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        const w = Math.round(width);
        const h = Math.round(height);
        setDimensions(prev => (prev.width === w && prev.height === h ? prev : { width: w, height: h }));
      }
    });

    ro.observe(el);
    const rect = el.getBoundingClientRect();
    const initW = Math.round(rect.width);
    const initH = Math.round(rect.height);
    setDimensions(prev => (prev.width === initW && prev.height === initH ? prev : { width: initW, height: initH }));

    return () => ro.disconnect();
  }, []);

  // Intersection Observer
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const io = new IntersectionObserver(entries => {
      inViewRef.current = entries[0]?.isIntersecting ?? true;
    }, { threshold: 0.05 });

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Initialize or re-dimension pattern grid in gridRef (no setState)
  useEffect(() => {
    const { width, height } = dimensions;
    if (width <= 0 || height <= 0 || pixelSize <= 0) return;

    const cellSize = pixelSize * 3;
    const cols = Math.ceil(width / cellSize);
    const rows = Math.ceil(height / cellSize);

    if (rows !== gridRef.current.rows || cols !== gridRef.current.cols) {
      const cells: number[][] = [];
      for (let r = 0; r < rows; r++) {
        const row: number[] = [];
        for (let c = 0; c < cols; c++) {
          const isVariant = Math.random() < variantChance;
          const pattern = isVariant
            ? Math.floor(Math.random() * PATTERNS.length)
            : basePatternIndex;
          row.push(pattern);
        }
        cells.push(row);
      }
      gridRef.current = { cells, rows, cols };
    }
  }, [dimensions, pixelSize, variantChance, basePatternIndex]);

  // Spawn and position fishes in fishesRef without resetting on every render
  useEffect(() => {
    if (!enableFish || numFish <= 0) {
      fishesRef.current = [];
      return;
    }

    const { width, height } = dimensions;
    if (width <= 0 || height <= 0 || pixelSize <= 0) return;

    const maxX = Math.max(0, Math.floor(width / pixelSize) - FISH_WIDTH_PIXELS);
    const maxY = Math.max(0, Math.floor(height / pixelSize) - FISH_HEIGHT_PIXELS);
    const cellSize = pixelSize * 3;

    let minFishY = 0;
    if (enableWaveTop) {
      const waveOffsetPx = (waveVerticalOffset + waveAmplitude) * cellSize;
      minFishY = Math.max(0, Math.floor(waveOffsetPx / pixelSize) + 2);
    }
    const availableY = Math.max(1, maxY - minFishY);
    const colors = fishColors && fishColors.length > 0 ? fishColors : DEFAULT_FISH_COLORS;

    // If fish already exist and match numFish, clamp existing coordinates to new bounds (never reset)
    if (fishesRef.current.length === numFish) {
      fishesRef.current.forEach(f => {
        f.x = Math.max(0, Math.min(f.x, maxX));
        f.y = Math.max(minFishY, Math.min(f.y, maxY));
      });
      return;
    }

    // Otherwise initialize fish once
    const newFishes: Fish[] = [];
    for (let i = 0; i < numFish; i++) {
      const color = colors[i % colors.length];
      newFishes.push({
        id: `fish-${i}`,
        x: Math.floor(Math.random() * maxX),
        y: minFishY + Math.floor(Math.random() * availableY),
        dx: Math.random() < 0.5 ? 1 : -1,
        color,
      });
    }
    fishesRef.current = newFishes;
  }, [enableFish, numFish, dimensions, pixelSize, enableWaveTop, waveAmplitude, waveVerticalOffset]);

  // Canvas drawing function
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = dimensionsRef.current;
    if (width <= 0 || height <= 0) return;

    const dpr = window.devicePixelRatio || 1;
    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, width, height);

    if (baseColor !== 'transparent') {
      ctx.fillStyle = baseColor;
      ctx.fillRect(0, 0, width, height);
    }

    const curPixelSize = pixelSizeRef.current;
    const curGrid = gridRef.current;
    const curFishes = fishesRef.current;
    const cellSize = curPixelSize * 3;

    if (cellSize <= 0 || !curGrid.cells || curGrid.rows === 0 || curGrid.cols === 0) return;

    const ampPx = enableWaveTop ? waveAmplitude * cellSize : 0;
    const offsetPx = enableWaveTop ? waveVerticalOffset * cellSize : 0;
    const freq = enableWaveTop ? waveFrequency : 0;
    const phaseRad = enableWaveTop ? (wavePhaseShift * Math.PI) / 180 : 0;

    // Draw background 3x3 dither matrix
    ctx.fillStyle = dotColor;
    for (let r = 0; r < curGrid.rows; r++) {
      const cellY = r * cellSize;
      for (let c = 0; c < curGrid.cols; c++) {
        const cellX = c * cellSize;

        if (enableWaveTop && curGrid.cols > 0) {
          const normX = curGrid.cols === 1 ? 0 : c / (curGrid.cols - 1);
          const waveSurfaceY = offsetPx + ampPx * Math.sin(normX * 2 * Math.PI * freq + phaseRad);
          if (cellY < waveSurfaceY) continue;
        }

        const patternIdx = curGrid.cells[r]?.[c];
        if (patternIdx === undefined) continue;
        const pattern = PATTERNS[patternIdx];
        if (!pattern) continue;

        for (let pr = 0; pr < 3; pr++) {
          for (let pc = 0; pc < 3; pc++) {
            if (pattern[pr]?.[pc] === 1) {
              ctx.fillRect(
                cellX + pc * curPixelSize,
                cellY + pr * curPixelSize,
                curPixelSize,
                curPixelSize
              );
            }
          }
        }
      }
    }

    // Draw swimming procedural fish
    if (enableFish && curFishes.length > 0 && curPixelSize > 0) {
      curFishes.forEach(fish => {
        ctx.fillStyle = fish.color;
        const sprite = fish.dx === 1 ? FISH_SPRITE_RIGHT : FISH_SPRITE_LEFT;
        sprite.forEach(p => {
          ctx.fillRect(
            (fish.x + p.c) * curPixelSize,
            (fish.y + p.r) * curPixelSize,
            curPixelSize,
            curPixelSize
          );
        });
      });
    }
  }, [
    baseColor,
    dotColor,
    enableWaveTop,
    waveAmplitude,
    waveFrequency,
    waveVerticalOffset,
    wavePhaseShift,
    enableFish,
  ]);

  // Main animation loop
  useEffect(() => {
    const loop = (timestamp: number) => {
      animFrameId.current = requestAnimationFrame(loop);

      if (!inViewRef.current) return;

      const { width, height } = dimensionsRef.current;
      const curPixelSize = pixelSizeRef.current;
      const curGrid = gridRef.current;
      const curFishes = fishesRef.current;

      // 1. Matrix sparkle / variant animation (mutates grid in-place, zero re-renders)
      if (animateVariants && curGrid.rows > 0 && curGrid.cols > 0) {
        if (lastVariantTick.current === 0) lastVariantTick.current = timestamp;
        if (timestamp - lastVariantTick.current >= animationInterval) {
          lastVariantTick.current = timestamp;

          for (let i = 0; i < cellsToAnimatePerTick; i++) {
            const rr = Math.floor(Math.random() * curGrid.rows);
            const cc = Math.floor(Math.random() * curGrid.cols);
            if (curGrid.cells[rr] && curGrid.cells[rr][cc] !== undefined) {
              curGrid.cells[rr][cc] = Math.floor(Math.random() * PATTERNS.length);
            }
          }
        }
      }

      // 2. Fish movement tick (updates positions in-place, zero re-renders)
      if (enableFish && curFishes.length > 0 && width > 0 && height > 0 && curPixelSize > 0) {
        if (lastFishTick.current === 0) lastFishTick.current = timestamp;
        if (timestamp - lastFishTick.current >= fishMoveInterval) {
          lastFishTick.current = timestamp;

          const maxX = Math.max(0, Math.floor(width / curPixelSize) - FISH_WIDTH_PIXELS);
          const maxY = Math.max(0, Math.floor(height / curPixelSize) - FISH_HEIGHT_PIXELS);
          const cellSize = curPixelSize * 3;

          for (const f of curFishes) {
            let nextX = f.x + f.dx;
            let nextY = f.y;
            let nextDx = f.dx;

            // Subtle vertical wobble
            if (Math.random() < 0.2) {
              nextY += Math.random() < 0.5 ? -1 : 1;
            }

            // Wave boundary check
            if (enableWaveTop && width > 0) {
              const fishPxX = nextX * curPixelSize;
              const normX = Math.min(1, Math.max(0, fishPxX / width));
              const waveYPx =
                (waveVerticalOffset * cellSize) +
                (waveAmplitude * cellSize) * Math.sin(normX * 2 * Math.PI * waveFrequency + (wavePhaseShift * Math.PI) / 180);
              const waveYUnits = Math.floor(waveYPx / curPixelSize) + 1;
              if (nextY < waveYUnits) {
                nextY = waveYUnits;
              }
            }

            // Turn around smoothly when hitting borders
            if (nextX <= 0) {
              nextX = 0;
              nextDx = 1;
            } else if (nextX >= maxX) {
              nextX = maxX;
              nextDx = -1;
            }

            if (nextY < 0) nextY = 0;
            if (nextY > maxY) nextY = maxY;

            f.x = nextX;
            f.y = nextY;
            f.dx = nextDx;
          }
        }
      }

      renderCanvas();
    };

    animFrameId.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameId.current !== null) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [
    animateVariants,
    animationInterval,
    cellsToAnimatePerTick,
    enableFish,
    fishMoveInterval,
    enableWaveTop,
    waveAmplitude,
    waveFrequency,
    waveVerticalOffset,
    wavePhaseShift,
    renderCanvas,
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={style}
    >
      <canvas
        ref={canvasRef}
        className="block absolute top-0 left-0 w-full h-full pointer-events-none z-0"
        aria-hidden="true"
      />
      <div className="relative w-full h-full z-10">{children}</div>
    </div>
  );
}
