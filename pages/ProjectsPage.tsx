import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { projectData } from '../constants';
import type { Project } from '../types';

/* ═══════════════════════════════════════════════════════════════
   PROGRAMMING LANGUAGE SYNTAX SPEC GENERATOR & CODE VIEWER
   ═══════════════════════════════════════════════════════════════ */

function generateProjectCode(project: Project, lang: 'dart' | 'kotlin' | 'ts' | 'json'): string {
  const cleanId = project.id.replace(/-/g, '_');
  const className = project.name.replace(/[^a-zA-Z0-9]/g, '') + 'Spec';
  const techList = project.technologies.split(',').map((t) => t.trim());

  if (lang === 'kotlin') {
    return `// ============================================================================
// ARCHITECTURAL SPECIFICATION: ${cleanId}.kt
// Package: com.jadhavrupesh.portfolio.works
// Author: Rupesh Jadhav (Software Developer @ Enso Webworks, Mumbai)
// Target Platforms: [${project.platform}]
// ============================================================================

package com.jadhavrupesh.portfolio.works

import com.jadhavrupesh.architecture.ProductionProject
import com.jadhavrupesh.architecture.CleanArchitecture
import kotlinx.coroutines.flow.StateFlow

@ArchitectureSpec(
    name = "${project.name}",
    tag = "${project.tag}",
    timeline = "${project.timeline}",
    verified = true
)
class ${className} : ProductionProject {

    // ── 01. SPECIFICATION MATRIX ───────────────────────────────────────────
    val timeline: String = "${project.duration}"
    val engineerRole: String = "${project.role}"
    val targetPlatform: String = "${project.platform}"
    val domainFocus: String = "${project.focus}"
    val stack: List<String> = listOf(
        ${techList.map((t) => `"${t}"`).join(', ')}
    )

    /**
     * EXECUTIVE SUMMARY
     * ------------------------------------------------------------------------
${project.description.map((p) => `     * ${p}`).join('\n     *\n')}
     */

    // ── 02. SYSTEM DESIGN & ARCHITECTURE ────────────────────────────────────
    @SystemDesign(pattern = "Clean Architecture")
    override fun configureSystemArchitecture() {
${project.responsibilities?.map((r, i) => `        // 0${i + 1}. ${r}`).join('\n') || '        // Core system architecture applied'}
    }

    // ── 03. TECHNICAL HURDLES & SOLUTIONS ───────────────────────────────────
    @EngineeringHurdles
    override suspend fun solveComplexities() {
${project.challenges?.map((c, i) => `        // 0${i + 1}. ${c}`).join('\n') || '        // Production hurdles resolved'}
    }

    // ── 04. MEASURED IMPACT & AUDIT ─────────────────────────────────────────
    companion object {
        val verifiedOutcome: String = "${project.impact}"
        val auditStatus: String = "VERIFIED_PRODUCTION_RELEASE"
    }
}`;
  }

  if (lang === 'ts') {
    return `/**
 * ARCHITECTURAL SPECIFICATION: ${cleanId}.spec.ts
 * Package: @jadhavrupesh/portfolio-works
 * Author: Rupesh Jadhav (Software Developer @ Enso Webworks, Mumbai)
 * Target: [${project.platform}]
 */

import { ProductionProject, CleanArchitecture, Metric } from '@jadhavrupesh/core';

@ArchitectureSpec({
  name: "${project.name}",
  tag: "${project.tag}",
  timeline: "${project.timeline}",
  verified: true,
})
export class ${className} implements ProductionProject {
  // ── 01. SPECIFICATION MATRIX ─────────────────────────────────────────────
  public readonly timeline: string = "${project.duration}";
  public readonly engineerRole: string = "${project.role}";
  public readonly targetPlatform: string = "${project.platform}";
  public readonly domainFocus: string = "${project.focus}";
  public readonly stack: readonly string[] = [
    ${techList.map((t) => `"${t}"`).join(', ')}
  ];

  /**
   * EXECUTIVE SUMMARY
   * --------------------------------------------------------------------------
${project.description.map((p) => `   * ${p}`).join('\n   *\n')}
   */

  // ── 02. SYSTEM DESIGN & ARCHITECTURE ─────────────────────────────────────
  @SystemDesign({ pattern: 'Clean Architecture' })
  public configureArchitecture(): void {
${project.responsibilities?.map((r, i) => `    // 0${i + 1}. ${r}`).join('\n') || '    // Architecture applied'}
  }

