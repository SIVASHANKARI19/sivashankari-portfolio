import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

const checkIsMobile = () => {
  if (typeof navigator === "undefined" || typeof window === "undefined") {
    return false;
  }
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < MOBILE_BREAKPOINT
  );
};

/**
 * Reactive mobile-detection hook (UA sniff + viewport width).
 * Recomputes on resize/orientation change via matchMedia, so consumers
 * always get an up-to-date value instead of a value frozen at mount time.
 */
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(checkIsMobile);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT}px)`
    );

    const handleChange = () => setIsMobile(checkIsMobile());

    // Re-check immediately in case UA/viewport differs from the initial render
    handleChange();

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
};