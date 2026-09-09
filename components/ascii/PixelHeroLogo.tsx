import { useEffect, useRef } from 'react';

/**
 * Authentic Monospace ASCII Wordmark for "RUPESH".
 * Restores the beloved text character animation:
 * - Individual monospace characters fly loose in retro neon colors.
 * - Autonomous robot '@' walks across the grid, retrieves each piece, and restores it.
 * - Empty slots maintain subtle ghost glyphs so "RUPESH" is ALWAYS 100% solid and legible!
 * - High-DPI canvas scaling with zero horizontal overflow.
 */

const DESKTOP_LOGO_TEXT = [
  ' OMMMMMMMWXo.     :MMW      :MMW   OMMMMMMMWXo.     OMMMMMMMMMMMO      ,0WMMMMMW0,    :MMW      :MMW',
  ' OMMN;   .lWM0    :MMW      :MMW   OMMN;   .lWM0    OMMN00000000c     .XMMN000NMMX.   :MMW      :MMW',
  ' OMMx      0MMd   :MMW      :MMW   OMMx      0MMd   OMMx              0MMx.   .::;    :MMW      :MMW',
  ' OMMNKKKKXWMMk    :MMW      :MMW   OMMNKKKKXWMMk    OMMNKKKKKK0c      \'0WMMMWNK0o.    :MMNKKKKKKWMM:',
  ' OMMMMMMMMWXo.    :MMW      :MMW   OMMMMMMMMW0:     OMMMMMMMMMWd        .:oOKWMMMW0   :MMMMMMMMMMMM:',
  ' OMMx    .kMMO    :MMW      :MMW   OMMx             OMMx              .::.    .xMM0   :MMW      :MMW',
  ' OMMx     :XMMx   .NMM0dddd0MMN.   OMMx             OMMN00000000c     .XMMN000NMMX.   :MMW      :MMW',
  ' 0MMd      oWMd     .o0WMMMW0o.    0MMd             0MMMMMMMMMMMMO     \'0WMMMMMW0\'    :MMW      :MMW',
];

const MOBILE_LOGO_TEXT = [
  ' .oOXNNk.  kMM  MMo  .oOXNNk.  .d0XNN0.  .oOXNNk.  kMM  MMo ',
  ' :MM..MM:  kMM  MMo  :MM..MM:  :MM..     :MM:...   kMM  MMo ',
  ' .kXNN0o.  kMM  MMo  .kXNN0o.  :XWNKd.    \'o0NKd.  kMMWWMMo ',
  ' :MM..WMo  .0MMWMM:  :MM...    :MM..     ...:kMM:  kMM  MMo ',
  ' .dd  :d.    :dc.    .dd       .d0XNN0.  .kNNX0o.  kMM  MMo ',
];

const CONFIG = {
  fontSize: 16,
  mobileFontSize: 10.5,
  fontFamily: '"SF Mono", "Roboto Mono", "IBM Plex Mono", monospace',
  fontWeight: 'bold',
  backgroundColor: 'transparent',
  textColor: '#b79cf2',
  ghostColor: 'rgba(150, 116, 224, 0.28)',
  robotColor: '#fffbeb',
  robotChar: '@',
  ejectionIntervalMs: 1200,
  ejectedPieceBaseSpeed: 2.4,
  ejectedPieceDamping: 0.985,
  maxEjectedPieces: 12,
  initialEjectedPiecesCount: 8,
  ejectPerTick: 2,
  ejectedPieceColors: ['#E1308D', '#0FD3D3', '#F0C642', '#472394'],
  // Persistent decorative glyphs drifting around the wordmark (Jules-style).
  // Kept sparse — these are NOT collected by the robot, so too many just clutter.
  ambientGlyphCount: 5,
  ambientGlyphChars: ['M', 'W', 'x', 'K', ':', '.'],
  ambientGlyphColors: ['#E1308D', '#0FD3D3', '#956be5', '#784fcf'],
  ambientGlyphSpeed: 0.13,
  robotMoveInterval: 3,
  robotPickupDelay: 10,
  robotPlaceDelay: 10,
  logicalCharWidth: 104,
  logicalCharHeight: 12,
  mobileLogicalCharWidth: 60,
  mobileLogicalCharHeight: 11,
};

