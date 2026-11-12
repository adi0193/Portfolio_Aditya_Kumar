import { useMemo, useState } from "react";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import Diagram from "../components/ui/Diagram";
import ReviewNote from "../components/ui/ReviewNote";
import { usePointerGlow } from "../hooks/usePointerGlow";
import { projects } from "../data/profile";
import "./Projects.css";

const FILTERS = ["All", "React", "Node.js", "MongoDB", "Python", "HTML", "JavaScript"];

function matches(project, filter) {
  if (filter === "All") return true;
  return project.stack.some((s) => s === filter || (filter === "Node.js" && s === "Express"));
}

function ProjectLinks({ project }) {
  return (
    <div className="project__links">
      {project.demo && (
        <a className="project__link project__link--primary" href={project.demo} target="_blank" rel="noopener noreferrer">
          Live demo <FiArrowUpRight aria-hidden="true" />
          <span className="sr-only"> for {project.title}</span>
        </a>
      )}
      {project.repos ? (
        project.repos.map((r) => (
          <a key={r.href} className="project__link" href={r.href} target="_blank" rel="noopener noreferrer">
            <FiGithub aria-hidden="true" /> {r.label}
          </a>
        ))
      ) : (
        <a className="project__link" href={project.repo} target="_blank" rel="noopener noreferrer">
          <FiGithub aria-hidden="true" /> Source
          <span className="sr-only"> for {project.title}</span>
        </a>
      )}
    </div>
  );
}

function Visual({ project }) {
  if (project.image) {
    return (
      <div className="browser">
        <div className="browser__bar" aria-hidden="true">
          <span />
          <span />
          <span />
          <em className="mono">{project.demo?.replace(/^https?:\/\//, "").replace(/\/$/, "")}</em>
        </div>
        <img src={project.image} alt={`Screenshot of ${project.title}`} loading="lazy" width="1200" height="675" />
      </div>
    );
  }
  if (project.diagram) {
    return <Diagram {...project.diagram} title={`Architecture of ${project.title}`} />;
  }
  return null;
}

function FeaturedProject({ project, index }) {
  const glow = usePointerGlow();
  return (
    <Reveal as="article" className="feature" onPointerMove={glow} aria-labelledby={`p-${project.id}`}>
      <div className="feature__visual">
        <Visual project={project} />
      </div>
      <div className="feature__content">
        <p className="feature__meta mono">
          <span className="accent">{String(index + 1).padStart(2, "0")}</span>
          <span>{project.category}</span>
          <span>{project.year}</span>
        </p>
        <h3 id={`p-${project.id}`} className="feature__title">
          {project.title}
        </h3>
        <p className="feature__problem">{project.problem}</p>
        {project.why && <p className="feature__why">{project.why}</p>}
        <ul className="feature__details">
          {project.details.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
        <ul className="feature__stack" aria-label="Technologies">
          {project.stack.map((s) => (
            <li key={s} className="chip">
              {s}
            </li>
          ))}
        </ul>
        <ProjectLinks project={project} />
        <ReviewNote>{project.review}</ReviewNote>
      </div>
    </Reveal>
  );
}

function CompactProject({ project, delay }) {
  const glow = usePointerGlow();
  return (
    <Reveal as="article" delay={delay} className="mini" onPointerMove={glow}>
      <div className="mini__image">
        <img src={project.image} alt="" loading="lazy" width="1200" height="675" />
      </div>
      <div className="mini__body">
        <p className="mini__meta mono">
          {project.year} · {project.stack.join(" · ")}
        </p>
        <h4 className="mini__title">{project.title}</h4>
        <p className="mini__text">{project.problem}</p>
        <ProjectLinks project={project} />
      </div>
    </Reveal>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const counts = useMemo(
    () => Object.fromEntries(FILTERS.map((f) => [f, projects.filter((p) => matches(p, f)).length])),
    []
  );
  const visible = projects.filter((p) => matches(p, filter));
  const featured = visible.filter((p) => p.featured);
  const rest = visible.filter((p) => !p.featured);

  return (
    <section id="work" className="section work" aria-labelledby="work-title">
      <div className="container">
        <SectionHeader
          id="work-title"
          index="03"
          label="Selected work"
          title={
            <>
              Things I've built, <span className="serif">explained honestly.</span>
            </>
          }
          intro="Personal and internship projects, with what each one does and how it's put together. Every project links to its source code."
        />

        <div className="filters" role="group" aria-label="Filter projects by technology">
          {FILTERS.filter((f) => counts[f] > 0).map((f) => (
            <button
              key={f}
              type="button"
              className={`filter${filter === f ? " is-active" : ""}`}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f}
              <span className="filter__count mono">{counts[f]}</span>
            </button>
          ))}
        </div>

        <p className="sr-only" aria-live="polite">
          Showing {visible.length} project{visible.length === 1 ? "" : "s"}
        </p>

        <div className="features" key={`f-${filter}`}>
          {featured.map((p) => (
            <FeaturedProject key={p.id} project={p} index={projects.indexOf(p)} />
          ))}
        </div>

        {rest.length > 0 && (
          <div className="earlier" key={`e-${filter}`}>
            <h3 className="earlier__title mono">Earlier work · 2023</h3>
            <div className="earlier__grid">
              {rest.map((p, i) => (
                <CompactProject key={p.id} project={p} delay={i * 60} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
