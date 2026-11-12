import Reveal from "./Reveal";
import "./SectionHead.css";

/**
 * Editorial section opener: a numbered mono label on the left rail and a
 * large serif title. `kicker` is a short line under the title.
 */
export default function SectionHead({ id, no, label, title, kicker, children }) {
  return (
    <Reveal as="header" className="shead">
      <p className="shead__meta label">
        <span className="thread">No. {no}</span>
        <span className="shead__rule" aria-hidden="true" />
        <span>{label}</span>
      </p>
      <div className="shead__main">
        <h2 id={id} className="shead__title">
          {title}
        </h2>
        {kicker && <p className="shead__kicker">{kicker}</p>}
        {children}
      </div>
    </Reveal>
  );
}
