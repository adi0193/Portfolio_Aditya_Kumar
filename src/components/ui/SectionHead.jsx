import Reveal from "./Reveal";
import "./SectionHead.css";

/**
 * Editorial section opener. Every section starts with a running "folio"
 * line (label · rule · number), then one of three compositions so sections
 * don't all share the same rhythm:
 *
 *   rail     — a margin annotation on the left, title on the right
 *   numeral  — an oversized section numeral beside the title
 *   split    — title on the left, kicker set against it on the right
 */
export default function SectionHead({ id, no, label, title, kicker, aside, variant = "rail", children }) {
  return (
    <Reveal as="header" className={`shead shead--${variant}`}>
      <p className="folio label">
        <span>{label}</span>
        <span className="folio__rule" aria-hidden="true" />
        <span className="folio__no">
          § <span className="thread">{no}</span>
        </span>
      </p>

      <div className="shead__body">
        {variant === "numeral" && (
          <span className="shead__numeral" aria-hidden="true">
            {no}
          </span>
        )}
        {variant === "rail" && aside && <p className="shead__aside">{aside}</p>}
        <div className="shead__main">
          <h2 id={id} className="shead__title">
            {title}
          </h2>
          {kicker && variant !== "split" && <p className="shead__kicker">{kicker}</p>}
          {children}
        </div>
        {kicker && variant === "split" && <p className="shead__kicker shead__kicker--side">{kicker}</p>}
      </div>
    </Reveal>
  );
}
