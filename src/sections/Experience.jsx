import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import ReviewNote from "../components/ui/ReviewNote";
import { experience } from "../data/profile";
import "./Experience.css";

export default function Experience() {
  const [openId, setOpenId] = useState(experience[0].id);

  return (
    <section id="experience" className="section experience" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeader
          id="experience-title"
          index="02"
          label="Experience"
          title="Where I've worked and studied."
          intro="Mostly on the quality and delivery side of products so far, with full-stack development through an internship and my own projects."
        />

        <ol className="timeline">
          {experience.map((item, i) => {
            const open = openId === item.id;
            const panelId = `exp-${item.id}`;
            return (
              <Reveal as="li" key={item.id} delay={i * 70} className={`timeline__item${open ? " is-open" : ""}`}>
                <span className="timeline__node" aria-hidden="true" />
                <div className="timeline__period mono">{item.period}</div>

                <div className="timeline__body">
                  <h3>
                    <button
                      type="button"
                      className="timeline__trigger"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenId(open ? null : item.id)}
                    >
                      <span className="timeline__role">{item.role}</span>
                      <span className="timeline__org">{item.org}</span>
                      <span className="timeline__plus" aria-hidden="true">
                        <FiPlus />
                      </span>
                    </button>
                  </h3>
                  <p className="timeline__type mono">{item.type}</p>

                  <div id={panelId} className="timeline__panel" role="region" aria-label={`${item.role} details`}>
                    <div className="timeline__panel-inner">
                      <p className="timeline__summary">{item.summary}</p>
                      <ul className="timeline__points">
                        {item.points.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                      {item.learned && (
                        <p className="timeline__learned">
                          <span className="mono">What I took from it</span>
                          {item.learned}
                        </p>
                      )}
                      <ul className="timeline__tags" aria-label="Skills">
                        {item.tags.map((t) => (
                          <li key={t} className="chip">
                            {t}
                          </li>
                        ))}
                      </ul>
                      <ReviewNote>{item.review}</ReviewNote>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
