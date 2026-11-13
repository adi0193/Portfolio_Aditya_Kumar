import { useState } from "react";
import { Link } from "react-router-dom";
import { asides, closing, person } from "../../data/profile";
import Note from "../ui/Note";
import "./Footer.css";

export default function Footer() {
  const [n, setN] = useState(0);
  const year = new Date().getFullYear();

  return (
    <footer className="footer dark dark--olive">
      <div className="container">
        <p className="footer__closing">
          <span className="label">The final observation</span>
          {closing}
        </p>

        <div className="footer__grid">
          <ul className="footer__links mono">
            <li>
              <a className="link" href={person.links.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a className="link" href={person.links.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a className="link" href={person.links.twitter} target="_blank" rel="noopener noreferrer">
                X / Twitter
              </a>
            </li>
            <li>
              <a className="link" href={person.links.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
            <li>
              <Link className="link" to="/resume">
                Résumé
              </Link>
            </li>
          </ul>

          <button
            type="button"
            className="footer__aside mono"
            onClick={() => setN((v) => (v + 1) % asides.length)}
            aria-live="polite"
          >
            {asides[n]}
          </button>
        </div>

        <div className="footer__base mono">
          <span>
            © {year} {person.name}
          </span>
          <span>Set in Instrument Serif, Manrope &amp; IBM Plex Mono. Built with React.</span>
        </div>
        <Note>
          No analytics, no trackers, no cookies. The only thing this site remembers is whether you switched on
          observation mode — and only in your own browser.
        </Note>
      </div>
    </footer>
  );
}
