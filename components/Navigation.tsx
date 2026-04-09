import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
    const location = useLocation();

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Work', path: '/experience' },
        { name: 'Tools', path: '/skills' },
        { name: 'Music', path: '/music' },
        { name: 'Contact', path: '/contact' },
    ];

    const navBg = 'bg-black/90 border-gray-800/50';

    const linkClasses = (isActive: boolean) => {
        const base =
            'text-xs md:text-sm font-medium transition-all duration-300 px-2 md:px-4 py-1 md:py-2 rounded-lg relative group min-w-[60px] md:min-w-[80px] text-center';
        return `${base} ${isActive ? 'text-red-400 bg-gray-800/50' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`;
    };

    return (
        <nav className="fixed bottom-4 md:bottom-8 left-1/2 z-[100]">
            <div
                className={`relative backdrop-blur-md border rounded-full px-3 md:px-6 py-2 md:py-3 transform -translate-x-1/2 ${navBg}`}
            >
                <div className="flex items-center gap-3 md:gap-8 whitespace-nowrap">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                data-nav-link="true"
                                className={linkClasses(isActive)}
                            >
                                <span className="relative z-10">{item.name}</span>
                                {isActive && (
                                    <div
                                        className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-px h-2 rounded-full bg-red-400"
                                        style={{ top: '-0.75rem' }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
