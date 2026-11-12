import SectionHead from "../components/ui/SectionHead";
import Reveal from "../components/ui/Reveal";
import Note from "../components/ui/Note";
import { about } from "../data/profile";
import "./About.css";

export default function About() {
  return (
    <section id="observations" className="section about" aria-labelledby="about-title">
      <div className="container">
        <SectionHead
          id="about-title"
          no="01"
          label="Observations"
          title={
            <>
              Every detail tells a <em>story.</em>
            </>
          }
        />

        <div className="about__grid">
          <Reveal as="dl" className="about__facts">
            {about.facts.map((f) => (
              <div key={f.label}>
                <dt className="label">{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </Reveal>

          <div className="about__story">
            {about.paragraphs.map((p, i) => (
              <Reveal as="p" key={i} delay={i * 90} className={i === 0 ? "about__lead" : undefined}>
                {p}
              </Reveal>
            ))}
            <Note>
              This section is written as a story rather than a list of buzzwords. My current role is in quality
              assurance; the building I describe happens in my own projects and internship work.
            </Note>
          </div>

          <aside className="about__margin" aria-label="Notes in the margin">
            {about.quotes.map((q, i) => (
              <Reveal as="blockquote" key={q} delay={200 + i * 150} className="about__quote">
                <p>{q}</p>
              </Reveal>
            ))}
          </aside>
        </div>

        <Reveal className="about__record">
          <h3 className="label">Also on file</h3>
          <ul>
            {about.record.map((r) => (
              <li key={r.title}>
                <span className="about__record-title">{r.title}</span>
                <span className="about__record-detail">{r.detail}</span>
                <span className="about__record-meta mono">{r.meta}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
