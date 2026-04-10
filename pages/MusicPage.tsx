import React from 'react';
import { motion } from 'framer-motion';
import { Music } from 'lucide-react';

const MusicPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6">
            <motion.div
                className="flex flex-col items-center text-center gap-6"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            >
                {/* Icon with glow */}
                <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-transparent backdrop-blur-md shadow-[0_0_40px_-8px_rgba(255,255,255,0.08)]">
                    <div className="absolute inset-0 rounded-2xl bg-white/[0.02]" />
                    <Music size={32} strokeWidth={1.25} className="relative text-neutral-300" />
                </div>

                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                        Music
                    </h1>
                    <p className="mt-3 text-sm text-neutral-500 max-w-xs leading-relaxed">
                        Something's coming here. Stay tuned.
                    </p>
                </div>

                {/* Animated bars */}
                <div className="flex items-end gap-1 h-8">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <motion.span
                            key={i}
                            className="w-1 rounded-full bg-white/20"
                            animate={{ height: ['8px', '28px', '12px', '24px', '8px'] }}
                            transition={{
                                duration: 1.4,
                                repeat: Infinity,
                                delay: i * 0.15,
                                ease: 'easeInOut',
                            }}
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default MusicPage;
