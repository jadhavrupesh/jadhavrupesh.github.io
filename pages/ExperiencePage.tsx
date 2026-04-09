import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Briefcase, FolderKanban } from 'lucide-react';
import { experienceData, projectData } from '../constants';
import type { Experience, Project } from '../types';
import { useTheme } from '../components/ThemeContext';

const CARD_BASE =
    'group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-transparent shadow-[0_24px_60px_-28px_rgba(0,0,0,0.85)] backdrop-blur-md transition-all duration-300 hover:border-white/[0.14] hover:from-white/[0.07] hover:shadow-[0_28px_70px_-24px_rgba(0,0,0,0.9)]';

const sectionTitle = (palette: Record<string, string>) => ({
    color: palette.textStrong ?? palette.text,
});

const SectionHeader: React.FC<{
    eyebrow: string;
    title: string;
    icon: React.ReactNode;
    palette: Record<string, string>;
}> = ({ eyebrow, title, icon, palette }) => (
    <header className="mb-12 md:mb-14">
        <div
            className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] md:text-xs"
            style={{ color: palette.textMuted }}
        >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-neutral-300">
                {icon}
            </span>
            {eyebrow}
        </div>
        <h2
            id={title === 'Professional Experience' ? 'experience-heading' : 'projects-heading'}
            className="text-2xl font-bold tracking-tight md:text-3xl"
            style={sectionTitle(palette)}
        >
            {title}
        </h2>
        <div
            className="mt-5 h-px max-w-xs bg-gradient-to-r from-white/25 via-white/10 to-transparent"
            aria-hidden
        />
    </header>
);

const listVariants: Variants = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.08 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring' as const, stiffness: 380, damping: 32 },
    },
};

type ExperienceCardProps = {
    item: Experience;
    index: number;
    palette: Record<string, string>;
};

const TimelineDot: React.FC<{ palette: Record<string, string> }> = ({ palette }) => (
    <span
        className="absolute left-0 top-8 hidden h-3 w-3 -translate-x-[calc(50%-1px)] rounded-full border-2 border-neutral-600 bg-black shadow-[0_0_0_4px_rgba(0,0,0,0.5)] md:block"
        style={{ borderColor: palette.accent }}
        aria-hidden
    />
);

