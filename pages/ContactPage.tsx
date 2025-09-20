import React from 'react';
import { personalInfo } from '../constants';
import { useTheme } from '../components/ThemeContext';

const ContactPage: React.FC = () => {
    const { theme } = useTheme();
    const headingColor = () => {
        if (theme === 'light') return 'text-gray-900';
        if (theme === 'dark') return 'text-white';
        if (theme === 'stealth') return 'text-[#A7B0B6]';
        if (theme === 'light-trail') return 'text-[#1F1F1F]';
        if (theme === 'nord-light') return 'text-[#1F1F1F]';
        return 'text-gray-100';
    };
    const bodyColor = () => {
        if (theme === 'light') return 'text-gray-800';
        if (theme === 'dark') return 'text-gray-300';
        if (theme === 'stealth') return 'text-[#5E676E]';
        if (theme === 'light-trail') return 'text-[#363636]';
        if (theme === 'nord-light') return 'text-[#363636]';
        return 'text-gray-300';
    };
    const mutedColor = () => {
        if (theme === 'light') return 'text-gray-500';
        if (theme === 'dark') return 'text-gray-400';
        if (theme === 'stealth') return 'text-[#5E676E]/70';
        if (theme === 'light-trail') return 'text-[#4F4F4F]';
        if (theme === 'nord-light') return 'text-[#6E7685]';
        return 'text-gray-400';
    };

    const linkClass = () => {
        if (theme === 'stealth') return 'hover:underline text-[#A7B0B6]';
        if (theme === 'dark') return 'hover:underline text-red-400';
        if (theme === 'light-trail') return 'hover:underline text-[#1F1F1F]';
        if (theme === 'nord-light') return 'hover:underline text-[#1F1F1F]';
        return 'hover:underline text-red-500';
    };

    return (
        <div className="flex flex-col justify-center items-center max-w-lg mx-auto px-6 min-h-screen py-12">
            <div className="text-left mb-8 w-full">
                <h1 className={`text-xl font-medium ${headingColor()} mb-1`}>Contact</h1>
                <p className={`${mutedColor()} text-sm`}>Get in touch with me</p>
            </div>

            <div className="text-left w-full space-y-6">
                <div>
                    <p className={`${bodyColor()} leading-relaxed mb-3`}>Contact Details:</p>
                    <ul className={`${bodyColor()} space-y-1 text-sm`}>
                        <li>• Email: <a href={`mailto:${personalInfo.email}`} className={linkClass()}>{personalInfo.email}</a></li>
                        <li>• Phone: <a href={`tel:${personalInfo.phone}`} className={linkClass()}>{personalInfo.phone}</a></li>
                    </ul>
                </div>

                <div>
                    <p className={`${bodyColor()} leading-relaxed mb-3`}>Find me online:</p>
                    <ul className={`${bodyColor()} space-y-1 text-sm`}>
                        <li>• LinkedIn: <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass()}>linkedin.com/in/rupesh-jadhav-126624100</a></li>
                        <li>• GitHub: <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className={linkClass()}>github.com/jadhavrupesh</a></li>
                    </ul>
                </div>

                <div>
                    <p className={`${bodyColor()} leading-relaxed mb-3`}>Location:</p>
                    <p className={`${mutedColor()} text-sm`}>{personalInfo.location}</p>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;