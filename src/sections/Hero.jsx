import { Fragment, useEffect, useState } from "react";
import { FiArrowUpRight, FiDownload, FiGithub, FiLinkedin } from "react-icons/fi";
import Button from "../components/ui/Button";
import { usePointerGlow } from "../hooks/usePointerGlow";
import { person, about } from "../data/profile";
import cv from "../assets/cv.pdf";
import "./Hero.css";

function useLocalTime(timeZone) {
  const format = () =>
    new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", minute: "2-digit" }).format(new Date());
  const [time, setTime] = useState(format);
  useEffect(() => {
    const id = setInterval(() => setTime(format()), 15_000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeZone]);
  return time;
}

/** Splits text into words that animate in one after another. */
function Words({ text, start = 0, className }) {
  const words = text.split(" ");
  return words.map((word, i) => (
    <Fragment key={i}>
      <span className={`word ${className ?? ""}`} style={{ "--w": start + i }}>
        <span>{word}</span>
      </span>
      {i < words.length - 1 && " "}
    </Fragment>
  ));
}

export default function Hero() {
  const time = useLocalTime(person.timezone);
  const glow = usePointerGlow();

  const specs = [
    { k: "role", v: about.now[0].value },
    { k: "focus", v: person.focus },
    { k: "learning", v: about.now[1].value },
    { k: "based", v: `${person.location} · ${time} IST` },
  ];

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="hero__eyebrow mono">
            <span className="hero__dot" aria-hidden="true" />
            {person.role} · {person.location}
          </p>

          <h1 id="hero-title" className="hero__title">
            <span className="hero__hello">
              <Words text="Hi, I'm" />
            </span>{" "}
            <span className="hero__name">
              <Words text={`${person.name}.`} start={2} className="serif" />
            </span>
          </h1>

          <p className="hero__summary">
            Building <em className="serif">practical</em> products at the intersection of software engineering,
            backend systems, and AI.
          </p>

          <div className="hero__ctas">
            <Button href="#contact" icon={<FiArrowUpRight />}>
              Get in touch
            </Button>
            <Button href={cv} variant="secondary" download="Aditya-Kumar-Resume.pdf" icon={<FiDownload />}>
              Résumé
            </Button>
            <span className="hero__socials">
              <a href={person.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FiGithub />
              </a>
              <a href={person.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FiLinkedin />
              </a>
            </span>
          </div>
        </div>

        <aside className="hero__card" onPointerMove={glow} aria-label="At a glance">
          <div className="hero__card-head mono">
            <span>~/aditya</span>
            <span className="hero__card-file">profile.json</span>
          </div>
          <dl className="hero__specs mono">
            <div className="hero__spec">
              <dt>{"{"}</dt>
            </div>
            {specs.map((s, i) => (
              <div key={s.k} className="hero__spec" style={{ "--i": i }}>
                <dt>
                  <span className="hero__key">"{s.k}"</span>:
                </dt>
                <dd>
                  "{s.v}"{i < specs.length - 1 ? "," : ""}
                </dd>
              </div>
            ))}
            <div className="hero__spec">
              <dt>{"}"}</dt>
            </div>
          </dl>
          <p className="hero__card-foot mono">
            <span className="hero__pass">✓</span> 4 fields · no buzzwords
          </p>
        </aside>
      </div>

      <a href="#about" className="hero__scroll mono container">
        <span className="hero__scroll-line" aria-hidden="true" />
        Scroll · 01 About
      </a>
    </section>
  );
}
