import { useState } from "react";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import SectionHead from "../components/ui/SectionHead";
import Reveal from "../components/ui/Reveal";
import Note from "../components/ui/Note";
import Diagram from "../components/ui/Diagram";
import CaseDialog from "./CaseDialog";
import { cases, minorCases } from "../data/profile";
import "./CaseFiles.css";

function CaseSpread({ item, index, onOpen }) {
  const flip = index % 2 === 1;
  return (
    <Reveal as="article" className={`spread${flip ? " spread--flip" : ""}`} aria-labelledby={`case-${item.id}`}>
      <div className="spread__index mono">
        <span className="thread">No. {item.no}</span>
        <span>{item.year}</span>
        <span>{item.kind}</span>
      </div>

      <figure className="spread__figure">
        <div className="spread__frame" aria-hidden="true" />
        <div className="spread__exhibit">
          {item.image ? (
            <img src={item.image} alt={`Screenshot of ${item.title}`} loading="lazy" width="1200" height="675" />
          ) : (
            <Diagram {...item.diagram} title={`Architecture of ${item.title}`} />
          )}
        </div>
        <figcaption className="label">
          Exhibit {item.no}-A · {item.image ? "the live application" : "architecture, drawn from the code"}
        </figcaption>
      </figure>

      <div className="spread__text">
        <h3 id={`case-${item.id}`} className="spread__title">
          {item.title}
        </h3>
        <p className="spread__summary">{item.summary}</p>

        <p className="spread__obs">
          <span className="label">Observed</span>
          {item.observation}
        </p>

        <p className="spread__tools mono">{item.tools.slice(0, 6).join(" / ")}</p>

        <div className="spread__actions">
          <button type="button" className="spread__open" onClick={() => onOpen(item)}>
            Read the case file <FiArrowRight aria-hidden="true" />
            <span className="sr-only">: {item.title}</span>
          </button>
          {item.demo && (
            <a className="link mono spread__ext" href={item.demo} target="_blank" rel="noopener noreferrer">
              Live<span className="sr-only"> demo of {item.title}</span> <FiArrowUpRight aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export default function CaseFiles() {
  const [open, setOpen] = useState(null);

  return (
    <section id="case-files" className="section cases stone" aria-labelledby="cases-title">
      <div className="container">
        <SectionHead
          id="cases-title"
          no="02"
          variant="numeral"
          label="Case files"
          title={
            <>
              The work, <em>documented.</em>
            </>
          }
          kicker="Each project, written up like an investigation: the problem, the approach, the tools and the evidence — with one detail worth noticing in the margin."
        />

        <div className="spreads">
          {cases.map((c, i) => (
            <CaseSpread key={c.id} item={c} index={i} onOpen={setOpen} />
          ))}
        </div>

        <Note>
          Case files only include projects with public source code I could verify. Screenshots are real; where none
          exists, the evidence is an architecture sketch drawn from the code.
        </Note>

        <Reveal className="minor">
          <h3 className="label minor__head">Minor cases <span aria-hidden="true">—</span> early work, 2023</h3>
          <ol className="minor__list">
            {minorCases.map((m) => (
              <li key={m.no} className="minor__row">
                <span className="minor__no mono thread">{m.no}</span>
                <span className="minor__title">{m.title}</span>
                <span className="minor__note">{m.note}</span>
                <span className="minor__tools mono">{m.tools}</span>
                <span className="minor__links mono">
                  <a className="link" href={m.demo} target="_blank" rel="noopener noreferrer">
                    Demo<span className="sr-only"> of {m.title}</span>
                  </a>
                  <a className="link" href={m.repo} target="_blank" rel="noopener noreferrer">
                    Source<span className="sr-only"> of {m.title}</span> <FiArrowUpRight aria-hidden="true" />
                  </a>
                </span>
                <img className="minor__peek" src={m.image} alt="" loading="lazy" width="1200" height="675" />
              </li>
            ))}
          </ol>
        </Reveal>
      </div>

      <CaseDialog item={open} onClose={() => setOpen(null)} />
    </section>
  );
}
