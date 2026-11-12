import { useEffect, useRef } from "react";
import "./Cursor.css";

/**
 * A soft ring that trails the pointer and widens over interactive elements.
 * Only on precise pointers and when motion is allowed; the native cursor
 * is never hidden.
 */
export default function Cursor() {
  const ref = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = ref.current;
    if (!fine || still || !el) return;

    let x = -100,
      y = -100,
      cx = x,
      cy = y,
      frame = 0;
    const loop = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      frame = requestAnimationFrame(loop);
    };
    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
      el.classList.add("is-on");
      const target = e.target.closest?.("a, button, [role='switch'], input, textarea, .case");
      el.classList.toggle("is-hover", !!target);
    };
    const leave = () => el.classList.remove("is-on");

    frame = requestAnimationFrame(loop);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return <div ref={ref} className="cursor" aria-hidden="true" />;
}
