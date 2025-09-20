import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from './ThemeContext';

const Navigation: React.FC = () => {
    const location = useLocation();
    const { theme } = useTheme();
    
    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Work', path: '/experience' },
        { name: 'Tools', path: '/skills' },
        { name: 'Music', path: '/music' },
        { name: 'Contact', path: '/contact' },
    ];

    const getNavBgColor = () => {
        if (theme === 'light') return 'bg-white/90 border-gray-200/50';
        if (theme === 'dark') return 'bg-black/90 border-gray-800/50';
        if (theme === 'stealth') return 'bg-[#121212]/90 border-[#383E42]';
        if (theme === 'light-trail') return 'bg-[#E0E0E0]/90 border-[#4F4F4F]/50';
        if (theme === 'nord-light') return 'bg-[#E5E9F0]/90 border-[#D8DEE9]/50';
        return '';
    };

    const getLinkClasses = (isActive: boolean) => {
        let baseClasses = 'text-xs md:text-sm font-medium transition-all duration-300 px-2 md:px-4 py-1 md:py-2 rounded-lg relative group min-w-[60px] md:min-w-[80px] text-center';
        
        if (theme === 'light') {
            return `${baseClasses} ${isActive ? 'text-red-500 bg-gray-200/70' : 'text-gray-600 hover:text-black hover:bg-gray-200/50'}`;
        }
        if (theme === 'dark') {
            return `${baseClasses} ${isActive ? 'text-red-400 bg-gray-800/50' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`;
        }
        if (theme === 'stealth') {
            return `${baseClasses} ${isActive ? 'text-white bg-[#383E42]' : 'text-[#5E676E]/70 hover:text-[#5E676E] hover:bg-[#383E42]/30'}`;
        }
        if (theme === 'light-trail') {
            return `${baseClasses} ${isActive ? 'text-[#F5F5F5] bg-[#363636]' : 'text-[#363636]/70 hover:text-[#1F1F1F] hover:bg-[#4F4F4F]/30'}`;
        }
        if (theme === 'nord-light') {
            return `${baseClasses} ${isActive ? 'text-[#2E3440] bg-[#88C0D0]' : 'text-[#4C566A]/70 hover:text-[#2E3440] hover:bg-[#88C0D0]/30'}`;
        }
        return baseClasses;
    };

    const getDotColor = () => {
        if (theme === 'light') return 'bg-red-500';
        if (theme === 'dark') return 'bg-red-400';
        if (theme === 'stealth') return 'bg-[#383E42]';
        if (theme === 'light-trail') return 'bg-[#4F4F4F]';
        if (theme === 'nord-light') return 'bg-[#88C0D0]';
        return 'bg-red-500';
    };

    return (
        <nav className="fixed bottom-4 md:bottom-8 left-1/2 z-20">
            <div className={`relative backdrop-blur-md border rounded-full px-3 md:px-6 py-2 md:py-3 transform -translate-x-1/2 ${getNavBgColor()}`}>
                <div className="flex items-center gap-3 md:gap-8 whitespace-nowrap">
                    {navItems.map(item => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link 
                                key={item.name} 
                                to={item.path}
                                data-nav-link="true"
                                className={getLinkClasses(isActive)}
                            >
                                <span className="relative z-10">{item.name}</span>
                                {/* Active indicator line */}
                                {isActive && (
                                    <div 
                                        className={`absolute -top-3 left-1/2 transform -translate-x-1/2 w-px h-2 rounded-full ${getDotColor()}`}
                                        style={{ 
                                            top: '-0.75rem', // Position it above the nav bar
                                        }}
                                    ></div>
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