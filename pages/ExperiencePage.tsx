import React, { useState } from 'react';
import { experienceData, projectData, educationData } from '../constants';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { SectionTitle } from '../components/ui/SectionTitle';

export default function ExperiencePage() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <div className="space-y-12">
      <SectionTitle
        eyebrow="01 / Experience"
        title="Work History"
        subtitle="5+ years building mobile apps across FinTech, Banking, Hospitality, Logistics & E-commerce."
      />

      {/* Experience Timeline */}
      <section className="space-y-4">
        {experienceData.map((exp, i) => (
          <div key={i} className="stagger-item" style={{ animationDelay: `${i * 100}ms` }}>
            <Card hover={false}>
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="w-full text-left"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h3 className="text-base font-semibold" style={{ color: 'var(--text)' }}>
                      {exp.role}
                    </h3>
                    <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge>{exp.duration}</Badge>
                    <svg
                      className="w-4 h-4 transition-transform duration-200"
                      style={{
                        color: 'var(--text-muted)',
                        transform: expanded === i ? 'rotate(180deg)' : 'rotate(0)',
                      }}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </button>

              {expanded === i && (
                <div className="mt-4 pt-4 border-t space-y-2" style={{ borderColor: 'var(--border)' }}>
                  {exp.description.map((desc, j) => (
                    <div key={j} className="flex gap-2.5 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      <span style={{ color: 'var(--accent)' }}>→</span>
                      <span>{desc}</span>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        ))}
      </section>

      {/* Education */}
      <section>
        <SectionTitle eyebrow="02 / Education" title="Education" />
        <div className="stagger-item">
          <Card hover={false}>
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
          </Card>
        </div>
      </section>
    </div>
  );
}
