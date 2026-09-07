import { useEffect, useId, useRef, useState } from 'react';

type Shape = 'Torus' | 'Sphere' | 'Cube';
type Point = [number, number, number, number, number, number, number];
const COLUMNS = 92;
const ROWS = 46;
const DENSITY = ' .,:;irsXA253hMHGS#9B&@';
const INITIAL_ROTATION = { x: 0.55, y: 0.38 };

function makePoints(shape: Shape): Point[] {
  const points: Point[] = [];
  if (shape === 'Cube') {
    for (let side = 0; side < 3; side++) {
      for (const direction of [-1, 1]) {
        for (let a = -1.35; a <= 1.35; a += 0.045) {
          for (let b = -1.35; b <= 1.35; b += 0.045) {
            const p = [0, 0, 0];
            const n = [0, 0, 0];
            p[side] = direction * 1.35;
            p[(side + 1) % 3] = a;
            p[(side + 2) % 3] = b;
            n[side] = direction;
            points.push([p[0], p[1], p[2], n[0], n[1], n[2], Math.max(Math.abs(a), Math.abs(b)) > 1.27 ? 1.2 : 0.8]);
          }
        }
      }
    }
    return points;
  }
  for (let u = 0; u < Math.PI * 2; u += 0.035) {
    for (let v = 0; v < Math.PI * (shape === 'Sphere' ? 1 : 2); v += 0.055) {
      const cu = Math.cos(u), su = Math.sin(u), cv = Math.cos(v), sv = Math.sin(v);
      if (shape === 'Torus') {
        points.push([(1.4 + 0.62 * cv) * cu, (1.4 + 0.62 * cv) * su, 0.62 * sv, cv * cu, cv * su, sv, 1]);
      } else {
        points.push([1.85 * sv * cu, 1.85 * sv * su, 1.85 * cv, sv * cu, sv * su, cv, 0.78 + 0.22 * Math.cos(u * 10)]);
      }
    }
  }
  return points;
}

