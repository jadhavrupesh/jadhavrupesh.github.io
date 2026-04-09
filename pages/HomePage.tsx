import React from 'react';
import { personalInfo } from '../constants';

const HomePage: React.FC = () => {
    return (
        <div className="flex flex-col justify-center items-center max-w-2xl mx-auto px-6 min-h-screen py-12">
            <div className="flex items-center mb-8 max-w-lg w-full">
                <img
                    src="./profile.jpg"
                    alt="Rupesh Jadhav"
                    className="w-16 h-16 rounded-full object-cover"
                />
                <div className="ml-4">
                    <h1 className="text-xl font-medium text-gray-100 mb-1">{personalInfo.name}</h1>
                    <p className="text-gray-400 text-sm">Senior Mobile Developer based in Mumbai</p>
                    <a
                        href="https://instagram.com/wtfrupesh"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 text-xs underline hover:text-neutral-200"
                    >
                        Instagram: @wtfrupesh
                    </a>
                </div>
            </div>

            <div className="text-left max-w-lg space-y-6">
                <p className="text-gray-300 leading-relaxed">
                    I am a Senior Mobile Developer with over five years of experience delivering secure,
                    scalable, and high-performance applications. I have a proven track record of success
                    across diverse industries, including FinTech, Banking, Hospitality, Logistics, and
                    E-commerce.
                </p>

                <p className="text-gray-300 leading-relaxed">
                    I enjoy building products from the ground up, solving complex engineering challenges,
                    and mentoring teams to adopt modern best practices. My focus is on Clean Architecture,
                    MVVM, and multi-module design, ensuring long-term maintainability and scalability of
                    applications.
                </p>

                <div>
                    <p className="text-gray-300 leading-relaxed mb-3">Technologies I specialize in:</p>
                    <ul className="text-gray-300 space-y-1 text-sm">
                        <li>• Android (Kotlin, Java), Flutter, and Kotlin Multiplatform (KMP)</li>
                        <li>• Payment gateway integrations (Razorpay), maps and localization</li>
                        <li>• Real-time communication (Agora, WebSockets), secure data storage</li>
                        <li>• CI/CD pipelines with Jenkins and Codemagic, VAPT hardening</li>
                    </ul>
                </div>

                <p className="text-gray-300 leading-relaxed">
                    I take pride in writing clean, testable, and production-grade code while always
                    prioritizing performance and security. I actively explore new technologies like Compose
                    Multiplatform to stay ahead in the fast-moving mobile ecosystem.
                </p>
            </div>
        </div>
    );
};

export default HomePage;
