import { useState } from 'react';
import { ArrowUpRight, Copy, Github, GraduationCap, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import {
  educationData, experienceData, personalInfo, professionalSummary, projectData, skillData,
} from '../../constants';

export default function PortfolioContent({ location }: {
  location: 'about' | 'projects' | 'skills' | 'experience' | 'contact';
}) {
  const [copyMessage, setCopyMessage] = useState('');

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopyMessage('Email address copied.');
    } catch {
      setCopyMessage('Could not copy. Select the email address above to copy it, or open your email app.');
    }
  }

  if (location === 'about') return (
    <>
      <p className="dossier-intro">{professionalSummary}</p>
      <dl className="dossier-facts">
        <div className="dossier-fact"><dt>Name</dt><dd>{personalInfo.name}</dd></div>
        <div className="dossier-fact"><dt>Location</dt><dd>{personalInfo.location}</dd></div>
        <div className="dossier-fact"><dt>Latest role</dt><dd>{experienceData[0].role}</dd></div>
      </dl>
      <section className="dossier-section">
        <h3><GraduationCap size={18} aria-hidden="true" /> Education</h3>
        <p>{educationData.degree}</p>
        <p className="dossier-meta">{educationData.institution}</p>
        <p className="dossier-date">{educationData.duration}</p>
      </section>
      <div className="dossier-links">
        <a className="dossier-link" href={personalInfo.github} target="_blank" rel="noopener noreferrer">
          <Github size={18} aria-hidden="true" /> GitHub <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <a className="dossier-link" href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
          <Linkedin size={18} aria-hidden="true" /> LinkedIn <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </>
  );

  if (location === 'projects') return (
    <>
      <p className="dossier-intro">Selected applications, from architecture to delivery. Open a project to explore the work behind it.</p>
      <div className="dossier-list">
        {projectData.map((project, index) => (
          <details className="dossier-item" key={project.name} open={index === 0}>
            <summary>
              <h3 className="dossier-item-heading">
                <span className="dossier-item-title">{project.name}</span>
                <span className="dossier-date">{project.duration}</span>
              </h3>
            </summary>
            <div className="dossier-tags" aria-label="Technologies">
              {project.technologies.split(', ').map(technology => <span className="dossier-tag" key={technology}>{technology}</span>)}
            </div>
            <ul className="dossier-bullets">{project.description.map(item => <li key={item}>{item}</li>)}</ul>
          </details>
        ))}
      </div>
    </>
  );

  if (location === 'skills') return (
    <>
      <p className="dossier-intro">The languages, frameworks, and engineering practices I use to build reliable mobile applications.</p>
      {skillData.map(category => (
        <section className="dossier-section" key={category.title}>
          <h3>{category.title}</h3>
          <ul className="dossier-tags">
            {category.skills.map(skill => <li className="dossier-tag" key={skill}>{skill}</li>)}
          </ul>
        </section>
      ))}
      <section className="dossier-section">
        <h3><GraduationCap size={18} aria-hidden="true" /> Education</h3>
        <p>{educationData.degree}</p>
        <p className="dossier-meta">{educationData.institution}</p>
        <p className="dossier-date">{educationData.duration}</p>
      </section>
    </>
  );

  if (location === 'experience') return (
    <>
      <p className="dossier-intro">The journey so far. Explore the teams, responsibilities, and applications along the way.</p>
      <div className="dossier-list">
        {experienceData.map((experience, index) => (
          <details className="dossier-item" key={experience.company} open={index === 0}>
            <summary>
              <h3 className="dossier-item-heading">
                <span className="dossier-item-title">{experience.company}</span>
                <span className="dossier-meta">{experience.role}</span>
                <span className="dossier-date">{experience.duration}</span>
              </h3>
            </summary>
            <ul className="dossier-bullets">{experience.description.map(item => <li key={item}>{item}</li>)}</ul>
          </details>
        ))}
      </div>
    </>
  );

  return (
    <>
      <p className="dossier-intro">Have a project in mind? Send a message and let’s talk about what we can build.</p>
      <div className="dossier-contact">
        <a className="dossier-link" href={`mailto:${personalInfo.email}`}>
          <Mail size={20} aria-hidden="true" /><span>{personalInfo.email}</span><ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <a className="dossier-link" href={`tel:${personalInfo.phone}`}>
          <Phone size={20} aria-hidden="true" /><span>{personalInfo.phone}</span><ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <a className="dossier-link" href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
          <Linkedin size={20} aria-hidden="true" /><span>Connect on LinkedIn</span><ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <a className="dossier-link" href={personalInfo.github} target="_blank" rel="noopener noreferrer">
          <Github size={20} aria-hidden="true" /><span>Explore my GitHub</span><ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <p className="dossier-meta"><MapPin size={18} aria-hidden="true" />{personalInfo.location}</p>
      </div>
      <button className="dossier-copy" type="button" onClick={copyEmail}><Copy size={16} aria-hidden="true" /> Copy email address</button>
      <p className="dossier-meta" role="status">{copyMessage}</p>
    </>
  );
}
