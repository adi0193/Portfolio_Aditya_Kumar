import { useEffect, useRef } from "react";
import SectionHead from "../components/ui/SectionHead";
import Reveal from "../components/ui/Reveal";
import Note from "../components/ui/Note";
import ReviewNote from "../components/ui/ReviewNote";
import { experience } from "../data/profile";
import "./Experience.css";

/** Draws the timeline thread as the reader scrolls through the section. */
function useThreadProgress() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.6 - r.top) / r.height));
      el.style.setProperty("--progress", p.toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return ref;
}

export default function Experience() {
  const lineRef = useThreadProgress();
  const roman = ["I", "II", "III", "IV", "V", "VI"];

  return (
    <section id="experience" className="section experience dark" aria-labelledby="exp-title">
      <div className="container">
        <SectionHead
          id="exp-title"
          no="03"
          label="Experience"
          aside="Most recent first. Each role is described as the work it actually was."
          title={
            <>
              Experience changes <em>perspective.</em>
            </>
          }
        />

        <ol ref={lineRef} className="tl">
          {experience.map((e, i) => (
            <Reveal as="li" key={e.id} className="tl__item">
              <div className="tl__when">
                <span className="tl__period">{e.period}</span>
                <span className="label">{e.type}</span>
              </div>

              <span className="tl__knot" aria-hidden="true">
                {roman[i]}
              </span>

              <div className="tl__body">
                <h3 className="tl__role">{e.role}</h3>
                <p className="tl__org">{e.org}</p>
                <p className="tl__nature mono">{e.nature}</p>

                <dl className="tl__facts">
                  <div>
                    <dt className="label">What I worked on</dt>
                    <dd>{e.workedOn}</dd>
                  </div>
                  <div>
                    <dt className="label">What I contributed</dt>
                    <dd>
                      <ul className="tl__list">
                        {e.contributed.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  {e.problems && (
                    <div>
                      <dt className="label">Problems encountered</dt>
                      <dd>{e.problems}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="label">What I learned</dt>
                    <dd className="tl__learned">{e.learned}</dd>
                  </div>
                </dl>

                <p className="tl__tags mono">
                  <span className="sr-only">Skills involved: </span>
                  {e.tags.join(" / ")}
                </p>
                <ReviewNote>{e.review}</ReviewNote>
              </div>
            </Reveal>
          ))}
        </ol>

        <Note>
          Roles are labelled by what they actually were. QA and client coordination are presented as exactly that —
          not dressed up as software development.
        </Note>
      </div>
    </section>
  );
}
