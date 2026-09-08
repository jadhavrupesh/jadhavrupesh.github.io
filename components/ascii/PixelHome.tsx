import { Link } from 'react-router-dom';
import { personalInfo, projectData, skillData } from '../../constants';
import PixelHeroLogo from './PixelHeroLogo';

export default function PixelHome() {
  return <>
    <section className="pixel-hero" aria-labelledby="pixel-title">
      <div className="pixel-intro">
        <span className="pixel-spark spark-pink" aria-hidden="true">✦</span>
        <span className="pixel-spark spark-cyan" aria-hidden="true">+</span>
        <span className="pixel-spark spark-yellow" aria-hidden="true">✳</span>
        <p className="pixel-eyebrow">A LITTLE LOGIC. A LOT OF CURIOSITY.</p>
        <h1 id="pixel-title" className="pixel-wordmark" aria-label={personalInfo.name}>
          <PixelHeroLogo />
        </h1>
        <p className="pixel-role">Senior mobile developer.</p>
        <p className="pixel-description">Turning complex problems into thoughtful apps.<br/>Built with curiosity. Shipped with care.</p>
        <div className="pixel-actions">
          <Link className="pixel-button" to="/projects">Explore my work <span aria-hidden="true">↗</span></Link>
          <Link className="pixel-about" to="/about">Meet the developer <span aria-hidden="true">→</span></Link>
        </div>
      </div>

      <div className="pixel-workspace">
        <div className="pixel-dither" aria-hidden="true" />
        <div className="pixel-editor">
          <div className="pixel-editor-toolbar"><span className="pixel-editor-file"><span aria-hidden="true">◇</span> rupesh.dart</span><span className="pixel-editor-path">portfolio / about</span><span className="pixel-editor-window" aria-hidden="true">− □ ×</span></div>
          <div className="pixel-code" aria-label="Developer profile">
            <div className="pixel-code-line"><code><span className="code-comment">// Good ideas deserve great apps.</span></code></div>
            <div className="pixel-code-line"><code><span className="code-pink">class</span> <span className="code-yellow">Rupesh</span> <span className="code-pink">extends</span> <span className="code-yellow">MobileDeveloper</span> {'{'}</code></div>
            <div className="pixel-code-line"><code>  <span className="code-pink">final</span> location = <span className="code-cyan">'{personalInfo.location}'</span>;</code></div>
            <div className="pixel-code-line"><code>  <span className="code-pink">final</span> experience = <span className="code-cyan">'5+ years'</span>;</code></div>
            <div className="pixel-code-line"><code>  <span className="code-pink">final</span> stack = [<span className="code-cyan">'Flutter', 'Android', 'KMP'</span>];</code></div>
            <div className="pixel-code-line" aria-hidden="true"><code> </code></div>
            <div className="pixel-code-line"><code>  <span className="code-yellow">Future</span>&lt;<span className="code-yellow">App</span>&gt; <span className="code-purple">build</span>(<span className="code-yellow">Idea</span> idea) <span className="code-pink">async</span> {'{'}</code></div>
            <div className="pixel-code-line"><code>    <span className="code-pink">return</span> craft(idea, architecture: <span className="code-cyan">'clean'</span>);</code></div>
            <div className="pixel-code-line"><code>  {'}'}</code></div>
            <div className="pixel-code-line"><code>{'}'}<span className="pixel-code-cursor" aria-hidden="true" /></code></div>
          </div>
          <div className="pixel-editor-status"><span><span aria-hidden="true">⑂</span> main <span className="pixel-status-dot" /> Ready to build</span><span>Dart <span className="pixel-editor-encoding">UTF-8</span></span></div>
        </div>
        <Link className="pixel-availability" to="/contact">
          <svg className="pixel-flower" viewBox="0 0 13 13" shapeRendering="crispEdges" aria-hidden="true"><path fill="currentColor" d="M5 0h3v3h2v2h3v3h-3v2H8v3H5v-3H3V8H0V5h3V3h2z"/><path fill="#09051c" d="M5 5h3v3H5z"/></svg>
          <span><span className="pixel-availability-label">OPEN TO OPPORTUNITIES</span><strong>Let’s build something.</strong><span className="pixel-availability-link">Say hello <span aria-hidden="true">↗</span></span></span>
        </Link>
      </div>
    </section>

    <section className="pixel-projects" aria-labelledby="pixel-projects-title">
      <div className="pixel-section-heading"><div><p className="pixel-eyebrow">FROM IDEA TO APP</p><h2 id="pixel-projects-title">A few things I’ve shipped.</h2></div><Link to="/projects">All {projectData.length} projects <span aria-hidden="true">↗</span></Link></div>
      <div className="pixel-project-grid">{projectData.slice(0, 2).map((project, index) => <Link to="/projects" className={`pixel-project-card ${index === 0 ? 'project-hotel' : 'project-airport'}`} key={project.name}>
        <div className="pixel-project-art" aria-hidden="true">
          <span className="pixel-project-category">{index === 0 ? 'HOSPITALITY' : 'AIRPORT OPERATIONS'}</span>
          {index === 0 ? <svg viewBox="0 0 160 112" shapeRendering="crispEdges"><path className="pixel-art-shadow" d="M49 25h66v76H49z"/><path fill="currentColor" d="M41 16h64v80H41zM33 88h80v8H33zM57 8h32v8H57z"/><path fill="#261047" d="M49 24h16v16H49zm32 0h16v16H81zM49 48h16v16H49zm32 0h16v16H81zM65 72h16v24H65z"/><path fill="#f0c642" d="M69 1h8v8h-8zM53 28h8v8h-8zm32 24h8v8h-8z"/><path fill="currentColor" opacity=".35" d="M17 64h8v8h-8zm104-24h8v8h-8zm8 32h8v8h-8z"/></svg> : <svg viewBox="0 0 160 112" shapeRendering="crispEdges"><path className="pixel-art-shadow" d="M77 18h16v24h16v16h16v16h16v16H93v16H77V90H29V74h16V58h16V42h16z"/><path fill="currentColor" d="M69 8h16v24h16v16h16v16h16v16H85v16H69V80H21V64h16V48h16V32h16z"/><path fill="#261047" d="M69 48h16v32H69z"/><path fill="#f0c642" d="M73 16h8v16h-8z"/><path fill="currentColor" opacity=".35" d="M21 16h8v8h-8zm104 16h8v8h-8zm-8 64h8v8h-8z"/></svg>}
          <span className="pixel-project-arrow">↗</span>
        </div>
        <div className="pixel-project-copy"><span className="pixel-project-date">{project.duration}</span><h3>{project.name}</h3><p>{project.description[0]}</p><div className="pixel-project-tags">{project.technologies.split(', ').slice(0, 3).map(technology => <span key={technology}>{technology}</span>)}</div></div>
      </Link>)}</div>
    </section>

    <section className="pixel-toolkit" aria-labelledby="pixel-toolkit-title">
      <div><p className="pixel-eyebrow">MY EVERYDAY TOOLKIT</p><h2 id="pixel-toolkit-title">Different platforms.<br/>Same attention to detail.</h2><Link to="/skills">Explore my skills <span aria-hidden="true">↗</span></Link></div>
      <div className="pixel-stack">{skillData.find(category => category.title === 'Frameworks')?.skills.map(skill => <Link to="/skills" key={skill}><span aria-hidden="true">+</span>{skill}</Link>)}</div>
    </section>
  </>;
}
