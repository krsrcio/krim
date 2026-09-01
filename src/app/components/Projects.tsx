import { motion, useInView } from 'motion/react';
import { ArrowUpRight, Github } from 'lucide-react';
import { useRef } from 'react';

import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { ExpandDetails } from './ExpandDetails';

const smoothEase = [0.22, 1, 0.36, 1] as const;

type Project = {
  title: string;
  description: string;
  role: string;
  focus: string;
  tech: string[];
  github?: string;
  image?: string;
  imageAlt?: string;
  imageBackground?: 'dark';
};

const projects: Project[] = [
  {
    title: 'Baskit',
    description: 'Baskit is a fast and convenient service that lets busy users create a grocery list, generate a code, and have a trusted Tagabili shop and prepare their items for easy pickup at a branch.',
    role: ' Full-stack developer, Mobile app designer',
    focus: 'Grocery-list creation and branch pickup flow',
    tech: ['Jetpack Compose', 'PHP', 'Kotlin'],
    github: 'https://github.com/krsrcio/Baskit',
    image: '/baskit_logo.png',
    imageAlt: 'Baskit application logo',
  },
  {
    title: 'PetPal',
    description: 'PetPal is a fun and interactive 2D 8-bit mobile game where players adopt their own virtual pet, take care of it. By feeding, grooming, playing, and keeping their pet happy and healthy.',
    role: 'Full-stack developer, Game designer',
    focus: 'Virtual-pet care gameplay and player interaction',
    tech: ['Unity', 'MySQL', 'C#'],
    github: 'https://github.com/krsrcio/Petpal',
    image: '/petpal.png',
    imageAlt: 'PetPal virtual logo',
  },
  {
    title: 'DermaScan',
    description: 'DermaScan is a mobile application that allows users to take photos of their skin and get an analysis of potential skin conditions using AI-powered image recognition.',
    role: 'Mobile app developer, Database manager',
    focus: 'AI-assisted skin analysis from user-captured photos',
    tech: ['React Native', 'Python', 'TensorFlow', 'Flutter'],
    github: 'https://github.com/krsrcio/dermascan',
    image: '/DermaScan.png',
    imageAlt: 'DermaScan application logo',
  },
  {
    title: 'Echoes of the lighthouse',
    description: 'A narrative-driven adventure game set in a mysterious lighthouse. Players explore the environment, solve puzzles, and uncover the secrets of the lighthouse through immersive storytelling and atmospheric design.',
    role: 'Front-end developer',
    focus: 'Narrative exploration, puzzle design, and atmosphere',
    tech: ['Unity', 'C#'],
    github: 'https://github.com/krsrcio/echoes-of-the-lighthouse',
    image: '/eofL.png',
    imageAlt: 'Echoes of the lighthouse game logo',
    imageBackground: 'dark',
  },
  {
    title: 'RxGuard',
    description: 'RxGuard is a mobile application that helps users manage their medications by providing reminders, tracking adherence, and offering insights into their medication schedules.',
    role: 'Front-end developer',
    focus: 'Medication reminders and adherence tracking',
    tech: ['Next.js', 'Firebase', 'Redux', 'PostgreSQL', 'Prisma'],
    github: 'https://github.com/krsrcio/rxguard',
    image: '/RXGUARD.png',
    imageAlt: 'RxGuard application logo',
  },
];

export function Projects() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const prefersReducedMotion = usePrefersReducedMotion();
  const shouldAnimate = !prefersReducedMotion;

  return (
    <section id="projects" ref={ref} className="flex min-h-screen items-center bg-neutral-50 px-5 py-20 sm:px-6 sm:py-24">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={shouldAnimate ? { opacity: 0, y: 40 } : false}
          animate={shouldAnimate && isInView ? { opacity: 1, y: 0 } : undefined}
          transition={shouldAnimate ? { duration: 0.6, ease: smoothEase } : undefined}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="text-sm tracking-[0.3em] uppercase text-neutral-400 mb-4">SELECTED WORKS</p>
            <h2 className="text-4xl leading-[1.05] tracking-tight text-black md:text-6xl" style={{ fontWeight: 700 }}>
              Featured projects.
            </h2>
          </div>
        </motion.div>

        <div className="h-12 sm:h-16" />

        <div className="space-y-8">
          {projects.map((project) => (
            <motion.article
              key={project.title}
              initial={shouldAnimate ? { opacity: 0, y: 28 } : false}
              whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
              transition={
                shouldAnimate
                  ? { duration: 0.55, ease: smoothEase }
                  : undefined
              }
              viewport={{ once: true, amount: 0.15 }}
              className="group border border-neutral-200 bg-white p-6 transition-colors duration-300 hover:border-black motion-reduce:transition-none sm:p-8 md:p-10"
            >
              <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-2">
                    <h3 className="text-2xl tracking-tight text-black transition-colors duration-300 group-hover:text-neutral-700 motion-reduce:transition-none md:text-3xl" style={{ fontWeight: 600 }}>
                      {project.title}
                    </h3>
                  </div>
                  <p className="mb-6 leading-relaxed text-neutral-600">
                    {project.description}
                  </p>
                  <ExpandDetails>
                    <dl className="grid gap-5 text-sm leading-relaxed sm:grid-cols-2">
                      <div>
                        <dt className="mb-1 text-xs uppercase tracking-[0.18em] text-neutral-500">Role</dt>
                        <dd className="text-neutral-800">{project.role}</dd>
                      </div>
                      <div>
                        <dt className="mb-1 text-xs uppercase tracking-[0.18em] text-neutral-500">Project focus</dt>
                        <dd className="text-neutral-800">{project.focus}</dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="mb-2 text-xs uppercase tracking-[0.18em] text-neutral-500">Technology</dt>
                        <dd className="flex flex-wrap gap-2">
                          {project.tech.map((tech, techIndex) => (
                            <span
                              key={`${tech}-${techIndex}`}
                              className="border border-neutral-300 bg-white px-3 py-1.5 text-xs uppercase tracking-wider text-neutral-600"
                            >
                              {tech}
                            </span>
                          ))}
                        </dd>
                      </div>
                    </dl>
                  </ExpandDetails>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-neutral-700 transition-colors duration-300 hover:text-black motion-reduce:transition-none"
                    >
                      <Github size={18} aria-hidden="true" />
                      View code
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  )}
                </div>
                {project.image && project.imageAlt && (
                  <figure
                    className={`flex h-48 w-full shrink-0 items-center justify-center overflow-hidden rounded-2xl border p-4 shadow-[0_12px_30px_rgba(0,0,0,0.08)] sm:h-56 sm:p-6 md:h-64 md:w-56 ${
                      project.imageBackground === 'dark'
                        ? 'border-neutral-800 bg-black'
                        : 'border-neutral-200 bg-neutral-50'
                    }`}
                  >
                    <img
                      src={project.image}
                      alt={project.imageAlt}
                      loading="lazy"
                      className="h-full max-w-full rounded-xl object-contain"
                    />
                  </figure>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