type Slot = {
  char: string;
  empty: boolean;
  row: number;
  col: number;
  x: number;
  y: number;
  targeted: boolean;
};

type Piece = {
  char: string;
  row: number;
  col: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  picked: boolean;
};

type Robot = {
  col: number;
  row: number;
  state: 'IDLE' | 'TO_PIECE' | 'AT_PIECE' | 'TO_SLOT' | 'AT_SLOT';
  targetPiece: Piece | null;
  targetSlot: Slot | null;
  carryingChar: string | null;
  carryingColor: string | null;
  moveTimer: number;
  actionTimer: number;
};

type Sparkle = {
  x: number;
  y: number;
  char: string;
  color: string;
  vx?: number;
  vy: number;
  alpha: number;
  life: number;
  size?: number;
};

export default function PixelHeroLogo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let isMobile = window.innerWidth <= 768;
    let logoText = isMobile ? MOBILE_LOGO_TEXT : DESKTOP_LOGO_TEXT;
    let logicalW = isMobile ? CONFIG.mobileLogicalCharWidth : CONFIG.logicalCharWidth;
    let logicalH = isMobile ? CONFIG.mobileLogicalCharHeight : CONFIG.logicalCharHeight;
    let fontSize = isMobile ? CONFIG.mobileFontSize : CONFIG.fontSize;

    let charWidth = 9.6;
    let charHeight = fontSize * 1.25;

    let slots: Slot[] = [];
    let pieces: Piece[] = [];
    let sparkles: Sparkle[] = [];
    let ambient: { x: number; y: number; vx: number; vy: number; char: string; color: string; alpha: number }[] = [];
    let rSparkleTick = 0;

    const robot: Robot = {
      col: Math.floor(logicalW / 2),
      row: Math.floor(logicalH / 2),
      state: 'IDLE',
      targetPiece: null,
      targetSlot: null,
      carryingChar: null,
      carryingColor: null,
      moveTimer: 0,
      actionTimer: 0,
    };

    let mouseX = -9999;
    let mouseY = -9999;

    const setupDimensions = () => {
      isMobile = window.innerWidth <= 768;
      logoText = isMobile ? MOBILE_LOGO_TEXT : DESKTOP_LOGO_TEXT;
      logicalW = isMobile ? CONFIG.mobileLogicalCharWidth : CONFIG.logicalCharWidth;
      logicalH = isMobile ? CONFIG.mobileLogicalCharHeight : CONFIG.logicalCharHeight;
      fontSize = isMobile ? CONFIG.mobileFontSize : CONFIG.fontSize;

      ctx.font = `${CONFIG.fontWeight} ${fontSize}px ${CONFIG.fontFamily}`;
      charWidth = ctx.measureText('M').width || (fontSize * 0.6);
      charHeight = fontSize * 1.25;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const pixelWidth = Math.round(logicalW * charWidth);
      const pixelHeight = Math.round(logicalH * charHeight);

      canvas.width = pixelWidth * dpr;
      canvas.height = pixelHeight * dpr;
      canvas.style.width = '100%';
      canvas.style.maxWidth = `${pixelWidth}px`;
      canvas.style.height = 'auto';

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const numRows = logoText.length;
      const numCols = Math.max(...logoText.map(r => r.length));
      const textW = numCols * charWidth;
      const textH = numRows * charHeight;

      const startX = Math.max(0, Math.floor((pixelWidth - textW) / 2));
      const startY = Math.max(4, Math.floor((pixelHeight - textH) / 2) - Math.floor(charHeight * (isMobile ? 0.5 : 0.3)));

      slots = [];
      for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
          const ch = logoText[r]?.[c] ?? ' ';
          if (ch !== ' ') {
            slots.push({
              char: ch,
              empty: false,
              row: r,
              col: c,
              x: startX + c * charWidth,
              y: startY + r * charHeight,
              targeted: false,
            });
          }
        }
      }

      robot.col = Math.floor(startX / charWidth) + Math.floor(numCols / 2);
      robot.row = Math.floor(startY / charHeight) + numRows + 1;

      // Seed persistent decorative glyphs drifting through the whole canvas,
      // mirroring the scattered characters around the Jules wordmark.
      const pw = logicalW * charWidth;
      const ph = logicalH * charHeight;
      ambient = [];
      for (let i = 0; i < CONFIG.ambientGlyphCount; i++) {
        const ang = Math.random() * Math.PI * 2;
        ambient.push({
          x: Math.random() * pw,
          y: Math.random() * ph,
          vx: Math.cos(ang) * CONFIG.ambientGlyphSpeed * (0.5 + Math.random()),
          vy: Math.sin(ang) * CONFIG.ambientGlyphSpeed * (0.5 + Math.random()),
          char: CONFIG.ambientGlyphChars[Math.floor(Math.random() * CONFIG.ambientGlyphChars.length)],
          color: CONFIG.ambientGlyphColors[Math.floor(Math.random() * CONFIG.ambientGlyphColors.length)],
          alpha: 0.12 + Math.random() * 0.2,
        });
      }

      // Seed initial micro sparkles across all letters of RUPESH (R, U, P, E, S, H)
      const sparkChars = ['✦', '*', '·', '✧'];
      const sparkColors = ['#0FD3D3', '#F0C642', '#E1308D', '#fffbeb'];
      for (let i = 0; i < 5; i++) {
        const slot = slots[Math.floor((i / 5) * slots.length)];
        if (slot) {
          sparkles.push({
            x: slot.x + (Math.random() * 16 - 8),
            y: slot.y + (Math.random() * 12 - 6),
            char: sparkChars[i % sparkChars.length],
            color: sparkColors[i % sparkColors.length],
            vx: (Math.random() - 0.5) * 0.4,
            vy: -0.3 - Math.random() * 0.35,
            alpha: 1.0,
            life: 30 + (i % 5) * 6,
            size: i % 2 === 0 ? 17 : 13,
          });
        }
      }
    };

    setupDimensions();

    const ejectPiece = (slot: Slot) => {
      if (slot.empty || pieces.length >= CONFIG.maxEjectedPieces) return;
      slot.empty = true;
      const angle = Math.random() * Math.PI * 2;
      const speed = CONFIG.ejectedPieceBaseSpeed * (0.8 + Math.random() * 0.5);
      const color = CONFIG.ejectedPieceColors[Math.floor(Math.random() * CONFIG.ejectedPieceColors.length)];
      pieces.push({
        char: slot.char,
        row: slot.row,
        col: slot.col,
        x: slot.x + charWidth / 2,
        y: slot.y + charHeight / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        picked: false,
      });
    };

    // Seed a healthy cloud of loose pieces for the robot to reassemble.
    // The ghost glyph keeps the word readable, so any slot is fair game.
    if (!prefersReducedMotion) {
      const candidates = [...slots];
      for (let i = 0; i < CONFIG.initialEjectedPiecesCount && candidates.length > 0; i++) {
        const idx = Math.floor(Math.random() * candidates.length);
        const chosen = candidates.splice(idx, 1)[0];
        ejectPiece(chosen);
      }
    }

    const stepRobot = (targetCol: number, targetRow: number) => {
      const dc = targetCol - robot.col;
      const dr = targetRow - robot.row;
      if (dc === 0 && dr === 0) return false;
      if (Math.abs(dr) >= Math.abs(dc)) {
        robot.row += Math.sign(dr);
      } else {
        robot.col += Math.sign(dc);
      }
      robot.moveTimer = CONFIG.robotMoveInterval;
      return true;
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = (logicalW * charWidth) / rect.width;
      const scaleY = (logicalH * charHeight) / rect.height;
      mouseX = (e.clientX - rect.left) * scaleX;
      mouseY = (e.clientY - rect.top) * scaleY;
    };

    const handlePointerLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerleave', handlePointerLeave);

    let rafId = 0;
    let isVisible = true;
    let ejectAccum = 0;
    let lastTime = performance.now();

    const updatePhysics = (dt: number) => {
      if (prefersReducedMotion) return;

      const pixelWidth = logicalW * charWidth;
      const pixelHeight = logicalH * charHeight;

      // Eject accumulator: keep several loose pieces in flight at all times.
      ejectAccum += dt;
      if (ejectAccum >= CONFIG.ejectionIntervalMs && pieces.length < CONFIG.maxEjectedPieces) {
        ejectAccum -= CONFIG.ejectionIntervalMs;
        for (let n = 0; n < CONFIG.ejectPerTick; n++) {
          const candidates = slots.filter(s => !s.empty && !s.targeted);
          if (candidates.length === 0) break;
          ejectPiece(candidates[Math.floor(Math.random() * candidates.length)]);
        }
      }

      // Physics for loose flying characters
      for (let i = pieces.length - 1; i >= 0; i--) {
        const p = pieces[i];
        if (p.picked) continue;

        // Mouse proximity interaction: push pieces away gently
        if (mouseX > -1000) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const distSq = dx * dx + dy * dy;
          if (distSq < 3600 && distSq > 1) { // 60px radius
            const dist = Math.sqrt(distSq);
            p.vx += (dx / dist) * 0.8;
            p.vy += (dy / dist) * 0.8;
          }
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= CONFIG.ejectedPieceDamping;
        p.vy *= CONFIG.ejectedPieceDamping;

        // Bounce off canvas boundaries
        if (p.x < charWidth || p.x > pixelWidth - charWidth) p.vx *= -1;
        if (p.y < charHeight || p.y > pixelHeight - charHeight * 1.5) p.vy *= -1;
        p.x = Math.max(charWidth, Math.min(pixelWidth - charWidth, p.x));
        p.y = Math.max(charHeight, Math.min(pixelHeight - charHeight * 1.5, p.y));
      }

      // Robot state machine
      if (robot.moveTimer > 0) robot.moveTimer--;
      if (robot.actionTimer > 0) robot.actionTimer--;

      switch (robot.state) {
        case 'IDLE': {
          const loose = pieces.filter(p => !p.picked);
          if (loose.length > 0) {
            let bestPiece: Piece | null = null;
            let minD = Infinity;
            for (const p of loose) {
              const pc = Math.round(p.x / charWidth);
              const pr = Math.round(p.y / charHeight);
              const d = (robot.col - pc) ** 2 + (robot.row - pr) ** 2;
              if (d < minD) {
                minD = d;
                bestPiece = p;
              }
            }
            if (bestPiece) {
              bestPiece.picked = true;
              robot.targetPiece = bestPiece;
              robot.state = 'TO_PIECE';
            }
          }
          break;
        }
        case 'TO_PIECE': {
          if (!robot.targetPiece) {
            robot.state = 'IDLE';
            break;
          }
          const targetCol = Math.round(robot.targetPiece.x / charWidth);
          const targetRow = Math.round(robot.targetPiece.y / charHeight);
          if (robot.col === targetCol && robot.row === targetRow) {
            robot.state = 'AT_PIECE';
            robot.actionTimer = CONFIG.robotPickupDelay;
          } else if (robot.moveTimer <= 0) {
            stepRobot(targetCol, targetRow);
          }
          break;
        }
        case 'AT_PIECE': {
          if (robot.actionTimer > 0) break;
          if (robot.targetPiece) {
            robot.carryingChar = robot.targetPiece.char;
            robot.carryingColor = robot.targetPiece.color;
            const targetRow = robot.targetPiece.row;
            const targetCol = robot.targetPiece.col;
            pieces = pieces.filter(p => p !== robot.targetPiece);
            robot.targetPiece = null;
            robot.targetSlot = slots.find(s => s.row === targetRow && s.col === targetCol) || null;
            if (robot.targetSlot) {
              robot.targetSlot.targeted = true;
              robot.state = 'TO_SLOT';
            } else {
              robot.state = 'IDLE';
              robot.carryingChar = null;
              robot.carryingColor = null;
            }
          } else {
            robot.state = 'IDLE';
          }
          break;
        }
        case 'TO_SLOT': {
          if (!robot.targetSlot) {
            robot.state = 'IDLE';
            robot.carryingChar = null;
            robot.carryingColor = null;
            break;
          }
          const targetCol = Math.floor(robot.targetSlot.x / charWidth);
          const targetRow = Math.floor(robot.targetSlot.y / charHeight);
          if (robot.col === targetCol && robot.row === targetRow) {
            robot.state = 'AT_SLOT';
            robot.actionTimer = CONFIG.robotPlaceDelay;
          } else if (robot.moveTimer <= 0) {
            stepRobot(targetCol, targetRow);
          }
          break;
        }
        case 'AT_SLOT': {
          if (robot.actionTimer > 0) break;
          if (robot.targetSlot) {
            robot.targetSlot.empty = false;
            robot.targetSlot.targeted = false;

            // Emit celebratory micro sparkles upon placing the piece
            const sparkColors = ['#0fd3d3', '#f0c642', '#ff3b94'];
            for (let i = 0; i < 4; i++) {
              sparkles.push({
                x: robot.targetSlot.x + (Math.random() * 12 - 6),
                y: robot.targetSlot.y + (Math.random() * 8 - 4),
                char: ['✦', '*', '·'][Math.floor(Math.random() * 3)],
                color: sparkColors[Math.floor(Math.random() * sparkColors.length)],
                vy: -0.4 - Math.random() * 0.4,
                alpha: 1.0,
                life: 25,
              });
            }
          }
          robot.targetSlot = null;
          robot.carryingChar = null;
          robot.carryingColor = null;
          robot.state = 'IDLE';
          break;
        }
      }

      // Continuous micro sparkles dancing across all letters of RUPESH (R, U, P, E, S, H)
      rSparkleTick++;
      if (rSparkleTick >= 16 && !prefersReducedMotion) {
        rSparkleTick = 0;
        if (slots.length > 0) {
          const slot = slots[Math.floor(Math.random() * slots.length)];
          const sparkChars = ['✦', '*', '·', '✧'];
          const sparkColors = ['#0FD3D3', '#F0C642', '#E1308D', '#fffbeb'];
          sparkles.push({
            x: slot.x + (Math.random() * 16 - 8),
            y: slot.y + (Math.random() * 12 - 6),
            char: sparkChars[Math.floor(Math.random() * sparkChars.length)],
            color: sparkColors[Math.floor(Math.random() * sparkColors.length)],
            vx: (Math.random() - 0.5) * 0.4,
            vy: -0.32 - Math.random() * 0.38,
            alpha: 1.0,
            life: 36,
            size: Math.random() > 0.3 ? 17 : 13,
          });
        }
      }

      // Update sparkles
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const sp = sparkles[i];
        sp.x += sp.vx || 0;
        sp.y += sp.vy;
        sp.alpha -= 0.035;
        sp.life--;
        if (sp.life <= 0 || sp.alpha <= 0) {
          sparkles.splice(i, 1);
        }
      }

      // Drift the persistent ambient glyphs, wrapping them around the canvas.
      const aw = logicalW * charWidth;
      const ah = logicalH * charHeight;
      for (const g of ambient) {
        g.x += g.vx;
        g.y += g.vy;
        if (g.x < -charWidth) g.x = aw + charWidth;
        else if (g.x > aw + charWidth) g.x = -charWidth;
        if (g.y < -charHeight) g.y = ah + charHeight;
        else if (g.y > ah + charHeight) g.y = -charHeight;
      }
    };

    const render = () => {
      const pixelWidth = logicalW * charWidth;
      const pixelHeight = logicalH * charHeight;

      // 1. Background — transparent so the wordmark blends into the page
      //    gradient instead of sitting in a hard-edged rectangle.
      ctx.clearRect(0, 0, pixelWidth, pixelHeight);

      ctx.font = `${CONFIG.fontWeight} ${fontSize}px ${CONFIG.fontFamily}`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';

      // 1b. Ambient drifting glyphs behind the wordmark.
      ctx.save();
      for (const g of ambient) {
        ctx.globalAlpha = g.alpha;
        ctx.fillStyle = g.color;
        ctx.fillText(g.char, g.x, g.y);
      }
      ctx.restore();

      // 2. Render wordmark slots (filled characters solid, empty slots subtle ghost characters)
      for (let i = 0; i < slots.length; i++) {
        const s = slots[i];
        if (!s.empty) {
          ctx.fillStyle = CONFIG.textColor;
          ctx.fillText(s.char, s.x, s.y);
        } else {
          // Render subtle ghost glyph so the word RUPESH is ALWAYS 100% readable!
          ctx.fillStyle = CONFIG.ghostColor;
          ctx.fillText(s.char, s.x, s.y);
        }
      }

      // 3. Render loose flying characters
      for (const p of pieces) {
        ctx.fillStyle = p.color;
        ctx.fillText(p.char, Math.round(p.x / charWidth) * charWidth, Math.round(p.y / charHeight) * charHeight);
      }

      // 4. Render Sparkles (✦, *, ·)
      ctx.save();
      for (const sp of sparkles) {
        ctx.globalAlpha = Math.max(0, sp.alpha);
        ctx.fillStyle = sp.color;
        ctx.shadowColor = sp.color;
        ctx.shadowBlur = 6;
        ctx.font = `bold ${sp.size || Math.round(fontSize * 1.2)}px ${CONFIG.fontFamily}`;
        ctx.fillText(sp.char, sp.x, sp.y);
      }
      ctx.restore();

      // 5. Render Autonomous Robot '@'
      ctx.fillStyle = CONFIG.robotColor;
      ctx.fillText(CONFIG.robotChar, robot.col * charWidth, robot.row * charHeight);

      // If robot is carrying a character, draw the character beside it
      if (robot.carryingChar && robot.carryingColor) {
        ctx.fillStyle = robot.carryingColor;
        ctx.fillText(robot.carryingChar, (robot.col + 1) * charWidth, robot.row * charHeight);
      }
    };

    const loop = (now: number) => {
      rafId = requestAnimationFrame(loop);
      if (!isVisible) return;
      const dt = now - lastTime;
      lastTime = now;
      updatePhysics(dt);
      render();
    };

    rafId = requestAnimationFrame(loop);

    const handleResize = () => {
      setupDimensions();
    };

    window.addEventListener('resize', handleResize);

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) lastTime = performance.now();
    }, { threshold: 0.05 });

    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative flex flex-col justify-center items-center mt-2 md:mt-0 w-full">
      <canvas ref={canvasRef} className="block w-full h-auto pixelated-img max-w-[1000px] mx-auto" />
      <div role="heading" aria-level={1} className="pixel-hero-subtitle">
        Senior Flutter &amp; Kotlin Developer · 5+ yrs · Mumbai
      </div>
      <span className="sr-only">Rupesh</span>
    </div>
  );
}
