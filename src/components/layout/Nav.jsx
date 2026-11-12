import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "./navItems";
import ObserveToggle from "./ObserveToggle";
import { useScrollSpy } from "../../hooks/useScrollSpy";
import { person } from "../../data/profile";
import "./Nav.css";

const sectionIds = navItems.map((i) => i.id);

export default function Nav() {
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const spied = useScrollSpy(sectionIds);
  const active = onHome ? spied : null;

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const listRef = useRef(null);
  const [bar, setBar] = useState({ x: 0, w: 0, show: false });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The red thread under the active link
  useLayoutEffect(() => {
    const measure = () => {
      const el = listRef.current?.querySelector(`[data-id="${active}"]`);
      setBar(el ? { x: el.offsetLeft, w: el.offsetWidth, show: true } : (b) => ({ ...b, show: false }));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

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
        <Link to="/" className="nav__brand" onClick={close} aria-label={`${person.name}, home`}>
          <span className="nav__mono" aria-hidden="true">
            {person.initials}
          </span>
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
                  aria-current={active === item.id ? "location" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <span
              aria-hidden="true"
              className="nav__thread"
              style={{ transform: `translateX(${bar.x}px)`, width: bar.w, opacity: bar.show ? 1 : 0 }}
            />
          </ul>
        </nav>

        <div className="nav__end">
          <ObserveToggle className="nav__observe" />
          <button
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="nav-sheet"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="nav__toggle-text">{open ? "Close" : "Menu"}</span>
          </button>
        </div>
      </div>

      <div id="nav-sheet" className="nav__sheet" hidden={!open}>
        <nav aria-label="Mobile" className="container">
          <ol className="nav__sheet-list">
            {navItems.map((item, i) => (
              <li key={item.id} style={{ "--i": i }}>
                <Link to={{ pathname: "/", hash: `#${item.id}` }} onClick={close}>
                  <span className="label">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </Link>
              </li>
            ))}
            <li style={{ "--i": navItems.length }}>
              <Link to="/resume" onClick={close}>
                <span className="label">{String(navItems.length + 1).padStart(2, "0")}</span>
                Résumé
              </Link>
            </li>
          </ol>
          <div className="nav__sheet-foot">
            <ObserveToggle />
            <p className="mono">
              <a href={person.links.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href={person.links.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href={`mailto:${person.email}`}>Email</a>
            </p>
          </div>
        </nav>
      </div>
    </header>
  );
}
