import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import ExperiencePage from './pages/ExperiencePage';
import SkillsPage from './pages/SkillsPage';
import MusicPage from './pages/MusicPage';
import ContactPage from './pages/ContactPage';
import { Sun, Moon, Ghost, Spline, Snowflake } from 'lucide-react';

const CustomCursor: React.FC = () => {
    const { palette, theme } = useTheme();
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = React.useState(false);
    const [isText, setIsText] = React.useState(false);
    const [isNavHover, setIsNavHover] = React.useState(false);
    const [isHidden, setIsHidden] = React.useState(true);
    const [navHoverSize, setNavHoverSize] = React.useState({ width: 60, height: 32 });

    React.useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isHidden) setIsHidden(false);
            setPosition({ x: e.clientX, y: e.clientY });
            const target = e.target as HTMLElement;
            const navLink = target.closest('a[data-nav-link="true"]');

            if (navLink) {
                setIsNavHover(true);
                const rect = navLink.getBoundingClientRect();
                setNavHoverSize({ width: rect.width + 8, height: rect.height + 4 });
                setIsText(false);
            } else {
                setIsNavHover(false);
                const isPointerTarget = !!target.closest('a, button');
                setIsPointer(isPointerTarget);
                const computedStyle = window.getComputedStyle(target);
                const isTextElement = computedStyle.cursor === 'text' || target.tagName.match(/^(P|H[1-6]|SPAN|LI|BLOCKQUOTE)$/i);
                const noTextCursor = !!target.closest('[data-no-text-cursor="true"]');
                setIsText(isTextElement && !isPointerTarget && !noTextCursor);
            }
        };
        const handleMouseLeave = () => setIsHidden(true);
        const handleMouseEnter = () => setIsHidden(false);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [isHidden]);

    const cursorSize = isPointer ? 24 : 12;

    const styles: React.CSSProperties = {
        position: 'fixed',
        top: position.y,
        left: position.x,
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
        transition: 'width 0.2s ease, height 0.2s ease, border-radius 0.2s ease, background-color 0.2s ease, border 0.2s ease, color 0.2s ease',
        opacity: isHidden ? 0 : 1,
    };

    const accent = palette.accent;
    const caretColor = theme === 'stealth' ? palette.textStrong || palette.text : accent;
    const navBorderColor = palette.textMuted || palette.text;

    if (isNavHover) {
        return (
            <div
                style={{
                    ...styles,
                    width: `${navHoverSize.width}px`,
                    height: `${navHoverSize.height}px`,
                    backgroundColor: 'transparent',
                    border: `2px solid ${navBorderColor}`,
                    borderRadius: '8px',
                }}
            />
        );
    }

    if (isText) {
        return (
            <div
                style={{
                    ...styles,
                    width: '2px',
                    height: '20px',
                    backgroundColor: caretColor,
                    borderRadius: '0',
                }}
            />
        );
    }

    return (
        <div
            style={{
                ...styles,
                width: `${cursorSize}px`,
                height: `${cursorSize}px`,
                backgroundColor: isPointer ? `${accent}CC` : accent, // CC ~ 80% alpha
                borderRadius: '50%',
                border: isPointer ? `2px solid ${accent}` : 'none',
            }}
        />
    );
};

const ThemeToggleButton: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    const baseClasses = 'fixed bottom-8 right-8 p-3 rounded-full z-50 transition-colors border';

    const getButtonClasses = () => {
        switch (theme) {
            case 'light':
                return `${baseClasses} bg-white/70 border-gray-400 text-gray-900 hover:bg-white`;
            case 'dark':
                return `${baseClasses} bg-gray-800/70 border-gray-700 text-white hover:bg-gray-800`;
            case 'stealth':
                return `${baseClasses} bg-[#121212]/70 border-[#383E42] text-[#A7B0B6] hover:bg-[#121212]`;
            case 'light-trail':
                return `${baseClasses} bg-[#E0E0E0]/70 border-[#4F4F4F]/50 text-[#1F1F1F] hover:bg-[#E0E0E0]`;
            case 'nord-light':
                return `${baseClasses} bg-[#E5E9F0]/70 border-[#D8DEE9] text-[#2E3440] hover:bg-[#E5E9F0]`;
            default:
                return baseClasses;
        }
    };

    const getIcon = () => {
        switch (theme) {
            case 'light':
                return <Sun size={20} />;
            case 'dark':
                return <Moon size={20} />;
            case 'stealth':
                return <Ghost size={20} />;
            case 'light-trail':
                return <Spline size={20} />;
            case 'nord-light':
                return <Snowflake size={20} />;
            default:
                return <Sun size={20} />;
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className={getButtonClasses()}
            aria-label="Toggle theme"
        >
            {getIcon()}
        </button>
    );
};

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <Router>
                <CustomCursor />
                <AppContentWrapper />
            </Router>
        </ThemeProvider>
    );
};

const AppContentWrapper: React.FC = () => {
    const { theme, palette } = useTheme();

    const getBackgroundColor = () => {
        switch (theme) {
            case 'stealth':
                return 'bg-[#010203]';
            case 'dark':
                return 'bg-[#0a0a0a]';
            case 'light-trail':
                return 'bg-[#F2F2F2]';
            case 'nord-light':
                return 'bg-[#ECEFF4]';
            case 'light':
            default:
                return 'bg-gray-50';
        }
    };

    return (
        <div className={`${getBackgroundColor()} min-h-screen`} style={(theme === 'stealth' || theme === 'light-trail' || theme === 'nord-light') ? { color: palette.text } : undefined}>
            <Navigation />
            <main className="max-w-3xl mx-auto px-6 sm:px-8 pb-24 relative">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/experience" element={<ExperiencePage />} />
                    <Route path="/skills" element={<SkillsPage />} />
                    <Route path="/music" element={<MusicPage />} />
                </Routes>
            </main>
            <ThemeToggleButton />
        </div>
    );
};

export default App;