import { Fragment, useEffect, useState } from "react";
import { FiArrowDown, FiArrowRight } from "react-icons/fi";
import Button from "../components/ui/Button";
import Note from "../components/ui/Note";
import PatternFigure from "./PatternFigure";
import { hero, observations, person } from "../data/profile";
import "./Hero.css";

function useLocalTime(timeZone) {
  const fmt = () => new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", minute: "2-digit" }).format(new Date());
  const [t, setT] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 15000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return t;
}

/** Splits a line into words that rise into place one after another. */
function Rise({ text, start = 0 }) {
  const words = text.split(" ");
  return words.map((w, i) => (
    <Fragment key={i}>
      <span className="rise">
        <span style={{ "--w": start + i }}>{w}</span>
      </span>
      {i < words.length - 1 && " "}
    </Fragment>
  ));
}

export default function Hero() {
  const time = useLocalTime(person.timezone);
  const [n, setN] = useState(0);

  return (
    <section id="introduction" className="hero" aria-labelledby="hero-title">
      <p className="hero__running" aria-hidden="true">
        A. Kumar — Software engineer — India
      </p>
      <div className="container hero__grid">
        <dl className="hero__file mono" aria-label="Quick facts">
          <div>
            <dt>File</dt>
            <dd>A. Kumar</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>{person.role}</dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>{person.location}</dd>
          </div>
          <div>
            <dt>Local time</dt>
            <dd>{time} IST</dd>
          </div>
        </dl>

        <h1 id="hero-title" className="hero__title">
          <Rise text="Not everything is as it" />{" "}
          <em>
            <Rise text="appears." start={5} />
          </em>
        </h1>

        <div className="hero__line" aria-hidden="true">
          <span className="hero__line-mark" />
        </div>

        <div className="hero__body">
          <p className="hero__intro">{hero.intro}</p>
          <p className="hero__tagline mono">
            {hero.tagline.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </p>
          <div className="hero__ctas">
            <Button href="#case-files" variant="primary" icon={<FiArrowRight />}>
              Explore my work
            </Button>
            <Button href="#observations" variant="secondary" icon={<FiArrowDown />}>
              Get to know me
            </Button>
          </div>
          <Note>
            No portrait here on purpose — this page uses typography and a single figure instead of stock imagery.
            The clock above is real: it shows the current time where I am.
          </Note>
        </div>

        <div className="hero__aside">
          <PatternFigure />
          <div className="hero__obs" aria-live="polite">
            <p className="label">
              Observation No. <span className="thread">{String(n + 1).padStart(3, "0")}</span>
            </p>
            <p key={n} className="hero__obs-text">
              {observations[n]}
            </p>
            <button
              type="button"
              className="hero__obs-next mono"
              onClick={() => setN((v) => (v + 1) % observations.length)}
            >
              Next observation <FiArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
