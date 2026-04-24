import { motion, useInView } from "motion/react";
import { ArrowUpRight, FileText, Github } from "lucide-react";
import { useRef } from "react";

import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const smoothEase = [0.22, 1, 0.36, 1] as const;

type ProjectLink = {
  href: string;
  icon: typeof Github | typeof ArrowUpRight;
  label: string;
};

type ProjectCaseStudy = {
  headline: string;
  highlights: string[];
  summary: string;
};

type Project = {
  caseStudy: ProjectCaseStudy;
  description: string;
  links: ProjectLink[];
  tech: string[];
  title: string;
};

const projects: Project[] = [
  {
    title: "Baskit",
    description:
      "Baskit is a fast and convenient service that lets busy users create a grocery list, generate a code, and have a trusted Tagabili shop and prepare their items for easy pickup at a branch.",
    tech: ["Jetpack Compose", "PHP", "Kotlin"],
    links: [
      {
        href: "https://github.com/krsrcio/Baskit",
        icon: Github,
        label: "GitHub repo",
      },
    ],
    caseStudy: {
      headline: "Pickup-first grocery flow for busy users",
      summary:
        "The product centers on reducing friction for people who need errands handled quickly without losing clarity or trust in the handoff.",
      highlights: [
        "Designed a code-based pickup pattern to simplify the branch handoff.",
        "Focused the experience on speed, confidence, and delegation.",
        "Kept the mobile flow practical for real errands instead of over-designing it.",
      ],
    },
  },
  {
    title: "PetPal",
    description:
      "PetPal is a fun and interactive 2D 8-bit mobile game where players adopt their own virtual pet, take care of it. By feeding, grooming, playing, and keeping their pet happy and healthy.",
    tech: ["Unity", "MySQL", "C#"],
    links: [
      {
        href: "https://github.com/krsrcio/Petpal",
        icon: Github,
        label: "GitHub repo",
      },
      {
        href: "/petpal.png",
        icon: ArrowUpRight,
        label: "Gameplay screenshot",
      },
    ],
    caseStudy: {
      headline: "An 8-bit care loop built around attachment",
      summary:
        "The project leans on small, readable interactions so players feel emotionally connected to the pet instead of overwhelmed by systems.",
      highlights: [
        "Used a simple gameplay loop to make care actions feel rewarding.",
        "Balanced retro presentation with clear player feedback.",
        "Built the experience around consistency, charm, and replayability.",
      ],
    },
  },
  {
    title: "DermaScan",
    description:
      "DermaScan is a mobile application that allows users to take photos of their skin and get an analysis of potential skin conditions using AI-powered image recognition.",
    tech: ["React Native", "Python", "TensorFlow", "Flutter"],
    links: [
      {
        href: "https://github.com/krsrcio/dermascan",
        icon: Github,
        label: "GitHub repo",
      },
    ],
    caseStudy: {
      headline: "AI-assisted screening with a caution-first mindset",
      summary:
        "This concept works best when the interface supports responsible use, clear guidance, and user confidence around what AI can and cannot do.",
      highlights: [
        "Framed image analysis as support, not a medical replacement.",
        "Focused on clear capture flow and understandable results.",
        "Explored the intersection of mobile UX and applied AI.",
      ],
    },
  },
  {
    title: "Echoes of the Lighthouse",
    description:
      "A narrative-driven adventure game set in a mysterious lighthouse. Players explore the environment, solve puzzles, and uncover the secrets of the lighthouse through immersive storytelling and atmospheric design.",
    tech: ["Unity", "C#"],
    links: [],
    caseStudy: {
      headline: "Environmental storytelling as the core mechanic",
      summary:
        "The strongest part of this project is how mood, space, and puzzle pacing carry the narrative without needing constant exposition.",
      highlights: [
        "Built atmosphere through location, mystery, and pacing.",
        "Used exploration and puzzle solving to reveal story gradually.",
        "Treated the lighthouse itself as part of the narrative voice.",
      ],
    },
  },
  {
    title: "RxGuard",
    description:
      "RxGuard is a mobile application that helps users manage their medications by providing reminders, tracking adherence, and offering insights into their medication schedules.",
    tech: ["Next.js", "Firebase", "Redux", "PostgreSQL", "Prisma"],
    links: [
      {
        href: "https://github.com/krsrcio/rxguard",
        icon: Github,
        label: "GitHub repo",
      },
    ],
    caseStudy: {
      headline: "Medication support built around clarity and routine",
      summary:
        "The product solves a real daily problem, so the UX has to prioritize trust, timing, and simple decision-making over visual noise.",
      highlights: [
        "Focused on reminders, adherence tracking, and schedule clarity.",
        "Made the experience feel practical for repeat daily use.",
        "Connected state management and backend planning to a real care workflow.",
      ],
    },
  },
];

