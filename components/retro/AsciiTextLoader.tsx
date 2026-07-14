import React, { useEffect, useState } from 'react';

interface AsciiTextLoaderProps {
    text: string;
    delay?: number;
    speed?: number;
    className?: string;
}

export const AsciiTextLoader: React.FC<AsciiTextLoaderProps> = ({
    text,
    delay = 0,
    speed = 30,
    className
}) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            setDisplayedText(text);
            return;
        }

        const glyphs = '█▓▒░#$@%&*+=:?';
        let currentIteration = 0;
        const totalLength = text.length;

        const startTimeout = setTimeout(() => {
            const interval = setInterval(() => {
                setDisplayedText(() => {
                    return text
                        .split('')
                        .map((char, index) => {
                            if (index < currentIteration) {
                                return char;
                            }
                            // Keep spacing, indicators, brackets, and line breaks stable
                            if (
                                char === ' ' || 
                                char === '•' || 
                                char === '[' || 
                                char === ']' || 
                                char === '>' ||
                                char === ':' ||
                                char === '\n'
                            ) {
                                return char;
                            }
                            return glyphs[Math.floor(Math.random() * glyphs.length)];
                        })
                        .join('');
                });

                // Auto-scale resolution steps based on text length for a natural, consistent decode speed
                const step = Math.max(1, Math.floor(totalLength / 22));
                currentIteration += step;
                if (currentIteration >= totalLength) {
                    clearInterval(interval);
                }
            }, speed);

            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(startTimeout);
    }, [text, delay, speed]);

    return <span className={className}>{displayedText}</span>;
};
