import { useState } from 'react';
import { personalInfo, aboutNarrative, experienceData, philosophyData, educationData } from '../constants';

export default function ExperiencePage() {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const toggleIndex = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <>
      {/* ── About Hero ── */}
      <section className="hero" aria-labelledby="about-hero-heading">
        <div className="container grid-12">
          <div className="hero__content">
            <p className="hero__eyebrow">Hello,</p>
            <h1 className="hero__title" id="about-hero-heading">
              Nice to meet you!
            </h1>
            <p className="hero__statement">
              <span>Designing software &amp; architectures</span>
              <span>that make complex work feel simple.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── Profile Portrait ── */}
      <div className="container grid-12">
        <figure className="about-profile">
          <img
            src="/profile.jpg"
            alt={`${personalInfo.name}, Senior Mobile Developer`}
            onError={(e) => {
              // Fallback to stylized monogram if local profile image missing
              e.currentTarget.style.display = 'none';
            }}
          />
        </figure>
      </div>

      {/* ── Intro Monospace Paragraph ── */}
      <div className="container grid-12">
        <p className="about-intro">{aboutNarrative.intro}</p>
      </div>

      {/* ── 2-Column Story Breakdown ── */}
      <section className="about-details container grid-12" aria-label="Professional narrative">
        <div className="about-details__column--left">
          <p>{aboutNarrative.col1}</p>
        </div>
        <div className="about-details__column--right">
          <p>{aboutNarrative.col2}</p>
          <div className="pt-4 border-t border-zinc-300 mt-4">
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">
              Education
            </p>
            <p className="text-sm font-mono font-medium text-black">
              {educationData.degree} — {educationData.institution} ({educationData.duration})
            </p>
          </div>
        </div>
      </section>

      {/* ── Download Resume CTA ── */}
      <div className="container text-center mt-16">
        <a
          className="hero__cta"
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Connect on LinkedIn"
        >
          <span className="hero__cta-label">Connect on LinkedIn</span>
          <span className="hero__cta-label hero__cta-label--hover" aria-hidden="true">
            Connect on LinkedIn
          </span>
        </a>
      </div>

      {/* ── Interactive Experience Accordion (Obsidian Dark Canvas) ── */}
      <section className="experience-section" id="experience" aria-labelledby="experience-heading">
        <div className="container grid-12">
          <h2 className="experience-section__label" id="experience-heading">
            Experience
          </h2>

          <div className="experience-section__intro">
            <p className="experience-section__statement">
              <span>Five+ years of</span>
              <span>architecting &amp; scaling.</span>
            </p>
          </div>

          <div className="experience-section__list">
            {experienceData.map((exp, i) => {
              const isOpen = openIndexes.includes(i);
              return (
                <article key={exp.company + exp.duration} className="experience-item">
                  <button
                    className="experience-item__trigger"
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggleIndex(i)}
                  >
                    <span className="experience-item__period">{exp.duration}</span>
                    <span className="experience-item__summary">
                      <span className="experience-item__title">{exp.role}</span>
                      <span className="experience-item__company">{exp.company}</span>
                    </span>
                    <span
                      className={`experience-item__indicator experience-item__indicator--plus`}
                      aria-hidden="true"
                    />
                  </button>

                  {isOpen && (
                    <div className="experience-item__details">
                      <ul className="space-y-2 list-disc list-inside">
                        {exp.description.map((desc, j) => (
                          <li key={j}>{desc}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── What I Bring (3-Column Philosophy Grid) ── */}
      <section className="what-i-bring container" aria-labelledby="what-i-bring-heading">
        <div className="section-rule" aria-hidden="true" />
        <div className="section-header">
          <h2 className="section-header__label" id="what-i-bring-heading">
            What I bring
          </h2>
        </div>

        <div className="what-i-bring__content grid-12">
          {philosophyData.map((item) => (
            <article key={item.number} className="what-i-bring__item">
              <p className="what-i-bring__label">{item.number}</p>
              <h3 className="what-i-bring__title">{item.title}</h3>
              <p className="what-i-bring__description">{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}


