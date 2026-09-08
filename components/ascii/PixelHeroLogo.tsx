import { useEffect, useRef } from 'react';

/**
 * A Jules-style animated wordmark. The name is drawn as monospace text on a
 * grid; a small robot "@" repeatedly ejects characters, chases the loose
 * pieces, and carries them back to their original slot. Rendering is capped
 * and pauses while offscreen or when the user prefers reduced motion.
 */

// Block-font banner for "RUPESH" / "JADHAV" (5 rows each), rendered as text.
const LOGO_TEXT = [
  '██  █ █ ██  ███ ███ █ █ ',
  '█ █ █ █ █ █ █   █   █ █ ',
  '██  █ █ ██  ██  ███ ███ ',
  '█ █ █ █ █   █     █ █ █ ',
  '█ █ ███ █   ███ ███ █ █ ',
  '                        ',
  '  █ ███ ██  █ █ ███ █ █ ',
  '  █ █ █ █ █ █ █ █ █ █ █ ',
  '  █ ███ █ █ ███ ███ █ █ ',
  '█ █ █ █ █ █ █ █ █ █ █ █ ',
  '███ █ █ ██  █ █ █ █  █   ',
];

const CONFIG = {
  fontSize: 22,
  fontFamily: '"Roboto Mono", "IBM Plex Mono", monospace',
  fontWeight: 'bold',
  textColor: '#784fcf',
  robotChar: '@',
  robotColor: '#fffbeb',
  ejectionIntervalMs: 650,
  ejectedPieceBaseSpeed: 2.6,
  ejectedPieceDamping: 0.985,
  maxEjectedPieces: 22,
  initialEjectedPiecesCount: 10,
  ejectedPieceColors: ['#e1308d', '#0fd3d3', '#f0c642', '#472394'],
  robotMoveInterval: 3,
  robotPickupDelay: 6,
  robotPlaceDelay: 6,
  frameIntervalMs: 1000 / 30,
};

type Slot = { char: string; empty: boolean; r: number; c: number; x: number; y: number; targeted: boolean };
type Piece = { char: string; r: number; c: number; x: number; y: number; vx: number; vy: number; color: string; picked: boolean };
type Robot = {
  gc: number; gr: number; state: 'IDLE' | 'TO_PIECE' | 'AT_PIECE' | 'TO_SLOT' | 'AT_SLOT';
  target: Piece | null; slot: Slot | null; carrying: Piece['char'] | null;
  origin: { r: number; c: number } | null; moveTimer: number; actionTimer: number;
};

