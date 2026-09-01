import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatedBackground } from "@/components/core/animated-background";
import { ScrollProgress } from "@/components/core/scroll-progress";

import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    let frameId: number | null = null;

    const handleScroll = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);
        frameId = null;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  useEffect(() => {
    const originalHtmlOverflow =
      document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;

    if (isMenuOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.documentElement.style.overflow =
        originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const navMotionProps = prefersReducedMotion
    ? {}
    : {
        initial: { y: -100 },
        animate: { y: 0 },
        transition: { duration: 0.6, ease: smoothEase },
      };

  const itemMotionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
      };

  const ctaMotionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
      };

  return (
    <>
      <motion.nav
        {...navMotionProps}
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
          isScrolled
            ? "border-neutral-200 bg-white/80 backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        <ScrollProgress className="absolute inset-x-0 top-0 h-0.5 bg-black" />
        <div className="mx-auto max-w-7xl px-5 py-4 sm:px-6 sm:py-6">
          <div className="flex items-center justify-between">
            <a
              href="#top"
              className="text-xl tracking-tight text-black"
              style={{ fontWeight: 700 }}
            >
              krim.
            </a>

            <div className="hidden items-center md:flex">
              <AnimatedBackground
                className="rounded-md bg-neutral-100"
                transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                enableHover
              >
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    data-id={item.label}
                    {...itemMotionProps}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.4,
                      ease: smoothEase,
                    }}
                    className="px-3 py-1.5 text-sm tracking-wide text-neutral-600 transition-colors duration-300 hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </AnimatedBackground>
            </div>

            <motion.a
              {...ctaMotionProps}
              transition={{ delay: 0.5, duration: 0.4 }}
              href="#contact"
              className="hidden text-sm transition-colors duration-300 md:inline-flex md:border md:border-black md:px-6 md:py-2 md:text-black md:hover:bg-black md:hover:text-white"
              style={{ fontWeight: 500 }}
            >
              Let's Talk
            </motion.a>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white p-3 text-black shadow-sm transition-colors duration-300 hover:border-black md:hidden"
              onClick={() => setIsMenuOpen(true)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              aria-label="Open navigation menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.nav>

      <div
        className={`fixed inset-0 z-[60] md:hidden ${
          isMenuOpen
            ? "pointer-events-auto"
            : "pointer-events-none"
        }`}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ease-out ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          } ${prefersReducedMotion ? "duration-0" : "duration-300"}`}
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close navigation menu"
        />

        <aside
          id="mobile-navigation"
          className={`absolute right-0 top-0 flex h-full w-[min(88vw,22rem)] flex-col border-l border-neutral-200 bg-white px-5 py-5 shadow-[0_18px_50px_rgba(0,0,0,0.12)] transition-transform ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-6 sm:py-6 will-change-transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } ${prefersReducedMotion ? "duration-0" : "duration-300"}`}
          aria-label="Mobile navigation"
        >
          <div className="mb-10 flex items-center justify-between">
            <a
              href="#top"
              className="text-xl tracking-tight text-black"
              style={{ fontWeight: 700 }}
              onClick={() => setIsMenuOpen(false)}
            >
              krim.
            </a>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-neutral-200 p-3 text-black transition-colors duration-300 hover:border-black"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close navigation menu"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="border-b border-neutral-200 py-4 text-lg tracking-tight text-black"
                style={{ fontWeight: 600 }}
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            onClick={() => setIsMenuOpen(false)}
            className="mt-8 inline-flex items-center justify-center border border-black px-6 py-3 text-sm uppercase tracking-[0.2em] text-black transition-colors duration-300 hover:bg-black hover:text-white"
            style={{ fontWeight: 600 }}
          >
            Let's Talk
          </a>
        </aside>
      </div>
    </>
  );
}
