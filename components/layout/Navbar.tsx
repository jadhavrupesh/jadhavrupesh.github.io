import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { personalInfo } from '../../constants';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar() {
  const [isCompact, setIsCompact] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsCompact(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navItems = [
    { label: 'Works', path: '/works' },
    { label: 'About me', path: '/about' },
    { label: 'Journal', path: '/journal' },
    { label: 'Get in touch', path: '/contact' },
  ];

  return (
    <header className={`site-header ${isCompact ? 'is-compact' : ''}`}>
      <div className="container site-header__inner">
        {/* Logo */}
        <NavLink to="/" className="site-logo" aria-label="Rupesh Jadhav home">
          <span className="site-logo__monogram">RJ</span>
          <span className="site-logo__name">{personalInfo.name}</span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="main-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <span className="main-nav__label">{item.label}</span>
              <span className="main-nav__label main-nav__label--hover" aria-hidden="true">
                {item.label}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* Right Section: Theme Toggle & Portfolio Mark */}
        <div className="flex items-center gap-3.5 justify-self-end">
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center gap-1.5 px-2.5 py-1 border border-current text-[11px] font-mono font-bold uppercase transition-colors hover:text-red-600 cursor-pointer"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            <span>{theme === 'light' ? '☾' : '☀'}</span>
            <span className="hidden sm:inline">{theme === 'light' ? 'Dark' : 'Light'}</span>
          </button>

          {/* Portfolio Corner Mark */}
          <div className="portfolio-mark hidden md:flex" aria-label={`Established ${personalInfo.estYear}. 2026 Portfolio.`}>
            <span className="portfolio-mark__est">Est. {personalInfo.estYear}</span>
            <span className="portfolio-mark__title">2026 Portfolio</span>
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <nav className="main-nav is-mobile-open" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => (isActive ? 'active' : '')}
              style={{ fontSize: '14px', paddingBlock: '6px' }}
            >
              <span className="main-nav__label">{item.label}</span>
            </NavLink>
          ))}
          <div className="pt-4 border-t border-zinc-300 dark:border-zinc-700 w-full text-center">
            <button
              type="button"
              onClick={toggleTheme}
              className="px-4 py-2 border border-current text-xs font-mono font-bold uppercase"
            >
              {theme === 'light' ? '☾ Switch to Dark Mode' : '☀ Switch to Light Mode'}
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}


