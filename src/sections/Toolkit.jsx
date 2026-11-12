import { Component, lazy, Suspense, useState } from "react";
import SectionHead from "../components/ui/SectionHead";
import Reveal from "../components/ui/Reveal";
import Note from "../components/ui/Note";
import { person, skillStatus, toolkit } from "../data/profile";
import "./Toolkit.css";

const GitHubCalendar = lazy(() => import("react-github-calendar").then((m) => ({ default: m.GitHubCalendar })));

/** If GitHub's contribution data can't be fetched, hide the log instead of showing an error. */
class HideOnError extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function Toolkit() {
  const [focus, setFocus] = useState(null);
  const count = (k) => toolkit.reduce((n, d) => n + d.items.filter((i) => i.status === k).length, 0);

  return (
    <section id="toolkit" className="section toolkit" aria-labelledby="toolkit-title">
      <div className="container">
        <SectionHead
          id="toolkit-title"
          no="04"
          label="Toolkit"
          title={
            <>
              Every investigation needs the right <em>tools.</em>
            </>
          }
          kicker="Filed by where I've actually used them. No percentages, no star ratings — just an honest index."
        />

        <Reveal className="legend" role="group" aria-label="Highlight by experience">
          {Object.entries(skillStatus).map(([key, s]) => (
            <button
              key={key}
              type="button"
              className={`legend__item${focus === key ? " is-active" : ""}`}
              aria-pressed={focus === key}
              onClick={() => setFocus(focus === key ? null : key)}
            >
              <span className={`mark mark--${key}`} aria-hidden="true">
                {s.mark}
              </span>
              {s.label}
              <span className="legend__count mono">{count(key)}</span>
            </button>
          ))}
        </Reveal>

        <div className={`catalog${focus ? ` catalog--${focus}` : ""}`}>
          {toolkit.map((d, i) => (
            <Reveal as="article" key={d.group} delay={(i % 3) * 90} className="card" aria-labelledby={`drawer-${d.drawer}`}>
              <header className="card__holder">
                <span className="card__drawer mono">{d.drawer}</span>
                <h3 id={`drawer-${d.drawer}`} className="card__group">
                  {d.group}
                </h3>
              </header>
              <ul className="card__lines">
                {d.items.map((item) => (
                  <li key={item.name} className={`card__line is-${item.status}`}>
                    <span className="card__name">{item.name}</span>
                    {item.note && <span className="card__note mono">{item.note}</span>}
                    <span className={`mark mark--${item.status}`} title={skillStatus[item.status].label}>
                      <span aria-hidden="true">{skillStatus[item.status].mark}</span>
                      <span className="sr-only">{skillStatus[item.status].label}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Note>
          “Used at work” means used in a professional role (mostly testing and QA). Java, Spring Boot and system design
          are marked as learning because that's what they are right now.
        </Note>

        <HideOnError>
          <Reveal className="fieldlog">
            <div className="fieldlog__head">
              <h3 className="label">Field log · GitHub, last 12 months</h3>
              <a className="link mono" href={person.links.github} target="_blank" rel="noopener noreferrer">
                @adi0193
              </a>
            </div>
            <div className="fieldlog__cal">
              <Suspense fallback={<div style={{ height: 140 }} />}>
                <GitHubCalendar
                  username="adi0193"
                  throwOnError
                  colorScheme="light"
                  theme={{ light: ["#e2d6bf", "#743f43"] }}
                  blockSize={11}
                  blockMargin={4}
                  blockRadius={1}
                  fontSize={12}
                />
              </Suspense>
            </div>
          </Reveal>
        </HideOnError>
      </div>
    </section>
  );
}
