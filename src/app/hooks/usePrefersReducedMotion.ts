import { useEffect, useState } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function getInitialPreference() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    getInitialPreference,
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY);
    const updatePreference = () => {
      setPrefersReducedMotion(mediaQueryList.matches);
    };

    updatePreference();

    mediaQueryList.addEventListener("change", updatePreference);

    return () => {
      mediaQueryList.removeEventListener("change", updatePreference);
    };
  }, []);

  return prefersReducedMotion;
}
