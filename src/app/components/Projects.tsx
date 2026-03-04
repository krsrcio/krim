import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Download, ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'Baskit',
    description: 'Baskit is a fast and convenient service that lets busy users create a grocery list, generate a code, and have a trusted Tagabili shop and prepare their items for easy pickup at a branch.',
    tech: ['Jetpack Compose', 'PHP', 'Kotlin'],
    // github: 'https://github.com/krsrcio/Baskit',
    // live: '#'
  },
  {
    title: 'PetPal',
    description: 'PetPal is a fun and interactive 2D 8-bit mobile game where players adopt their own virtual pet, take care of it. By feeding, grooming, playing, and keeping their pet happy and healthy.',
    tech: ['Unity', 'MySQL', 'C#'],
    // github: 'https://github.com/krsrcio/Petpal',
    // live: '#'
  },
  {
    title: 'DermaScan',
    description: 'DermaScan is a mobile application that allows users to take photos of their skin and get an analysis of potential skin conditions using AI-powered image recognition.',
    tech: ['React Native', 'Python', 'TensorFlow', 'Flutter'],
    // github: 'https://github.com/krsrcio/dermascan',
    // live: '#'
  },
  {
    title: 'Echoes of the lighthouse',
    description: 'A narrative-driven adventure game set in a mysterious lighthouse. Players explore the environment, solve puzzles, and uncover the secrets of the lighthouse through immersive storytelling and atmospheric design.',
    tech: ['Unity', 'C#'],
    // github: '#',
    // live: '#'
  },
  {
    title: 'RxGuard',
    description: 'RxGuard is a mobile application that helps users manage their medications by providing reminders, tracking adherence, and offering insights into their medication schedules.',
    tech: ['Next.js', 'Firebase', 'Redux', 'PostgreSQL', 'Prisma'],
    // github: 'https://github.com/krsrcio/rxguard',
    // live: '#'
  },
  
];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" ref={ref} className="min-h-screen flex items-center px-6 py-24 bg-neutral-50">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="text-sm tracking-[0.3em] uppercase text-neutral-400 mb-4">SELECTED WORKS</p>
            <h2 className="text-4xl md:text-6xl tracking-tight text-black" style={{ fontWeight: 700 }}>
              Featured projects.
            </h2>
          </div>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase border border-neutral-300 px-5 py-3 text-neutral-700 hover:text-black hover:border-black transition-colors duration-300"
            aria-label="Download resume"
          >
            <Download size={18} />
            Download resume
          </a>
        </motion.div>

        <div className="h-16" />

        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="border border-neutral-200 p-8 md:p-10 hover:border-black transition-all duration-300 group bg-white"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl mb-4 text-black tracking-tight group-hover:text-neutral-700 transition-colors duration-300" style={{ fontWeight: 600 }}>
                    {project.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed mb-6">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={`${tech}-${techIndex}`}
                        className="text-xs tracking-wider uppercase px-3 py-1.5 border border-neutral-200 text-neutral-600 group-hover:border-neutral-400 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                {/* <div className="flex gap-4 md:flex-col">
                  <a
                    href={project.github}
                    className="flex items-center gap-2 text-neutral-600 hover:text-black transition-colors duration-300"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <Github size={20} />
                    <span className="text-sm">Code</span>
                  </a>
                  <a
                    href={project.live}
                    className="flex items-center gap-2 text-neutral-600 hover:text-black transition-colors duration-300"
                    aria-label={`View ${project.title} live site`}
                  >
                    <ExternalLink size={20} />
                    <span className="text-sm">Live</span>
                  </a>
                </div> */}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
