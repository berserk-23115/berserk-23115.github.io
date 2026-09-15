/** Deterministic contour drawing: also the first paint and no-WebGL artwork. */
export function CoreArt({ compact = false }: { compact?: boolean }) {
  return (
    <svg
      className="core-art"
      viewBox="0 0 700 700"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={compact ? "core-exit" : "core-metal"}
          x1="150"
          y1="110"
          x2="570"
          y2="580"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="currentColor" stopOpacity=".12" />
          <stop offset=".3" stopColor="currentColor" stopOpacity=".95" />
          <stop offset=".52" stopColor="currentColor" stopOpacity=".3" />
          <stop offset=".7" stopColor="currentColor" stopOpacity=".9" />
          <stop offset="1" stopColor="currentColor" stopOpacity=".06" />
        </linearGradient>
      </defs>
      <g
        transform="rotate(-27 350 350)"
        stroke={`url(#${compact ? "core-exit" : "core-metal"})`}
        strokeWidth="1"
      >
        {Array.from({ length: compact ? 30 : 90 }, (_, i) => {
          const v = i / (compact ? 29 : 89);
          const points = Array.from({ length: 120 }, (_, j) => {
            const u = (j / 119) * Math.PI * 2;
            const r = 105 + v * 120;
            const x =
              350 + Math.cos(u) * r * (1 + 0.24 * Math.sin(u * 3 + v * 2));
            const y =
              350 + Math.sin(u) * r * 0.7 + Math.sin(u * 2 + v * 4) * 64;
            return `${j ? "L" : "M"}${x.toFixed(2)},${y.toFixed(2)}`;
          }).join(" ");
          return <path key={i} d={`${points}Z`} />;
        })}
      </g>
    </svg>
  );
}
