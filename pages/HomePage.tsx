import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Github, Linkedin, MapPin, ExternalLink } from 'lucide-react';
import { personalInfo, professionalSummary, skillData, experienceData } from '../constants';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { RetroFlower } from '@/components/retro/RetroFlower';
import { AsciiTextLoader } from '@/components/retro/AsciiTextLoader';
import { SectionHeading, StatusIndicator, TerminalPanel } from '@/components/retro/RetroComponents';

const stack = ['Flutter', 'Android', 'Kotlin', 'Dart', 'KMP', 'Clean Architecture'];

const HomePage: React.FC = () => {
    return (
        <div className="motion-page space-y-8">
            {/* ── Hero Section ── */}
            <section className="grid gap-6 lg:grid-cols-[1fr_280px] items-start">
                {/* Left: Player Info */}
                <div className="space-y-6">
                    {/* Boot Status */}
                    <div className="text-[10px] text-[var(--fg-muted)] space-y-0.5">
                        <div>&gt; SYSTEM READY</div>
                        <div>&gt; LOADING PLAYER PROFILE...</div>
                        <div className="text-[var(--fg-secondary)]">&gt; PROFILE LOADED SUCCESSFULLY</div>
                    </div>

                    {/* Name & Role */}
                    <div>
                        <h1 className="font-pixel text-lg sm:text-xl md:text-2xl uppercase tracking-[0.03em] text-[var(--fg-primary)] leading-tight">
                            <AsciiTextLoader text="Rupesh Jadhav" delay={120} speed={55} />
                        </h1>
                        <p className="mt-2 text-sm uppercase tracking-[0.1em] text-[var(--fg-secondary)]">
                            <AsciiTextLoader text="Senior Mobile Developer" delay={240} speed={45} />
                        </p>
                    </div>

                    {/* Summary */}
                    <p className="text-xs leading-relaxed text-[var(--fg-secondary)] max-w-xl">
                        <AsciiTextLoader text={professionalSummary} delay={380} speed={18} />
                    </p>

                    {/* Status & Location */}
                    <div className="flex flex-wrap gap-4">
                        <StatusIndicator active label="AVAILABLE FOR WORK" />
                        <span className="inline-flex items-center gap-1 text-[10px] text-[var(--fg-muted)] uppercase tracking-[0.1em]">
                            <MapPin className="h-3 w-3" />
                            {personalInfo.location}
                        </span>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-3">
                        <Button asChild variant="retro">
                            <Link to="/experience">[ VIEW WORK ]</Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link to="/game">[ GAME ]</Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link to="/contact">
                                <Mail className="h-3 w-3" />
                                [ CONTACT ]
                            </Link>
                        </Button>
                    </div>

                    {/* Social */}
                    <div className="flex gap-3">
                        <a
                            href={personalInfo.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.1em] text-[var(--fg-muted)] hover:text-[var(--fg-primary)] transition-colors"
                            aria-label="GitHub Profile"
                        >
                            <Github className="h-3.5 w-3.5" />
                            GITHUB
                            <ExternalLink className="h-2.5 w-2.5" />
                        </a>
                        <a
                            href={personalInfo.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.1em] text-[var(--fg-muted)] hover:text-[var(--fg-primary)] transition-colors"
                            aria-label="LinkedIn Profile"
                        >
                            <Linkedin className="h-3.5 w-3.5" />
                            LINKEDIN
                            <ExternalLink className="h-2.5 w-2.5" />
                        </a>
                    </div>
                </div>

                {/* Right: ASCII Art + Stats */}
                <div className="hidden lg:block space-y-4">
                    <RetroFlower />

                    {/* Player Stats Panel */}
                    <div className="space-y-1.5 text-[10px] px-2 py-3 border border-[var(--border-default)]" style={{ borderRadius: 'var(--radius-md)', background: 'var(--bg-surface)' }}>
                        <div className="flex justify-between">
                            <span className="text-[var(--fg-muted)]">PLAYER:</span>
                            <span className="text-[var(--fg-primary)]"><AsciiTextLoader text="RUPESH JADHAV" delay={450} speed={50} /></span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[var(--fg-muted)]">CLASS:</span>
                            <span className="text-[var(--fg-primary)]"><AsciiTextLoader text="SR. MOBILE DEV" delay={520} speed={50} /></span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[var(--fg-muted)]">SPEC:</span>
                            <span className="text-[var(--fg-primary)]"><AsciiTextLoader text="FLUTTER / ANDROID / KMP" delay={590} speed={40} /></span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[var(--fg-muted)]">EXP:</span>
                            <span className="text-[var(--fg-primary)]"><AsciiTextLoader text="5+ YEARS" delay={660} speed={50} /></span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[var(--fg-muted)]">LOCATION:</span>
                            <span className="text-[var(--fg-primary)]"><AsciiTextLoader text="MUMBAI, INDIA" delay={730} speed={50} /></span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[var(--fg-muted)]">STATUS:</span>
                            <StatusIndicator active label="ONLINE" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Mobile Stats Panel (visible on small screens) ── */}
            <div className="lg:hidden px-3 py-3 border border-[var(--border-default)]" style={{ borderRadius: 'var(--radius-md)', background: 'var(--bg-surface)' }}>
                <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                    <div>
                        <span className="text-[var(--fg-muted)]">CLASS: </span>
                        <span className="text-[var(--fg-primary)]"><AsciiTextLoader text="SR. MOBILE DEV" delay={450} speed={50} /></span>
                    </div>
                    <div>
                        <span className="text-[var(--fg-muted)]">SPEC: </span>
                        <span className="text-[var(--fg-primary)]"><AsciiTextLoader text="FLUTTER / KMP" delay={520} speed={50} /></span>
                    </div>
                    <div>
                        <span className="text-[var(--fg-muted)]">EXP: </span>
                        <span className="text-[var(--fg-primary)]"><AsciiTextLoader text="5+ YEARS" delay={590} speed={50} /></span>
                    </div>
                    <div>
                        <span className="text-[var(--fg-muted)]">STATUS: </span>
                        <StatusIndicator active label="ONLINE" />
                    </div>
                </div>
            </div>

            {/* ── Experience Preview ── */}
            <section>
                <SectionHeading number="01" title="MISSION_LOG" subtitle="Recent deployments" />
                <div className="motion-stagger space-y-3">
                    {experienceData.map((item) => (
                        <Card key={`${item.company}-${item.role}`}>
                            <CardContent className="p-4">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                                    <div>
                                        <h3 className="text-xs font-semibold uppercase tracking-[0.06em] text-[var(--fg-primary)]">
                                            <AsciiTextLoader text={item.role} delay={800} speed={40} />
                                        </h3>
                                        <p className="text-[10px] text-[var(--fg-muted)] uppercase tracking-[0.08em] mt-0.5">
                                            <AsciiTextLoader text={`@ ${item.company}`} delay={870} speed={40} />
                                        </p>
                                    </div>
                                    <Badge>{item.duration}</Badge>
                                </div>
                                <p className="mt-2 text-[11px] text-[var(--fg-secondary)] leading-relaxed line-clamp-2">
                                    <AsciiTextLoader text={item.description[0]} delay={950} speed={18} />
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="mt-4 text-center">
                    <Button asChild variant="ghost" size="sm">
                        <Link to="/experience">[ VIEW ALL MISSIONS → ]</Link>
                    </Button>
                </div>
            </section>

            {/* ── Core Stack ── */}
            <section>
                <SectionHeading number="02" title="TECH_LOADOUT" subtitle="Primary equipment" />
                <div className="flex flex-wrap gap-2">
                    {stack.map((item) => (
                        <Badge key={item}>{item}</Badge>
                    ))}
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {skillData.slice(0, 3).map((category) => (
                        <Card key={category.title}>
                            <CardContent className="p-3">
                                <h3 className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--fg-muted)] mb-2">
                                    {category.title}
                                </h3>
                                <div className="flex flex-wrap gap-1">
                                    {category.skills.slice(0, 5).map((skill) => (
                                        <span
                                            key={skill}
                                            className="text-[10px] text-[var(--fg-secondary)] border border-[var(--border-default)] px-1.5 py-0.5"
                                            style={{ borderRadius: 'var(--radius-sm)' }}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="mt-4 text-center">
                    <Button asChild variant="ghost" size="sm">
                        <Link to="/skills">[ FULL INVENTORY → ]</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
