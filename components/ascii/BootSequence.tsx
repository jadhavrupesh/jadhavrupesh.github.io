import React, { useState, useEffect, useCallback } from 'react';
import { playBootBeep, playBeep } from '@/lib/sound';

const BOOT_LINES = [
    'RUPESH.EXE BIOS v1.0.0',
    'Copyright (C) 2024 Rupesh Jadhav',
    '',
    'Checking system memory... 640K OK',
    'Detecting hardware... PORTFOLIO_ENGINE found',
    'Loading modules... FLUTTER.DRV, ANDROID.SYS, KMP.MOD',
    'Initializing display adapter... MONOCHROME CRT',
    '',
    'C:\\> RUPESH.EXE --load-portfolio',
    '> Portfolio loaded successfully.',
    '> Welcome, User.',
    '',
];

interface BootSequenceProps {
    onComplete: () => void;
    skip?: boolean;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete, skip = false }) => {
    const [visibleLines, setVisibleLines] = useState<number>(0);
    const [isComplete, setIsComplete] = useState(false);

    const handleSkip = useCallback(() => {
        setVisibleLines(BOOT_LINES.length);
        setIsComplete(true);
        onComplete();
    }, [onComplete]);

    useEffect(() => {
        // Check if boot was already shown this session
        const alreadyBooted = sessionStorage.getItem('rupesh_exe_booted');
        if (alreadyBooted || skip) {
            handleSkip();
            return;
        }

        // Check reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            handleSkip();
            return;
        }

        const timer = setInterval(() => {
            setVisibleLines(prev => {
                if (prev >= BOOT_LINES.length) {
                    clearInterval(timer);
                    setTimeout(() => {
                        setIsComplete(true);
                        sessionStorage.setItem('rupesh_exe_booted', 'true');
                        onComplete();
                    }, 400);
                    return prev;
                }

                // Play dual-tone BIOS chime on start, and tiny tick note for logging lines
                if (prev === 0) {
                    playBootBeep();
                } else {
                    playBeep(600, 0.012, 'sine');
                }

                return prev + 1;
            });
        }, 120);

        return () => clearInterval(timer);
    }, [onComplete, skip, handleSkip]);

    if (isComplete && sessionStorage.getItem('rupesh_exe_booted')) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--bg-primary)]"
            role="status"
            aria-label="Loading portfolio"
        >
            <div className="w-full max-w-xl px-6">
                <div className="text-[10px] sm:text-xs leading-relaxed text-[var(--fg-secondary)] font-[family-name:var(--font-mono)]">
                    {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
                        <div key={i} className="boot-line min-h-[1.4em]">
                            {line || '\u00A0'}
                        </div>
                    ))}
                    {!isComplete && (
                        <span className="cursor-blink-block text-[var(--fg-primary)]" />
                    )}
                </div>

                {!isComplete && (
                    <button
                        onClick={handleSkip}
                        className="mt-8 text-[9px] uppercase tracking-[0.15em] text-[var(--fg-muted)] border border-[var(--border-default)] px-3 py-1 hover:text-[var(--fg-primary)] hover:border-[var(--border-strong)] transition-colors"
                        style={{ borderRadius: 'var(--radius-sm)' }}
                    >
                        [ SKIP ]
                    </button>
                )}
            </div>
        </div>
    );
};
