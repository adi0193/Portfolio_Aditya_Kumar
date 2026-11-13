import { useMemo, useRef } from "react";

const N = 7;
const GAP = 40;
const PAD = 20;
// The "pattern" the thread finds among the dots: [col, row]
const PATH = [
  [0, 5],
  [1, 3],
  [3, 4],
  [4, 1],
  [6, 2],
];

/**
 * A field of dots with one burgundy thread connecting a few of them —
 * signal found in noise. Dots near the pointer lift slightly.
 */
export default function PatternFigure() {
  const svgRef = useRef(null);
  const size = PAD * 2 + GAP * (N - 1);
  const dots = useMemo(() => {
    const onPath = new Set(PATH.map(([c, r]) => `${c}-${r}`));
    const out = [];
    for (let r = 0; r < N; r++)
      for (let c = 0; c < N; c++) out.push({ c, r, key: `${c}-${r}`, hit: onPath.has(`${c}-${r}`) });
    return out;
  }, []);
  const d = PATH.map(([c, r], i) => `${i ? "L" : "M"}${PAD + c * GAP},${PAD + r * GAP}`).join(" ");

  const onMove = (e) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const scale = size / rect.width;
    const px = (e.clientX - rect.left) * scale;
    const py = (e.clientY - rect.top) * scale;
    svg.querySelectorAll("circle[data-c]").forEach((el) => {
      const dx = PAD + +el.dataset.c * GAP - px;
      const dy = PAD + +el.dataset.r * GAP - py;
      const near = Math.max(0, 1 - Math.hypot(dx, dy) / 90);
      el.style.setProperty("--near", near.toFixed(2));
    });
  };
  const onLeave = () => svgRef.current?.querySelectorAll("circle[data-c]").forEach((el) => el.style.setProperty("--near", 0));

  return (
    <figure className="pattern">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${size} ${size}`}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        role="img"
        aria-label="A grid of dots with a red thread connecting five of them"
      >
        <path d={d} className="pattern__thread" pathLength="1" />
        {dots.map((p) => (
          <circle
            key={p.key}
            data-c={p.c}
            data-r={p.r}
            cx={PAD + p.c * GAP}
            cy={PAD + p.r * GAP}
            r={p.hit ? 4 : 2}
            className={p.hit ? "pattern__dot pattern__dot--hit" : "pattern__dot"}
          />
        ))}
      </svg>
      <figcaption className="label">Fig. 1 — Signal, found in noise.</figcaption>
    </figure>
  );
}
