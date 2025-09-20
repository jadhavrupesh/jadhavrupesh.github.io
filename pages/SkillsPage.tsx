import React from 'react';
import { skillData } from '../constants';
import type { SkillCategory } from '../types';
import { useTheme } from '../components/ThemeContext';

const Skills: React.FC<{ items: SkillCategory[] }> = ({ items }) => {
    const { theme } = useTheme();
    const getTextColor = (lightColor: string, darkColor: string, stealthColor: string, lightTrailColor: string, nordLightColor: string) => {
        if (theme === 'light') return lightColor;
        if (theme === 'dark') return darkColor;
        if (theme === 'stealth') return stealthColor;
        if (theme === 'light-trail') return lightTrailColor;
        if (theme === 'nord-light') return nordLightColor;
        return lightTrailColor;
    };
    const getBgColor = (lightColor: string, darkColor: string, stealthColor: string, lightTrailColor: string, nordLightColor: string) => {
        if (theme === 'light') return lightColor;
        if (theme === 'dark') return darkColor;
        if (theme === 'stealth') return stealthColor;
        if (theme === 'light-trail') return lightTrailColor;
        if (theme === 'nord-light') return nordLightColor;
        return lightTrailColor;
    };

    return (
        <div className="grid gap-8 md:grid-cols-2">
            {items.map((category) => (
                <div key={category.title}>
                    <h4 className={`font-semibold ${getTextColor('text-gray-700', 'text-gray-300', 'text-gray-400', 'text-[#363636]', 'text-[#363636]')} mb-3`}>{category.title}</h4>
                    <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill) => (
                            <span key={skill} className={`${getBgColor('bg-gray-200', 'bg-gray-800', 'bg-gray-800', 'bg-[#363636]', 'bg-[#4F4F4F]')} ${getTextColor('text-orange-600', 'text-orange-300', 'text-orange-400', 'text-[#F5F5F5]', 'text-[#F5F5F5]')} text-xs font-medium px-3 py-1.5 rounded-full`}>
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

const SkillsPage: React.FC = () => {
    const { theme } = useTheme();
    const getTextColor = (lightColor: string, darkColor: string, stealthColor: string, lightTrailColor: string, nordLightColor: string) => {
        if (theme === 'light') return lightColor;
        if (theme === 'dark') return darkColor;
        if (theme === 'stealth') return stealthColor;
        if (theme === 'light-trail') return lightTrailColor;
        if (theme === 'nord-light') return nordLightColor;
        return lightTrailColor;
    };
    const getBgColor = () => {
        if (theme === 'light') return 'bg-gray-100/80';
        if (theme === 'dark') return 'bg-[#0a0a0a]/80';
        if (theme === 'stealth') return 'bg-[#111111]/80';
        if (theme === 'light-trail') return 'bg-[#F5F5F5]/80';
        if (theme === 'nord-light') return 'bg-[#F5F5F5]/80';
        return 'bg-[#111111]/80';
    };
    const headingColor = () => {
        if (theme === 'light') return 'text-gray-900';
        if (theme === 'dark') return 'text-white';
        if (theme === 'stealth') return 'text-[#5E676E]';
        if (theme === 'light-trail') return 'text-[#1F1F1F]';
        if (theme === 'nord-light') return 'text-[#1F1F1F]';
        return 'text-[#e6e6e6]';
    };

    const chipClasses = () => {
        if (theme === 'light') return 'bg-gray-200 text-gray-800 border border-gray-300';
        if (theme === 'dark') return 'bg-gray-800 text-gray-300 border border-gray-700';
        if (theme === 'stealth') return 'bg-[#121212] text-[#5E676E] border border-[#383E42]';
        if (theme === 'light-trail') return 'bg-[#E0E0E0] text-[#1F1F1F] border border-[#4F4F4F]/50';
        if (theme === 'nord-light') return 'bg-[#E0E0E0] text-[#1F1F1F] border border-[#4F4F4F]/50';
        return 'bg-[#2b2b2b] text-[#e6e6e6] border border-[#3a3a3a]';
    };

    return (
        <div className="py-20 md:py-24">
            <h2 className={`text-2xl font-bold ${getTextColor('text-gray-800', 'text-gray-200', 'text-gray-300', 'text-[#1F1F1F]', 'text-[#1F1F1F]')} mb-8 sticky top-0 ${getBgColor()} backdrop-blur-sm py-4 z-10`}>Skills</h2>
            <Skills items={skillData} />
        </div>
    );
};

export default SkillsPage;