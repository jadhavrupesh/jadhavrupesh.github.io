import React from 'react';
import { Wrench } from 'lucide-react';
import { skillData } from '../constants';
import type { SkillCategory } from '../types';
import { useTheme } from '../components/ThemeContext';

const CARD_BASE =
    'rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-transparent shadow-[0_24px_60px_-28px_rgba(0,0,0,0.85)] backdrop-blur-md transition-all duration-300 hover:border-white/[0.14] hover:from-white/[0.07]';

const Skills: React.FC<{ items: SkillCategory[] }> = ({ items }) => {
    const { palette } = useTheme();

    return (
        <div className="grid gap-6 md:grid-cols-2">
            {items.map((category) => (
                <article key={category.title} className={`${CARD_BASE} p-5 md:p-6`}>
                    <h4
                        className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] md:text-[0.8rem]"
                        style={{ color: palette.textMuted }}
                    >
                        {category.title}
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                        {category.skills.map((skill) => (
                            <span
                                key={skill}
                                className="rounded-full border border-white/[0.09] bg-white/[0.03] px-3 py-1.5 text-xs font-medium md:text-[0.8125rem]"
                                style={{ color: palette.text }}
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </article>
            ))}
        </div>
    );
};

const SkillsPage: React.FC = () => {
    const { palette } = useTheme();

    return (
        <div className="w-full py-16 md:py-20">
            <header className="mb-12 md:mb-14">
                <div
                    className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] md:text-xs"
                    style={{ color: palette.textMuted }}
                >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-neutral-300">
                        <Wrench className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                    </span>
                    Toolbox
                </div>
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl" style={{ color: palette.textStrong ?? palette.text }}>
                    Skills
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed md:text-[0.95rem]" style={{ color: palette.textMuted }}>
                    A practical stack I use to build, ship, and maintain reliable Android, Flutter, and cross-platform products.
                </p>
                <div
                    className="mt-5 h-px max-w-xs bg-gradient-to-r from-white/25 via-white/10 to-transparent"
                    aria-hidden
                />
            </header>
            <Skills items={skillData} />
        </div>
    );
};

export default SkillsPage;
