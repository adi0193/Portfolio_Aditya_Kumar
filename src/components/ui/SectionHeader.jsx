import Reveal from "./Reveal";
import "./SectionHeader.css";

/**
 * Editorial section header: an index number + label on the left rail,
 * title (and optional intro) on the right.
 */
export default function SectionHeader({ index, label, title, intro, id }) {
  return (
    <Reveal as="header" className="section-header">
      <p className="section-header__meta mono">
        <span className="section-header__index">{index}</span>
        <span aria-hidden="true" className="section-header__rule" />
        <span>{label}</span>
      </p>
      <div>
        <h2 id={id} className="section-header__title">
          {title}
        </h2>
        {intro && <p className="section-header__intro">{intro}</p>}
      </div>
    </Reveal>
  );
}
