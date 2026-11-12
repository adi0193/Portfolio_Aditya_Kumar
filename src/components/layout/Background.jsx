import "./Background.css";

/** Fixed, decorative backdrop: a faint grid plus one slowly drifting warm light. */
export default function Background() {
  return (
    <div className="bg" aria-hidden="true">
      <div className="bg__grid" />
      <div className="bg__light" />
      <div className="bg__grain" />
    </div>
  );
}
