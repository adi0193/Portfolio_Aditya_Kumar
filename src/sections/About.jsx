import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import { about, achievements } from "../data/profile";
import "./About.css";

export default function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container">
        <SectionHeader
          id="about-title"
          index="01"
          label="About"
          title={
            <>
              Learning software from <span className="serif accent">both sides</span> — building it, and testing it.
            </>
          }
        />

        <div className="about__grid">
          <div className="about__story">
            {about.paragraphs.map((p, i) => (
              <Reveal as="p" key={i} delay={i * 80} className={i === 0 ? "about__lead" : undefined}>
                {p}
              </Reveal>
            ))}
          </div>

          <Reveal as="dl" className="about__now" delay={120}>
            {about.now.map((item) => (
              <div key={item.label} className="about__cell">
                <dt className="mono">{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal className="about__awards">
          <h3 className="about__awards-title mono">Along the way</h3>
          <ul>
            {achievements.map((a) => (
              <li key={a.title} className="about__award">
                <span className="about__award-title">{a.title}</span>
                <span className="about__award-detail">{a.detail}</span>
                <span className="about__award-meta mono">{a.meta}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
