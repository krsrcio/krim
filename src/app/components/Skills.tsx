import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

const skills = [
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

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  return (
    <section
      id="skills"
      ref={ref}
      className="min-h-screen flex items-center px-6 py-24 bg-white"
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-neutral-400 mb-4">
            SKILLS & TECHNOLOGY
          </p>
          <h2
            className="text-4xl md:text-6xl tracking-tight mb-16 text-black"
            style={{ fontWeight: 700 }}
          >
            My toolkit.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skillGroup, groupIndex) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: groupIndex * 0.1,
              }}
              className="border border-neutral-200 p-8 hover:border-black transition-all duration-300 group"
            >
              <h3
                className="text-xl mb-6 text-black tracking-tight"
                style={{ fontWeight: 600 }}
              >
                {skillGroup.category}
              </h3>
              <ul className="space-y-3">
                {skillGroup.items.map((skill, index) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, x: -10 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : {}
                    }
                    transition={{
                      duration: 0.4,
                      delay: groupIndex * 0.1 + index * 0.05,
                    }}
                    className="text-neutral-600 group-hover:text-black transition-colors duration-300"
                  >
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}