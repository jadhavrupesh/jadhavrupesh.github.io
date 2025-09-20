import React from 'react';
import { experienceData, projectData } from '../constants';
import type { Experience, Project } from '../types';
import { useTheme } from '../components/ThemeContext';

const ExperienceCard: React.FC<{ item: Experience }> = ({ item }) => {
    const { theme } = useTheme();
    const getTextColor = (lightColor: string, darkColor: string, stealthColor: string, lightTrailColor: string, nordLightColor: string) => {
        if (theme === 'light') return lightColor;
        if (theme === 'dark') return darkColor;
        if (theme === 'stealth') return stealthColor;
        if (theme === 'light-trail') return lightTrailColor;
        if (theme === 'nord-light') return nordLightColor;
        return lightTrailColor;
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <div className={`w-full md:w-1/4 text-sm ${getTextColor('text-gray-500', 'text-gray-500', 'text-[#5E676E]/70', 'text-[#4F4F4F]', 'text-[#6E7685]')} font-medium`} data-no-text-cursor="true">{item.duration}</div>
            <div className="w-full md:w-3/4">
                <h3 className={`font-bold text-lg ${getTextColor('text-gray-900', 'text-gray-100', 'text-[#A7B0B6]', 'text-[#1F1F1F]', 'text-[#1F1F1F]')}`}>{item.role}</h3>
                <p className={`${getTextColor('text-gray-600', 'text-gray-400', 'text-[#5E676E]', 'text-[#363636]', 'text-[#363636]')}`}>{item.company}</p>
                <ul className={`${getTextColor('text-gray-600', 'text-gray-400', 'text-[#5E676E]', 'text-[#363636]', 'text-[#363636]')} text-sm space-y-2`}>
                    {item.description.map((desc, i) => (
                        <li key={i} className="leading-relaxed">• {desc}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const ProjectCard: React.FC<{ item: Project }> = ({ item }) => {
    const { theme } = useTheme();
    const getTextColor = (lightColor: string, darkColor: string, stealthColor: string, lightTrailColor: string, nordLightColor: string) => {
        if (theme === 'light') return lightColor;
        if (theme === 'dark') return darkColor;
        if (theme === 'stealth') return stealthColor;
        if (theme === 'light-trail') return lightTrailColor;
        if (theme === 'nord-light') return nordLightColor;
        return lightTrailColor;
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <div className={`w-full md:w-1/4 text-sm ${getTextColor('text-gray-500', 'text-gray-500', 'text-[#5E676E]/70', 'text-[#4F4F4F]', 'text-[#6E7685]')} font-medium`} data-no-text-cursor="true">{item.duration}</div>
            <div className="w-full md:w-3/4">
                <h3 className={`font-bold text-lg ${getTextColor('text-gray-900', 'text-gray-100', 'text-[#A7B0B6]', 'text-[#1F1F1F]', 'text-[#1F1F1F]')}`}>{item.name}</h3>
                <p className={`${getTextColor('text-gray-600', 'text-gray-400', 'text-[#5E676E]', 'text-[#363636]', 'text-[#363636]')} mb-3 font-medium`}>{item.technologies}</p>
                <ul className={`${getTextColor('text-gray-600', 'text-gray-400', 'text-[#5E676E]', 'text-[#363636]', 'text-[#363636]')} text-sm space-y-2`}>
                    {item.description.map((desc, i) => (
                        <li key={i} className="leading-relaxed">• {desc}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const ExperiencePage: React.FC = () => {
    const { theme } = useTheme();
    const getTextColor = () => {
        if (theme === 'light') return 'text-gray-900';
        if (theme === 'dark') return 'text-gray-200';
        if (theme === 'stealth') return 'text-[#A7B0B6]';
        if (theme === 'light-trail') return 'text-[#1F1F1F]';
        if (theme === 'nord-light') return 'text-[#1F1F1F]';
        return 'text-gray-200';
    };
    const getMetaColor = () => {
        if (theme === 'light') return 'text-gray-500';
        if (theme === 'dark') return 'text-gray-400';
        if (theme === 'stealth') return 'text-[#5E676E]/70';
        if (theme === 'light-trail') return 'text-[#4F4F4F]';
        if (theme === 'nord-light') return 'text-[#6E7685]';
        return 'text-gray-400';
    };

    return (
        <div className="py-20 md:py-24">
            {/* Professional Experience Section */}
            <div className="mb-16">
                <h2 className={`text-2xl font-bold ${getTextColor()} mb-8`}>Professional Experience</h2>
                <div className="space-y-12">
                    {experienceData.map((item, index) => (
                        <ExperienceCard key={index} item={item} />
                    ))}
                </div>
            </div>
            
            {/* Projects Section */}
            <div>
                <h2 className={`text-2xl font-bold ${getTextColor()} mb-8`}>Notable Projects</h2>
                <div className="space-y-12">
                    {projectData.map((item, index) => (
                        <ProjectCard key={index} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExperiencePage;