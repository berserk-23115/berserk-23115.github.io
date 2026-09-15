import sharp from "sharp";
const lines = Array.from({ length: 75 }, (_, i) => {
  const v = i / 74;
  const d = Array.from({ length: 150 }, (_, j) => {
    const u = (j / 149) * Math.PI * 2;
    const r = 100 + v * 120;
    return `${j ? "L" : "M"}${880 + Math.cos(u) * r * (1 + 0.24 * Math.sin(u * 3 + v * 2))},${315 + Math.sin(u) * r * 0.7 + Math.sin(u * 2 + v * 4) * 64}`;
  }).join(" ");
  return `<path d="${d}Z"/>`;
}).join("");
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#101112"/><g fill="none" stroke="#a8afb9" opacity=".72" transform="rotate(-25 880 315)">${lines}</g><text x="62" y="70" fill="#8194ff" font-size="13" font-family="monospace" letter-spacing="3">COMPUTATIONAL MATTER / PORTFOLIO 2026</text><g fill="#eeede7" font-family="Arial,sans-serif" font-size="126" letter-spacing="-9"><text x="55" y="275">ANUSHK</text><text x="55" y="394">KUMAR<tspan fill="#8194ff">.</tspan></text></g><path d="M62 493H1138" stroke="#343638"/><text x="62" y="542" fill="#a5a6a8" font-family="monospace" font-size="15" letter-spacing="2">AI / SYSTEMS / SECURITY / GPU COMPUTE</text><text x="62" y="584" fill="#eeede7" font-family="Arial" font-size="19">Engineering where the details are the product.</text></svg>`;
await sharp(Buffer.from(svg))
  .png()
  .toFile(new URL("../public/social.png", import.meta.url).pathname);
