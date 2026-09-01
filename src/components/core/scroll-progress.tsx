import {
  motion,
  type SpringOptions,
  useScroll,
  useSpring,
} from "motion/react";
import type { RefObject } from "react";

export type ScrollProgressProps = {
  className?: string;
  springOptions?: SpringOptions;
  containerRef?: RefObject<HTMLDivElement | null>;
};

const defaultSpringOptions: SpringOptions = {
  stiffness: 200,
  damping: 50,
  restDelta: 0.001,
};

export function ScrollProgress({
  className,
  springOptions,
  containerRef,
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });
  const scaleX = useSpring(scrollYProgress, {
    ...defaultSpringOptions,
    ...springOptions,
  });

  return (
    <motion.div
      className={["inset-x-0 top-0 h-1 origin-left", className]
        .filter(Boolean)
        .join(" ")}
      style={{ scaleX }}
    />
  );
}
