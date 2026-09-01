import {
  AnimatePresence,
  motion,
  type AnimatePresenceProps,
  type Transition,
  type Variants,
} from "motion/react";
import { Children, type ReactNode, useEffect, useState } from "react";

export type TextLoopProps = {
  children: ReactNode | ReactNode[];
  className?: string;
  interval?: number;
  transition?: Transition;
  variants?: Variants;
  onIndexChange?: (index: number) => void;
  trigger?: boolean;
  mode?: AnimatePresenceProps["mode"];
};

const defaultVariants: Variants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
};

export function TextLoop({
  children,
  className,
  interval = 2,
  transition = { duration: 0.3 },
  variants = defaultVariants,
  onIndexChange,
  trigger = true,
  mode = "popLayout",
}: TextLoopProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = Children.toArray(children);

  useEffect(() => {
    if (!trigger || items.length < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setCurrentIndex((current) => {
        const next = (current + 1) % items.length;
        onIndexChange?.(next);
        return next;
      });
    }, interval * 1000);

    return () => window.clearInterval(timer);
  }, [interval, items.length, onIndexChange, trigger]);

  useEffect(() => {
    setCurrentIndex((current) => Math.min(current, Math.max(items.length - 1, 0)));
  }, [items.length]);

  if (items.length === 0) {
    return null;
  }

  return (
    <span
      className={["relative inline-block whitespace-nowrap", className]
        .filter(Boolean)
        .join(" ")}
    >
      <AnimatePresence mode={mode} initial={false}>
        <motion.span
          key={currentIndex}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transition}
          variants={variants}
          className="inline-block"
        >
          {items[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
