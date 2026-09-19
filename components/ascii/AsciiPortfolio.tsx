import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { personalInfo, projectData } from '../../constants';
import AsciiPlayground from './AsciiPlayground';
import PortfolioContent from './PortfolioContent';
import PixelHome from './PixelHome';
import ThemeTransitionOverlay from './ThemeTransitionOverlay';

import { DownArrowIcon } from './JulesIcons';
import AmbientPixelSparkles from './AmbientPixelSparkles';

const directories = [
  { path: '/', label: 'Home', title: '' },
  { path: '/about', label: 'About', title: 'A little about me.' },
  { path: '/experience', label: 'Experience', title: 'Built along the way.' },
  { path: '/skills', label: 'Skills', title: 'My working toolkit.' },
  { path: '/projects', label: 'Projects', title: 'From idea to shipped.' },
  { path: '/contact', label: 'Contact', title: 'Let’s build something.' },
] as const;

// Menu items shown in the header navigation (contact option removed from menu)
const navItems = directories.filter(item => item.path !== '/contact');

export default function AsciiPortfolio() {
  const [theme, setTheme] = useState<'ascii' | 'pixel'>(() => {
    try { return localStorage.getItem('portfolio-theme') === 'ascii' ? 'ascii' : 'pixel'; }
    catch { return 'pixel'; }
  });
  const [transitionState, setTransitionState] = useState<{
    active: boolean;
    toTheme: 'ascii' | 'pixel';
    origin: { x: number; y: number };
  } | null>(null);

  const triggerThemeChange = (nextTheme: 'ascii' | 'pixel', origin?: { x: number; y: number }) => {
    const coords = origin ?? { x: window.innerWidth - 60, y: 50 };
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setTheme(nextTheme);
      return;
    }

    setTransitionState({
      active: true,
      toTheme: nextTheme,
      origin: coords,
    });

    if ('startViewTransition' in document && typeof (document as any).startViewTransition === 'function') {
      try {
        (document as any).startViewTransition(() => {
          setTheme(nextTheme);
        });
      } catch {
        setTheme(nextTheme);
      }
    } else {
      setTheme(nextTheme);
    }

    window.setTimeout(() => {
      setTransitionState(null);
    }, 650);
  };

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const current = directories.find(item => item.path === pathname) ?? directories[0];
  const dialog = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const close = () => {
    dialog.current?.close();
    navigate('/');
  };

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'pixel' ? '#1d0245' : '#0c0d0c');
    try { localStorage.setItem('portfolio-theme', theme); } catch { /* Theme still works when storage is unavailable. */ }
  }, [theme]);

  useEffect(() => {
    document.title = `Rupesh Jadhav — ${current.path === '/' ? `${theme === 'pixel' ? 'Pixel' : 'ASCII'} Portfolio` : current.label}`;
  }, [current, theme]);

  // Don't let the browser restore a mid-page scroll, and always land at the
  // top of the home view when returning to it (react-router keeps scroll).
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  }, []);
  useEffect(() => {
    if (current.path === '/') window.scrollTo(0, 0);
  }, [current]);

  useEffect(() => {
    if (current.path !== '/') {
      if (!dialog.current?.open) dialog.current?.showModal();
      heading.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      dialog.current?.close();
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [current]);

  return <div className="terminal-shell">
    {theme === 'pixel' && <AmbientPixelSparkles count={55} />}
    <a className="skip-link" href="#main-content">Skip to content</a>
    {transitionState && (
      <ThemeTransitionOverlay
        toTheme={transitionState.toTheme}
        origin={transitionState.origin}
      />
    )}
    {theme === 'pixel' ? null : (
      <div className="system-bar"><span><span className="system-dot"/> RUPESH.JADHAV <span className="bar-slash">/</span> PERSONAL_PORTFOLIO</span><span>V.01</span></div>
    )}
    <header className="terminal-header">
      {theme === 'pixel' ? (
        <Link className="pixel-nav-brand" to="/" aria-label="Rupesh Jadhav, home">
          <img src="/jules/jules-pixelated.png" alt="" aria-hidden="true" width={34} height={34} className="pixel-header-squid pixelated-img" />
          <span className="pixel-brand-text">RUPESH</span>
        </Link>
      ) : (
        <Link className="terminal-brand" to="/" aria-label="Rupesh Jadhav, home">RJ</Link>
      )}
      <nav className="terminal-nav" aria-label="Main navigation">{navItems.map(item => <Link key={item.path} to={item.path} aria-current={current.path === item.path ? 'page' : undefined}><span className="nav-bracket">[</span>{item.label.toLowerCase()}<span className="nav-bracket">]</span></Link>)}</nav>
      <div className="header-actions">
        {theme === 'pixel' && (
          <>
            <a href="#plans" className="pixel-nav-btn-plans rounded-pixel-sm">
              <DownArrowIcon className="w-4 h-4 text-cyan-400" />
              <span>Tiers</span>
            </a>
            <Link to="/contact" className="pixel-nav-btn-try rounded-pixel-sm">
              Let&apos;s Talk
            </Link>
          </>
        )}
      </div>
    </header>

    <main id="main-content" tabIndex={-1}>
      {theme === 'pixel' ? <PixelHome /> : <>
      <section className="ascii-hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="terminal-eyebrow"><span aria-hidden="true">&gt;_</span> HELLO, WORLD. I’M</p>
          <h1 id="hero-title">RUPESH<br/>JADHAV<span className="name-cursor" aria-hidden="true">_</span></h1>
          <div className="role-line"><span className="role-prefix">/*</span> SENIOR MOBILE DEVELOPER <span className="role-prefix">*/</span></div>
          <p className="hero-description">Turning complex problems into simple,<br className="desktop-break"/> thoughtful mobile experiences.<br/>A little logic. A lot of curiosity.</p>
          <div className="hero-actions"><Link className="terminal-button primary" to="/projects">VIEW MY WORK <span aria-hidden="true">↗</span></Link><Link className="text-button" to="/about">MORE ABOUT ME <span aria-hidden="true">→</span></Link></div>
          <div className="availability"><span className="availability-star" aria-hidden="true">*</span><span>AVAILABLE FOR NEW OPPORTUNITIES</span></div>
        </div>
        <AsciiPlayground />
      </section>

      <section className="spec-strip" aria-label="Developer snapshot">
        <Link to="/experience"><span className="spec-label">EXPERIENCE</span><strong>5+ years of shipping<span aria-hidden="true">↗</span></strong></Link>
        <Link to="/skills"><span className="spec-label">CORE STACK</span><strong>Flutter / Android / KMP<span aria-hidden="true">↗</span></strong></Link>
        <Link to="/contact"><span className="spec-label">BASED IN</span><strong>Mumbai, India<span aria-hidden="true">↗</span></strong></Link>
      </section>

      <section className="selected-work" aria-labelledby="selected-work-title">
        <div className="section-heading"><h2 id="selected-work-title"><span aria-hidden="true">~/</span> SELECTED_WORK</h2><Link to="/projects">VIEW ALL {projectData.length} PROJECTS <span aria-hidden="true">↗</span></Link></div>
        <div className="project-rows">{projectData.slice(0, 2).map((project, index) => <Link to="/projects" className="project-row" key={project.name}><span className="project-index">0{index + 1}</span><span className="project-name">{project.name}<small>{index === 0 ? 'Multi-module hotel management' : 'Cross-platform airport operations'}</small></span><span className="project-tech">{project.technologies.split(', ').slice(0, 2).join(' / ')}</span><span className="project-year">{project.duration.slice(-4)}</span><span className="project-arrow" aria-hidden="true">↗</span></Link>)}</div>
      </section>
      </>}
    </main>

    <footer className="terminal-footer"><span>© {new Date().getFullYear()} RUPESH JADHAV <span className="footer-note">/ MADE OF CHARACTERS.</span></span><div><a href={personalInfo.github} target="_blank" rel="noreferrer">GITHUB ↗</a><a href={personalInfo.linkedin} target="_blank" rel="noreferrer">LINKEDIN ↗</a><a href={`mailto:${personalInfo.email}`}>EMAIL ↗</a></div><span className="footer-end" aria-hidden="true">[ EOF ]</span></footer>

    <dialog ref={dialog} className="dossier-dialog" aria-labelledby="dossier-title" onCancel={event => { event.preventDefault(); close(); }} onClick={event => { if (event.target === event.currentTarget) close(); }}>
      {current.path !== '/' && <div className="dossier-panel">
        <header className="dossier-top"><span><span aria-hidden="true">&gt;_</span> ~/rupesh{current.path}</span><button className="close-button" onClick={close} aria-label="Close panel">[ X ]</button></header>
        <div className="dossier-scroll"><p className="terminal-eyebrow">{current.label.toUpperCase()}.TXT</p><h2 ref={heading} tabIndex={-1} id="dossier-title">{current.title}</h2><PortfolioContent key={current.path} location={current.path.slice(1) as 'about' | 'projects' | 'skills' | 'experience' | 'contact'}/></div>
        <footer className="dossier-footer"><button className="text-button" onClick={close}>← BACK HOME</button><span>PRESS <kbd>ESC</kbd> TO CLOSE</span></footer>
      </div>}
    </dialog>
  </div>;
}
