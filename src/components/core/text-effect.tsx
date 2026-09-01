import {
  AnimatePresence,
  motion,
  type TargetAndTransition,
  type Transition,
  type Variant,
  type Variants,
} from "motion/react";
import { memo, type CSSProperties, type JSX } from "react";

export type TextEffectPreset =
  | "blur"
  | "fade-in-blur"
  | "scale"
  | "fade"
  | "slide";

export type TextEffectPer = "word" | "char" | "line";

export type TextEffectProps = {
  children: string;
  per?: TextEffectPer;
  as?: keyof JSX.IntrinsicElements;
  variants?: { container?: Variants; item?: Variants };
  className?: string;
  preset?: TextEffectPreset;
  delay?: number;
  speedReveal?: number;
  speedSegment?: number;
  trigger?: boolean;
  onAnimationComplete?: () => void;
  onAnimationStart?: () => void;
  segmentWrapperClassName?: string;
  containerTransition?: Transition;
  segmentTransition?: Transition;
  style?: CSSProperties;
};

const staggerTimes: Record<TextEffectPer, number> = {
  char: 0.03,
  word: 0.05,
  line: 0.1,
};

const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const presetVariants: Record<
  TextEffectPreset,
  { container: Variants; item: Variants }
> = {
  blur: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: "blur(12px)" },
      visible: { opacity: 1, filter: "blur(0px)" },
      exit: { opacity: 0, filter: "blur(12px)" },
    },
  },
  "fade-in-blur": {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 20, filter: "blur(12px)" },
      visible: { opacity: 1, y: 0, filter: "blur(0px)" },
      exit: { opacity: 0, y: 20, filter: "blur(12px)" },
    },
  },
  scale: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, scale: 0 },
      visible: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0 },
    },
  },
  fade: { container: defaultContainerVariants, item: defaultItemVariants },
  slide: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
    },
  },
};

const AnimationSegment = memo(function AnimationSegment({
  segment,
  variants,
  per,
  wrapperClassName,
}: {
  segment: string;
  variants: Variants;
  per: TextEffectPer;
  wrapperClassName?: string;
}) {
  const content =
    per === "line" ? (
      <motion.span variants={variants} className="block">
        {segment}
      </motion.span>
    ) : per === "word" ? (
      <motion.span
        aria-hidden="true"
        variants={variants}
        className="inline-block whitespace-pre"
      >
        {segment}
      </motion.span>
    ) : (
      <motion.span className="inline-block whitespace-pre">
        {segment.split("").map((character, index) => (
          <motion.span
            key={`${character}-${index}`}
            aria-hidden="true"
            variants={variants}
            className="inline-block whitespace-pre"
          >
            {character}
          </motion.span>
        ))}
      </motion.span>
    );

  if (!wrapperClassName) {
    return content;
  }

  return (
    <span
      className={[per === "line" ? "block" : "inline-block", wrapperClassName]
        .filter(Boolean)
        .join(" ")}
    >
      {content}
    </span>
  );
});

function splitText(text: string, per: TextEffectPer) {
  return per === "line" ? text.split("\n") : text.split(/(\s+)/);
}

function hasTransition(
  variant?: Variant,
): variant is TargetAndTransition & { transition?: Transition } {
  return typeof variant === "object" && variant !== null && "transition" in variant;
}

function withTransition(
  variants: Variants,
  transition?: Transition & { exit?: Transition },
): Variants {
  if (!transition) {
    return variants;
  }

  const mainTransition = { ...transition };
  delete mainTransition.exit;

  return {
    ...variants,
    visible: {
      ...variants.visible,
      transition: {
        ...(hasTransition(variants.visible) ? variants.visible.transition : {}),
        ...mainTransition,
      },
    },
    exit: {
      ...variants.exit,
      transition: {
        ...(hasTransition(variants.exit) ? variants.exit.transition : {}),
        ...mainTransition,
        staggerDirection: -1,
      },
    },
  };
}

export function TextEffect({
  children,
  per = "word",
  as = "p",
  variants,
  className,
  preset = "fade",
  delay = 0,
  speedReveal = 1,
  speedSegment = 1,
  trigger = true,
  onAnimationComplete,
  onAnimationStart,
  segmentWrapperClassName,
  containerTransition,
  segmentTransition,
  style,
}: TextEffectProps) {
  const segments = splitText(children, per);
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;
  const baseVariants = presetVariants[preset];
  const containerVisible = variants?.container?.visible;
  const customTransition = hasTransition(containerVisible)
    ? containerVisible.transition
    : undefined;
  const stagger =
    typeof customTransition?.staggerChildren === "number"
      ? customTransition.staggerChildren
      : staggerTimes[per] / speedReveal;
  const delayChildren =
    typeof customTransition?.delayChildren === "number"
      ? customTransition.delayChildren
      : delay;

  const computedVariants = {
    container: withTransition(variants?.container ?? baseVariants.container, {
      staggerChildren: stagger,
      delayChildren,
      ...containerTransition,
      exit: { staggerChildren: stagger, staggerDirection: -1 },
    }),
    item: withTransition(variants?.item ?? baseVariants.item, {
      duration: 0.3 / speedSegment,
      ...segmentTransition,
    }),
  };

  return (
    <AnimatePresence mode="popLayout">
      {trigger && (
        <MotionTag
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={computedVariants.container}
          className={className}
          onAnimationComplete={onAnimationComplete}
          onAnimationStart={onAnimationStart}
          style={style}
        >
          {per !== "line" && <span className="sr-only">{children}</span>}
          {segments.map((segment, index) => (
            <AnimationSegment
              key={`${per}-${index}-${segment}`}
              segment={segment}
              variants={computedVariants.item}
              per={per}
              wrapperClassName={segmentWrapperClassName}
            />
          ))}
        </MotionTag>
      )}
    </AnimatePresence>
  );
}