export default function AsciiPlayground() {
  const [shape, setShape] = useState<Shape>('Torus');
  const [paused, setPaused] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const stage = useRef<HTMLDivElement>(null);
  const output = useRef<HTMLPreElement>(null);
  const rotation = useRef({ ...INITIAL_ROTATION });
  const drag = useRef<{ x: number; y: number; pointerId: number } | null>(null);
  const draw = useRef<() => void>(() => {});
  const frame = useRef(0);
  const helpId = useId();

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => { if (preference.matches) setPaused(true); };
    preference.addEventListener('change', onChange);
    return () => preference.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const points = makePoints(shape);
    const depths = new Float32Array(COLUMNS * ROWS);
    const characters = new Array<string>(COLUMNS * ROWS);
    let request = 0;
    let lastFrame = 0;
    let visible = true;

    const render = () => {
      if (!output.current) return;
      depths.fill(-Infinity);
      characters.fill(' ');
      const cx = Math.cos(rotation.current.x), sx = Math.sin(rotation.current.x);
      const cy = Math.cos(rotation.current.y), sy = Math.sin(rotation.current.y);
      const cz = Math.cos(-0.35), sz = Math.sin(-0.35);
      for (const [x, y, z, nx, ny, nz, material] of points) {
        const ry = y * cx - z * sx, rz = y * sx + z * cx;
        const rx = x * cy + rz * sy, depth = rz * cy - x * sy;
        const px = rx * cz - ry * sz, py = rx * sz + ry * cz;
        const scale = 117 / (6.5 - depth);
        const column = Math.round(COLUMNS / 2 + px * scale);
        const row = Math.round(ROWS / 2 - py * scale * 0.5);
        if (column < 0 || column >= COLUMNS || row < 0 || row >= ROWS) continue;
        const index = row * COLUMNS + column;
        if (depth <= depths[index]) continue;
        depths[index] = depth;
        const normalY = ny * cx - nz * sx, normalZ = ny * sx + nz * cx;
        const normalX = nx * cy + normalZ * sy, normalDepth = normalZ * cy - nx * sy;
        const light = (-(normalX * cz - normalY * sz) * 0.42 + (normalX * sz + normalY * cz) * 0.55 + normalDepth * 0.72) * material;
        const shade = Math.max(1, Math.min(DENSITY.length - 1, Math.round((light * 0.78 + 0.2) * (DENSITY.length - 1))));
        characters[index] = DENSITY[shade];
      }
      const lines: string[] = [];
      for (let row = 0; row < ROWS; row++) lines.push(characters.slice(row * COLUMNS, (row + 1) * COLUMNS).join(''));
      output.current.textContent = lines.join('\n');
      output.current.dataset.frame = String(++frame.current);
      output.current.dataset.rotation = `${rotation.current.x.toFixed(3)},${rotation.current.y.toFixed(3)}`;
    };

    const tick = (time: number) => {
      if (time - lastFrame >= 1000 / 24) {
        const elapsed = lastFrame ? Math.min((time - lastFrame) / 1000, 0.1) : 0;
        rotation.current.x += elapsed * 0.2;
        rotation.current.y += elapsed * 0.28;
        render();
        lastFrame = time;
      }
      request = requestAnimationFrame(tick);
    };
    const syncPlayback = () => {
      cancelAnimationFrame(request);
      lastFrame = 0;
      if (!paused && visible && !document.hidden) request = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    });
    if (stage.current) observer.observe(stage.current);
    document.addEventListener('visibilitychange', syncPlayback);
    draw.current = render;
    render();
    syncPlayback();
    return () => {
      cancelAnimationFrame(request);
      observer.disconnect();
      document.removeEventListener('visibilitychange', syncPlayback);
      draw.current = () => {};
    };
  }, [shape, paused]);

  const reset = () => {
    rotation.current = { ...INITIAL_ROTATION };
    draw.current();
  };

  return <div className="ascii-playground" data-shape={shape.toLowerCase()}>
    <div className="playground-topline"><span>FIG. 001 / DIGITAL SCULPTURE</span><span className="playground-live"><i/>{paused ? 'PAUSED' : 'LIVE RENDER'}</span></div>
    <div
      ref={stage}
      className="ascii-stage"
      role="region"
      aria-label="Interactive ASCII sculpture"
      aria-describedby={helpId}
      tabIndex={0}
      onPointerDown={event => {
        if (!event.isPrimary || event.button !== 0) return;
        event.currentTarget.focus({ preventScroll: true });
        event.currentTarget.setPointerCapture(event.pointerId);
        drag.current = { x: event.clientX, y: event.clientY, pointerId: event.pointerId };
        setPaused(true);
      }}
      onPointerMove={event => {
        if (!drag.current || drag.current.pointerId !== event.pointerId) return;
        rotation.current.y += (event.clientX - drag.current.x) * 0.009;
        rotation.current.x += (event.clientY - drag.current.y) * 0.009;
        drag.current.x = event.clientX;
        drag.current.y = event.clientY;
        draw.current();
      }}
      onPointerUp={event => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
        drag.current = null;
      }}
      onPointerCancel={() => { drag.current = null; }}
      onLostPointerCapture={() => { drag.current = null; }}
      onKeyDown={event => {
        if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) return;
        event.preventDefault();
        setPaused(true);
        if (event.key === 'ArrowUp') rotation.current.x -= 0.12;
        if (event.key === 'ArrowDown') rotation.current.x += 0.12;
        if (event.key === 'ArrowLeft') rotation.current.y -= 0.12;
        if (event.key === 'ArrowRight') rotation.current.y += 0.12;
        draw.current();
      }}
    >
      <span className="playground-cross cross-top-left" aria-hidden="true">+</span>
      <span className="playground-cross cross-top-right" aria-hidden="true">+</span>
      <pre ref={output} className="ascii-output" aria-hidden="true"/>
      <span className="playground-cross cross-bottom-left" aria-hidden="true">+</span>
      <span className="playground-cross cross-bottom-right" aria-hidden="true">+</span>
    </div>
    <div className="playground-bottomline"><span>92 × 46 CHARACTERS</span><span>CHARACTER SET / ASCII</span></div>
    <div className="playground-controls">
      <div className="shape-options" role="group" aria-label="Sculpture shape">{(['Torus', 'Sphere', 'Cube'] as const).map((option, index) => <button className={shape === option ? 'active' : ''} key={option} onClick={() => { setShape(option); reset(); }} aria-pressed={shape === option}><span>0{index + 1}</span>{option}</button>)}</div>
      <div className="playback-options"><button className="terminal-button" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Play animation' : 'Pause animation'}><span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span>{paused ? 'Play' : 'Pause'}</button><button className="terminal-button" onClick={reset} aria-label="Reset rotation"><span aria-hidden="true">↺</span></button></div>
    </div>
    <p className="playground-help" id={helpId}>Drag or use arrow keys to rotate. Play to keep it moving.</p>
  </div>;
}
