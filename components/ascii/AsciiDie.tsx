import { useEffect, useRef, useState } from 'react';

type Vector = [number, number, number];
type Face = { n: Vector; e1: Vector; e2: Vector; value: number };
type Roll = { from: Vector; to: Vector; start: number; duration: number; value: number; origin: { x: number; y: number } };

let lastAngles: Vector = [.4, .9, .2];
let lastResult: number | null = null;

const WIDTH = 54;
const HEIGHT = 30;
const SCALE = 84;
const CAMERA_DISTANCE = 5.2;
const CHARACTERS = ' .:-=+*#%@';
const PIXEL_COLORS = ['#311068', '#472394', '#5930a8', '#6840bd', '#784fcf', '#956be5', '#ab8ae9', '#c1a7f3', '#d8c5fa', '#efe5ff'];
const FACES: Face[] = [
  { n: [1, 0, 0], e1: [0, 1, 0], e2: [0, 0, 1], value: 1 },
  { n: [-1, 0, 0], e1: [0, 1, 0], e2: [0, 0, 1], value: 6 },
  { n: [0, 1, 0], e1: [1, 0, 0], e2: [0, 0, 1], value: 2 },
  { n: [0, -1, 0], e1: [1, 0, 0], e2: [0, 0, 1], value: 5 },
  { n: [0, 0, 1], e1: [1, 0, 0], e2: [0, 1, 0], value: 3 },
  { n: [0, 0, -1], e1: [1, 0, 0], e2: [0, 1, 0], value: 4 },
];
const PIPS: Record<number, [number, number][]> = {
  1: [[0, 0]],
  2: [[-.5, -.5], [.5, .5]],
  3: [[-.5, -.5], [0, 0], [.5, .5]],
  4: [[-.5, -.5], [-.5, .5], [.5, -.5], [.5, .5]],
  5: [[-.5, -.5], [-.5, .5], [0, 0], [.5, -.5], [.5, .5]],
  6: [[-.5, -.5], [-.5, 0], [-.5, .5], [.5, -.5], [.5, 0], [.5, .5]],
};
const TARGETS: Record<number, Vector> = {
  1: [0, Math.PI / 2, 0], 2: [-Math.PI / 2, 0, 0], 3: [0, Math.PI, 0],
  4: [0, 0, 0], 5: [Math.PI / 2, 0, 0], 6: [0, -Math.PI / 2, 0],
};
const light: Vector = (() => {
  const vector: Vector = [.4, .6, -1];
  const magnitude = Math.hypot(...vector);
  return vector.map(value => value / magnitude) as Vector;
})();

function rotate([x, y, z]: Vector, [a, b, c]: Vector): Vector {
  const y1 = y * Math.cos(a) - z * Math.sin(a);
  const z1 = y * Math.sin(a) + z * Math.cos(a);
  const x2 = x * Math.cos(b) + z1 * Math.sin(b);
  const z2 = -x * Math.sin(b) + z1 * Math.cos(b);
  return [x2 * Math.cos(c) - y1 * Math.sin(c), x2 * Math.sin(c) + y1 * Math.cos(c), z2];
}

function angleTo(current: number, target: number, spins: number) {
  const turn = Math.PI * 2;
  const difference = ((target % turn + turn) % turn) - ((current % turn + turn) % turn);
  return current + (difference < 0 ? difference + turn : difference) + spins * turn;
}

