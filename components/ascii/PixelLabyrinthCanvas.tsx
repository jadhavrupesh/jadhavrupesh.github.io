import { useEffect, useRef } from 'react';

export default function PixelLabyrinthCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let t = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const rows = 9;
    const lineThickness = 3;
    const colors = ['#5a2b97', '#784fcf', '#491f82', '#9469eb'];

    const draw = () => {
      t += 0.015;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      const rowSpacing = h / (rows + 1);

      for (let r = 1; r <= rows; r++) {
        const y = r * rowSpacing;
        const speed = (r % 2 === 0 ? 1 : -1) * 0.5;
        const offset = (t * speed * 40) % 80;

        ctx.fillStyle = colors[r % colors.length];

        // Draw segmented line with notches/dashes
        let x = -80 + offset;
        while (x < w + 80) {
          const segLen = ((r * 37 + (x * 0.1) | 0) % 90) + 40;
          const gap = ((r * 19 + (x * 0.2) | 0) % 40) + 20;

          // Draw horizontal segment
          ctx.fillRect(Math.round(x), Math.round(y), Math.round(segLen), lineThickness);

          // Occasional vertical circuit connector
          if ((x | 0) % 160 < 25 && r < rows) {
            ctx.fillRect(Math.round(x + segLen - 4), Math.round(y), 4, Math.round(rowSpacing));
          }

          x += segLen + gap;
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pixel-labyrinth-canvas"
      aria-hidden="true"
    />
  );
}
