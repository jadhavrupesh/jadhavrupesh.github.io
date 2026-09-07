import React from 'react';
import { personalInfo } from '../constants';
import { SectionTitle } from '../components/ui/SectionTitle';
import { Badge } from '../components/ui/badge';

const contactLinks = [
  {
    label: 'Email',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    external: false,
    icon: 'mail',
  },
  {
    label: 'Phone',
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone}`,
    external: false,
    icon: 'phone',
  },
  {
    label: 'LinkedIn',
    value: 'in/rupesh-jadhav',
    href: personalInfo.linkedin,
    external: true,
    icon: 'linkedin',
  },
  {
    label: 'GitHub',
    value: 'jadhavrupesh',
    href: personalInfo.github,
    external: true,
    icon: 'github',
  },
];

const icons: Record<string, React.ReactNode> = {
  mail: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M3 8l9 6 9-6M3 8v10a2 2 0 002 2h14a2 2 0 002-2V8M3 8a2 2 0 012-2h14a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  phone: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13 1.05.37 2.07.7 3.06a2 2 0 01-.45 2.11L8.09 10.91a16 16 0 006 6l2.02-1.27a2 2 0 012.11-.45c.99.33 2.01.57 3.06.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  linkedin: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.86 0-1.86.53-2.24 1.32v-1.07h-2.64v8.31h2.64v-4.9c0-.86.69-1.55 1.55-1.55s1.55.69 1.55 1.55v4.9h2.64M6.52 8.68v8.31h2.64V8.68H6.52M7.84 5.71a1.53 1.53 0 100 3.06 1.53 1.53 0 000-3.06z" /></svg>,
  github: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.35-2 .93-2.71-.1-.25-.41-1.29.1-2.64 0 0 .76-.27 2.5 1.02a8.5 8.5 0 014.5 0c1.74-1.29 2.5-1.02 2.5-1.02.51 1.35.2 2.39.1 2.64.58.71.93 1.6.93 2.71 0 3.81-2.34 4.66-4.57 4.91.36.31.67.92.67 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" /></svg>,
};

export default function ContactPage() {
  return (
    <div className="space-y-12">
      <SectionTitle
        eyebrow="01 / Contact"
        title="Let's Talk"
        subtitle="Open to freelance projects, full-time roles, and mobile architecture consulting."
      />

      {/* Contact links */}
      <section className="grid gap-3 sm:grid-cols-2 max-w-2xl">
        {contactLinks.map((contact, i) => (
          <a
            key={contact.label}
            href={contact.href}
            target={contact.external ? '_blank' : undefined}
            rel={contact.external ? 'noopener noreferrer' : undefined}
            className="stagger-item group"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div
              className="rounded-xl p-4 flex items-center gap-3 transition-all duration-200"
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
              }}
            >
              <div
                className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0"
                style={{ background: 'var(--bg-elevated)', color: 'var(--accent-text)' }}
              >
                {icons[contact.icon]}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {contact.label}
                </div>
                <div className="text-sm font-medium truncate" style={{ color: 'var(--text)' }}>
                  {contact.value}
                </div>
              </div>
              {contact.external && (
                <svg
                  className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: 'var(--text-muted)' }}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          </a>
        ))}
      </section>

      {/* Availability */}
      <section>
        <div
          className="rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4"
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-2 h-2 rounded-full pulse-dot"
              style={{ background: 'var(--status-online)' }}
            />
            <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>
              Currently available
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge>Flutter</Badge>
            <Badge>Android</Badge>
            <Badge>KMP</Badge>
            <Badge>Mobile Architecture</Badge>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="text-sm" style={{ color: 'var(--text-muted)' }}>
        <span>Based in </span>
        <span style={{ color: 'var(--text-secondary)' }}>{personalInfo.location}</span>
      </section>
    </div>
  );
}
