import React from 'react';
import { personalInfo } from '../constants';

const ContactPage: React.FC = () => {
    const linkClass = 'underline text-neutral-200 hover:text-white';

    return (
        <div className="flex flex-col justify-center items-center max-w-lg mx-auto px-6 min-h-screen py-12">
            <div className="text-left mb-8 w-full">
                <h1 className="text-xl font-medium text-white mb-1">Contact</h1>
                <p className="text-gray-400 text-sm">Get in touch with me</p>
            </div>

            <div className="text-left w-full space-y-6">
                <div>
                    <p className="text-gray-300 leading-relaxed mb-3">Contact Details:</p>
                    <ul className="text-gray-300 space-y-1 text-sm">
                        <li>
                            • Email:{' '}
                            <a href={`mailto:${personalInfo.email}`} className={linkClass}>
                                {personalInfo.email}
                            </a>
                        </li>
                        <li>
                            • Phone:{' '}
                            <a href={`tel:${personalInfo.phone}`} className={linkClass}>
                                {personalInfo.phone}
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <p className="text-gray-300 leading-relaxed mb-3">Find me online:</p>
                    <ul className="text-gray-300 space-y-1 text-sm">
                        <li>
                            • LinkedIn:{' '}
                            <a
                                href={personalInfo.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={linkClass}
                            >
                                linkedin.com/in/rupesh-jadhav-126624100
                            </a>
                        </li>
                        <li>
                            • GitHub:{' '}
                            <a
                                href={personalInfo.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={linkClass}
                            >
                                github.com/jadhavrupesh
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <p className="text-gray-300 leading-relaxed mb-3">Location:</p>
                    <p className="text-gray-400 text-sm">{personalInfo.location}</p>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
