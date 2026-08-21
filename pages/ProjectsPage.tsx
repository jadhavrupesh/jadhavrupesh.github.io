import React from 'react';
import { projectData } from '../constants';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { SectionTitle } from '../components/ui/SectionTitle';

export default function ProjectsPage() {
  return (
    <div className="space-y-12">
      <SectionTitle
        eyebrow="01 / Projects"
        title="Selected Work"
        subtitle="Personal and client projects showcasing mobile architecture, cross-platform development, and API integration."
      />

      <section className="grid gap-5 sm:grid-cols-2">
        {projectData.map((project, i) => (
          <div key={project.name} className="stagger-item" style={{ animationDelay: `${i * 100}ms` }}>
            <Card>
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-lg font-bold" style={{ color: 'var(--text)' }}>
                  {project.name}
                </h3>
                <Badge>{project.duration}</Badge>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.technologies.split(',').map((tech) => (
                  <span
                    key={tech.trim()}
                    className="text-[11px] px-2 py-0.5 rounded"
                    style={{
                      background: 'var(--bg-elevated)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>

              <ul className="space-y-2">
                {project.description.map((desc, j) => (
                  <li key={j} className="flex gap-2 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    <span style={{ color: 'var(--accent)' }}>→</span>
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        ))}
      </section>
    </div>
  );
}