  // ── 03. TECHNICAL HURDLES & SOLUTIONS ─────────────────────────────────────
  @EngineeringHurdles()
  public async solveComplexities(): Promise<void> {
${project.challenges?.map((c, i) => `    // 0${i + 1}. ${c}`).join('\n') || '    // Hurdles resolved'}
  }

  // ── 04. MEASURED IMPACT & AUDIT ───────────────────────────────────────────
  public static readonly verifiedOutcome: Metric = {
    impact: "${project.impact}",
    auditStatus: "VERIFIED_PRODUCTION_RELEASE",
  };
}`;
  }

  if (lang === 'json') {
    return JSON.stringify(
      {
        $schema: "https://schema.jadhavrupesh.com/portfolio/v2/project.json",
        metadata: {
          id: project.id,
          name: project.name,
          tag: project.tag,
          platform: project.platform,
          author: "Rupesh Jadhav <Software Developer @ Enso Webworks, Mumbai>",
          verified: true
        },
        specificationMatrix: {
          timeline: project.duration,
          role: project.role,
          domainFocus: project.focus,
          technologies: techList
        },
        executiveSummary: project.description,
        systemArchitecture: project.responsibilities || [],
        technicalChallenges: project.challenges || [],
        measuredOutcome: {
          impact: project.impact,
          audit: "PASSED_PRODUCTION_AUDIT"
        }
      },
      null,
      2
    );
  }

  // Default: Dart (.dart)
  return `// ============================================================================
// ARCHITECTURAL SPECIFICATION: ${cleanId}_spec.dart
// Package: com.jadhavrupesh.portfolio.works
// Author: Rupesh Jadhav (Software Developer @ Enso Webworks, Mumbai)
// Target: [${project.platform}]
// ============================================================================

import 'package:clean_architecture/core.dart';
import 'package:melos_workspaces/modular_system.dart';
import 'package:bloc_concurrency/bloc.dart';

@ArchitectureSpec(
  name: '${project.name}',
  tag: '${project.tag}',
  timeline: '${project.timeline}',
  verified: true,
)
final class ${className} implements ProductionProject {
  // ── 01. SPECIFICATION MATRIX ─────────────────────────────────────────────
  final String timeline       = '${project.duration}';
  final String engineerRole   = '${project.role}';
  final String targetPlatform = '${project.platform}';
  final String domainFocus    = '${project.focus}';
  final List<String> stack    = const [
    ${techList.map((t) => `'${t}'`).join(', ')},
  ];

  /*
   * EXECUTIVE SUMMARY
   * --------------------------------------------------------------------------
${project.description.map((p) => `   * ${p}`).join('\n   *\n')}
   */

  // ── 02. SYSTEM DESIGN & RESPONSIBILITIES ──────────────────────────────────
  @override
  void configureSystemArchitecture() {
${project.responsibilities?.map((r, i) => `    // 0${i + 1}. ${r}`).join('\n') || '    // Core architecture applied'}
  }

  // ── 03. TECHNICAL CHALLENGES & SOLUTIONS ──────────────────────────────────
  @override
  Future<void> solveComplexities() async {
${project.challenges?.map((c, i) => `    // 0${i + 1}. ${c}`).join('\n') || '    // Production hurdles resolved'}
  }

