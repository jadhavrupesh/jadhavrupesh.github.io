import React from 'react';
import { skillData } from '../constants';
import type { SkillCategory } from '../types';

const Skills: React.FC<{ items: SkillCategory[] }> = ({ items }) => {
    return (
        <div className="grid gap-8 md:grid-cols-2">
            {items.map((category) => (
                <div key={category.title}>
                    <h4 className="font-semibold text-gray-300 mb-3">{category.title}</h4>
                    <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill) => (
                            <span
                                key={skill}
                                className="bg-gray-800 text-orange-300 text-xs font-medium px-3 py-1.5 rounded-full"
                            >
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
    return (
        <div className="mx-auto w-full max-w-4xl px-6 py-20 md:py-24">
            <h2 className="text-2xl font-bold mb-8 sticky top-0 text-gray-200 bg-[#0a0a0a]/80 backdrop-blur-sm py-4 z-10">
                Skills
            </h2>
            <Skills items={skillData} />
        </div>
    );
};

export default SkillsPage;