export default function AsciiDie({ pixel, onThemeChange }: { pixel: boolean; onThemeChange: (origin?: { x: number; y: number }) => void }) {
  const button = useRef<HTMLButtonElement>(null);
  const output = useRef<HTMLPreElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const angles = useRef<Vector>([...lastAngles]);
  const roll = useRef<Roll | null>(null);
  const holdUntil = useRef(0);
  const focused = useRef(false);
  const render = useRef<() => void>(() => {});
  const reducedMotion = useRef(false);
  const frame = useRef(0);
  const [result, setResult] = useState<number | null>(lastResult);
  const [isRolling, setIsRolling] = useState(false);
  const onThemeChangeRef = useRef(onThemeChange);
  const safetyTimer = useRef<number | null>(null);
  const requestRef = useRef<number>(0);
  const lastFrameRef = useRef<number>(0);
  const tickRef = useRef<(now: number) => void>(() => {});

  useEffect(() => {
    onThemeChangeRef.current = onThemeChange;
  });

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const characters = new Array<string>(WIDTH * HEIGHT);
    const shades = new Int8Array(WIDTH * HEIGHT);
    const depths = new Float32Array(WIDTH * HEIGHT);
    const pips = new Uint8Array(WIDTH * HEIGHT);
    const context = canvas.current?.getContext('2d');
    let visible = false;

    const completeRoll = (val: number) => {
      if (safetyTimer.current) {
        window.clearTimeout(safetyTimer.current);
        safetyTimer.current = null;
      }
      setResult(val);
      lastResult = val;
      setIsRolling(false);
      roll.current = null;
      holdUntil.current = performance.now() + 400;
    };

    const draw = () => {
      if (!output.current) return;
      characters.fill(' ');
      shades.fill(-1);
      depths.fill(0);
      pips.fill(0);
      for (const face of FACES) {
        const [nx, ny, nz] = rotate(face.n, angles.current);
        for (let u = -1; u <= 1; u += .05) {
          for (let v = -1; v <= 1; v += .05) {
            const point: Vector = [
              face.n[0] + face.e1[0] * u + face.e2[0] * v,
              face.n[1] + face.e1[1] * u + face.e2[1] * v,
              face.n[2] + face.e1[2] * u + face.e2[2] * v,
            ];
            const [x, y, z] = rotate(point, angles.current);
            const depth = 1 / (z + CAMERA_DISTANCE);
            const column = Math.floor(WIDTH / 2 + SCALE * depth * x);
            const row = Math.floor(HEIGHT / 2 - SCALE * depth * y * .55);
            if (column < 0 || column >= WIDTH || row < 0 || row >= HEIGHT) continue;
            const index = column + row * WIDTH;
            if (depth <= depths[index]) continue;
            const brightness = Math.max(0, Math.min(1, nx * light[0] + ny * light[1] + nz * light[2]));
            const pip = PIPS[face.value].some(([pipX, pipY]) => (u - pipX) ** 2 + (v - pipY) ** 2 < .17 ** 2);
            const level = Math.floor(brightness * (CHARACTERS.length - 1));
            const shade = pip ? Math.max(0, level - 6) : Math.max(2, level);
            depths[index] = depth;
            characters[index] = CHARACTERS[shade];
            shades[index] = shade;
            pips[index] = pip ? 1 : 0;
          }
        }
      }
      const rows: string[] = [];
      for (let row = 0; row < HEIGHT; row++) rows.push(characters.slice(row * WIDTH, row * WIDTH + WIDTH).join(''));
      output.current.textContent = rows.join('\n');
      output.current.dataset.frame = String(++frame.current);
      output.current.dataset.rotation = angles.current.map(angle => angle.toFixed(3)).join(',');
      if (context && canvas.current) {
        context.clearRect(0, 0, WIDTH, HEIGHT * 2);
        for (let index = 0; index < shades.length; index++) {
          if (shades[index] < 0) continue;
          const x = index % WIDTH;
          const y = Math.floor(index / WIDTH) * 2;
          if (pips[index] === 1) {
            context.fillStyle = '#ffffff';
          } else {
            context.fillStyle = PIXEL_COLORS[shades[index]];
          }
          context.fillRect(x, y, 1, 2);
        }
        canvas.current.dataset.frame = output.current.dataset.frame;
        canvas.current.dataset.rotation = output.current.dataset.rotation;
      }
      lastAngles = [...angles.current];
    };

    const tick = (now: number) => {
      if (lastFrameRef.current && now - lastFrameRef.current < 1000 / 30) {
        requestRef.current = requestAnimationFrame(tick);
        return;
      }
      const elapsed = lastFrameRef.current ? Math.min((now - lastFrameRef.current) / 1000, .1) : 0;
      if (roll.current) {
        const progress = Math.min(1, (now - roll.current.start) / roll.current.duration);
        const eased = 1 - (1 - progress) ** 3;
        angles.current = roll.current.from.map((angle, index) => angle + (roll.current!.to[index] - angle) * eased) as Vector;
        if (progress === 1) {
          completeRoll(roll.current.value);
        }
      } else if (now >= holdUntil.current && !focused.current) {
        angles.current = [angles.current[0] + elapsed * .6, angles.current[1] + elapsed * 1.02, angles.current[2] + elapsed * .48];
      }
      draw();
      lastFrameRef.current = now;
      requestRef.current = requestAnimationFrame(tick);
    };

    tickRef.current = tick;

    const sync = () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = 0;
      }
      lastFrameRef.current = 0;
      if (!reducedMotion.current && (visible || roll.current) && !document.hidden) {
        requestRef.current = requestAnimationFrame(tick);
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });

    const onPreference = () => {
      reducedMotion.current = preference.matches;
      if (preference.matches && roll.current) {
        const val = roll.current.value;
        angles.current = roll.current.to;
        lastAngles = [...roll.current.to];
        completeRoll(val);
      }
      draw();
      sync();
    };

    reducedMotion.current = preference.matches;
    if (button.current) observer.observe(button.current);
    preference.addEventListener('change', onPreference);
    document.addEventListener('visibilitychange', sync);
    render.current = draw;
    draw();

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (safetyTimer.current) window.clearTimeout(safetyTimer.current);
      observer.disconnect();
      preference.removeEventListener('change', onPreference);
      document.removeEventListener('visibilitychange', sync);
      render.current = () => {};
    };
  }, []);

  const lastTriggerTime = useRef(-1000);

  const startRoll = () => {
    const now = performance.now();
    if (roll.current || now - lastTriggerTime.current < 250) return;
    lastTriggerTime.current = now;
    const rect = button.current?.getBoundingClientRect();
    const origin = rect
      ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
      : { x: window.innerWidth - 60, y: 40 };
    const value = 1 + Math.floor(Math.random() * 6);
    const target = TARGETS[value];

    if (reducedMotion.current) {
      angles.current = target;
      lastAngles = [...target];
      setResult(value);
      lastResult = value;
      render.current();
      onThemeChangeRef.current(origin);
      return;
    }

    setIsRolling(true);
    setResult(value);
    lastResult = value;
    const ROLL_DURATION = 650;
    const spins = 3 + Math.floor(Math.random() * 2);

    roll.current = {
      from: [...angles.current],
      value,
      start: now,
      duration: ROLL_DURATION,
      origin,
      to: target.map((angle, index) => angleTo(angles.current[index], angle, (index === 1 ? spins + 1 : spins))) as Vector,
    };

    // Guarantee that tick loop is running
    if (!requestRef.current && tickRef.current) {
      lastFrameRef.current = 0;
      requestRef.current = requestAnimationFrame(tickRef.current);
    }

    // Trigger theme transition simultaneously with the dice roll
    onThemeChangeRef.current(origin);

    // Safety fallback: if requestAnimationFrame stalls for any reason, finish roll cleanly
    if (safetyTimer.current) window.clearTimeout(safetyTimer.current);
    safetyTimer.current = window.setTimeout(() => {
      if (roll.current) {
        const val = roll.current.value;
        if (safetyTimer.current) {
          window.clearTimeout(safetyTimer.current);
          safetyTimer.current = null;
        }
        setResult(val);
        lastResult = val;
        setIsRolling(false);
        roll.current = null;
        holdUntil.current = performance.now() + 400;
      }
    }, ROLL_DURATION + 150);
  };

  return <button
    ref={button}
    type="button"
    className={`ascii-die theme-switcher ${isRolling ? 'theme-die-rolling' : ''}`}
    onClick={startRoll}
    onKeyDown={e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        startRoll();
      }
    }}
    onFocus={() => { focused.current = true; }}
    onBlur={() => { focused.current = false; }}
    aria-label={`Switch to ${pixel ? 'ASCII' : 'Pixel'} theme`}
    aria-busy={isRolling}
    title={isRolling ? 'Rolling dice...' : `Roll to explore the ${pixel ? 'ASCII' : 'Pixel'} theme`}
  >
    <pre ref={output} hidden={pixel} aria-hidden="true"/>
    <canvas ref={canvas} className="pixel-die" hidden={!pixel} width={WIDTH} height={HEIGHT * 2} aria-hidden="true"/>
    <span className="theme-switch-label" aria-hidden="true">{pixel ? 'PIXEL' : 'ASCII'} / <span>SWITCH</span></span>
    <span className="sr-only" role="status" aria-live="polite">{pixel ? 'Pixel' : 'ASCII'} theme.{result ? ` Rolled ${result}.` : ''}</span>
  </button>;
}
