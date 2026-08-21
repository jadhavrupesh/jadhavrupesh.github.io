import React from 'react';
import { skillData, educationData } from '../constants';
import { SectionTitle } from '../components/ui/SectionTitle';
import { Badge } from '../components/ui/Badge';

export default function SkillsPage() {
  return (
    <div className="space-y-12">
      <SectionTitle
        eyebrow="01 / Skills"
        title="Tech Stack"
        subtitle="Technologies I use to build secure, scalable, and high-performance applications."
      />

      {/* Skills grid */}
      <section className="grid gap-6 sm:grid-cols-2">
        {skillData.map((cat, i) => (
          <div key={cat.title} className="stagger-item" style={{ animationDelay: `${i * 80}ms` }}>
            <div
              className="rounded-xl p-5"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
                  {cat.title}
                </h3>
                <span className="text-xs" style={{ color: 'var(--text-dim)' }}>
                  {cat.skills.length} items
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Education */}
      <section>
        <SectionTitle eyebrow="02 / Education" title="Education" />
        <div className="stagger-item">
          <div
            className="rounded-xl p-5"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="text-base font-semibold" style={{ color: 'var(--text)' }}>
                  {educationData.degree}
                </h3>
                <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                  {educationData.institution}
                </p>
              </div>
              <Badge>{educationData.duration}</Badge>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
