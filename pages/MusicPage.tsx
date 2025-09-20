import React from 'react';
import { useTheme } from '../components/ThemeContext';

const MusicPage: React.FC = () => {
    const { theme } = useTheme();
    const headingColor = () => {
        if (theme === 'light') return 'text-gray-900';
        if (theme === 'dark') return 'text-white';
        if (theme === 'stealth') return 'text-[#5E676E]';
        if (theme === 'light-trail') return 'text-[#1F1F1F]';
        if (theme === 'nord-light') return 'text-[#1F1F1F]';
        return 'text-[#e6e6e6]';
    };
    const textColor = () => {
        if (theme === 'light') return 'text-gray-800';
        if (theme === 'dark') return 'text-gray-300';
        if (theme === 'stealth') return 'text-[#5E676E]';
        if (theme === 'light-trail') return 'text-[#363636]';
        if (theme === 'nord-light') return 'text-[#363636]';
        return 'text-[#e6e6e6]';
    };

    return (
        <div className="flex flex-col justify-center items-center max-w-2xl mx-auto px-6 min-h-screen py-12">
            <div className="w-full max-w-lg text-center">
                <h1 className={`text-4xl md:text-6xl font-bold mb-4 ${headingColor()}`}>Music</h1>
                <p className={`${textColor()} text-lg md:text-xl`}>
                    Coming soon...
                </p>
            </div>
        </div>
    );
};

export default MusicPage;