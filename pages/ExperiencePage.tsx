import React, { useState } from 'react';
import { experienceData, projectData } from '../constants';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { SectionHeading } from '@/components/retro/RetroComponents';
import { AsciiTextLoader } from '@/components/retro/AsciiTextLoader';

const ExperiencePage: React.FC = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

    return (
        <div className="motion-page space-y-8">
            {/* Header */}
            <header>
                <div className="text-[10px] text-[var(--fg-muted)] mb-2">&gt; ACCESSING MISSION_LOG.DAT...</div>
                <h1 className="font-pixel text-base sm:text-lg uppercase tracking-[0.03em] text-[var(--fg-primary)]">
                    <AsciiTextLoader text="MISSION LOG" delay={50} speed={25} />
                </h1>
                <p className="mt-2 text-xs text-[var(--fg-secondary)] max-w-xl">
                    <AsciiTextLoader text="Mobile engineering across banking, hospitality, logistics, and commerce." delay={100} speed={12} />
                </p>
                <div className="mt-3 h-px bg-[var(--border-default)]" />
            </header>

            {/* Experience */}
            <section>
                <SectionHeading number="01" title="DEPLOYMENTS" subtitle="Active and completed missions" />
                <div className="motion-stagger space-y-3">
                    {experienceData.map((item, index) => (
                        <article
                            key={`${item.company}-${item.role}`}
                            className="border border-[var(--border-default)] bg-[var(--bg-surface)] transition-colors"
                            style={{ borderRadius: 'var(--radius-md)' }}
                        >
                            {/* Mission Header */}
                            <button
                                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                                className="w-full text-left p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 hover:bg-[var(--bg-muted)] transition-colors"
                                aria-expanded={expandedIndex === index}
                                aria-controls={`mission-${index}`}
                            >
                                <div className="flex items-start gap-3">
                                    <span className="text-[10px] text-[var(--fg-muted)] mt-0.5 shrink-0">
                                        {expandedIndex === index ? '▼' : '▶'}
                                    </span>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] text-[var(--fg-muted)] uppercase tracking-[0.15em]">
                                                MISSION_{String(index + 1).padStart(2, '0')}
                                            </span>
                                            {index === 0 && (
                                                <span className="text-[8px] uppercase tracking-[0.15em] text-[var(--fg-primary)] border border-[var(--border-strong)] px-1 py-px">
                                                    LATEST
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-xs font-semibold uppercase tracking-[0.06em] text-[var(--fg-primary)] mt-1">
                                            <AsciiTextLoader text={item.role} delay={index * 120} speed={25} />
                                        </h3>
                                        <p className="text-[10px] text-[var(--fg-muted)] uppercase tracking-[0.08em] mt-0.5">
                                            EMPLOYER: <AsciiTextLoader text={item.company} delay={index * 120 + 80} speed={25} />
                                        </p>
                                    </div>
                                </div>
                                <Badge>{item.duration}</Badge>
                            </button>

                            {/* Mission Details */}
                            {expandedIndex === index && (
                                <div
                                    id={`mission-${index}`}
                                    className="border-t border-[var(--border-default)] p-4 space-y-3"
                                >
                                    <div>
                                        <span className="text-[9px] uppercase tracking-[0.15em] text-[var(--fg-muted)]">
                                            OBJECTIVES:
                                        </span>
                                        <ul className="mt-2 space-y-2">
                                            {item.description.map((desc, i) => (
                                                <li key={i} className="flex gap-2 text-[11px] text-[var(--fg-secondary)] leading-relaxed">
                                                    <span className="text-[var(--fg-muted)] shrink-0 mt-0.5">├─</span>
                                                    <span>
                                                        <AsciiTextLoader text={desc} delay={i * 120} speed={12} />
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </article>
                    ))}
                </div>
            </section>

            {/* Projects */}
            <section>
                <SectionHeading number="02" title="SIDE_QUESTS" subtitle="Personal and client projects" />
                <div className="motion-stagger grid gap-3 sm:grid-cols-2">
                    {projectData.map((project, idx) => (
                        <Card key={project.name}>
                            <CardContent className="p-4 space-y-3">
                                <div>
                                    <h3 className="text-xs font-semibold uppercase tracking-[0.06em] text-[var(--fg-primary)]">
                                        <AsciiTextLoader text={project.name} delay={idx * 150} speed={25} />
                                    </h3>
                                    <p className="text-[10px] text-[var(--fg-muted)] mt-0.5">{project.duration}</p>
                                </div>

                                <div>
                                    <span className="text-[9px] uppercase tracking-[0.15em] text-[var(--fg-muted)]">
                                        TECH LOADOUT:
                                    </span>
                                    <div className="mt-1 flex flex-wrap gap-1">
                                        {project.technologies.split(',').map((tech) => (
                                            <Badge key={tech.trim()}>{tech.trim()}</Badge>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <span className="text-[9px] uppercase tracking-[0.15em] text-[var(--fg-muted)]">
                                        RESULTS:
                                    </span>
                                    <ul className="mt-1 space-y-1">
                                        {project.description.map((desc, i) => (
                                            <li key={i} className="text-[10px] text-[var(--fg-secondary)] leading-relaxed flex gap-1.5">
                                                <span className="text-[var(--fg-muted)] shrink-0">▸</span>
                                                <span>
                                                    <AsciiTextLoader text={desc} delay={idx * 150 + i * 100} speed={12} />
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ExperiencePage;
