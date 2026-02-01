import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const scrollToAbout = () => {
    document
      .getElementById("about")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 relative bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto text-center"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-sm tracking-[0.3em] uppercase text-neutral-500 mb-6"
        >
          ASPIRING SOFTWARE DEVELOPER & GAME DEVELOPER
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-6xl md:text-8xl lg:text-9xl tracking-tight mb-8 text-black"
          style={{ fontWeight: 700, lineHeight: 0.95 }}
        >
          Kristine Castres
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed"
        >
          An aspiring developer exploring software and game development through hands-on projects.
        </motion.p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        onClick={scrollToAbout}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-neutral-400 hover:text-black transition-colors duration-300"
        aria-label="Scroll to about section"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
        >
          <ChevronDown size={32} strokeWidth={1.5} />
        </motion.div>
      </motion.button>
    </section>
  );
}