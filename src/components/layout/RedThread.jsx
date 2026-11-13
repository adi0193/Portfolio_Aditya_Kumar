import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { navItems } from "./navItems";
import { useScrollSpy } from "../../hooks/useScrollSpy";
import "./RedThread.css";

const ids = navItems.map((i) => i.id);

/**
 * A thin oxblood thread down the left edge that follows reading progress,
 * with a knot for every section. Desktop only; purely navigational sugar —
 * the main nav remains the accessible way to move around.
 */
export default function RedThread() {
  const { pathname } = useLocation();
  const active = useScrollSpy(ids);
  const fillRef = useRef(null);
  const [knots, setKnots] = useState([]);

  useEffect(() => {
    if (pathname !== "/") return;
    let frame = 0;
    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setKnots(
        ids.map((id) => {
          const el = document.getElementById(id);
          const top = el ? el.getBoundingClientRect().top + window.scrollY : 0;
          return { id, at: Math.min(1, Math.max(0, top / (max || 1))) };
        })
      );
    };
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (fillRef.current) fillRef.current.style.transform = `scaleY(${p})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    measure();
    update();
    const ro = new ResizeObserver(() => {
      measure();
      update();
    });
    ro.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  if (pathname !== "/") return null;

  return (
    <div className="rthread" aria-hidden="true">
      <div className="rthread__line">
        <div ref={fillRef} className="rthread__fill" />
        {knots.map((k, i) => (
          <a
            key={k.id}
            href={`#${k.id}`}
            tabIndex={-1}
            className={`rthread__knot${active === k.id ? " is-active" : ""}`}
            style={{ top: `${k.at * 100}%` }}
          >
            <span className="rthread__tip">{navItems[i].label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
