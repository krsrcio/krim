import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () =>
      window.removeEventListener("scroll", handleScroll);
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md border-b border-neutral-200"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <a
              href="#top"
              className="text-xl tracking-tight text-black"
              style={{ fontWeight: 700 }}
            >
              krim.
            </a>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  {...itemMotionProps}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.4,
                  }}
                  className="text-sm tracking-wide text-neutral-600 hover:text-black transition-colors duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </div>

            <motion.a
              {...ctaMotionProps}
              transition={{ delay: 0.5, duration: 0.4 }}
              href="#contact"
              className="hidden md:inline-flex px-6 py-2 border border-black text-black hover:bg-black hover:text-white transition-all duration-300 text-sm"
              style={{ fontWeight: 500 }}
            >
              Let's Talk
            </motion.a>

            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white p-3 text-black shadow-sm transition-colors duration-300 hover:border-black"
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
          className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          } ${prefersReducedMotion ? "duration-0" : "duration-300"}`}
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close navigation menu"
        />

        <aside
          id="mobile-navigation"
          className={`absolute right-0 top-0 flex h-full w-[min(88vw,22rem)] flex-col border-l border-neutral-200 bg-white px-6 py-6 shadow-[0_18px_50px_rgba(0,0,0,0.12)] transition-transform ${
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