const cardVariants = {
  hidden: (index: number) => ({
    opacity: 0,
    y: 56,
    x: index % 2 === 0 ? -36 : 36,
    scale: 0.98,
    filter: "blur(8px)",
  }),
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      delay: index * 0.08,
      duration: 0.8,
      ease: smoothEase,
    },
  }),
  hover: {
    y: -10,
    transition: {
      duration: 0.35,
      ease: smoothEase,
    },
  },
};

const spotlightVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 0.35,
    scale: 1,
    transition: { duration: 0.8, ease: smoothEase },
  },
  hover: {
    opacity: 0.75,
    scale: 1.08,
    transition: { duration: 0.45, ease: smoothEase },
  },
};

const lineVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 0.3,
    transition: { duration: 0.7, ease: smoothEase },
  },
  hover: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

const numberVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay: 0.15, duration: 0.45 },
  },
  hover: {
    x: 6,
    color: "#171717",
    transition: { duration: 0.3 },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.12, duration: 0.5 },
  },
  hover: {
    x: 8,
    transition: { duration: 0.3 },
  },
};

const descriptionVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.2, duration: 0.55 },
  },
};

const techVariants = {
  hidden: (techIndex: number) => ({
    opacity: 0,
    y: 14,
    transition: { delay: 0.24 + techIndex * 0.05, duration: 0.3 },
  }),
  visible: (techIndex: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.24 + techIndex * 0.05, duration: 0.35 },
  }),
  hover: (techIndex: number) => ({
    y: -3,
    borderColor: "rgba(23, 23, 23, 0.5)",
    color: "#171717",
    backgroundColor: "rgba(245, 245, 245, 0.95)",
    transition: {
      delay: techIndex * 0.03,
      duration: 0.2,
    },
  }),
};

export function Projects() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = usePrefersReducedMotion();
  const shouldAnimate = !prefersReducedMotion;

  const headingRevealProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 40 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.8 },
      };

  return (
    <section
      id="projects"
      ref={ref}
      className="flex min-h-screen items-center bg-neutral-50 px-6 py-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        <motion.div {...headingRevealProps}>
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-neutral-400">
              SELECTED WORKS
            </p>
            <h2
              className="text-4xl tracking-tight text-black md:text-6xl"
              style={{ fontWeight: 700 }}
            >
              Featured projects.
            </h2>
          </div>
        </motion.div>

        <div className="h-16" />

        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              custom={index}
              variants={cardVariants}
              initial={shouldAnimate ? "hidden" : false}
              whileInView={shouldAnimate ? "visible" : undefined}
              whileHover={shouldAnimate ? "hover" : undefined}
              viewport={{ once: true, amount: 0.35 }}
              className="group relative overflow-hidden border border-neutral-200 bg-white p-8 shadow-[0_18px_50px_rgba(0,0,0,0.04)] transition-colors duration-300 hover:border-black md:p-10"
            >
              <motion.div
                variants={spotlightVariants}
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at top right, rgba(0,0,0,0.09), transparent 42%)",
                }}
              />
              <motion.div
                variants={lineVariants}
                className="absolute inset-x-0 top-0 h-px origin-left bg-black"
              />

              <div className="relative z-10">
                <div className="mb-6 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <motion.p
                      variants={numberVariants}
                      className="mb-5 text-xs tracking-[0.45em] text-neutral-300"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </motion.p>
                    <motion.h3
                      variants={titleVariants}
                      className="mb-4 text-2xl tracking-tight text-black transition-colors duration-300 group-hover:text-neutral-700 md:text-3xl"
                      style={{ fontWeight: 600 }}
                    >
                      {project.title}
                    </motion.h3>
                    <motion.p
                      variants={descriptionVariants}
                      className="mb-6 max-w-3xl leading-relaxed text-neutral-600"
                    >
                      {project.description}
                    </motion.p>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <motion.span
                          key={`${tech}-${techIndex}`}
                          custom={techIndex}
                          variants={techVariants}
                          className="border border-neutral-200 px-3 py-1.5 text-xs uppercase tracking-wider text-neutral-600"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    {project.links.length > 0 ? (
                      <div className="mt-8 flex flex-wrap gap-3">
                        {project.links.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 border border-neutral-300 px-4 py-2 text-sm text-neutral-700 transition-all duration-300 hover:border-black hover:text-black"
                          >
                            <link.icon size={16} />
                            {link.label}
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>

                <details className="rounded-2xl border border-neutral-200 bg-neutral-50/80 p-5">
                  <summary className="flex cursor-pointer list-none items-center gap-2 text-sm uppercase tracking-[0.2em] text-neutral-700">
                    <FileText size={16} />
                    Short case study
                  </summary>
                  <div className="mt-4 space-y-4 text-sm leading-relaxed text-neutral-600">
                    <p className="text-base text-neutral-900" style={{ fontWeight: 600 }}>
                      {project.caseStudy.headline}
                    </p>
                    <p>{project.caseStudy.summary}</p>
                    <ul className="space-y-2">
                      {project.caseStudy.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
