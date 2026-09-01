import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

import { TextEffect } from "@/components/core/text-effect";
import { TextLoop } from "@/components/core/text-loop";
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
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center bg-white px-5 py-28 sm:min-h-screen sm:px-6">
      <motion.div {...heroRevealProps} className="mx-auto max-w-4xl text-center">
        <motion.p
          {...copyRevealProps}
          transition={{ delay: 0.2, duration: 0.6, ease: smoothEase }}
          className="mb-5 text-xs uppercase tracking-[0.2em] text-neutral-500 sm:mb-6 sm:text-sm sm:tracking-[0.3em]"
        >
          {prefersReducedMotion ? (
            "ASPIRING SOFTWARE, GAME & MOBILE DEVELOPER"
          ) : (
            <>
              ASPIRING{" "}
              <TextLoop
                className="overflow-y-clip"
                transition={{
                  type: "spring",
                  stiffness: 900,
                  damping: 80,
                  mass: 10,
                }}
                variants={{
                  initial: {
                    y: 20,
                    rotateX: 90,
                    opacity: 0,
                    filter: "blur(4px)",
                  },
                  animate: {
                    y: 0,
                    rotateX: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                  },
                  exit: {
                    y: -20,
                    rotateX: -90,
                    opacity: 0,
                    filter: "blur(4px)",
                  },
                }}
              >
                <span>SOFTWARE DEVELOPER</span>
                <span>GAME DEVELOPER</span>
                <span>MOBILE DEVELOPER</span>
              </TextLoop>
            </>
          )}
        </motion.p>

        {prefersReducedMotion ? (
          <h1
            className="mb-7 text-[clamp(3.25rem,15vw,4.5rem)] tracking-tight text-black md:mb-8 md:text-8xl lg:text-9xl"
            style={{ fontWeight: 700, lineHeight: 0.95 }}
          >
            Kristine Castres
          </h1>
        ) : (
          <TextEffect
            as="h1"
            preset="fade-in-blur"
            delay={0.4}
            speedReveal={1.1}
            speedSegment={0.3}
            className="mb-7 text-[clamp(3.25rem,15vw,4.5rem)] tracking-tight text-black md:mb-8 md:text-8xl lg:text-9xl"
            style={{ fontWeight: 700, lineHeight: 0.95 }}
          >
            Kristine Castres
          </TextEffect>
        )}

        <motion.p
          {...copyRevealProps}
          transition={{ delay: 0.6, duration: 0.6, ease: smoothEase }}
          className="mx-auto max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg md:text-xl"
        >
          An aspiring developer exploring software and game development through
          hands-on projects.
        </motion.p>
      </motion.div>

      <motion.a
        {...copyRevealProps}
        transition={{ delay: 1, duration: 0.6, ease: smoothEase }}
        href="#about"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 transform text-neutral-400 transition-colors duration-300 hover:text-black sm:bottom-12"
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
