import { person } from "../../data/profile";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();
  const socials = [
    { label: "GitHub", href: person.links.github },
    { label: "LinkedIn", href: person.links.linkedin },
    { label: "X / Twitter", href: person.links.twitter },
    { label: "Instagram", href: person.links.instagram },
  ];
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__statement">
          Built by hand with React and Vite. <span className="serif">Tested by the same person who wrote it.</span>
        </p>
        <ul className="footer__links mono">
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="footer__meta mono">
          © {year} {person.name} · {person.location}
        </p>
      </div>
    </footer>
  );
}
