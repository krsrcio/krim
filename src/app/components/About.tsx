import { motion, useInView } from "motion/react";
import { Download } from "lucide-react";
import { useRef } from "react";

import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export function About() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = usePrefersReducedMotion();

  const sectionRevealProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 40 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.8 },
      };

  const leftColumnRevealProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, x: -20 },
        animate: isInView ? { opacity: 1, x: 0 } : {},
        transition: { duration: 0.8, delay: 0.2 },
      };

  const rightColumnRevealProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, x: 20 },
        animate: isInView ? { opacity: 1, x: 0 } : {},
        transition: { duration: 0.8, delay: 0.4 },
      };

  return (
    <section
      id="about"
      ref={ref}
      className="flex min-h-screen items-center bg-neutral-50 px-6 py-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          {...sectionRevealProps}
          className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-neutral-400">
              ABOUT ME
            </p>
            <h2
              className="text-4xl tracking-tight text-black md:text-6xl"
              style={{ fontWeight: 700 }}
            >
              Building useful experiences.
            </h2>
          </div>
          <motion.a
            {...(prefersReducedMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 16 },
                  animate: isInView ? { opacity: 1, y: 0 } : {},
                  transition: { delay: 0.2, duration: 0.5 },
                })}
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 border border-neutral-300 bg-white/70 px-5 py-3 text-sm uppercase tracking-[0.2em] text-neutral-700 shadow-[0_8px_24px_rgba(0,0,0,0.12)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-black hover:text-black hover:shadow-[0_14px_30px_rgba(0,0,0,0.18)]"
            aria-label="Download resume"
          >
            <Download size={18} />
            See resume
          </motion.a>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2 md:gap-20">
          <motion.div {...leftColumnRevealProps}>
            <p className="mb-6 text-lg leading-relaxed text-neutral-700">
              I&apos;m a Computer Science student at UPang who enjoys turning
              ideas into practical web, mobile, and game experiences. I combine
              thoughtful interface design with the technical work needed to
              make a product function well.
            </p>
            <p className="mb-6 text-lg leading-relaxed text-neutral-700">
              Through projects such as Baskit, PetPal, and DermaScan, I&apos;ve
              explored full-stack development, mobile apps, AI-assisted
              features, and interactive gameplay. I especially enjoy shaping
              clear user flows and building interfaces that feel simple to use.
            </p>
            <p className="text-lg leading-relaxed text-neutral-700">
              I&apos;m working toward internship and junior opportunities in
              software, front-end or full-stack, and game development. I like
              projects that solve everyday problems and create memorable user
              experiences.
            </p>
          </motion.div>

          <motion.div {...rightColumnRevealProps} className="space-y-8">
            <div>
              <h3
                className="mb-3 text-xl tracking-tight text-black"
                style={{ fontWeight: 600 }}
              >
                Focus Areas
              </h3>
              <ul className="space-y-2 text-neutral-600">
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-black" />
                  Front-End & Full-Stack Development
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-black" />
                  UI/UX Design & Prototyping
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-black" />
                  Mobile & Game Development
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-black" />
                  AI-Assisted Mobile Experiences
                </li>
              </ul>
            </div>

            <div>
              <h3
                className="mb-3 text-xl tracking-tight text-black"
                style={{ fontWeight: 600 }}
              >
                Currently
              </h3>
              <p className="leading-relaxed text-neutral-600">
                Building a stronger portfolio across web, mobile, and game
                development while preparing for internship and junior developer
                opportunities.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
