import { useEffect, useRef } from "react";
import { FiArrowUpRight, FiGithub, FiX } from "react-icons/fi";
import Diagram from "../components/ui/Diagram";
import Note from "../components/ui/Note";
import ReviewNote from "../components/ui/ReviewNote";

/** Full case study for one project, shown in a native modal <dialog>. */
export default function CaseDialog({ item, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (item && !dialog.open) {
      dialog.showModal();
      dialog.scrollTop = 0;
      document.body.classList.add("menu-open");
    }
    if (!item && dialog.open) dialog.close();
  }, [item]);

  const handleClose = () => {
    document.body.classList.remove("menu-open");
    onClose();
  };

  // Click on the backdrop (outside the sheet) closes the dialog
  const onClick = (e) => {
    if (e.target === ref.current) ref.current.close();
  };

  return (
    <dialog ref={ref} className="casefile" onClose={handleClose} onClick={onClick} aria-labelledby="casefile-title">
      {item && (
        <article className="casefile__sheet">
          <header className="casefile__head">
            <p className="label">
              <span className="thread">Case file {item.no}</span> · {item.kind} · {item.year}
            </p>
            <button type="button" className="casefile__close" onClick={() => ref.current.close()} aria-label="Close case file">
              <FiX aria-hidden="true" />
            </button>
          </header>

          <h2 id="casefile-title" className="casefile__title">
            {item.title}
          </h2>
          <p className="casefile__summary">{item.summary}</p>

          <div className="casefile__body">
            <section>
              <h3 className="label">The problem</h3>
              <p>{item.problem}</p>
            </section>

            <section>
              <h3 className="label">The approach</h3>
              <ol className="casefile__steps">
                {item.approach.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ol>
            </section>

            <section>
              <h3 className="label">Tools</h3>
              <ul className="casefile__tools mono">
                {item.tools.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="label">Evidence</h3>
              <div className="casefile__evidence">
                {item.image ? (
                  <img src={item.image} alt={`Screenshot of ${item.title}`} width="1200" height="675" />
                ) : (
                  item.diagram && <Diagram {...item.diagram} title={`Architecture of ${item.title}`} />
                )}
              </div>
              {!item.image && item.diagram && (
                <p className="casefile__caption mono">
                  Architecture sketch drawn from the repository — no screenshot on file yet.
                </p>
              )}
              <div className="casefile__links">
                {item.demo && (
                  <a className="btn btn--primary btn--sm" href={item.demo} target="_blank" rel="noopener noreferrer">
                    <span>Live demo</span>
                    <span className="btn__icon" aria-hidden="true">
                      <FiArrowUpRight />
                    </span>
                  </a>
                )}
                {(item.repos ?? [{ label: "Source code", href: item.repo }]).map((r) => (
                  <a key={r.href} className="btn btn--secondary btn--sm" href={r.href} target="_blank" rel="noopener noreferrer">
                    <FiGithub aria-hidden="true" />
                    <span>{r.label}</span>
                  </a>
                ))}
              </div>
            </section>

            <section className="casefile__obs">
              <h3 className="label">Observation</h3>
              <p>{item.observation}</p>
            </section>
            <ReviewNote>{item.review}</ReviewNote>
            <Note>
              Every statement in this file was checked against the project's source code. Where something couldn't
              be verified — like why it was built — it's been left out rather than guessed.
            </Note>
          </div>
        </article>
      )}
    </dialog>
  );
}
