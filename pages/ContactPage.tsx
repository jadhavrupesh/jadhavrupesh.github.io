import React from 'react';
import { Github, Linkedin, Mail, MapPin, Phone, ExternalLink } from 'lucide-react';
import { personalInfo } from '../constants';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/retro/RetroComponents';
import { AsciiTextLoader } from '@/components/retro/AsciiTextLoader';

const contacts = [
    { icon: Mail, label: 'EMAIL', value: personalInfo.email, href: `mailto:${personalInfo.email}`, external: false },
    { icon: Phone, label: 'PHONE', value: personalInfo.phone, href: `tel:${personalInfo.phone}`, external: false },
    { icon: Linkedin, label: 'LINKEDIN', value: 'rupesh-jadhav', href: personalInfo.linkedin, external: true },
    { icon: Github, label: 'GITHUB', value: 'jadhavrupesh', href: personalInfo.github, external: true },
    { icon: MapPin, label: 'LOCATION', value: personalInfo.location, href: 'https://maps.google.com/?q=Mumbai,India', external: true },
];

const ContactPage: React.FC = () => {
    const mailtoHref = `mailto:${personalInfo.email}?subject=${encodeURIComponent('Project Inquiry from Portfolio')}&body=${encodeURIComponent('Hi Rupesh,\n\nI visited your portfolio and would like to discuss...\n')}`;

    return (
        <div className="motion-page space-y-8">
            {/* Header */}
            <header>
                <div className="text-[10px] text-[var(--fg-muted)] mb-2">&gt; OPENING COMMUNICATION_CHANNEL...</div>
                <h1 className="font-pixel text-base sm:text-lg uppercase tracking-[0.03em] text-[var(--fg-primary)]">
                    <AsciiTextLoader text="OPEN_COMMUNICATION_CHANNEL" delay={50} speed={25} />
                </h1>
                <p className="mt-2 text-xs text-[var(--fg-secondary)] max-w-xl">
                    <AsciiTextLoader text="Reach out for mobile app work, Flutter/KMP builds, or product engineering roles." delay={100} speed={12} />
                </p>
                <div className="mt-3 h-px bg-[var(--border-default)]" />
            </header>

            {/* Contact Links */}
            <section>
                <SectionHeading number="01" title="CONTACT_CHANNELS" subtitle="Available communication endpoints" />
                <div className="motion-stagger space-y-2 max-w-lg">
                    {contacts.map(({ icon: Icon, label, value, href, external }, index) => (
                        <a
                            key={label}
                            href={href}
                            target={external ? '_blank' : undefined}
                            rel={external ? 'noopener noreferrer' : undefined}
                            className="flex items-center gap-3 p-3 border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--fg-secondary)] hover:bg-[var(--fg-primary)] hover:text-[var(--fg-inverse)] transition-colors group"
                            style={{ borderRadius: 'var(--radius-md)' }}
                        >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-[var(--border-strong)] group-hover:border-[var(--fg-inverse)]">
                                <Icon className="h-3.5 w-3.5" />
                            </span>
                            <span className="min-w-0 flex-1">
                                <span className="block text-[9px] font-semibold uppercase tracking-[0.14em] text-[var(--fg-muted)] group-hover:text-[var(--fg-inverse)] opacity-70">
                                    {label}
                                </span>
                                <span className="block truncate text-xs font-medium">
                                    <AsciiTextLoader text={value} delay={200 + index * 100} speed={25} />
                                </span>
                            </span>
                            {external && (
                                <ExternalLink className="h-3 w-3 shrink-0 text-[var(--fg-muted)] group-hover:text-[var(--fg-inverse)]" />
                            )}
                        </a>
                    ))}
                </div>
            </section>

            {/* Quick Message */}
            <section>
                <SectionHeading number="02" title="SEND_MESSAGE" subtitle="Opens your email client" />
                <Card className="max-w-lg">
                    <CardContent className="p-4 space-y-4">
                        <div className="text-[10px] text-[var(--fg-muted)] space-y-0.5">
                            <div>&gt; TO: {personalInfo.email}</div>
                            <div>&gt; SUBJECT: Project Inquiry from Portfolio</div>
                            <div>&gt; METHOD: mailto: (opens your email client)</div>
                        </div>

                        <div className="border-t border-[var(--border-default)] pt-4">
                            <p className="text-xs text-[var(--fg-secondary)] mb-4">
                                <AsciiTextLoader text="Clicking below will open your default email client with a pre-filled message. No data is collected or sent through this form." delay={700} speed={10} />
                            </p>
                            <Button asChild variant="retro">
                                <a href={mailtoHref}>
                                    <Mail className="h-3.5 w-3.5" />
                                    [ COMPOSE MESSAGE ]
                                </a>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Availability */}
            <section>
                <Card className="max-w-lg">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-[var(--fg-primary)] cursor-blink" />
                            <span className="text-[10px] uppercase tracking-[0.12em] text-[var(--fg-secondary)]">
                                <AsciiTextLoader text="Currently available for freelance and full-time opportunities" delay={850} speed={15} />
                            </span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                            <Badge>Flutter</Badge>
                            <Badge>Android</Badge>
                            <Badge>KMP</Badge>
                            <Badge>Mobile Architecture</Badge>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
};

export default ContactPage;
