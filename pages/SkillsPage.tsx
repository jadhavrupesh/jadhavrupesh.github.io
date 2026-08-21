import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { journalData } from '../constants';
import type { JournalEntry } from '../types';

export default function JournalPage() {
  const location = useLocation();
  const [activeEntry, setActiveEntry] = useState<JournalEntry | null>(null);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const found = journalData.find((entry) => entry.id === id);
      if (found) {
        setActiveEntry(found);
        window.scrollTo(0, 0);
      }
    }
  }, [location.hash]);

  return (
    <div className="container" style={{ marginTop: '40px' }}>
      {activeEntry ? (
        /* ── Full Editorial Article View (Journal Detail) ── */
        <article className="journal-detail" aria-labelledby="article-heading">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => {
                setActiveEntry(null);
                window.history.replaceState(null, '', '/journal');
              }}
              className="rolling-link text-xs font-mono font-bold"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <span className="rolling-label">← Back to all journal entries</span>
              <span className="rolling-label rolling-label--hover">← Back to all journal entries</span>
            </button>
            <span className="text-xs font-mono uppercase text-zinc-400">
              {activeEntry.category} · {activeEntry.readTime}
            </span>
          </div>

          <div className="grid-12">
            <header className="span-12">
              <p className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-4">
                Published {activeEntry.date}
              </p>
              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black leading-tight" id="article-heading">
                {activeEntry.title}
              </h1>
              <p className="mt-6 text-lg sm:text-xl font-mono font-medium text-zinc-700 max-w-3xl leading-relaxed">
                {activeEntry.excerpt}
              </p>
            </header>
          </div>

          {/* Article Reading Column */}
          <div className="grid-12">
            <div className="journal-detail__content">
              {activeEntry.content.map((section, idx) => (
                <section key={idx}>
                  {section.heading && (
                    <h2>{section.heading}</h2>
                  )}
                  <p>{section.text}</p>
                </section>
              ))}
            </div>
          </div>

          {/* Back & Switcher */}
          <div className="mt-20 pt-8 border-t border-black flex justify-between items-center">
            <button
              onClick={() => {
                setActiveEntry(null);
                window.history.replaceState(null, '', '/journal');
              }}
              className="rolling-link text-xs font-mono font-bold"
            >
              <span className="rolling-label">← Back to journal</span>
              <span className="rolling-label rolling-label--hover">← Back to journal</span>
            </button>
            <button
              onClick={() => {
                const currentIndex = journalData.findIndex((j) => j.id === activeEntry.id);
                const nextEntry = journalData[(currentIndex + 1) % journalData.length];
                setActiveEntry(nextEntry);
                window.scrollTo(0, 0);
              }}
              className="rolling-link text-xs font-mono font-bold"
            >
              <span className="rolling-label">Next article →</span>
              <span className="rolling-label rolling-label--hover">Next article →</span>
            </button>
          </div>
        </article>
      ) : (
        /* ── Journal Index Gallery ── */
        <section aria-labelledby="journal-heading" style={{ marginTop: '60px' }}>
          <div className="grid-12">
            <div className="span-8">
              <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-black" id="journal-heading">
                Journal
              </h1>
              <p className="mt-6 text-base sm:text-lg font-mono text-zinc-600 max-w-2xl leading-relaxed">
                Notes on mobile architecture, state management, and the engineering decisions behind better apps.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {journalData.map((entry) => (
              <article key={entry.id} className="lab-shot" style={{ flex: 'none', width: '100%' }}>
                <button
                  type="button"
                  className="lab-shot__link text-left w-full cursor-pointer"
                  onClick={() => {
                    setActiveEntry(entry);
                    window.history.replaceState(null, '', `/journal#${entry.id}`);
                    window.scrollTo(0, 0);
                  }}
                  aria-label={`Read ${entry.title}`}
                >
                  <div className="lab-shot__image-wrap p-6 flex flex-col justify-between" style={{ background: '#1c1c22', color: '#ffffff', minHeight: '220px' }}>
                    <div className="flex justify-between items-center text-[10px] font-mono uppercase text-zinc-400">
                      <span>{entry.category}</span>
                      <span>{entry.readTime}</span>
                    </div>
                    <div className="my-auto py-4">
                      <h2 className="text-base font-bold uppercase tracking-tight text-white line-clamp-3">
                        {entry.title}
                      </h2>
                      <p className="mt-2 text-xs font-mono text-zinc-400 line-clamp-2">
                        {entry.excerpt}
                      </p>
                    </div>
                    <div className="text-[10px] font-mono text-zinc-400 flex justify-between items-center">
                      <span>{entry.date}</span>
                      <span className="text-white font-bold">Read article →</span>
                    </div>
                  </div>
                  <figcaption className="mt-3 font-mono text-xs text-zinc-600">
                    {entry.title}
                  </figcaption>
                </button>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

