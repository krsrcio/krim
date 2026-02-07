import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/krsrcio' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/kristinecastres/' },
];

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" ref={ref} className="min-h-screen flex items-center px-6 py-24 bg-black text-white">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-neutral-400 mb-4">GET IN TOUCH</p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl tracking-tight mb-8 text-white" style={{ fontWeight: 700 }}>
            Let's create something
            <br />
            remarkable together.
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            I'm always interested in hearing about new projects, creative ideas,
            or opportunities to be part of your vision.
          </motion.p>

          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            href="mailto:alex.rivera@example.com"
            className="inline-flex items-center gap-3 px-8 py-4 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 text-lg group"
          >
            <Mail size={20} className="group-hover:scale-110 transition-transform duration-300" />
            <span style={{ fontWeight: 500 }}>kristinecastres10@gmail.com</span>
          </motion.a>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex justify-center items-center gap-8 mt-16"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                className="text-neutral-400 hover:text-white transition-colors duration-300"
                aria-label={social.label}
              >
                <social.icon size={24} strokeWidth={1.5} />
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-24 pt-12 border-t border-neutral-800"
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
