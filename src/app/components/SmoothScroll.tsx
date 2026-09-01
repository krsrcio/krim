import type { LenisOptions } from "lenis";
import { ReactLenis } from "lenis/react";
import type { PropsWithChildren } from "react";

import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const lenisOptions: LenisOptions = {
  autoRaf: true,
  smoothWheel: true,
  syncTouch: false,
  anchors: true,
  stopInertiaOnNavigate: true,
  lerp: 0.1,
  wheelMultiplier: 0.9,
};

type SmoothScrollProps = PropsWithChildren;

export function SmoothScroll({ children }: SmoothScrollProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}
