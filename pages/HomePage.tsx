import React from 'react';
import { personalInfo } from '../constants';
import { useTheme } from '../components/ThemeContext';

const HomePage: React.FC = () => {
    const { theme } = useTheme();

    const getHeadingColor = () => {
        if (theme === 'light') return 'text-gray-900';
        if (theme === 'dark') return 'text-gray-100';
        if (theme === 'stealth') return 'text-[#A7B0B6]';
        if (theme === 'light-trail') return 'text-[#1F1F1F]';
        if (theme === 'nord-light') return 'text-[#1F1F1F]';
        return 'text-gray-100';
    };
    const getBodyColor = () => {
        if (theme === 'light') return 'text-gray-800';
        if (theme === 'dark') return 'text-gray-300';
        if (theme === 'stealth') return 'text-[#5E676E]';
        if (theme === 'light-trail') return 'text-[#363636]';
        if (theme === 'nord-light') return 'text-[#363636]';
        return 'text-gray-300';
    };
    const getMutedColor = () => {
        if (theme === 'light') return 'text-gray-500';
        if (theme === 'dark') return 'text-gray-400';
        if (theme === 'stealth') return 'text-[#5E676E]/70';
        if (theme === 'light-trail') return 'text-[#4F4F4F]';
        if (theme === 'nord-light') return 'text-[#6E7685]';
        return 'text-gray-400';
    };

    return (
        <div className="flex flex-col justify-center items-start max-w-2xl mx-auto px-6 min-h-screen py-12">
            {/* Profile Section */}
            <div className="flex items-center mb-8">
                <img 
                    src="./profile.jpg"
                    alt="Rupesh Jadhav" 
                    className="w-16 h-16 rounded-full object-cover"
                />
                <div className="ml-4">
                    <h1 className={`text-xl font-medium ${getHeadingColor()} mb-1`}>{personalInfo.name}</h1>
                    <p className={`${getMutedColor()} text-sm`}>Senior Mobile Developer based in Mumbai</p>
                    <a
                        href="https://instagram.com/wtfrupesh"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${getMutedColor()} text-xs underline hover:text-blue-500`}
                    >
                        Instagram: @wtfrupesh
                    </a>
                </div>
            </div>

            {/* Main Content */}
            <div className="text-left max-w-lg space-y-6">
                <p className={`${getBodyColor()} leading-relaxed`}>
                    I am a Senior Mobile Developer with over five years of experience delivering 
                    secure, scalable, and high-performance applications. I have a proven track record 
                    of success across diverse industries, including FinTech, Banking, Hospitality, Logistics, and E-commerce.
                </p>
                
                <p className={`${getBodyColor()} leading-relaxed`}>
                    I enjoy building products from the ground up, solving complex engineering 
                    challenges, and mentoring teams to adopt modern best practices. My focus is on 
                    Clean Architecture, MVVM, and multi-module design, 
                    ensuring long-term maintainability and scalability of applications.
                </p>

                <div>
                    <p className={`${getBodyColor()} leading-relaxed mb-3`}>Technologies I specialize in:</p>
                    <ul className={`${getBodyColor()} space-y-1 text-sm`}>
                        <li>• Android (Kotlin, Java), Flutter, and Kotlin Multiplatform (KMP)</li>
                        <li>• Payment gateway integrations (Razorpay), maps and localization</li>
                        <li>• Real-time communication (Agora, WebSockets), secure data storage</li>
                        <li>• CI/CD pipelines with Jenkins and Codemagic, VAPT hardening</li>
                    </ul>
                </div>

                <p className={`${getBodyColor()} leading-relaxed`}>
                    I take pride in writing clean, testable, and production-grade code while always 
                    prioritizing performance and security. I actively explore new technologies like 
                    Compose Multiplatform to stay ahead in the fast-moving mobile ecosystem.
                </p>
            </div>
        </div>
    );
};

export default HomePage;