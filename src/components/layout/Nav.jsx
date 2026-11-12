import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "./navItems";
import { useScrollSpy } from "../../hooks/useScrollSpy";
import { person } from "../../data/profile";
import "./Nav.css";

const sectionIds = navItems.map((item) => item.id);

export default function Nav() {
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const spied = useScrollSpy(sectionIds);
  const active = onHome ? spied : null;

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const listRef = useRef(null);
  const [indicator, setIndicator] = useState({ x: 0, w: 0, visible: false });

  // Solid background once the page has scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Slide the indicator under the active link
  useLayoutEffect(() => {
    const measure = () => {
      const list = listRef.current;
      const link = list?.querySelector(`[data-id="${active}"]`);
      if (!link) {
        setIndicator((s) => ({ ...s, visible: false }));
        return;
      }
      setIndicator({ x: link.offsetLeft, w: link.offsetWidth, visible: true });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  // Mobile menu: lock scroll, close on Escape and on route change
  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  const close = () => setOpen(false);

  return (
    <header className={`nav${scrolled || !onHome ? " nav--solid" : ""}${open ? " nav--open" : ""}`}>
      <div className="container nav__inner">
        <Link to="/" className="nav__brand" onClick={close} aria-label={`${person.name} — home`}>
          <span className="nav__mark" aria-hidden="true">ak</span>
          <span className="nav__name">{person.name}</span>
        </Link>

        <nav aria-label="Primary" className="nav__desktop">
          <ul ref={listRef} className="nav__list">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={{ pathname: "/", hash: `#${item.id}` }}
                  data-id={item.id}
                  className={`nav__link${active === item.id ? " is-active" : ""}`}
                  aria-current={active === item.id ? "true" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <span
              aria-hidden="true"
              className="nav__indicator"
              style={{
                transform: `translateX(${indicator.x}px)`,
                width: indicator.w,
                opacity: indicator.visible ? 1 : 0,
              }}
            />
          </ul>
        </nav>

        <div className="nav__actions">
          <Link to="/resume" className={`nav__resume${pathname === "/resume" ? " is-active" : ""}`}>
            Résumé
          </Link>
          <button
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span className="nav__toggle-bar" aria-hidden="true" />
            <span className="nav__toggle-bar" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="nav__sheet" hidden={!open}>
        <nav aria-label="Mobile" className="container">
          <ul className="nav__sheet-list">
            {navItems.map((item, i) => (
              <li key={item.id} style={{ "--i": i }}>
                <Link to={{ pathname: "/", hash: `#${item.id}` }} onClick={close}>
                  <span className="mono">0{i + 1}</span>
                  {item.label}
                </Link>
              </li>
            ))}
            <li style={{ "--i": navItems.length }}>
              <Link to="/resume" onClick={close}>
                <span className="mono">0{navItems.length + 1}</span>
                Résumé
              </Link>
            </li>
          </ul>
          <p className="nav__sheet-foot mono">
            <a href={person.links.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a href={person.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <a href={`mailto:${person.email}`}>Email ↗</a>
          </p>
        </nav>
      </div>
    </header>
  );
}
