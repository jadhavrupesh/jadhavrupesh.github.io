import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import Navigation from './components/Navigation';
import { WebGLShader } from '@/components/ui/web-gl-shader';
import HomePage from './pages/HomePage';
import ExperiencePage from './pages/ExperiencePage';
import SkillsPage from './pages/SkillsPage';
import MusicPage from './pages/MusicPage';
import ContactPage from './pages/ContactPage';

const CustomCursor: React.FC = () => {
    const { palette } = useTheme();
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
                const isTextElement =
                    computedStyle.cursor === 'text' ||
                    !!target.tagName.match(/^(P|H[1-6]|SPAN|LI|BLOCKQUOTE)$/i);
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
        transition:
            'width 0.2s ease, height 0.2s ease, border-radius 0.2s ease, background-color 0.2s ease, border 0.2s ease, color 0.2s ease',
        opacity: isHidden ? 0 : 1,
    };

    const accent = palette.accent;
    const caretColor = accent;
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
                backgroundColor: isPointer ? `${accent}CC` : accent,
                borderRadius: '50%',
                border: isPointer ? `2px solid ${accent}` : 'none',
            }}
        />
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

const SCRIM_LAYERS = `
    linear-gradient(168deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.12) 100%)
`;

const AppContentWrapper: React.FC = () => {
    const { palette } = useTheme();

    return (
        <div className="relative min-h-screen min-h-[100dvh] overflow-x-hidden">
            <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden>
                <WebGLShader />
            </div>
            <div
                className="fixed inset-0 z-[1] pointer-events-none"
                style={{ background: SCRIM_LAYERS }}
                aria-hidden
            />
            <div className="relative z-10 min-h-screen" style={{ color: palette.text }}>
                <div className="min-h-screen backdrop-blur-[2px] bg-black/[0.04] ring-1 ring-inset ring-white/[0.04]">
                    <main className="max-w-3xl mx-auto px-6 sm:px-8 pb-28 md:pb-32 relative">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/contact" element={<ContactPage />} />
                            <Route path="/experience" element={<ExperiencePage />} />
                            <Route path="/skills" element={<SkillsPage />} />
                            <Route path="/music" element={<MusicPage />} />
                        </Routes>
                    </main>
                </div>
            </div>
            <Navigation />
        </div>
    );
};

export default App;
