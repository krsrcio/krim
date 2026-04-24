import { motion, useInView } from "motion/react";
import { Github, Linkedin, Mail } from "lucide-react";
import { useRef } from "react";

import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/krsrcio" },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kristinecastres/",
  },
];

export function Contact() {
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

  const fadeRevealProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0 },
        animate: isInView ? { opacity: 1 } : {},
      };

  return (
    <section
      id="contact"
      ref={ref}
      className="flex min-h-screen items-center bg-black px-6 py-24 text-white"
    >
      <div className="mx-auto w-full max-w-6xl">
        <motion.div {...sectionRevealProps} className="text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-neutral-400">
            GET IN TOUCH
          </p>
          <h2
            className="mb-8 text-4xl tracking-tight text-white md:text-6xl lg:text-7xl"
            style={{ fontWeight: 700 }}
          >
            Let&apos;s create something
            <br />
            remarkable together.
          </h2>

          <motion.p
            {...fadeRevealProps}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-neutral-400"
          >
            I&apos;m always interested in hearing about new projects, creative
            ideas, or opportunities to be part of your vision.
          </motion.p>

          <motion.a
            {...(prefersReducedMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 20 },
                  animate: isInView ? { opacity: 1, y: 0 } : {},
                  transition: { delay: 0.4, duration: 0.6 },
                })}
            href="mailto:kristinecastres10@gmail.com"
            className="group inline-flex items-center gap-3 border border-white px-8 py-4 text-lg text-white transition-all duration-300 hover:bg-white hover:text-black"
          >
            <Mail
              size={20}
              className="transition-transform duration-300 group-hover:scale-110"
            />
            <span style={{ fontWeight: 500 }}>
              kristinecastres10@gmail.com
            </span>
          </motion.a>

          <motion.div
            {...fadeRevealProps}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-16 flex items-center justify-center gap-8"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                {...(prefersReducedMotion
                  ? {}
                  : {
                      initial: { opacity: 0, y: 20 },
                      animate: isInView ? { opacity: 1, y: 0 } : {},
                    })}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                className="text-neutral-400 transition-colors duration-300 hover:text-white"
                aria-label={social.label}
                target="_blank"
                rel="noreferrer"
              >
                <social.icon size={24} strokeWidth={1.5} />
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            {...fadeRevealProps}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-24 border-t border-neutral-800 pt-12"
          >
            <p className="text-sm text-neutral-500">
              © 2026 krim. Designed and built with purpose.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
