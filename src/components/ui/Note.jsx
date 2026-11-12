/**
 * An annotation that only appears in observation mode.
 * Use for design decisions, technical notes and honest caveats.
 */
export default function Note({ children, as: Tag = "aside", className = "" }) {
  return (
    <Tag className={`obs obs-note ${className}`.trim()} aria-label="Annotation">
      {children}
    </Tag>
  );
}