const ExperienceCardBody: React.FC<ExperienceCardProps> = ({ item, index, palette }) => (
    <article className={`${CARD_BASE} p-5 md:p-7`}>
        <div
            className="pointer-events-none absolute inset-y-4 left-0 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:hidden"
            aria-hidden
        />
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-10">
            <div className="flex shrink-0 flex-col gap-2 lg:w-[26%]">
                <span
                    className="inline-flex w-fit max-w-full rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold leading-snug tracking-wide text-neutral-200 md:text-xs"
                    style={{ color: palette.textMuted }}
                    data-no-text-cursor="true"
                >
                    {item.duration}
                </span>
                <span
                    className="text-[10px] font-medium tabular-nums text-neutral-500 md:text-[11px]"
                    aria-hidden
                >
                    {String(index + 1).padStart(2, '0')}
                </span>
            </div>
            <div
                className="min-w-0 flex-1 border-l-[2px] pl-5 lg:border-l-[3px] lg:pl-8"
                style={{ borderLeftColor: palette.accent }}
            >
                <h3
                    className="text-lg font-bold leading-snug tracking-tight md:text-xl"
                    style={{ color: palette.textStrong ?? palette.text }}
                >
                    {item.role}
                </h3>
                <p
                    className="mt-1.5 text-sm font-semibold md:text-base"
                    style={{ color: palette.accent }}
                >
                    {item.company}
                </p>
                <ul
                    className="mt-5 space-y-3 text-sm leading-relaxed md:text-[0.9375rem]"
                    style={{ color: palette.text }}
                >
                    {item.description.map((desc, i) => (
                        <li key={i} className="flex gap-3">
                            <span
                                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full opacity-80"
                                style={{ backgroundColor: palette.accent }}
                                aria-hidden
                            />
                            <span className="min-w-0">{desc}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </article>
);

const ExperienceCardStatic: React.FC<ExperienceCardProps> = (props) => (
    <li className="relative md:pl-2">
        <TimelineDot palette={props.palette} />
        <ExperienceCardBody {...props} />
    </li>
);

const ExperienceCardMotion: React.FC<ExperienceCardProps> = (props) => (
    <motion.li className="relative md:pl-2" variants={itemVariants}>
        <TimelineDot palette={props.palette} />
        <ExperienceCardBody {...props} />
    </motion.li>
);

const ProjectCard: React.FC<{ item: Project; palette: Record<string, string> }> = ({
    item,
    palette,
}) => {
    const reduceMotion = useReducedMotion();
    const tags = item.technologies
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

    const article = (
        <article className={`${CARD_BASE} p-5 md:p-7`}>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-10">
                <div className="shrink-0 lg:w-[26%]">
                    <span
                        className="inline-flex w-fit max-w-full rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold leading-snug tracking-wide md:text-xs"
                        style={{ color: palette.textMuted }}
                        data-no-text-cursor="true"
                    >
                        {item.duration}
                    </span>
                </div>
                <div
                    className="min-w-0 flex-1 border-l-[2px] pl-5 lg:border-l-[3px] lg:pl-8"
                    style={{ borderLeftColor: palette.accent }}
                >
                    <h3
                        className="text-lg font-bold leading-snug tracking-tight md:text-xl"
                        style={{ color: palette.textStrong ?? palette.text }}
                    >
                        {item.name}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[11px] font-medium text-neutral-300 md:text-xs"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <ul
                        className="mt-5 space-y-3 text-sm leading-relaxed md:text-[0.9375rem]"
                        style={{ color: palette.text }}
                    >
                        {item.description.map((desc, i) => (
                            <li key={i} className="flex gap-3">
                                <span
                                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full opacity-80"
                                    style={{ backgroundColor: palette.accent }}
                                    aria-hidden
                                />
                                <span className="min-w-0">{desc}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </article>
    );

    if (reduceMotion) {
        return <li className="relative">{article}</li>;
    }

    return (
        <motion.li className="relative" variants={itemVariants}>
            {article}
        </motion.li>
    );
};

const ExperiencePage: React.FC = () => {
    const { palette } = useTheme();
    const reduceMotion = useReducedMotion();

    return (
        <div className="w-full py-16 md:py-20">
            <section className="mb-20 md:mb-28" aria-labelledby="experience-heading">
                <SectionHeader
                    eyebrow="Timeline"
                    title="Professional Experience"
                    icon={<Briefcase className="h-4 w-4" strokeWidth={1.75} aria-hidden />}
                    palette={palette}
                />

                <div className="relative">
                    <div
                        className="absolute bottom-4 left-[15px] top-4 hidden w-px bg-gradient-to-b from-white/[0.18] via-white/10 to-white/[0.04] md:block lg:left-[17px]"
                        aria-hidden
                    />
                    {reduceMotion ? (
                        <ol className="relative flex list-none flex-col gap-8 md:gap-10 md:pl-10 lg:pl-12">
                            {experienceData.map((item, index) => (
                                <ExperienceCardStatic
                                    key={index}
                                    item={item}
                                    index={index}
                                    palette={palette}
                                />
                            ))}
                        </ol>
                    ) : (
                        <motion.ol
                            className="relative flex list-none flex-col gap-8 md:gap-10 md:pl-10 lg:pl-12"
                            variants={listVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: '-24px' }}
                        >
                            {experienceData.map((item, index) => (
                                <ExperienceCardMotion
                                    key={index}
                                    item={item}
                                    index={index}
                                    palette={palette}
                                />
                            ))}
                        </motion.ol>
                    )}
                </div>
            </section>

            <section aria-labelledby="projects-heading">
                <SectionHeader
                    eyebrow="Portfolio"
                    title="Notable Projects"
                    icon={<FolderKanban className="h-4 w-4" strokeWidth={1.75} aria-hidden />}
                    palette={palette}
                />

                {reduceMotion ? (
                    <ul className="flex list-none flex-col gap-8 md:gap-10">
                        {projectData.map((item, index) => (
                            <ProjectCard key={index} item={item} palette={palette} />
                        ))}
                    </ul>
                ) : (
                    <motion.ul
                        className="flex list-none flex-col gap-8 md:gap-10"
                        variants={listVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-24px' }}
                    >
                        {projectData.map((item, index) => (
                            <ProjectCard key={index} item={item} palette={palette} />
                        ))}
                    </motion.ul>
                )}
            </section>
        </div>
    );
};

export default ExperiencePage;
