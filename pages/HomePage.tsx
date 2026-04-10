import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, ExternalLink } from 'lucide-react';
import { personalInfo, professionalSummary } from '../constants';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { useNavigate } from 'react-router-dom';

const GLASS_CARD =
    'rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-transparent shadow-[0_24px_60px_-28px_rgba(0,0,0,0.85)] backdrop-blur-md';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, type: 'spring' as const, stiffness: 320, damping: 28 },
    }),
};

const techStack = [
    'Android', 'Flutter', 'Kotlin', 'Dart', 'KMP', 'Clean Architecture',
];

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-6 max-w-2xl mx-auto px-4 sm:px-6 py-16 md:py-20">

            {/* ── Profile hero ── */}
            <motion.div
                className={`${GLASS_CARD} p-6 md:p-8`}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={0}
            >
                <div className="flex items-start gap-5">
                    {/* Avatar with glow ring */}
                    <div className="relative shrink-0">
                        <div className="absolute -inset-[3px] rounded-full bg-gradient-to-br from-white/30 via-white/10 to-transparent" />
                        <img
                            src="./profile.jpg"
                            alt="Rupesh Jadhav"
                            className="relative h-16 w-16 rounded-full object-cover ring-1 ring-white/10"
                        />
                    </div>

                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h1 className="text-xl font-bold text-white tracking-tight">
                                {personalInfo.name}
                            </h1>
                            {/* Available badge */}
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-green-400">
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
                                </span>
                                Available
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-400">
                            <span className="flex items-center gap-1">
                                <Briefcase size={11} className="text-neutral-500" />
                                Senior Mobile Developer
                            </span>
                            <span className="flex items-center gap-1">
                                <MapPin size={11} className="text-neutral-500" />
                                {personalInfo.location}
                            </span>
                        </div>

                        <a
                            href="https://instagram.com/wtfrupesh"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center gap-1 text-[11px] text-neutral-500 hover:text-neutral-300 transition-colors"
                        >
                            @wtfrupesh
                            <ExternalLink size={10} />
                        </a>
                    </div>
                </div>
            </motion.div>

            {/* ── Summary ── */}
            <motion.div
                className={`${GLASS_CARD} p-6 md:p-7`}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={1}
            >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500 mb-3">
                    About
                </p>
                <p className="text-sm leading-relaxed text-neutral-300 md:text-[0.9375rem]">
                    {professionalSummary}
                </p>
            </motion.div>

            {/* ── Bio bullets ── */}
            <motion.div
                className={`${GLASS_CARD} p-6 md:p-7`}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={2}
            >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500 mb-4">
                    Expertise
                </p>
                <ul className="space-y-3 text-sm text-neutral-300 leading-relaxed md:text-[0.9375rem]">
                    <li className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" aria-hidden />
                        Android (Kotlin, Java), Flutter, and Kotlin Multiplatform (KMP)
                    </li>
                    <li className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" aria-hidden />
                        Payment gateway integrations (Razorpay), maps and localization
                    </li>
                    <li className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" aria-hidden />
                        Real-time communication (Agora, WebSockets), secure data storage
                    </li>
                    <li className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" aria-hidden />
                        CI/CD pipelines with Jenkins and Codemagic, VAPT hardening
                    </li>
                </ul>
            </motion.div>

            {/* ── Stack chips ── */}
            <motion.div
                className={`${GLASS_CARD} p-5 md:p-6`}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={3}
            >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500 mb-3">
                    Stack
                </p>
                <div className="flex flex-wrap gap-2">
                    {techStack.map((t) => (
                        <span
                            key={t}
                            className="rounded-full border border-white/[0.09] bg-white/[0.03] px-3 py-1 text-xs font-medium text-neutral-300"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </motion.div>

            {/* ── CTA ── */}
            <motion.div
                className="flex justify-center pt-2"
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={4}
            >
                <LiquidButton
                    className="text-white border border-white/20 rounded-full"
                    size="xl"
                    onClick={() => navigate('/contact')}
                >
                    Let's Connect
                </LiquidButton>
            </motion.div>
        </div>
    );
};

export default HomePage;
