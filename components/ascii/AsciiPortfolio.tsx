import { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { personalInfo, projectData } from '../../constants';
import AsciiPlayground from './AsciiPlayground';
import PortfolioContent from './PortfolioContent';

const directories = [
  { path: '/', label: 'Home', title: '' },
  { path: '/about', label: 'About', title: 'A little about me.' },
  { path: '/experience', label: 'Experience', title: 'Built along the way.' },
  { path: '/skills', label: 'Skills', title: 'My working toolkit.' },
  { path: '/projects', label: 'Projects', title: 'From idea to shipped.' },
  { path: '/contact', label: 'Contact', title: 'Let’s build something.' },
] as const;

export default function AsciiPortfolio() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const current = directories.find(item => item.path === pathname) ?? directories[0];
  const dialog = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const close = () => navigate('/');

  useEffect(() => {
    document.title = `Rupesh Jadhav — ${current.path === '/' ? 'ASCII Portfolio' : current.label}`;
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
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div className="system-bar"><span><span className="system-dot"/> RUPESH.JADHAV <span className="bar-slash">/</span> PERSONAL_PORTFOLIO</span><span>V.01</span></div>
    <header className="terminal-header">
      <Link className="terminal-brand" to="/" aria-label="Rupesh Jadhav, home">RJ</Link>
      <nav className="terminal-nav" aria-label="Main navigation">{directories.map(item => <Link key={item.path} to={item.path} aria-current={current.path === item.path ? 'page' : undefined}><span className="nav-bracket">[</span>{item.label.toLowerCase()}<span className="nav-bracket">]</span></Link>)}</nav>
      <Link className="header-contact" to="/contact">LET’S TALK <span aria-hidden="true">↗</span></Link>
    </header>

    <main id="main-content" tabIndex={-1}>
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