  // ── 04. MEASURED OUTCOMES & IMPACT ────────────────────────────────────────
  static const Metric verifiedOutcome = Metric(
    impact: '${project.impact}',
    status: VerificationStatus.passedProductionAudit,
  );
}`;
}

function CodeSpecViewer({ project }: { project: Project }) {
  const defaultLang = project.category === 'Kotlin Multiplatform' ? 'kotlin' : 'dart';
  const [selectedLang, setSelectedLang] = useState<'dart' | 'kotlin' | 'ts' | 'json'>(defaultLang);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setSelectedLang(project.category === 'Kotlin Multiplatform' ? 'kotlin' : 'dart');
  }, [project.id]);

  const codeText = generateProjectCode(project, selectedLang);
  const lines = codeText.split('\n');

  const copyCode = () => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getFileTabName = () => {
    const cleanId = project.id.replace(/-/g, '_');
    if (selectedLang === 'dart') return `${cleanId}_spec.dart`;
    if (selectedLang === 'kotlin') return `${cleanId}.kt`;
    if (selectedLang === 'ts') return `${cleanId}.spec.ts`;
    return `${cleanId}.json`;
  };

  return (
    <div className="w-full border border-black bg-[#0d0e12] overflow-hidden shadow-2xl my-6">
      {/* ── macOS IDE Top Bar ── */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 border-b border-zinc-800 bg-[#14161d] text-xs font-mono">
        <div className="flex items-center gap-3">
          {/* Traffic Lights */}
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block" />
          </div>

          {/* Active File Tab */}
          <div className="flex items-center gap-2 px-3 py-1 bg-[#1a1d26] border border-zinc-700 text-zinc-200 font-semibold">
            <span className="text-red-400">⚡</span>
            <span>{getFileTabName()}</span>
          </div>
        </div>

        {/* Controls: Language Tabs & Copy Button */}
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <div className="flex items-center bg-[#1a1d26] p-0.5 border border-zinc-800 text-[11px]">
            {(['dart', 'kotlin', 'ts', 'json'] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setSelectedLang(lang)}
                className={`px-2.5 py-1 font-mono uppercase font-bold transition-colors ${
                  selectedLang === lang
                    ? 'bg-red-700 text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={copyCode}
            className="px-3 py-1 bg-[#1a1d26] hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-[11px] font-mono font-semibold transition-colors flex items-center gap-1.5"
            aria-label="Copy code to clipboard"
          >
            {copied ? (
              <span className="text-emerald-400">✓ Copied</span>
            ) : (
              <span>Copy Spec</span>
            )}
          </button>
        </div>
      </div>

      {/* ── Syntax-Highlighted Code Body ── */}
      <div className="overflow-x-auto p-4 sm:p-6 text-xs sm:text-sm font-mono leading-relaxed select-text max-h-[720px] overflow-y-auto">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-zinc-800/40">
                <td className="pr-4 sm:pr-6 text-right select-none text-zinc-600 w-10 text-[11px] align-top">
                  {idx + 1}
                </td>
                <td className="text-zinc-200 whitespace-pre">
                  {highlightCodeTokens(line)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function highlightCodeTokens(line: string) {
  if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*') || line.trim().startsWith('*/')) {
    return <span className="text-zinc-500 italic">{line}</span>;
  }

  // Regex tokenizer matching comments, annotations, strings, keywords, types, numbers
  const tokens = line.split(/('(?:\\'|[^'])*'|"(?:\\"|[^"])*"|@[a-zA-Z0-9_]+|\b(?:import|package|final|class|override|val|fun|suspend|interface|static|const|return|listOf|implements|void|async|await|Future|var|let|export|type|public|readonly|companion|object)\b|\b(?:String|List|Metric|ProductionProject|CleanArchitecture|Role|StateFlow|Domain|VerificationStatus|BuildStatus|Audit|Promise)\b|[a-zA-Z0-9_]+|[^\s\w])/g).filter(Boolean);

  return (
    <>
      {tokens.map((token, i) => {
        if (/^@\w+/.test(token)) {
          return <span key={i} className="text-amber-400 font-semibold">{token}</span>;
        }
        if (/^('(?:\\'|[^'])*'|"(?:\\"|[^"])*")$/.test(token)) {
          return <span key={i} className="text-emerald-400">{token}</span>;
        }
        if (/^\b(?:import|package|final|class|override|val|fun|suspend|interface|static|const|return|listOf|implements|void|async|await|Future|var|let|export|type|public|readonly|companion|object)\b$/.test(token)) {
          return <span key={i} className="text-red-400 font-bold">{token}</span>;
        }
        if (/^\b(?:String|List|Metric|ProductionProject|CleanArchitecture|Role|StateFlow|Domain|VerificationStatus|BuildStatus|Audit|Promise)\b$/.test(token)) {
          return <span key={i} className="text-purple-400 font-semibold">{token}</span>;
        }
        if (/^\b\d+(?:\.\d+)?%?\b$/.test(token)) {
          return <span key={i} className="text-sky-400">{token}</span>;
        }
        return <span key={i} className="text-zinc-200">{token}</span>;
      })}
    </>
  );
}

export default function ProjectsPage() {
  const location = useLocation();
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const filterCategories = [
    { label: 'All', value: 'All', count: projectData.length },
    { label: 'AI & Realtime', value: 'AI & Realtime', count: projectData.filter(p => p.category === 'AI & Realtime').length },
    { label: 'Enterprise Banking', value: 'Enterprise', count: projectData.filter(p => p.category === 'Enterprise').length },
    { label: 'Flutter & Melos', value: 'Flutter', count: projectData.filter(p => p.category === 'Flutter').length },
    { label: 'Kotlin Multiplatform', value: 'Kotlin Multiplatform', count: projectData.filter(p => p.category === 'Kotlin Multiplatform').length },
  ];

  const filteredProjects = projectData.filter((project) => {
    if (activeFilter === 'All') return true;
    return project.category === activeFilter;
  });

  // Check URL hash on load (e.g. /works#btl-king)
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const found = projectData.find((p) => p.id === id);
      if (found) {
        setActiveProject(found);
        window.scrollTo(0, 0);
      }
    }
  }, [location.hash]);

  const openProject = (project: Project) => {
    setActiveProject(project);
    window.history.replaceState(null, '', `/works#${project.id}`);
    window.scrollTo(0, 0);
  };

  const closeProject = () => {
    setActiveProject(null);
    window.history.replaceState(null, '', '/works');
  };

  return (
    <div className="container" style={{ marginTop: '40px', marginBottom: '80px' }}>
      {activeProject ? (
        /* ═══════════════════════════════════════════════════════════════
           EXECUTABLE ARCHITECTURAL CODE DOSSIER (PROGRAMMING LANGUAGE SPEC)
           ═══════════════════════════════════════════════════════════════ */
        <article className="work-detail" aria-labelledby="work-detail-heading">
          {/* Top Breadcrumb & Format Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-black">
            <button
              onClick={closeProject}
              className="rolling-link text-xs font-mono font-bold"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <span className="rolling-label">← Back to all projects</span>
              <span className="rolling-label rolling-label--hover">← Back to all projects</span>
            </button>
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="px-2 py-0.5 border border-black uppercase text-black font-semibold">
                {activeProject.tag}
              </span>
              <span className="text-zinc-400">·</span>
              <span className="text-zinc-600">{activeProject.timeline}</span>
            </div>
          </div>

          {/* Case Study Header */}
          <div className="mb-6">
            <p className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-1.5">
              Source Blueprint / {activeProject.platform}
            </p>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black leading-none mb-3" id="work-detail-heading">
              {activeProject.name}
            </h1>
            <p className="text-sm sm:text-base font-mono text-zinc-600 max-w-3xl leading-relaxed">
              {activeProject.tagline}
            </p>
          </div>

          {/* ── IDE Code Dossier Window ── */}
          <CodeSpecViewer project={activeProject} />

          {/* Next Project Footer Switcher */}
          <div className="mt-12 pt-6 border-t border-black flex justify-between items-center">
            <button
              onClick={closeProject}
              className="rolling-link text-xs font-mono font-bold"
            >
              <span className="rolling-label">← Back to all projects</span>
              <span className="rolling-label rolling-label--hover">← Back to all projects</span>
            </button>
            <button
              onClick={() => {
                const currentIndex = projectData.findIndex((p) => p.id === activeProject.id);
                const nextProject = projectData[(currentIndex + 1) % projectData.length];
                openProject(nextProject);
              }}
              className="rolling-link text-xs font-mono font-bold"
            >
              <span className="rolling-label">Next project →</span>
              <span className="rolling-label rolling-label--hover">Next project →</span>
            </button>
          </div>
        </article>
      ) : (
        /* ═══════════════════════════════════════════════════════════════
           WORKS ARCHIVE: EDITORIAL DOSSIER INDEX
           ═══════════════════════════════════════════════════════════════ */
        <section aria-labelledby="works-heading">
          {/* Header Title Section */}
          <div className="grid-12">
            <div className="span-8">
              <p className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2">
                Selected Works · 2019 — 2026
              </p>
              <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-black leading-none" id="works-heading">
                Engineering Works
              </h1>
              <p className="mt-6 text-base sm:text-lg font-mono text-zinc-600 max-w-2xl leading-relaxed">
                Production mobile applications, Kotlin Multiplatform systems, and AI-driven platforms architected across Banking, Hospitality, and SaaS.
              </p>
            </div>

            {/* View Mode Toggle Controls */}
            <div className="span-4 flex flex-col justify-end items-start sm:items-end mt-6 sm:mt-0">
              <div className="flex items-center p-1 border border-black bg-white">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1.5 font-mono text-xs font-bold uppercase transition-all ${
                    viewMode === 'grid' ? 'bg-black text-white' : 'text-black hover:text-red-700'
                  }`}
                >
                  Grid Mode
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1.5 font-mono text-xs font-bold uppercase transition-all ${
                    viewMode === 'table' ? 'bg-black text-white' : 'text-black hover:text-red-700'
                  }`}
                >
                  Ledger Table
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Category Filter Chips */}
          <div className="flex flex-wrap gap-2 mt-12 pb-6 border-b border-black">
            {filterCategories.map((cat) => {
              const isActive = activeFilter === cat.value;
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setActiveFilter(cat.value)}
                  className={`px-4 py-2 text-xs font-mono uppercase font-semibold transition-all border ${
                    isActive
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-zinc-700 border-zinc-300 hover:border-black hover:text-black'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`ml-2 text-[10px] ${isActive ? 'text-red-300' : 'text-zinc-400'}`}>
                    ({cat.count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── View 1: Asymmetrical Minimalist Magazine Grid ── */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {filteredProjects.map((project, idx) => (
                <article
                  key={project.id}
                  className="p-6 sm:p-8 border border-black bg-white flex flex-col justify-between hover:shadow-lg transition-all duration-200 group cursor-pointer"
                  onClick={() => openProject(project)}
                >
                  <div>
                    {/* Top Index & Platform Meta */}
                    <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-200">
                      <span className="font-mono text-xs font-extrabold text-red-700">
                        № {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono px-2 py-0.5 bg-zinc-100 border border-zinc-300 text-zinc-700 uppercase font-semibold">
                          {project.tag}
                        </span>
                        <span className="text-[11px] font-mono text-zinc-500">
                          {project.timeline}
                        </span>
                      </div>
                    </div>

                    {/* Clean Project Header */}
                    <div className="mb-4">
                      <h2 className="text-2xl sm:text-3xl font-black uppercase text-black tracking-tight group-hover:text-red-700 transition-colors">
                        {project.name}
                      </h2>
                      <p className="text-xs sm:text-sm font-mono text-zinc-600 mt-1.5 line-clamp-2">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.split(',').slice(0, 4).map((tech) => (
                        <span
                          key={tech.trim()}
                          className="text-[11px] font-mono px-2 py-0.5 bg-zinc-100 border border-zinc-300 text-zinc-700"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>

                    {/* Description Excerpt */}
                    <p className="text-xs font-mono text-zinc-600 leading-relaxed line-clamp-3 mb-6">
                      {project.description[0]}
                    </p>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-4 border-t border-zinc-200 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase text-black group-hover:text-red-700 transition-colors">
                      Read Architectural Case Study
                    </span>
                    <span className="text-xs font-mono text-red-700 font-bold group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* ── View 2: High-Density Swiss Ledger Table ── */
            <div className="mt-12 overflow-x-auto border border-black bg-white">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="border-b border-black bg-zinc-100 text-black uppercase tracking-wider">
                    <th className="p-4 w-12">№</th>
                    <th className="p-4">Project / Product</th>
                    <th className="p-4">Domain &amp; Platform</th>
                    <th className="p-4">Core Architecture</th>
                    <th className="p-4">Year</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((project, idx) => (
                    <tr
                      key={project.id}
                      onClick={() => openProject(project)}
                      className="border-b border-zinc-200 hover:bg-zinc-50 cursor-pointer transition-colors group"
                    >
                      <td className="p-4 font-bold text-red-700">
                        {String(idx + 1).padStart(2, '0')}
                      </td>
                      <td className="p-4">
                        <span className="font-extrabold text-sm uppercase text-black group-hover:text-red-700 transition-colors block">
                          {project.name}
                        </span>
                        <span className="text-[11px] text-zinc-500 line-clamp-1">
                          {project.tagline}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="font-medium text-black block">{project.tag}</span>
                        <span className="text-[11px] text-zinc-500">{project.platform}</span>
                      </td>
                      <td className="p-4 text-zinc-600 max-w-xs truncate">
                        {project.technologies}
                      </td>
                      <td className="p-4 text-zinc-500 whitespace-nowrap">
                        {project.timeline}
                      </td>
                      <td className="p-4 text-right whitespace-nowrap">
                        <span className="font-bold text-black group-hover:text-red-700">
                          Case Study →
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}
    </div>
  );
}



