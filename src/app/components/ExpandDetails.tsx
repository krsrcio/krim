import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useId, useState, type ReactNode } from 'react';

import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

type ExpandDetailsProps = {
  children: ReactNode;
  label?: string;
};

/** A compact, animated disclosure for secondary project information. */
export function ExpandDetails({ children, label = 'Project details' }: ExpandDetailsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId();
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      layout
      transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 25 }}
      className="mt-6 overflow-hidden rounded-2xl bg-neutral-100"
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen((open) => !open)}
        className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-200 hover:text-black focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-black"
      >
        <motion.span
          animate={{ rotate: isOpen ? 0 : -90 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2, ease: 'easeOut' }}
          className="flex items-center justify-center"
          aria-hidden="true"
        >
          <ChevronDown size={18} strokeWidth={2} />
        </motion.span>
        {label}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={contentId}
            initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 25 }}
            className="overflow-hidden"
          >
            <div className="border-t border-neutral-200 px-4 py-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
