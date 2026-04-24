import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const smoothEase = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const heroRevealProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: smoothEase },
      };

  const copyRevealProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
      };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center bg-white px-6">
      <motion.div {...heroRevealProps} className="mx-auto max-w-4xl text-center">
        <motion.p
          {...copyRevealProps}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6 text-sm uppercase tracking-[0.3em] text-neutral-500"
        >
          ASPIRING SOFTWARE DEVELOPER & GAME DEVELOPER
        </motion.p>

        <motion.h1
          {...heroRevealProps}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-8 text-6xl tracking-tight text-black md:text-8xl lg:text-9xl"
          style={{ fontWeight: 700, lineHeight: 0.95 }}
        >
          Kristine Castres
        </motion.h1>

        <motion.p
          {...copyRevealProps}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mx-auto max-w-2xl text-lg leading-relaxed text-neutral-600 md:text-xl"
        >
          An aspiring developer exploring software and game development through
          hands-on projects.
        </motion.p>
      </motion.div>

      <motion.a
        {...copyRevealProps}
        transition={{ delay: 1, duration: 0.6 }}
        href="#about"
        className="absolute bottom-12 left-1/2 -translate-x-1/2 transform text-neutral-400 transition-colors duration-300 hover:text-black"
        aria-label="Scroll to about section"
      >
        <motion.div
          animate={
            prefersReducedMotion ? undefined : { y: [0, 8, 0] }
          }
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
        >
          <ChevronDown size={32} strokeWidth={1.5} />
        </motion.div>
      </motion.a>
    </section>
  );
}
