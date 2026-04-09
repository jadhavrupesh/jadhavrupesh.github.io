'use client';

import React, { useEffect, useRef, useState } from 'react';

type SilkBackgroundAnimationProps = {
  className?: string;
  showContent?: boolean;
};

export const SilkBackgroundAnimation: React.FC<SilkBackgroundAnimationProps> = ({
  className,
  showContent = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    const speed = 0.02;
    const scale = 2;
    const noiseIntensity = 0.8;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const noise = (x: number, y: number) => {
      const g = 2.71828;
      const rx = g * Math.sin(g * x);
      const ry = g * Math.sin(g * y);
      return (rx * ry * (1 + x)) % 1;
    };

    const animate = () => {
      const { width, height } = canvas;

      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#0f0f0f');
      gradient.addColorStop(0.5, '#1a1a1a');
      gradient.addColorStop(1, '#0f0f0f');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let x = 0; x < width; x += 2) {
        for (let y = 0; y < height; y += 2) {
          const u = (x / width) * scale;
          const v = (y / height) * scale;

          const tOffset = speed * time;
          const texX = u;
          const texY = v + 0.03 * Math.sin(8.0 * texX - tOffset);

          const pattern = 0.6 + 0.4 * Math.sin(
            5.0 * (texX + texY +
              Math.cos(3.0 * texX + 5.0 * texY) +
              0.02 * tOffset) +
            Math.sin(20.0 * (texX + texY - 0.1 * tOffset))
          );

          const rnd = noise(x, y);
          const intensity = Math.max(0, pattern - (rnd / 15.0) * noiseIntensity);

          // grayscale silk for your current black-white theme
          const r = Math.floor(132 * intensity);
          const g = Math.floor(132 * intensity);
          const b = Math.floor(132 * intensity);
          const a = 255;

          const index = (y * width + x) * 4;
          if (index < data.length) {
            data[index] = r;
            data[index + 1] = g;
            data[index + 2] = b;
            data[index + 3] = a;
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);

      const overlayGradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height) / 2
      );
      overlayGradient.addColorStop(0, 'rgba(0, 0, 0, 0.08)');
      overlayGradient.addColorStop(1, 'rgba(0, 0, 0, 0.45)');

      ctx.fillStyle = overlayGradient;
      ctx.fillRect(0, 0, width, height);

      time += 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(2rem); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUpDelay {
          from { opacity: 0; transform: translateY(1rem); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInCorner {
          from { opacity: 0; transform: translateY(-1rem); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 1s ease-out forwards; }
        .animate-fade-in-up-delay { animation: fadeInUpDelay 1s ease-out 0.3s forwards; }
        .animate-fade-in-corner { animation: fadeInCorner 1s ease-out 0.9s forwards; }
        .silk-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
      `}</style>

      <div className={`relative h-screen w-full overflow-hidden bg-black ${className ?? ''}`}>
        <canvas ref={canvasRef} className="silk-canvas" />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-transparent to-black/55" />

        {showContent && (
          <>
            <div className="relative z-20 flex h-full items-center justify-center">
              <div className="px-8 text-center">
                <h1
                  className={`
                    text-6xl font-light leading-none tracking-[-0.05em] text-white opacity-0 sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[14rem]
                    ${isLoaded ? 'animate-fade-in-up' : ''}
                  `}
                  style={{ textShadow: '0 0 40px rgba(255, 255, 255, 0.1)' }}
                >
                  silk
                </h1>

                <div
                  className={`
                    mt-8 text-lg font-extralight uppercase tracking-[0.2em] text-gray-300/80 opacity-0 mix-blend-overlay md:text-xl lg:text-2xl
                    ${isLoaded ? 'animate-fade-in-up-delay' : ''}
                  `}
                >
                  <span className="inline-block">flowing</span>
                  <span className="mx-4 text-gray-500">•</span>
                  <span className="inline-block">texture</span>
                  <span className="mx-4 text-gray-500">•</span>
                  <span className="inline-block">art</span>
                </div>
              </div>
            </div>

            <div
              className={`
                absolute left-8 top-8 z-30 text-xs font-light uppercase tracking-widest text-gray-500/40 opacity-0 mix-blend-overlay
                ${isLoaded ? 'animate-fade-in-corner' : ''}
              `}
            >
              2025
            </div>
          </>
        )}
      </div>
    </>
  );
};

// compatibility export from provided snippet
export const Component = SilkBackgroundAnimation;

