import React, { useEffect, useState, useRef } from 'react';
import { skillData, educationData } from '../constants';
import { Badge } from '@/components/ui/badge';
import { AsciiTextLoader } from '@/components/retro/AsciiTextLoader';

// Minimalist, Industrial Real-Time Hexadecimal Memory Scanner (No container borders/backgrounds)
const AsciiSectorMap: React.FC = () => {
    const [sectors, setSectors] = useState<string[][]>([]);
    const frameCount = useRef(0);
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        const initial = Array(5).fill(0).map(() => 
            Array(8).fill(0).map(() => 
                Math.floor(Math.random() * 256).toString(16).toUpperCase().padStart(2, '0')
            )
        );
        setSectors(initial);
    }, []);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const updateSectors = () => {
            frameCount.current += 1;
            if (frameCount.current % 14 === 0) {
                setSectors(prev => {
                    return prev.map((row) => 
                        row.map((val) => {
                            if (Math.random() < 0.15) {
                                return Math.floor(Math.random() * 256).toString(16).toUpperCase().padStart(2, '0');
                            }
                            return val;
                        })
                    );
                });
            }
            timerRef.current = requestAnimationFrame(updateSectors);
        };

        timerRef.current = requestAnimationFrame(updateSectors);
        return () => {
            if (timerRef.current) cancelAnimationFrame(timerRef.current);
        };
    }, []);

    return (
        <div className="font-mono text-[9px] sm:text-[10px] text-[var(--fg-secondary)] select-none">
            <div className="flex items-center gap-2 text-[8px] uppercase tracking-[0.15em] text-[var(--fg-muted)] mb-2">
                <span>&gt;&gt; CORE_MEMORY_SCANNER</span>
                <span className="cursor-blink">■</span>
            </div>
            
            {/* Hex Map Printout */}
            <div className="leading-[1.4] opacity-80 overflow-x-auto">
                {sectors.map((row, idx) => (
                    <div key={idx} className="flex gap-3 whitespace-nowrap">
                        <span className="text-[var(--fg-muted)]">00{idx}0:</span>
                        <span>{row.join(' ')}</span>
                        <span className="text-[var(--fg-muted)]">|</span>
                        <span className="text-[var(--fg-primary)]">
                            {row.map(val => {
                                const code = parseInt(val, 16);
                                return (code >= 33 && code <= 126) ? String.fromCharCode(code) : '.';
                            }).join('')}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SkillsPage: React.FC = () => {
    return (
        <div className="motion-page space-y-8 max-w-3xl">
            {/* Header */}
            <header className="space-y-1">
                <div className="text-[9px] text-[var(--fg-muted)] tracking-wider uppercase">&gt; INVENTORY_SYS_CHECK // VERSION_1.0</div>
                <h1 className="font-pixel text-base sm:text-lg uppercase tracking-[0.03em] text-[var(--fg-primary)]">
                    <AsciiTextLoader text="SYSTEM DIAGNOSTICS" delay={50} speed={25} />
                </h1>
                <p className="mt-1 text-xs text-[var(--fg-secondary)] max-w-xl">
                    <AsciiTextLoader text="Player capabilities and active technology modules." delay={100} speed={12} />
                </p>
                <div className="h-px bg-[var(--border-default)] w-full opacity-30 mt-3" />
            </header>

            {/* Dynamic Memory Sector Scanner */}
            <section className="py-2">
                <AsciiSectorMap />
            </section>

            {/* ASCII Divider Line */}
            <div className="text-[10px] text-[var(--fg-muted)] font-mono select-none">
                ======================================================================
            </div>

            {/* Skills Core Matrix: Minimalist Industrial List */}
            <section className="space-y-6">
                <div className="text-[10px] text-[var(--fg-muted)] font-mono select-none uppercase">
                    &gt;&gt; LOADED_CAPABILITIES_DIRECTORY
                </div>

                <div className="space-y-5 font-mono">
                    {skillData.map((category, idx) => {
                        const skillsString = category.skills.join(' • ');
                        const delayOffset = idx * 180; // Stagger categories loading by 180ms
                        
                        return (
                            <div 
                                key={category.title}
                                className="space-y-1"
                            >
                                {/* Directory Category Header with decoding loader */}
                                <div className="flex items-center gap-2 text-[10px] font-bold text-[var(--fg-primary)] select-none">
                                    <AsciiTextLoader 
                                        text={`[${String(idx + 1).padStart(2, '0')}] ${category.title.replace('/', ' & ').toUpperCase()}`} 
                                        delay={delayOffset}
                                        speed={50}
                                    />
                                    <span className="text-[var(--fg-muted)] font-normal text-[9px] tracking-normal">
                                        // {category.skills.length} MODULES
                                    </span>
                                </div>

                                {/* Comma-separated minimal skill loadout with decoding loader */}
                                <div className="text-xs text-[var(--fg-secondary)] leading-relaxed pl-6 hover:text-[var(--fg-primary)] transition-colors">
                                    <AsciiTextLoader 
                                        text={skillsString} 
                                        delay={delayOffset + 120} // Delay skills load until header starts resolving
                                        speed={30}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ASCII Divider Line */}
            <div className="text-[10px] text-[var(--fg-muted)] font-mono select-none">
                ======================================================================
            </div>

            {/* Education Records */}
            <section className="space-y-3 font-mono">
                <div className="text-[10px] text-[var(--fg-muted)] font-mono select-none uppercase">
                    &gt;&gt; TRAINING_RECORD_ARCHIVE
                </div>
                
                <div className="pl-6 space-y-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                        <span className="text-xs font-bold text-[var(--fg-primary)] uppercase">
                            <AsciiTextLoader text={educationData.degree} delay={1300} speed={45} />
                        </span>
                        <span className="text-[10px] text-[var(--fg-muted)] border border-[var(--border-default)] px-1.5 py-0.5" style={{ borderRadius: 'var(--radius-sm)' }}>
                            {educationData.duration}
                        </span>
                    </div>
                    <div className="text-[11px] text-[var(--fg-secondary)] uppercase">
                        <AsciiTextLoader text={educationData.institution} delay={1450} speed={45} />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SkillsPage;
