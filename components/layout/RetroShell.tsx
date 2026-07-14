import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import StatusBar from '@/components/layout/StatusBar';
import RetroNavigation from '@/components/layout/RetroNavigation';
import MobileMenu from '@/components/layout/MobileMenu';
import HelpBar from '@/components/layout/HelpBar';
import { playNavClick, playSelectClick } from '@/lib/sound';

interface RetroShellProps {
  className?: string;
}

export default function RetroShell({ className }: RetroShellProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [glitching, setGlitching] = useState(false);

  // Keyboard navigation & Route click sounds
  useEffect(() => {
    const navPaths = ['/', '/experience', '/skills', '/game', '/music', '/contact'];
    
    // Play navigation click sound when route changes
    playSelectClick();

    // Trigger transition glitch effect
    setGlitching(true);
    const timer = setTimeout(() => setGlitching(false), 200);

    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement;
      if (
        activeElement &&
        (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')
      ) {
        return;
      }

      if (pathname === '/game') {
        // Allow GamePage local keyboard steering and selection menu triggers
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const currentIndex = navPaths.indexOf(pathname);
        const nextIndex = (currentIndex + 1) % navPaths.length;
        playSelectClick();
        navigate(navPaths[nextIndex]);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const currentIndex = navPaths.indexOf(pathname);
        const prevIndex = (currentIndex - 1 + navPaths.length) % navPaths.length;
        playSelectClick();
        navigate(navPaths[prevIndex]);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        if (pathname !== '/') {
          playSelectClick();
          navigate(-1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [pathname, navigate]);

  return (
    <div
      className={cn(
        'crt-scanlines noise-bg vignette screen-flicker h-screen flex flex-col overflow-hidden relative',
        className
      )}
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Skip to content — accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>

      {/* Top status bar */}
      <StatusBar className="shrink-0" />

      {/* Mobile menu trigger — placed in a small bar below status */}
      <div
        className="md:hidden flex items-center px-3 h-9 border-b shrink-0"
        style={{
          background: 'var(--bg-surface)',
          borderColor: 'var(--border-default)',
        }}
      >
        <MobileMenu />
      </div>

      {/* Body: sidebar + main content */}
      <div className="flex relative flex-1 min-h-0">
        {/* Desktop sidebar navigation */}
        <RetroNavigation />

        {/* Main content viewport */}
        <main
            id="main-content"
            className={cn(
              'flex-1 min-w-0 relative overflow-y-auto',
              'px-4 md:px-6 lg:px-8',
              'py-6 md:py-8',
              'pb-12 sm:pb-14' // account for HelpBar
            )}
            role="main"
        >
          {/* Transition overlay glitch effect */}
          {glitching && (
            <div 
              className="absolute inset-0 z-40 bg-[var(--bg-primary)] opacity-40 pointer-events-none retro-flower-glitch" 
              style={{ mixBlendMode: 'color-dodge' }}
            />
          )}
          <Outlet />
        </main>
      </div>

      {/* Bottom help bar */}
      <HelpBar />
    </div>
  );
}
