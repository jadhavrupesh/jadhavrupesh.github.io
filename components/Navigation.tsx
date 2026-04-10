import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Briefcase, Wrench, Music, Mail } from 'lucide-react';

const navItems = [
    { name: 'Home',    path: '/',           Icon: Home },
    { name: 'Work',    path: '/experience', Icon: Briefcase },
    { name: 'Tools',   path: '/skills',     Icon: Wrench },
    { name: 'Music',   path: '/music',      Icon: Music },
    { name: 'Contact', path: '/contact',    Icon: Mail },
];

const Navigation: React.FC = () => {
    const location = useLocation();

    return (
        <>
            {/* Shared glass SVG filter */}
            <svg className="hidden" aria-hidden>
                <defs>
                    <filter
                        id="nav-glass"
                        x="0%" y="0%" width="100%" height="100%"
                        colorInterpolationFilters="sRGB"
                    >
                        <feTurbulence type="fractalNoise" baseFrequency="0.04 0.04" numOctaves="1" seed="2" result="turbulence" />
                        <feGaussianBlur in="turbulence" stdDeviation="1.5" result="blurredNoise" />
                        <feDisplacementMap in="SourceGraphic" in2="blurredNoise" scale="40" xChannelSelector="R" yChannelSelector="B" result="displaced" />
                        <feGaussianBlur in="displaced" stdDeviation="2" result="finalBlur" />
                        <feComposite in="finalBlur" in2="finalBlur" operator="over" />
                    </filter>
                </defs>
            </svg>

            <nav className="fixed bottom-5 md:bottom-8 left-1/2 -translate-x-1/2 z-[100]">
                {/* Outer glass container */}
                <div className="relative rounded-full p-[1px]"
                    style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.10) 100%)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
                    }}
                >
                    {/* Glass distortion layer */}
                    <div
                        className="absolute inset-0 rounded-full -z-10"
                        style={{ backdropFilter: 'url("#nav-glass") blur(12px)' }}
                    />
                    {/* Dark fill */}
                    <div className="absolute inset-0 rounded-full bg-black/60 -z-10" />

                    <div className="flex items-center gap-1 px-3 py-2">
                        {navItems.map(({ name, path, Icon }) => {
                            const isActive = location.pathname === path;
                            return (
                                <Link
                                    key={name}
                                    to={path}
                                    data-nav-link="true"
                                    className="relative flex flex-col items-center gap-0.5 px-3 md:px-4 py-2 rounded-full group transition-all duration-300"
                                    style={{
                                        background: isActive
                                            ? 'rgba(255,255,255,0.10)'
                                            : 'transparent',
                                        boxShadow: isActive
                                            ? 'inset 0 1px 0 rgba(255,255,255,0.15), 0 1px 3px rgba(0,0,0,0.2)'
                                            : 'none',
                                    }}
                                >
                                    {/* Active glow dot above */}
                                    {isActive && (
                                        <span className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white shadow-[0_0_6px_2px_rgba(255,255,255,0.6)]" />
                                    )}

                                    <Icon
                                        size={16}
                                        strokeWidth={isActive ? 2 : 1.5}
                                        className="transition-all duration-300"
                                        style={{
                                            color: isActive ? '#fff' : 'rgba(255,255,255,0.45)',
                                            filter: isActive ? 'drop-shadow(0 0 4px rgba(255,255,255,0.5))' : 'none',
                                        }}
                                    />
                                    <span
                                        className="text-[10px] font-medium tracking-wide transition-all duration-300 leading-none"
                                        style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.4)' }}
                                    >
                                        {name}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navigation;
