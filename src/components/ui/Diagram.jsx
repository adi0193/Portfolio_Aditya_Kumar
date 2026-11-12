import "./Diagram.css";

const COL_W = 210;
const ROW_H = 96;
const NODE_W = 160;
const NODE_H = 56;
const PAD = 12;

/**
 * Small architecture sketch drawn from {nodes, edges} data.
 * Each node has a grid position (col, row); edges are [fromId, toId].
 */
export default function Diagram({ nodes, edges = [], title }) {
  const cols = Math.max(...nodes.map((n) => n.col)) + 1;
  const rows = Math.max(1, Math.ceil(Math.max(...nodes.map((n) => n.row)) + 1));
  const width = (cols - 1) * COL_W + NODE_W + PAD * 2;
  const height = (rows - 1) * ROW_H + NODE_H + PAD * 2;

  const pos = Object.fromEntries(
    nodes.map((n) => [n.id, { x: PAD + n.col * COL_W, y: PAD + n.row * ROW_H }])
  );

  return (
    <figure className="diagram">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={title}>
        <defs>
          <marker id="arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" className="diagram__arrow" />
          </marker>
        </defs>
        {edges.map(([from, to]) => {
          const a = pos[from];
          const b = pos[to];
          const x1 = a.x + NODE_W;
          const y1 = a.y + NODE_H / 2;
          const x2 = b.x - 4;
          const y2 = b.y + NODE_H / 2;
          const mx = (x1 + x2) / 2;
          return (
            <path
              key={`${from}-${to}`}
              d={`M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`}
              className="diagram__edge"
              markerEnd="url(#arrow)"
            />
          );
        })}
        {nodes.map((n, i) => {
          const p = pos[n.id];
          return (
            <g key={n.id} className="diagram__node" style={{ "--i": i }}>
              <rect x={p.x} y={p.y} width={NODE_W} height={NODE_H} rx="8" />
              <text x={p.x + 14} y={p.y + 24} className="diagram__label">
                {n.label}
              </text>
              <text x={p.x + 14} y={p.y + 42} className="diagram__sub">
                {n.sub}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
