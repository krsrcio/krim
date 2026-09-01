import { AnimatePresence, motion, type Transition } from "motion/react";
import {
  Children,
  cloneElement,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  useEffect,
  useId,
  useState,
} from "react";

type AnimatedBackgroundChildProps = {
  "data-id": string;
  "data-checked"?: string;
  children?: ReactNode;
  className?: string;
  onClick?: (event: MouseEvent) => void;
  onMouseEnter?: (event: MouseEvent) => void;
  onMouseLeave?: (event: MouseEvent) => void;
};

export type AnimatedBackgroundProps = {
  children:
    | ReactElement<AnimatedBackgroundChildProps>
    | ReactElement<AnimatedBackgroundChildProps>[];
  defaultValue?: string;
  onValueChange?: (newActiveId: string | null) => void;
  className?: string;
  transition?: Transition;
  enableHover?: boolean;
};

export function AnimatedBackground({
  children,
  defaultValue,
  onValueChange,
  className,
  transition,
  enableHover = false,
}: AnimatedBackgroundProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const uniqueId = useId();

  const setActiveValue = (id: string | null) => {
    setActiveId(id);
    onValueChange?.(id);
  };

  useEffect(() => {
    if (defaultValue !== undefined) {
      setActiveId(defaultValue);
    }
  }, [defaultValue]);

  return Children.map(children, (child, index) => {
    const { "data-id": id } = child.props;
    const originalChildren = child.props.children;

    const interactionProps = enableHover
      ? {
          onMouseEnter: (event: MouseEvent) => {
            child.props.onMouseEnter?.(event);
            setActiveValue(id);
          },
          onMouseLeave: (event: MouseEvent) => {
            child.props.onMouseLeave?.(event);
            setActiveValue(null);
          },
        }
      : {
          onClick: (event: MouseEvent) => {
            child.props.onClick?.(event);
            setActiveValue(id);
          },
        };

    return cloneElement(
      child,
      {
        key: child.key ?? index,
        className: ["relative inline-flex", child.props.className]
          .filter(Boolean)
          .join(" "),
        "data-checked": activeId === id ? "true" : "false",
        ...interactionProps,
      },
      <>
        <AnimatePresence initial={false}>
          {activeId === id && (
            <motion.span
              layoutId={`animated-background-${uniqueId}`}
              className={["absolute inset-0", className]
                .filter(Boolean)
                .join(" ")}
              transition={transition}
              initial={{ opacity: defaultValue ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
        <span className="relative z-10">{originalChildren}</span>
      </>,
    );
  });
}
