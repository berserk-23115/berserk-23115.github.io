export function ProjectArt({ mode }: { mode: string }) {
  return (
    <svg
      className={`project-art art-${mode}`}
      viewBox="0 0 900 540"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={`metal-${mode}`}
          x1="150"
          y1="70"
          x2="750"
          y2="470"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="currentColor" stopOpacity=".1" />
          <stop offset=".42" stopColor="currentColor" stopOpacity=".95" />
          <stop offset="1" stopColor="currentColor" stopOpacity=".15" />
        </linearGradient>
      </defs>
      <g stroke={`url(#metal-${mode})`} strokeWidth="1">
        {mode === "signal" &&
          Array.from({ length: 65 }, (_, i) => (
            <path
              key={i}
              d={Array.from({ length: 160 }, (_, j) => {
                const x = 80 + j * 4.7;
                const y =
                  125 +
                  i * 4.4 +
                  Math.sin(j * 0.04 + i * 0.045) *
                    Math.exp(-Math.pow((j - 80) / 42, 2)) *
                    100 *
                    Math.sin(i * 0.06);
                return `${j ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`;
              }).join(" ")}
            />
          ))}
        {mode === "layers" &&
          Array.from({ length: 22 }, (_, i) => (
            <path
              className="layer-path"
              key={i}
              d={`M ${215 + i * 5} ${118 + i * 8} L ${565 + i * 5} ${72 + i * 8} L ${710 - i * 3} ${225 + i * 8} L ${360 - i * 3} ${285 + i * 8} Z`}
            />
          ))}
        {mode === "lanes" &&
          Array.from({ length: 60 }, (_, i) => (
            <path
              key={i}
              d={`M ${100 + i * 11} 105 C ${90 + i * 11} 180, ${280 + i * 7} 180, ${200 + i * 9} 270 S ${170 + i * 9} 380, ${240 + i * 9} 430`}
            />
          ))}
        {mode === "paths" &&
          Array.from({ length: 24 }, (_, i) => (
            <path
              key={i}
              d={`M 90 ${95 + i * 15} H ${200 + i * 11} V ${160 + i * 7} H ${440 + i * 4} V ${330 - i * 6} H ${650 + i * 6} V ${100 + i * 15} H 810`}
            />
          ))}
      </g>
      <g stroke="currentColor" opacity=".15">
        <path d="M40 270H860M450 40V500" strokeDasharray="2 8" />
        <path d="M40 55V40H55M845 40H860V55M40 485V500H55M845 500H860V485" />
      </g>
    </svg>
  );
}
