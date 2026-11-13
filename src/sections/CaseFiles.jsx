import { useState } from "react";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import SectionHead from "../components/ui/SectionHead";
import Reveal from "../components/ui/Reveal";
import Note from "../components/ui/Note";
import Diagram from "../components/ui/Diagram";
import CaseDialog from "./CaseDialog";
import { cases, minorCases } from "../data/profile";
import "./CaseFiles.css";

function CaseCard({ item, index, onOpen }) {
  return (
    <Reveal as="article" delay={(index % 2) * 120} className={`case case--${index % 2 ? "even" : "odd"}`}>
      <p className="case__tab label">
        Case file <span className="thread">{item.no}</span>
      </p>
      <div className="case__sheet">
        <div className="case__meta mono">
          <span>{item.kind}</span>
          <span>{item.year}</span>
        </div>
        <h3 className="case__title">{item.title}</h3>
        <p className="case__summary">{item.summary}</p>

        <div className="case__evidence" aria-hidden="true">
          {item.image ? (
            <img src={item.image} alt="" loading="lazy" width="1200" height="675" />
          ) : (
            <Diagram {...item.diagram} title="" />
          )}
        </div>

        <p className="case__tools mono">{item.tools.slice(0, 5).join(" · ")}</p>

        <button type="button" className="case__open mono" onClick={() => onOpen(item)}>
          Open the file <FiArrowRight aria-hidden="true" />
          <span className="sr-only">: {item.title}</span>
        </button>

        {/* The slip that slides out on hover (always visible in observation mode) */}
        <p className="case__slip">
          <span className="label">Observed</span>
          {item.observation}
        </p>
      </div>
    </Reveal>
  );
}

export default function CaseFiles() {
  const [open, setOpen] = useState(null);

  return (
    <section id="case-files" className="section cases" aria-labelledby="cases-title">
      <div className="container">
        <SectionHead
          id="cases-title"
          no="02"
          label="Case files"
          title={
            <>
              The work, <em>documented.</em>
            </>
          }
          kicker="Each project, written up like an investigation: the problem, the approach, the tools and the evidence. Hover a file for one detail worth noticing; open it for the whole story."
        />

        <div className="cases__grid">
          {cases.map((c, i) => (
            <CaseCard key={c.id} item={c} index={i} onOpen={setOpen} />
          ))}
        </div>

        <Note>
          Case files only include projects with public source code I could verify. Screenshots are real; where none
          exists, the evidence is an architecture sketch drawn from the code.
        </Note>

        <Reveal className="minor">
          <h3 className="label">Minor cases · early work</h3>
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
