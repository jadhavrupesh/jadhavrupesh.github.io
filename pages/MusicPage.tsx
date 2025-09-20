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
        <div className="min-h-screen px-4 md:px-8 lg:px-16 py-8 pb-24">
            <div className="max-w-4xl mx-auto">
                <div className="mb-12">
                    <h1 className={`text-4xl md:text-6xl font-bold mb-4 ${headingColor()}`}>Music</h1>
                    <p className={`${textColor()} text-lg md:text-xl`}>
                        Coming soon...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MusicPage;