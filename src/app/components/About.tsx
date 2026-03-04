import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Download } from 'lucide-react';

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={ref} className="min-h-screen flex items-center px-6 py-24 bg-neutral-50">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="text-sm tracking-[0.3em] uppercase text-neutral-400 mb-4">ABOUT ME</p>
            <h2 className="text-4xl md:text-6xl tracking-tight text-black" style={{ fontWeight: 700 }}>
              Building with purpose.
            </h2>
          </div>
          <motion.a
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 border border-neutral-300 bg-white/70 px-5 py-3 text-sm tracking-[0.2em] uppercase text-neutral-700 shadow-[0_8px_24px_rgba(0,0,0,0.12)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-black hover:text-black hover:shadow-[0_14px_30px_rgba(0,0,0,0.18)]"
            aria-label="Download resume"
          >
            <Download size={18} />
            Download resume
          </motion.a>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-lg leading-relaxed text-neutral-700 mb-6">
              I’m a developer who finds beauty in well-structured code and thoughtfully designed interfaces. 
              My journey spans from computer science fundamentals to the creative exploration of emerging technologies.
            </p>
            <p className="text-lg leading-relaxed text-neutral-700 mb-6">
              I believe great products live at the intersection of technical excellence and human-centered design.
              Every line of code is an opportunity to create something meaningful.
            </p>
            <p className="text-lg leading-relaxed text-neutral-700">
              When I'm not coding, you'll find me exploring design trends, contributing to open source,
              or experimenting with generative art and creative coding.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl mb-3 text-black tracking-tight" style={{ fontWeight: 600 }}>Focus Areas</h3>
              <ul className="space-y-2 text-neutral-600">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                  Full-Stack Web Development
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                  UI/UX Design & Prototyping
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                  Creative Technology & Interaction Design
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                  Performance Optimization
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl mb-3 text-black tracking-tight" style={{ fontWeight: 600 }}>Currently</h3>
              <p className="text-neutral-600 leading-relaxed">
                Exploring the intersection of AI and creative coding while building scalable web applications.
                Always learning, always creating.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
