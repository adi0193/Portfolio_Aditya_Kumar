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
          variant="split"
          label="Toolkit"
          title={
            <>
              Every investigation needs the right <em>tools.</em>
            </>
          }
          kicker="Filed by where I've actually used them. No percentages, no star ratings — just an honest index."
        />

        <Reveal className="legend" role="group" aria-label="Highlight by experience">
          <span className="label legend__key">Key</span>
          {Object.entries(skillStatus).map(([key, st]) => (
            <button
              key={key}
              type="button"
              className={`legend__item${focus === key ? " is-active" : ""}`}
              aria-pressed={focus === key}
              onClick={() => setFocus(focus === key ? null : key)}
            >
              <span className={`mark mark--${key}`} aria-hidden="true">
                {st.mark}
              </span>
              {st.label}
              <span className="legend__count mono">({count(key)})</span>
            </button>
          ))}
        </Reveal>

        <div className={`index${focus ? ` index--${focus}` : ""}`}>
          {toolkit.map((d, i) => (
            <Reveal as="section" key={d.group} delay={(i % 3) * 80} className="index__group" aria-labelledby={`drawer-${d.drawer}`}>
              <h3 id={`drawer-${d.drawer}`} className="index__head">
                <span className="index__letter mono">{d.drawer}.</span>
                {d.group}
              </h3>
              <ul>
                {d.items.map((item) => (
                  <li key={item.name} className={`index__entry is-${item.status}`}>
                    <span className="index__name">
                      {item.name}
                      {item.note && <span className="index__note mono"> — {item.note}</span>}
                    </span>
                    <span className="index__leader" aria-hidden="true" />
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
                  theme={{ light: ["#d9d4c7", "#783f46"] }}
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
