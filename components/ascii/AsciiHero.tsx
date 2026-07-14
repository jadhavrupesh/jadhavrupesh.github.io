import React, { useEffect, useRef, useCallback } from 'react';

// ASCII frames for a rotating wireframe cube
const CUBE_FRAMES = [
    [
        '    +--------+    ',
        '   /        /|    ',
        '  /        / |    ',
        ' +--------+  |    ',
        ' |        |  |    ',
        ' |        |  +    ',
        ' |        | /     ',
        ' +--------+/      ',
    ],
    [
        '     +-------+    ',
        '    /|      /|    ',
        '   / |     / |    ',
        '  +--+----+  |    ',
        '  |  |    |  |    ',
        '  |  +----+--+    ',
        '  | /     | /     ',
        '  +-------+/      ',
    ],
    [
        '      +------+    ',
        '     /|     /|    ',
        '    / |    / |    ',
        '   +--+---+  |    ',
        '   |  |   |  |    ',
        '   |  +---+--+    ',
        '   | /    | /     ',
        '   +------+/      ',
    ],
    [
        '       +-----+    ',
        '      /     /|    ',
        '     /     / |    ',
        '    +-----+  |    ',
        '    |     |  +    ',
        '    |     | /     ',
        '    |     |/      ',
        '    +-----+       ',
    ],
    [
        '      +------+    ',
        '     /      /|    ',
        '    /      / |    ',
        '   +------+  |    ',
        '   |      |  +    ',
        '   |      | /     ',
        '   |      |/      ',
        '   +------+       ',
    ],
    [
        '     +-------+    ',
        '    /       / |    ',
        '   /       /  |    ',
        '  +-------+   |    ',
        '  |       |   +    ',
        '  |       |  /     ',
        '  |       | /      ',
        '  +-------+/       ',
    ],
];

// A larger ASCII art of a mobile phone / developer workstation
const PHONE_ART = `
   ┌─────────────────┐
   │  ╔═══════════╗  │
   │  ║  RUPESH   ║  │
   │  ║   .EXE    ║  │
   │  ║           ║  │
   │  ║  ┌─────┐  ║  │
   │  ║  │ ▓▓▓ │  ║  │
   │  ║  │ ▓▓▓ │  ║  │
   │  ║  │ ▓▓▓ │  ║  │
   │  ║  └─────┘  ║  │
   │  ║           ║  │
   │  ╚═══════════╝  │
   │    ┌───────┐    │
   │    │  |||  │    │
   │    └───────┘    │
   └─────────────────┘
`;

const WORKSTATION_ART = `
  ┌────────────────────────┐
  │ RUPESH.EXE  v1.0  [■] │
  ├────────────────────────┤
  │                        │
  │  > LOADING PORTFOLIO   │
  │  > STATUS: ONLINE      │
  │  > CLASS: SR. DEV      │
  │                        │
  │  ████████████████ 100% │
  │                        │
  ├────────────────────────┤
  │ [F1]HELP [F2]SAVE [ESC]│
  └────────────────────────┘
     ││││││││││││││││││
  ┌──┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴──┐
  │  ┌──┐ ┌──────────┐  │
  │  │  │ │ ▓▓▓▓▓▓▓▓ │  │
  │  └──┘ └──────────┘  │
  └──────────────────────┘
`;

interface AsciiHeroProps {
    className?: string;
}

export const AsciiHero: React.FC<AsciiHeroProps> = ({ className }) => {
    const frameRef = useRef(0);
    const containerRef = useRef<HTMLPreElement>(null);
    const animFrameRef = useRef<number>(0);
    const lastTimeRef = useRef(0);

    const animate = useCallback((timestamp: number) => {
        if (timestamp - lastTimeRef.current > 500) { // Update every 500ms
            lastTimeRef.current = timestamp;
            frameRef.current = (frameRef.current + 1) % CUBE_FRAMES.length;
            if (containerRef.current) {
                containerRef.current.textContent = CUBE_FRAMES[frameRef.current].join('\n');
            }
        }
        animFrameRef.current = requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            if (containerRef.current) {
                containerRef.current.textContent = CUBE_FRAMES[0].join('\n');
            }
            return;
        }

        // Pause when tab is not visible
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
        <div className={className} aria-hidden="true">
            <pre
                ref={containerRef}
                className="ascii-art text-[var(--fg-primary)] opacity-70"
            >
                {CUBE_FRAMES[0].join('\n')}
            </pre>
        </div>
    );
};

export const AsciiWorkstation: React.FC<{ className?: string }> = ({ className }) => (
    <div className={className} aria-hidden="true">
        <pre className="ascii-art text-[var(--fg-primary)] opacity-60 text-[8px] sm:text-[10px] md:text-[11px]">
            {WORKSTATION_ART}
        </pre>
    </div>
);

export const AsciiPhone: React.FC<{ className?: string }> = ({ className }) => (
    <div className={className} aria-hidden="true">
        <pre className="ascii-art text-[var(--fg-primary)] opacity-60 text-[8px] sm:text-[10px] md:text-[12px]">
            {PHONE_ART}
        </pre>
    </div>
);
