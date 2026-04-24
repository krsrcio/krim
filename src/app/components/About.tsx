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
              Building with purpose.
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
            Download resume
          </motion.a>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2 md:gap-20">
          <motion.div {...leftColumnRevealProps}>
            <p className="mb-6 text-lg leading-relaxed text-neutral-700">
              I'm a developer who finds beauty in well-structured code and
              thoughtfully designed interfaces. My journey spans from computer
              science fundamentals to the creative exploration of emerging
              technologies.
            </p>
            <p className="mb-6 text-lg leading-relaxed text-neutral-700">
              I believe great products live at the intersection of technical
              excellence and human-centered design. Every line of code is an
              opportunity to create something meaningful.
            </p>
            <p className="text-lg leading-relaxed text-neutral-700">
              When I'm not coding, you'll find me exploring design trends,
              contributing to open source, or experimenting with generative art
              and creative coding.
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
                  Full-Stack Web Development
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-black" />
                  UI/UX Design & Prototyping
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-black" />
                  Creative Technology & Interaction Design
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-black" />
                  Performance Optimization
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
                Exploring the intersection of AI and creative coding while
                building scalable web applications. Always learning, always
                creating.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
