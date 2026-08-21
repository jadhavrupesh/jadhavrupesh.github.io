import React from 'react';
import { Link } from 'react-router-dom';
import { personalInfo, professionalSummary, experienceData, skillData } from '../constants';
import { Badge, AccentBadge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';

export default function HomePage() {
  const coreTech = ['Flutter', 'Android', 'Kotlin', 'Dart', 'KMP', 'Clean Architecture'];

  return (
    <div className="space-y-12">
      {/* ── Hero ── */}
      <section className="pt-4">
        <div className="stagger-item" style={{ animationDelay: '0ms' }}>
          <div
            className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full mb-6"
            style={{
              background: 'var(--status-online-dim)',
              border: '1px solid rgba(52, 211, 153, 0.2)',
            }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full pulse-dot"
              style={{ background: 'var(--status-online)' }}
            />
            <span style={{ color: 'var(--status-online)' }}>Available for work</span>
          </div>
        </div>

        <h1
          className="stagger-item text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
          style={{ color: 'var(--text)', animationDelay: '50ms' }}
        >
          Rupesh Jadhav
        </h1>
        <p
          className="stagger-item mt-3 text-lg sm:text-xl"
          style={{ color: 'var(--text-secondary)', animationDelay: '100ms' }}
        >
          Senior Mobile Developer building <span className="gradient-text">scalable apps</span> across FinTech, Banking & Hospitality.
        </p>
        <p
          className="stagger-item mt-4 text-sm max-w-2xl leading-relaxed"
          style={{ color: 'var(--text-muted)', animationDelay: '150ms' }}
        >
          {professionalSummary}
        </p>

        {/* CTAs */}
        <div className="stagger-item flex flex-wrap gap-3 mt-8" style={{ animationDelay: '200ms' }}>
          <Link
            to="/experience"
            className="inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
            style={{
              background: 'var(--accent)',
              color: 'var(--bg)',
            }}
          >
            View Experience
            <svg className="ml-1.5 w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
            style={{
              background: 'var(--bg-surface)',
              color: 'var(--text)',
              border: '1px solid var(--border-strong)',
            }}
          >
            Get in touch
          </Link>
        </div>

        {/* Social links */}
        <div className="stagger-item flex gap-4 mt-6" style={{ animationDelay: '250ms' }}>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-sm transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            GitHub
          </a>
          <span style={{ color: 'var(--text-dim)' }}>·</span>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-sm transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            LinkedIn
          </a>
          <span style={{ color: 'var(--text-dim)' }}>·</span>
          <a
            href={`mailto:${personalInfo.email}`}
            className="link-underline text-sm transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            Email
          </a>
        </div>
      </section>

      {/* ── Core Stack ── */}
      <section>
        <h3 className="text-xs font-mono uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>
          Core Stack
        </h3>
        <div className="flex flex-wrap gap-2">
          {coreTech.map((tech, i) => (
            <span
              key={tech}
              className="stagger-item"
              style={{ animationDelay: `${300 + i * 50}ms` }}
            >
              <AccentBadge>{tech}</AccentBadge>
            </span>
          ))}
        </div>
      </section>

      {/* ── Experience Preview ── */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold" style={{ color: 'var(--text)' }}>
            Recent Experience
          </h3>
          <Link
            to="/experience"
            className="text-sm link-underline"
            style={{ color: 'var(--accent-text)' }}
          >
            View all →
          </Link>
        </div>
        <div className="space-y-4">
          {experienceData.slice(0, 2).map((exp, i) => (
            <div key={i} className="stagger-item" style={{ animationDelay: `${400 + i * 100}ms` }}>
              <Card>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div>
                    <h4 className="text-base font-semibold" style={{ color: 'var(--text)' }}>
                      {exp.role}
                    </h4>
                    <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                      {exp.company}
                    </p>
                  </div>
                  <Badge>{exp.duration}</Badge>
                </div>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {exp.description[0]}
                </p>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* ── Quick Stats ── */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Years', value: '5+' },
          { label: 'Companies', value: '3' },
          { label: 'Projects', value: '4+' },
          { label: 'Platforms', value: 'Android / iOS / Web' },
        ].map((stat, i) => (
          <div key={i} className="stagger-item" style={{ animationDelay: `${500 + i * 80}ms` }}>
            <div
              className="rounded-xl p-4 text-center"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
            >
              <div className="text-xl font-bold" style={{ color: 'var(--accent-text)' }}>
                {stat.value}
              </div>
              <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
