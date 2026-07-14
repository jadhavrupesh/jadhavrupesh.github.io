import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface RetroFlowerProps {
    className?: string;
}

// ASCII character density ramp
const ASCII_CHARS = [' ', '.', ':', '-', '=', '+', '*', '#', '%', '@', '█'];

export const RetroFlower: React.FC<RetroFlowerProps> = ({ className }) => {
    const [asciiText, setAsciiText] = useState<string>('');
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const requestRef = useRef<number | null>(null);
    const frameCountRef = useRef<number>(0);

    useEffect(() => {
        // Load the dithered flower image
        const img = new Image();
        img.src = '/retro_flower.jpg';
        img.onload = () => {
            imageRef.current = img;
            
            // Create offscreen canvas for pixel reading
            const canvas = document.createElement('canvas');
            canvas.width = 54;  // Width in ASCII characters
            canvas.height = 42; // Height in ASCII characters
            canvasRef.current = canvas;
        };

        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const animate = () => {
            const img = imageRef.current;
            const canvas = canvasRef.current;
            if (!img || !canvas) {
                requestRef.current = requestAnimationFrame(animate);
                return;
            }

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Draw to small offscreen canvas
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Get pixel data
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imgData.data;

            // Increment frames
            frameCountRef.current += 1;
            
            // Animate brightness (throbbing glow)
            const glow = Math.sin(frameCountRef.current * 0.04) * 12 + 8;

            let ascii = '';

            for (let y = 0; y < canvas.height; y++) {
                let line = '';

                for (let x = 0; x < canvas.width; x++) {
                    const idx = (y * canvas.width + x) * 4;
                    const r = data[idx];
                    const g = data[idx + 1];
                    const b = data[idx + 2];

                    // Grayscale conversion
                    let brightness = 0.299 * r + 0.587 * g + 0.114 * b;

                    // Apply throbbing glow animation to midtones/highlights
                    if (brightness > 15) {
                        brightness = Math.min(255, brightness + glow);
                    }

                    // Map brightness to ASCII character index
                    const charIndex = Math.floor((brightness / 255) * (ASCII_CHARS.length - 1));

                    line += ASCII_CHARS[charIndex];
                }
                ascii += line + '\n';
            }

            setAsciiText(ascii);
            requestRef.current = requestAnimationFrame(animate);
        };

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            // Render a single static ASCII frame
            const renderStatic = () => {
                const img = imageRef.current;
                const canvas = canvasRef.current;
                if (!img || !canvas) {
                    setTimeout(renderStatic, 100);
                    return;
                }
                const ctx = canvas.getContext('2d');
                if (!ctx) return;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
                let ascii = '';
                for (let y = 0; y < canvas.height; y++) {
                    let line = '';
                    for (let x = 0; x < canvas.width; x++) {
                        const idx = (y * canvas.width + x) * 4;
                        const r = data[idx];
                        const g = data[idx + 1];
                        const b = data[idx + 2];
                        const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
                        const charIndex = Math.floor((brightness / 255) * (ASCII_CHARS.length - 1));
                        line += ASCII_CHARS[charIndex];
                    }
                    ascii += line + '\n';
                }
                setAsciiText(ascii);
            };
            renderStatic();
        } else {
            requestRef.current = requestAnimationFrame(animate);
        }

        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, []);

    return (
        <div
            className={cn(
                'relative w-full flex justify-center items-center select-none font-mono text-[7px] sm:text-[8px] md:text-[9px] leading-[0.95] tracking-[0.04em] text-[var(--fg-primary)] overflow-hidden retro-flower-animate',
                className
            )}
            style={{ minHeight: '340px' }}
            aria-hidden="true"
        >
            <pre className="whitespace-pre font-mono text-[var(--fg-primary)] opacity-85">
                {asciiText || 'LOADING BITMAP_TO_ASCII.EXE...'}
            </pre>
        </div>
    );
};
