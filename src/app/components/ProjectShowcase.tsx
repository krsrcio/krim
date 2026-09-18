import { ArrowLeft, ArrowUpRight, Github, PlayCircle } from 'lucide-react';
import type { CSSProperties } from 'react';

import { getProjectByDemo } from '../data/projects';
import { ProjectDemo } from './demos/ProjectDemo';
import type { DemoId } from './demos/types';

type ProjectShowcaseProps = {
  demo: DemoId;
};

export function ProjectShowcase({ demo }: ProjectShowcaseProps) {
  const project = getProjectByDemo(demo);

  if (!project) return null;

  const themeStyles = {
    '--project-page': project.theme.page,
    '--project-header': project.theme.header,
    '--project-live': project.theme.live,
    '--project-panel': project.theme.panel,
    '--project-text': project.theme.text,
    '--project-muted': project.theme.muted,
    '--project-border': project.theme.border,
    '--project-accent': project.theme.accent,
    '--project-accent-text': project.theme.accentText,
    '--project-accent-soft': project.theme.accentSoft,
    '--project-hero-text': project.theme.heroText,
  } as CSSProperties;

  return (
    <div style={themeStyles} className="min-h-screen bg-[var(--project-page)] text-[var(--project-text)]">
      <header className="sticky top-0 z-30 border-b border-[var(--project-border)] bg-[var(--project-header)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-6">
          <a href="#/" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--project-text)] transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--project-accent)]"><ArrowLeft size={18} aria-hidden="true" /> Back to portfolio</a>
          <span className="hidden text-sm font-medium text-[var(--project-muted)] sm:block">{project.title}</span>
        </div>
      </header>

      <main>
        <section style={{ background: project.theme.hero }} className="border-b border-[var(--project-border)]">
          <div className="mx-auto grid max-w-5xl gap-8 px-5 py-10 sm:px-6 sm:py-12 md:grid-cols-[1fr_auto] md:items-center">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-white/80">{project.category}</p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-[var(--project-hero-text)] sm:text-5xl">{project.title}</h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--project-hero-text)] opacity-90 sm:text-lg">{project.story}</p>
              <button type="button" onClick={() => document.getElementById('live-prototype')?.scrollIntoView({ behavior: 'smooth' })} className="mt-6 inline-flex items-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-[var(--project-accent)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"><PlayCircle size={18} aria-hidden="true" /> Open demo</button>
            </div>
            {project.image && project.imageAlt && <figure className={`hidden size-40 items-center justify-center rounded-2xl border p-5 shadow-sm md:flex ${project.imageBackground === 'dark' ? 'border-white/30 bg-[#09162b]' : 'border-white bg-white'}`}><img src={project.image} alt={project.imageAlt} className="h-full w-full object-contain" /></figure>}
          </div>
        </section>

        <section id="live-prototype" className="scroll-mt-24 border-b border-[var(--project-border)] bg-[var(--project-live)] px-5 py-10 sm:px-6 sm:py-12">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-5 text-2xl font-bold tracking-tight text-[var(--project-text)]">Live demo</h2>
            <ProjectDemo demo={project.demo} />
          </div>
        </section>

        <section className="px-5 py-10 sm:px-6 sm:py-12">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.35fr_0.65fr]">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-[var(--project-text)]">What I worked on</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--project-muted)]">{project.description}</p>
              <ul className="mt-5 space-y-3">
                {project.contributions.map((contribution) => <li key={contribution} className="flex gap-3 border-l-2 border-[var(--project-accent)] pl-3 text-sm leading-relaxed text-[var(--project-text)]"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--project-accent)]" aria-hidden="true" />{contribution}</li>)}
              </ul>
            </div>

            <aside className="border-t border-[var(--project-border)] pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <h2 className="text-base font-bold text-[var(--project-text)]">Project details</h2>
              <dl className="mt-4 space-y-4 text-sm">
                <div><dt className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--project-muted)]">Role</dt><dd className="mt-1 text-[var(--project-text)]">{project.role}</dd></div>
                <div><dt className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--project-muted)]">Focus</dt><dd className="mt-1 leading-relaxed text-[var(--project-text)]">{project.focus}</dd></div>
                <div><dt className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--project-muted)]">Technology</dt><dd className="mt-2 flex flex-wrap gap-2">{project.tech.map((tech) => <span key={tech} className="rounded border border-[var(--project-border)] bg-[var(--project-accent-soft)] px-2.5 py-1 text-xs font-medium text-[var(--project-text)]">{tech}</span>)}</dd></div>
              </dl>
              <div className="mt-5 space-y-4 border-t border-[var(--project-border)] pt-5 text-sm">
                <div><h3 className="font-semibold text-[var(--project-text)]">The challenge</h3><p className="mt-1 leading-relaxed text-[var(--project-muted)]">{project.challenge}</p></div>
                <div><h3 className="font-semibold text-[var(--project-text)]">What I learned</h3><p className="mt-1 leading-relaxed text-[var(--project-muted)]">{project.takeaway}</p></div>
              </div>
              {project.github && <a href={project.github} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-md border border-[var(--project-accent)] px-3.5 py-2 text-sm font-semibold text-[var(--project-accent)] transition-colors hover:bg-[var(--project-accent-soft)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--project-accent)]"><Github size={17} aria-hidden="true" /> Source code <ArrowUpRight size={15} aria-hidden="true" /></a>}
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}