export default function PixelHeroLogo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cols = Math.max(...LOGO_TEXT.map(row => row.length));
    const rows = LOGO_TEXT.length;

    ctx.font = `${CONFIG.fontWeight} ${CONFIG.fontSize}px ${CONFIG.fontFamily}`;
    const cw = ctx.measureText('█').width;
    const ch = CONFIG.fontSize * 1.15;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = cols * cw;
    const height = rows * ch;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // Build slots from the logo text.
    const slots: Slot[] = [];
    LOGO_TEXT.forEach((row, r) => {
      [...row].forEach((char, c) => {
        if (char !== ' ') slots.push({ char, empty: false, r, c, x: c * cw, y: r * ch, targeted: false });
      });
    });

    const pieces: Piece[] = [];
    const robot: Robot = { gc: (cols / 2) | 0, gr: (rows / 2) | 0, state: 'IDLE', target: null, slot: null, carrying: null, origin: null, moveTimer: 0, actionTimer: 0 };

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function eject(slot: Slot) {
      if (slot.empty) return;
      slot.empty = true;
      const angle = Math.random() * Math.PI * 2;
      const speed = CONFIG.ejectedPieceBaseSpeed * (0.7 + Math.random() * 0.6);
      pieces.push({
        char: slot.char, r: slot.r, c: slot.c,
        x: slot.x + cw / 2, y: slot.y + ch / 2,
        vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        color: CONFIG.ejectedPieceColors[(Math.random() * CONFIG.ejectedPieceColors.length) | 0],
        picked: false,
      });
    }

    function step(robot: Robot, tc: number, tr: number) {
      const dc = tc - robot.gc;
      const dr = tr - robot.gr;
      if (dc === 0 && dr === 0) return false;
      if (Math.abs(dr) >= Math.abs(dc)) robot.gr += Math.sign(dr);
      else robot.gc += Math.sign(dc);
      robot.moveTimer = CONFIG.robotMoveInterval;
      return true;
    }

    // Seed a few ejected pieces so it looks alive immediately.
    for (let i = 0; i < CONFIG.initialEjectedPiecesCount; i++) {
      const filled = slots.filter(s => !s.empty);
      if (filled.length) eject(filled[(Math.random() * filled.length) | 0]);
    }

    let raf = 0;
    let last = 0;
    let ejectAccum = 0;
    let running = !reduceMotion;

    function updatePhysics(dt: number) {
      // Occasionally eject a new piece.
      ejectAccum += dt;
      if (ejectAccum >= CONFIG.ejectionIntervalMs && pieces.length < CONFIG.maxEjectedPieces) {
        ejectAccum -= CONFIG.ejectionIntervalMs;
        const filled = slots.filter(s => !s.empty && !s.targeted);
        if (filled.length) eject(filled[(Math.random() * filled.length) | 0]);
      }

      for (let i = pieces.length - 1; i >= 0; i--) {
        const p = pieces[i];
        if (p.picked) continue;
        p.x += p.vx; p.y += p.vy;
        p.vx *= CONFIG.ejectedPieceDamping; p.vy *= CONFIG.ejectedPieceDamping;
        if (p.x < cw / 2 || p.x > width - cw / 2) p.vx *= -1;
        if (p.y < ch / 2 || p.y > height - ch / 2) p.vy *= -1;
        p.x = Math.max(cw / 2, Math.min(width - cw / 2, p.x));
        p.y = Math.max(ch / 2, Math.min(height - ch / 2, p.y));
      }

      // Robot state machine.
      if (robot.moveTimer > 0) robot.moveTimer--;
      if (robot.actionTimer > 0) robot.actionTimer--;

      switch (robot.state) {
        case 'IDLE': {
          const loose = pieces.filter(p => !p.picked);
          if (loose.length) {
            let best = loose[0]; let bestD = Infinity;
            for (const p of loose) {
              const pc = Math.round(p.x / cw), pr = Math.round(p.y / ch);
              const d = (robot.gc - pc) ** 2 + (robot.gr - pr) ** 2;
              if (d < bestD) { bestD = d; best = p; }
            }
            best.picked = true;
            robot.target = best;
            robot.state = 'TO_PIECE';
          }
          break;
        }
        case 'TO_PIECE': {
          const p = robot.target!;
          const tc = Math.round(p.x / cw), tr = Math.round(p.y / ch);
          if (robot.gc === tc && robot.gr === tr) { robot.state = 'AT_PIECE'; robot.actionTimer = CONFIG.robotPickupDelay; }
          else if (robot.moveTimer <= 0) step(robot, tc, tr);
          break;
        }
        case 'AT_PIECE': {
          if (robot.actionTimer > 0) break;
          const p = robot.target!;
          robot.carrying = p.char;
          robot.origin = { r: p.r, c: p.c };
          pieces.splice(pieces.indexOf(p), 1);
          robot.slot = slots.find(s => s.r === p.r && s.c === p.c) || null;
          if (robot.slot) { robot.slot.targeted = true; robot.state = 'TO_SLOT'; }
          else { robot.state = 'IDLE'; robot.carrying = null; }
          robot.target = null;
          break;
        }
        case 'TO_SLOT': {
          const s = robot.slot!;
          const tc = Math.floor(s.x / cw), tr = Math.floor(s.y / ch);
          if (robot.gc === tc && robot.gr === tr) { robot.state = 'AT_SLOT'; robot.actionTimer = CONFIG.robotPlaceDelay; }
          else if (robot.moveTimer <= 0) step(robot, tc, tr);
          break;
        }
        case 'AT_SLOT': {
          if (robot.actionTimer > 0) break;
          if (robot.slot) { robot.slot.empty = false; robot.slot.targeted = false; }
          robot.slot = null; robot.carrying = null; robot.origin = null;
          robot.state = 'IDLE';
          break;
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.font = `${CONFIG.fontWeight} ${CONFIG.fontSize}px ${CONFIG.fontFamily}`;
      ctx.textBaseline = 'top';

      // Settled logo characters.
      ctx.fillStyle = CONFIG.textColor;
      for (const s of slots) if (!s.empty) ctx.fillText(s.char, s.c * cw, s.r * ch);

      // Ejected pieces.
      for (const p of pieces) { ctx.fillStyle = p.color; ctx.fillText(p.char, Math.round(p.x / cw) * cw, Math.round(p.y / ch) * ch); }

      // Robot.
      ctx.fillStyle = CONFIG.robotColor;
      ctx.fillText(CONFIG.robotChar, robot.gc * cw, robot.gr * ch);
    }

    function loop(now: number) {
      raf = requestAnimationFrame(loop);
      if (!running) return;
      if (now - last < CONFIG.frameIntervalMs) return;
      const dt = last === 0 ? CONFIG.frameIntervalMs : now - last;
      last = now;
      updatePhysics(dt);
      draw();
    }

    draw();
    raf = requestAnimationFrame(loop);

    // Pause when scrolled offscreen.
    const io = new IntersectionObserver(entries => {
      const visible = entries[0]?.isIntersecting ?? true;
      running = visible && !reduceMotion;
      if (running) last = 0;
    }, { threshold: 0.05 });
    io.observe(canvas);

    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, []);

  return (
    <div className="pixel-herologo">
      <canvas ref={canvasRef} className="pixelated-img" aria-hidden="true" />
      <span className="sr-only">Rupesh Jadhav</span>
    </div>
  );
}
