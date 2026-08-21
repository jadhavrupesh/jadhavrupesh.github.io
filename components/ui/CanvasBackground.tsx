import { useEffect, useRef } from 'react';

interface ProjectAnimatedBannerProps {
  category?: string;
  projectName: string;
  tagline?: string;
  role?: string;
  platform?: string;
  technologies?: string;
  impact?: string;
  heightClass?: string;
}

export default function ProjectAnimatedBanner({
  category = 'Flutter',
  projectName,
  tagline,
  role = 'Software Developer',
  platform = 'Mobile & Web',
  technologies = 'Flutter, Dart, Clean Architecture',
  impact,
  heightClass = 'min-h-[460px]',
}: ProjectAnimatedBannerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Subtle ambient aurora fluid animation in canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = container.offsetWidth);
    let height = (canvas.height = container.offsetHeight);

    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.offsetWidth;
      height = canvas.height = container.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Ambient floating fluid color blobs
    const blobs = [
      { x: width * 0.2, y: height * 0.3, radius: width * 0.45, vx: 0.3, vy: 0.2, color: 'rgba(99, 102, 241, ' }, // indigo
      { x: width * 0.8, y: height * 0.7, radius: width * 0.5, vx: -0.25, vy: -0.2, color: 'rgba(236, 72, 153, ' }, // pink
      { x: width * 0.5, y: height * 0.8, radius: width * 0.4, vx: 0.2, vy: -0.3, color: 'rgba(6, 182, 212, ' },  // cyan
      { x: width * 0.3, y: height * 0.6, radius: width * 0.35, vx: -0.2, vy: 0.25, color: 'rgba(193, 30, 33, ' }, // crimson
    ];

    let time = 0;

    const render = () => {
      time += 0.008;
      ctx.clearRect(0, 0, width, height);

      // Base rich dark canvas
      ctx.fillStyle = '#0d0e12';
      ctx.fillRect(0, 0, width, height);

      // Render smooth ambient aurora mesh
      blobs.forEach((blob, i) => {
        blob.x += Math.sin(time + i * 1.5) * 0.7 + blob.vx;
        blob.y += Math.cos(time + i * 1.2) * 0.7 + blob.vy;

        if (blob.x < -100) blob.x = width + 100;
        if (blob.x > width + 100) blob.x = -100;
        if (blob.y < -100) blob.y = height + 100;
        if (blob.y > height + 100) blob.y = -100;

        const grad = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.radius);
        grad.addColorStop(0, blob.color + '0.22)');
        grad.addColorStop(0.5, blob.color + '0.08)');
        grad.addColorStop(1, blob.color + '0)');

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      });

      // Subtle architectural grid overlay
      const gridSize = 40;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;

      ctx.beginPath();
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Subtle crosshairs at grid intersections
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      for (let x = gridSize; x < width; x += gridSize * 3) {
        for (let y = gridSize; y < height; y += gridSize * 3) {
          ctx.fillRect(x - 2, y, 5, 1);
          ctx.fillRect(x, y - 2, 1, 5);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const techList = technologies.split(',').map((t) => t.trim());

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${heightClass} flex flex-col justify-between p-4 sm:p-8 md:p-10 border border-black transition-all select-none`}
    >
      {/* Background Animated Aurora Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Floating Architectural Studio Window Frame */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between bg-zinc-950/70 border border-white/15 backdrop-blur-xl shadow-2xl p-6 sm:p-8">
        {/* Window Title Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-3 text-zinc-400 font-mono text-[11px] hidden sm:inline">
              arch://{projectName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.spec
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-white/5 border border-white/10 text-zinc-300">
              {category}
            </span>
            <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Production</span>
            </div>
          </div>
        </div>

        {/* Center Main Project Identity */}
        <div className="my-auto py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-3">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight">
              {projectName}
            </h2>
            <span
              className="text-base sm:text-lg text-red-400"
              style={{
                fontFamily: 'Caveat, cursive',
                transform: 'rotate(-4deg)',
                display: 'inline-block',
              }}
            >
              {role}
            </span>
          </div>

          {tagline && (
            <p className="text-xs sm:text-sm font-mono text-zinc-300 max-w-2xl leading-relaxed mb-6">
              {tagline}
            </p>
          )}

          {/* Interactive Architectural Flow Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {techList.map((tech, i) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-mono bg-white/5 border border-white/15 text-zinc-200 backdrop-blur-md flex items-center gap-1.5 transition-all hover:border-red-400 hover:text-white"
              >
                <span className="text-[10px] text-red-400 font-bold">{String(i + 1).padStart(2, '0')}</span>
                <span>{tech}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Window Footer Meta & Metric */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-3 text-zinc-400 text-[11px]">
            <span>Platform: <strong className="text-zinc-200">{platform}</strong></span>
            <span>·</span>
            <span>Target: <strong className="text-zinc-200">High Scale</strong></span>
          </div>

          {impact && (
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-[11px]">
              <span>★</span>
              <span className="truncate max-w-md">{impact}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}




