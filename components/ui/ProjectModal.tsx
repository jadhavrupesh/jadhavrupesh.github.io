import React from 'react';
import type { Project } from '../../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay overflow-y-auto">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-2xl rounded-2xl glass-panel border border-zinc-800 shadow-2xl modal-content my-8 p-6 sm:p-8 z-10 overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/25">
                Case Study
              </span>
              <span className="text-[11px] font-mono text-zinc-500">{project.duration}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold gradient-headline">
              {project.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Tech Stack Pills */}
        <div className="py-4 border-b border-zinc-800/60">
          <div className="text-xs font-mono text-zinc-500 mb-2 uppercase tracking-wider">
            Technologies & Frameworks
          </div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.split(',').map((tech) => (
              <span
                key={tech.trim()}
                className="text-xs font-mono px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20"
              >
                {tech.trim()}
              </span>
            ))}
          </div>
        </div>

        {/* Deep Architectural Highlights */}
        <div className="py-5 space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Key Accomplishments & Architecture
          </h4>
          <div className="space-y-3">
            {project.description.map((desc, i) => (
              <div key={i} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
                <span className="text-indigo-400 font-bold shrink-0">→</span>
                <span>{desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture Spec Card */}
        <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span className="text-indigo-400 font-semibold">Architecture Standard</span>
            <span>Clean Architecture / MVVM</span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Engineered with strict separation between Domain, Data, and Presentation layers. Features reactive state management, offline-first caching, and secure token authentication.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
          <span className="text-xs font-mono text-zinc-500">Rupesh Jadhav Mobile Portfolio</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-lg shadow-indigo-500/20"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
}
