import { motion, useInView } from "motion/react";
import { useRef } from "react";

import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const smoothEase = [0.22, 1, 0.36, 1] as const;

type SkillGroup = {
  category: string;
  items: string[];
};

const skills: SkillGroup[] = [
  {
    category: "Programming Languages",
    items: [
      "JavaScript",
      "TypeScript",
      "Python",
      "HTML/CSS",
      "SQL",
      "Java",
      "C++",
      "Dart",
    ],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Vue", "Tailwind CSS"],
  },
  {
    category: "Backend",
    items: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "MongoDB",
      "REST APIs",
      "GraphQL",
      "phpMyAdmin",
    ],
  },
  {
    category: "Tools",
    items: ["Git", "Figma", "VS Code", "Vite", "Blender"],
  },
];

const cardVariants = {
  hidden: (index: number) => ({
    opacity: 0,
    y: 52,
    x: index % 2 === 0 ? -28 : 28,
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
      duration: 0.75,
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
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 0.32,
    scale: 1,
    transition: { duration: 0.8, ease: smoothEase },
  },
  hover: {
    opacity: 0.68,
    scale: 1.08,
    transition: { duration: 0.4, ease: smoothEase },
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
    transition: { duration: 0.25 },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.12, duration: 0.45 },
  },
  hover: {
    x: 6,
    transition: { duration: 0.28 },
  },
};

const skillItemVariants = {
  hidden: (index: number) => ({
    opacity: 0,
    x: -10,
    y: 12,
    transition: { delay: 0.16 + index * 0.04, duration: 0.3 },
  }),
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: { delay: 0.16 + index * 0.04, duration: 0.36 },
  }),
  hover: (index: number) => ({
    x: 6,
    color: "#171717",
    transition: {
      delay: index * 0.02,
      duration: 0.2,
    },
  }),
};

export function Skills() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });
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
      id="skills"
      ref={ref}
      className="flex min-h-screen items-center bg-white px-6 py-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        <motion.div {...headingRevealProps}>
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-neutral-400">
            SKILLS & TECHNOLOGY
          </p>
          <h2
            className="mb-16 text-4xl tracking-tight text-black md:text-6xl"
            style={{ fontWeight: 700 }}
          >
            My toolkit.
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {skills.map((skillGroup, groupIndex) => (
            <motion.div
              key={skillGroup.category}
              custom={groupIndex}
              variants={cardVariants}
              initial={shouldAnimate ? "hidden" : false}
              whileInView={shouldAnimate ? "visible" : undefined}
              whileHover={shouldAnimate ? "hover" : undefined}
              viewport={{ once: true, amount: 0.35 }}
              className="group relative overflow-hidden border border-neutral-200 bg-white p-8 shadow-[0_16px_40px_rgba(0,0,0,0.04)] transition-colors duration-300 hover:border-black"
            >
              <motion.div
                variants={spotlightVariants}
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at top right, rgba(0,0,0,0.08), transparent 46%)",
                }}
              />
              <motion.div
                variants={lineVariants}
                className="absolute inset-x-0 top-0 h-px origin-left bg-black"
              />

              <div className="relative z-10">
                <motion.h3
                  variants={titleVariants}
                  className="mb-6 text-xl tracking-tight text-black"
                  style={{ fontWeight: 600 }}
                >
                  {skillGroup.category}
                </motion.h3>
                <ul className="space-y-3">
                  {skillGroup.items.map((skill, index) => (
                    <motion.li
                      key={skill}
                      custom={index}
                      variants={skillItemVariants}
                      className="text-neutral-600 transition-colors duration-300"
                    >
                      {skill}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
