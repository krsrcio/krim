import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

const timeline = [
  {
    type: 'experience',
    title: 'UI / UX Designer',
    organization: 'UPang - Student',
    period: '2026 - PRESENT',
    description: 'Building assets for my team using figma and blender.'
  },
  {
    type: 'experience',
    title: 'Frontend / Backend',
    organization: 'UPang - Student',
    period: '2022 - 2025',
    description: 'Create and managed an entire team through out my 1st and 3rd year 1st sem.'
  },
  {
    type: 'education',
    title: 'B.S. Computer Science',
    organization: 'State University',
    period: '2020 - 2024',
    description: 'Focused on software engineering, algorithms, and human-computer interaction. Dean\'s List recipient. Active member of CS club.'
  },
  {
    type: 'education',
    title: 'Web Development Bootcamp',
    organization: 'Code Academy',
    period: '2022',
    description: 'Intensive 12-week program covering full-stack development, modern frameworks, and industry best practices.'
  }
];

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" ref={ref} className="min-h-screen flex items-center px-6 py-24 bg-white">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-neutral-400 mb-4">Background</p>
          <h2 className="text-4xl md:text-6xl tracking-tight mb-16 text-black" style={{ fontWeight: 700 }}>
            Experience & Education.
          </h2>
        </motion.div>

        <div className="space-y-0">
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative pl-12 pb-12 border-l border-neutral-200 last:border-l-transparent group"
            >
              <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[6.5px] bg-neutral-300 rounded-full group-hover:bg-black transition-colors duration-300" />
              
              <div className="mb-2">
                <span className="text-xs tracking-wider uppercase text-neutral-400">{item.period}</span>
              </div>
              
              <h3 className="text-xl md:text-2xl mb-1 text-black tracking-tight" style={{ fontWeight: 600 }}>
                {item.title}
              </h3>
              
              <p className="text-neutral-600 mb-3" style={{ fontWeight: 500 }}>
                {item.organization}
              </p>
              
              <p className="text-neutral-600 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
