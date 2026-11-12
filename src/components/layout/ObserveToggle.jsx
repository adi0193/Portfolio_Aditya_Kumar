import { useObservation } from "../../context/ObservationMode";
import "./ObserveToggle.css";

/** Discreet switch for observation mode. */
export default function ObserveToggle({ className = "" }) {
  const { on, toggle } = useObservation();
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={toggle}
      className={`observe ${on ? "is-on" : ""} ${className}`.trim()}
      title="Observation mode reveals extra notes on design and engineering decisions"
    >
      <span className="observe__track" aria-hidden="true">
        <span className="observe__knob" />
      </span>
      <span className="observe__label">Observation mode</span>
    </button>
  );
}
