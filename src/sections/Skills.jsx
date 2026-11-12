import { useState } from "react";
import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import { skills, skillStatus } from "../data/profile";
import "./Skills.css";

const statusKeys = Object.keys(skillStatus);

export default function Skills() {
  const [focus, setFocus] = useState(null);
  const total = (key) => skills.reduce((n, g) => n + g.items.filter((i) => i.status === key).length, 0);

  return (
    <section id="skills" className="section skills" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeader
          id="skills-title"
          index="04"
          label="Skills"
          title={
            <>
              What I use, <span className="serif">and how well I know it.</span>
            </>
          }
          intro="No percentage bars. Each technology is marked by where I've actually used it — at work, in my own projects, or as something I'm still learning."
        />

        <Reveal className="legend" role="group" aria-label="Highlight skills by experience">
          {statusKeys.map((key) => (
            <button
              key={key}
              type="button"
              className={`legend__item status--${key}${focus === key ? " is-active" : ""}`}
              aria-pressed={focus === key}
              onClick={() => setFocus(focus === key ? null : key)}
              onMouseEnter={() => setFocus(key)}
              onMouseLeave={() => setFocus(null)}
            >
              <span className="marker" aria-hidden="true" />
              {skillStatus[key].label}
              <span className="legend__count mono">{total(key)}</span>
            </button>
          ))}
        </Reveal>

        <div className={`matrix${focus ? ` matrix--focus-${focus}` : ""}`}>
          {skills.map((group, gi) => (
            <Reveal key={group.group} delay={gi * 50} className="matrix__row">
              <h3 className="matrix__group mono">{group.group}</h3>
              <ul className="matrix__items">
                {group.items.map((item, i) => (
                  <li
                    key={item.name}
                    className={`skill status--${item.status}`}
                    style={{ "--i": i }}
                    title={`${item.name} — ${skillStatus[item.status].label}${item.note ? ` (${item.note})` : ""}`}
                  >
                    <span className="marker" aria-hidden="true" />
                    {item.name}
                    <span className="sr-only">, {skillStatus[item.status].label}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
