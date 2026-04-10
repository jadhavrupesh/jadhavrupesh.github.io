import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, MapPin, ExternalLink } from 'lucide-react';
import { personalInfo } from '../constants';

const GLASS_CARD =
    'group rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-transparent shadow-[0_24px_60px_-28px_rgba(0,0,0,0.85)] backdrop-blur-md transition-all duration-300 hover:border-white/[0.16] hover:from-white/[0.08]';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.08, type: 'spring' as const, stiffness: 320, damping: 28 },
    }),
};

type ContactItem = {
    icon: React.ReactNode;
    label: string;
    value: string;
    href: string;
    external?: boolean;
};

const contacts: ContactItem[] = [
    {
        icon: <Mail size={18} strokeWidth={1.5} />,
        label: 'Email',
        value: personalInfo.email,
        href: `mailto:${personalInfo.email}`,
    },
    {
        icon: <Phone size={18} strokeWidth={1.5} />,
        label: 'Phone',
        value: personalInfo.phone,
        href: `tel:${personalInfo.phone}`,
    },
    {
        icon: <Linkedin size={18} strokeWidth={1.5} />,
        label: 'LinkedIn',
        value: 'rupesh-jadhav-126624100',
        href: personalInfo.linkedin,
        external: true,
    },
    {
        icon: <Github size={18} strokeWidth={1.5} />,
        label: 'GitHub',
        value: 'github.com/jadhavrupesh',
        href: personalInfo.github,
        external: true,
    },
    {
        icon: <MapPin size={18} strokeWidth={1.5} />,
        label: 'Location',
        value: personalInfo.location,
        href: 'https://maps.google.com/?q=Mumbai,India',
        external: true,
    },
];

const ContactPage: React.FC = () => {
    return (
        <div className="flex flex-col max-w-lg mx-auto px-4 sm:px-6 py-16 md:py-20 gap-6">

            {/* Header */}
            <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={0}
            >
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-2">
                    Contact
                </p>
                <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                    Get in touch
                </h1>
                <div className="mt-4 h-px max-w-xs bg-gradient-to-r from-white/25 via-white/10 to-transparent" />
            </motion.div>

            {/* Contact cards */}
            <div className="flex flex-col gap-3">
                {contacts.map((item, i) => (
                    <motion.a
                        key={item.label}
                        href={item.href}
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noopener noreferrer' : undefined}
                        className={`${GLASS_CARD} flex items-center gap-4 p-4 md:p-5`}
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        custom={i + 1}
                    >
                        {/* Icon box */}
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-neutral-300 transition-colors duration-300 group-hover:border-white/[0.14] group-hover:text-white">
                            {item.icon}
                        </span>

                        <div className="min-w-0 flex-1">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-500 mb-0.5">
                                {item.label}
                            </p>
                            <p className="truncate text-sm font-medium text-neutral-200 group-hover:text-white transition-colors duration-300">
                                {item.value}
                            </p>
                        </div>

                        {item.external && (
                            <ExternalLink
                                size={14}
                                className="shrink-0 text-neutral-600 group-hover:text-neutral-400 transition-colors duration-300"
                            />
                        )}
                    </motion.a>
                ))}
            </div>
        </div>
    );
};

export default ContactPage;
