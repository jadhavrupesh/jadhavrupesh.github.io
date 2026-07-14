import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SectionHeading } from '@/components/retro/RetroComponents';
import { AsciiTextLoader } from '@/components/retro/AsciiTextLoader';

// ASCII waveform characters
const WAVE_CHARS = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];

const AsciiEqualizer: React.FC = () => {
    const [bars, setBars] = useState<number[]>(Array(16).fill(0));
    const animFrameRef = useRef<number>(0);
    const lastTimeRef = useRef(0);

    const animate = useCallback((timestamp: number) => {
        if (timestamp - lastTimeRef.current > 200) {
            lastTimeRef.current = timestamp;
            setBars(prev => prev.map(() => Math.floor(Math.random() * WAVE_CHARS.length)));
        }
        animFrameRef.current = requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            setBars(Array(16).fill(3));
            return;
        }

        const handleVisibility = () => {
            if (document.hidden) {
                cancelAnimationFrame(animFrameRef.current);
            } else {
                animFrameRef.current = requestAnimationFrame(animate);
            }
        };

        document.addEventListener('visibilitychange', handleVisibility);
        animFrameRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animFrameRef.current);
            document.removeEventListener('visibilitychange', handleVisibility);
        };
    }, [animate]);

    return (
        <div className="flex items-end gap-0.5 h-8" aria-hidden="true">
            {bars.map((level, i) => (
                <span key={i} className="text-[var(--fg-primary)] text-sm leading-none opacity-50">
                    {WAVE_CHARS[level]}
                </span>
            ))}
        </div>
    );
};

const MusicPage: React.FC = () => {
    return (
        <div className="motion-page space-y-8">
            {/* Header */}
            <header>
                <div className="text-[10px] text-[var(--fg-muted)] mb-2">&gt; INITIALIZING AUDIO_SUBSYSTEM...</div>
                <h1 className="font-pixel text-base sm:text-lg uppercase tracking-[0.03em] text-[var(--fg-primary)]">
                    <AsciiTextLoader text="SOUND TEST" delay={50} speed={25} />
                </h1>
                <p className="mt-2 text-xs text-[var(--fg-secondary)] max-w-xl">
                    <AsciiTextLoader text="A minimal space for playlists, mixes, or anything music-related." delay={100} speed={12} />
                </p>
                <div className="mt-3 h-px bg-[var(--border-default)]" />
            </header>

            {/* Audio Player Interface */}
            <section>
                <SectionHeading number="01" title="AUDIO_PLAYER" subtitle="Retro sound system" />
                <div
                    className="border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 max-w-lg"
                    style={{ borderRadius: 'var(--radius-md)' }}
                >
                    {/* Equalizer */}
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[9px] uppercase tracking-[0.15em] text-[var(--fg-muted)]">
                            ┌ EQUALIZER ┐
                        </span>
                        <span className="text-[9px] uppercase tracking-[0.15em] text-[var(--fg-muted)]">
                            STANDBY
                        </span>
                    </div>
                    <AsciiEqualizer />

                    {/* Now Playing */}
                    <div className="mt-6 border-t border-[var(--border-default)] pt-4">
                        <div className="text-[9px] uppercase tracking-[0.15em] text-[var(--fg-muted)] mb-2">
                            NOW PLAYING:
                        </div>
                        <div className="text-xs text-[var(--fg-secondary)]">
                            <AsciiTextLoader text="-- NO TRACK LOADED --" delay={150} speed={25} />
                        </div>
                    </div>

                    {/* Track List */}
                    <div className="mt-6 border-t border-[var(--border-default)] pt-4">
                        <div className="text-[9px] uppercase tracking-[0.15em] text-[var(--fg-muted)] mb-3">
                            TRACK LIST:
                        </div>
                        <div className="text-xs text-[var(--fg-muted)] text-center py-4">
                            <AsciiTextLoader text="Coming soon — playlists and mixes will appear here." delay={300} speed={12} />
                        </div>
                    </div>

                    {/* Volume Indicator */}
                    <div className="mt-4 flex items-center gap-2">
                        <span className="text-[9px] text-[var(--fg-muted)] uppercase tracking-[0.12em] shrink-0">
                            VOL:
                        </span>
                        <div className="flex-1 h-1.5 bg-[var(--bg-muted)] border border-[var(--border-default)]">
                            <div className="h-full w-2/3 bg-[var(--fg-primary)]" />
                        </div>
                        <span className="text-[9px] text-[var(--fg-muted)]">66%</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MusicPage;
