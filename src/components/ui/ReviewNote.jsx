/**
 * Shows a "needs review" marker for content that is missing or unverified.
 * Rendered only during development (`npm run dev`), never in production builds.
 */
export default function ReviewNote({ children }) {
  if (!import.meta.env.DEV || !children) return null;
  return (
    <span
      role="note"
      style={{
        display: "inline-block",
        margin: "0.4rem 0",
        padding: "0.2rem 0.5rem",
        border: "1px dashed #ff5b2e",
        borderRadius: 4,
        color: "#ff9a7a",
        fontFamily: "var(--font-mono)",
        fontSize: "0.72rem",
        lineHeight: 1.4,
      }}
    >
      REVIEW · {children}
    </span>
  );
}
