import { Link } from 'react-router-dom';

interface FeaturedProject {
  id: string;
  name: string;
  category: string;
  badge: string;
  badgeColor: string;
  duration: string;
  technologies: string[];
  summary: string;
  highlights: string[];
  githubUrl?: string;
}

const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: 'btl-king',
    name: 'BTL King',
    category: 'HOTEL & EVENT SUITE',
    badge: 'Production',
    badgeColor: 'bg-emerald-400 text-emerald-950',
    duration: 'Feb 2025 – Jun 2025',
    technologies: ['Flutter', 'Dart', 'Melos', 'BLoC', 'Clean Arch'],
    summary:
      'Enterprise hospitality and event inventory orchestration app built with modular Clean Architecture and multi-package Melos workspace for zero-regression state management.',
    highlights: ['Multi-Module Melos', 'BLoC State Management', 'FCM Push Notifications'],
  },
  {
    id: 'vesta-aodm',
    name: 'VestaAODM',
    category: 'AIRPORT OPERATIONS',
    badge: 'KMP Native',
    badgeColor: 'bg-cyan-400 text-cyan-950',
    duration: 'Jun 2024 – Sep 2024',
    technologies: ['Kotlin Multiplatform', 'Compose', 'Ktor', 'Koin', 'Moko-MVVM'],
    summary:
      'Cross-platform airport duty manager app sharing 85%+ codebase with Compose Multiplatform UI across iOS & Android, offline caching, and real-time incident reporting.',
    highlights: ['Single Codebase iOS & Android', 'Offline Caching', 'Ktor & Koin DI'],
  },
  {
    id: 'banking-suite',
    name: 'Snapwork Banking Apps',
    category: 'HDFC · ICICI · AXIS',
    badge: 'Banking Grade',
    badgeColor: 'bg-fuchsia-400 text-fuchsia-950',
    duration: 'Sep 2024 – Jul 2025',
    technologies: ['Flutter', 'Native Android', 'VAPT', 'Codemagic CI/CD'],
    summary:
      'High-traffic enterprise banking apps engineered to pass strict VAPT security audits, biometric authentication, token encryption, and automated store rollouts.',
    highlights: ['VAPT Security Hardening', 'Biometric Auth', 'Codemagic CI/CD'],
  },
  {
    id: 'gemini-bot',
    name: 'Gemini AI Assistant',
    category: 'GENERATIVE AI',
    badge: 'Featured',
    badgeColor: 'bg-amber-400 text-amber-950',
    duration: 'May 2023',
    technologies: ['Flutter', 'BLoC', 'Dio', 'Google Gemini API'],
    summary:
      'Real-time conversational AI client featuring chunk token streaming, reactive Markdown rendering, offline conversation history, and responsive layout.',
    highlights: ['Real-Time Token Streaming', 'Custom Markdown Parser', 'Resilient Network Layer'],
    githubUrl: 'https://github.com/jadhavrupesh',
  },
];

export default function PixelFeaturedProjects() {
  return (
    <section className="w-full max-w-screen-lg mx-auto my-12 px-4" aria-label="Featured Projects">
      {/* Section Header */}
      <div className="text-center mb-8">
        <p className="text-[10px] tracking-[2px] text-cyan-400 font-bold mb-1 uppercase font-mono">
          SELECTED PRODUCTION WORK · 2020 – 2025
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-white font-mono mb-2">
          Featured Mobile & Multiplatform Apps.
        </h2>
        <p className="text-sm md:text-base text-purple-200 font-mono max-w-2xl mx-auto">
          Production Flutter, Compose Multiplatform & KMP applications built with Clean Architecture, offline resilience, and 60fps performance.
        </p>
      </div>

      {/* Dither pattern strip above projects */}
      <div className="pixel-dither-strip pattern-dot-three mb-6" aria-hidden="true" />

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FEATURED_PROJECTS.map(project => (
          <div
            key={project.id}
            className="p-6 bg-[#130825] border-2 border-[#3a1b68] rounded-pixel-sm transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_18px_rgba(15,211,211,0.25)] hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              {/* Card Top Row: Category + Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-mono tracking-wider text-cyan-400 font-bold">
                  {project.category}
                </span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-pixel-sm ${project.badgeColor}`}>
                  {project.badge}
                </span>
              </div>

              {/* Title & Duration */}
              <div className="mb-3">
                <h3 className="text-lg md:text-xl font-bold text-white font-mono">{project.name}</h3>
                <span className="text-xs font-mono text-purple-300">{project.duration}</span>
              </div>

              {/* Summary */}
              <p className="text-xs md:text-sm font-mono text-purple-100 leading-relaxed mb-4">
                {project.summary}
              </p>

              {/* Highlights */}
              <div className="mb-4 flex flex-wrap gap-1.5">
                {project.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono bg-[#231042] text-purple-200 px-2 py-0.5 border border-[#4c248b]"
                  >
                    ✦ {h}
                  </span>
                ))}
              </div>
            </div>

            {/* Tech Stack Chips */}
            <div>
              <div className="pt-3 border-t border-[#2d1554] flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono font-bold px-1.5 py-0.5 bg-[#1d0a38] text-amber-200 border border-[#3e1a74]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-[10px] font-mono text-purple-400 px-1 py-0.5">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                <Link
                  to="/projects"
                  className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  Details ↗
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dither pattern strip below projects */}
      <div className="pixel-dither-strip pattern-dot-three mt-6 mb-6" aria-hidden="true" />

      {/* View All Projects Footer Action */}
      <div className="text-center">
        <Link
          to="/projects"
          className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold font-mono bg-[#784fcf] text-white hover:bg-[#8b5cf6] transition-all rounded-pixel-sm shadow-[0_3px_0_0_#4c1d95]"
        >
          View All Projects & Architecture Case Studies ↗
        </Link>
      </div>
    </section>
  );
}
