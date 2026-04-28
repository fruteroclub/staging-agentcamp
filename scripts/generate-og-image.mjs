import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const publicDir = path.join(repoRoot, "public");
const svgPath = path.join(publicDir, "og-image-v2.svg");
const pngPath = path.join(publicDir, "og-image-v2.png");

mkdirSync(publicDir, { recursive: true });

const svg = String.raw`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-labelledby="title desc">
  <title id="title">AgentCamp social card</title>
  <desc id="desc">Promotional social image for AgentCamp Cohort 1 starting May 11, 2026.</desc>
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1c1c1e" />
      <stop offset="100%" stop-color="#242427" />
    </linearGradient>
    <linearGradient id="pinkGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e91e8c" stop-opacity="0.95" />
      <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0.8" />
    </linearGradient>
    <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffb800" stop-opacity="0.24" />
      <stop offset="100%" stop-color="#ffb800" stop-opacity="0" />
    </radialGradient>
    <filter id="blur-xl">
      <feGaussianBlur stdDeviation="48" />
    </filter>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)" />
  <circle cx="1025" cy="145" r="180" fill="url(#pinkGlow)" filter="url(#blur-xl)" opacity="0.42" />
  <circle cx="970" cy="475" r="210" fill="url(#goldGlow)" />
  <circle cx="118" cy="548" r="120" fill="#8b5cf6" opacity="0.1" />

  <rect x="72" y="60" width="154" height="38" rx="19" fill="rgba(255,184,0,0.15)" stroke="rgba(255,184,0,0.4)" />
  <text x="149" y="84" text-anchor="middle" font-family="'Plus Jakarta Sans', 'Avenir Next', 'Helvetica Neue', Arial, sans-serif" font-size="18" font-weight="600" letter-spacing="2.6" fill="#ffb800">AGENTCAMP</text>

  <text x="72" y="178" font-family="'Plus Jakarta Sans', 'Avenir Next', 'Helvetica Neue', Arial, sans-serif" font-size="88" font-weight="800" letter-spacing="-2.8" fill="#f8f8f8">Deja de</text>
  <text x="72" y="268" font-family="'Plus Jakarta Sans', 'Avenir Next', 'Helvetica Neue', Arial, sans-serif" font-size="88" font-weight="800" letter-spacing="-2.8" fill="#f8f8f8">experimentar con IA.</text>
  <text x="72" y="366" font-family="Georgia, 'Times New Roman', serif" font-size="82" font-style="italic" font-weight="700" fill="#e91e8c">Empieza a operar</text>
  <text x="72" y="446" font-family="Georgia, 'Times New Roman', serif" font-size="82" font-style="italic" font-weight="700" fill="#e91e8c">con agentes.</text>

  <text x="74" y="507" font-family="'Plus Jakarta Sans', 'Avenir Next', 'Helvetica Neue', Arial, sans-serif" font-size="28" font-weight="500" fill="#e8e8e8">Programa práctico de 5 semanas · Cohorte 1 · Inicia 11 mayo 2026</text>

  <g transform="translate(72 548)">
    <rect width="432" height="52" rx="26" fill="#2a2a2e" stroke="#38383c" />
    <circle cx="31" cy="26" r="7" fill="#ffb800" />
    <text x="52" y="33" font-family="'Plus Jakarta Sans', 'Avenir Next', 'Helvetica Neue', Arial, sans-serif" font-size="22" font-weight="600" fill="#f8f8f8">Early bird $5,000 MXN / $300 USD</text>
  </g>

  <g transform="translate(520 548)">
    <rect width="404" height="52" rx="26" fill="#2a2a2e" stroke="#38383c" />
    <circle cx="31" cy="26" r="7" fill="#e91e8c" />
    <text x="52" y="33" font-family="'Plus Jakarta Sans', 'Avenir Next', 'Helvetica Neue', Arial, sans-serif" font-size="22" font-weight="600" fill="#f8f8f8">Regular $7,500 MXN / $450 USD</text>
  </g>

  <g transform="translate(918 96)">
    <rect width="206" height="174" rx="24" fill="rgba(42,42,46,0.74)" stroke="rgba(255,255,255,0.08)" />
    <text x="26" y="56" font-family="'Plus Jakarta Sans', 'Avenir Next', 'Helvetica Neue', Arial, sans-serif" font-size="18" font-weight="600" fill="#ffb800">WHAT YOU BUILD</text>
    <text x="26" y="92" font-family="'Plus Jakarta Sans', 'Avenir Next', 'Helvetica Neue', Arial, sans-serif" font-size="24" font-weight="700" fill="#f8f8f8">Memoria</text>
    <text x="26" y="120" font-family="'Plus Jakarta Sans', 'Avenir Next', 'Helvetica Neue', Arial, sans-serif" font-size="24" font-weight="700" fill="#f8f8f8">Integraciones</text>
    <text x="26" y="148" font-family="'Plus Jakarta Sans', 'Avenir Next', 'Helvetica Neue', Arial, sans-serif" font-size="24" font-weight="700" fill="#f8f8f8">Pagos · Reputación</text>
  </g>

  <text x="946" y="574" font-family="'Plus Jakarta Sans', 'Avenir Next', 'Helvetica Neue', Arial, sans-serif" font-size="20" font-weight="500" fill="#888888">www.agentcamp.xyz</text>
</svg>
`;

writeFileSync(svgPath, svg);

execFileSync("sips", ["-s", "format", "png", svgPath, "--out", pngPath], {
  stdio: "inherit",
});

console.log(`Generated ${path.relative(repoRoot, svgPath)}`);
console.log(`Generated ${path.relative(repoRoot, pngPath)}`);
