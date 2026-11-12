import { useCallback } from "react";

/**
 * Writes the pointer position (relative to the element) into the
 * --mx / --my CSS variables so CSS can draw a subtle spotlight.
 * Only meaningful on devices with a fine pointer.
 */
export function usePointerGlow() {
  return useCallback((event) => {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }, []);
}
