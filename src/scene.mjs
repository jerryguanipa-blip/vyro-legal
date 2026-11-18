// Illustrative before/after mock-up (NOT a screenshot, NOT a measurement): one vector night-city scene drawn
// once, shown three times with different SVG filters. The "without VYRO" copy is blocky and posterized; the
// "with VYRO" copy is only slightly softened. Deterministic output, so the generated HTML is stable.

function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
const f = (n) => Number(n.toFixed(2));

function scene() {
  const r = rng(20261118);
  const stars = [];
  for (let i = 0; i < 46; i++) stars.push(`<circle cx="${f(r() * 90)}" cy="${f(r() * 52)}" r="${f(0.14 + r() * 0.22)}" fill="#fff" opacity="${f(0.45 + r() * 0.5)}"/>`);
  const buildings = [];
  const windows = [];
  let x = -2;
  while (x < 90) {
    const w = 6 + Math.floor(r() * 5);
    const h = 16 + Math.floor(r() * 24);
    const top = 160 - h;
    buildings.push(`<rect x="${x}" y="${top}" width="${w}" height="${h}"/>`);
    for (let wy = top + 2.4; wy < 156; wy += 3.3) {
      for (let wx = x + 1.3; wx < x + w - 1.6; wx += 2.5) {
        if (r() < 0.5) windows.push(`<rect x="${f(wx)}" y="${f(wy)}" width="1.15" height="1.7"/>`);
      }
    }
    x += w + (r() < 0.4 ? 1 : 0);
  }
  return `<g id="vy-scene">
  <rect width="90" height="160" fill="url(#vy-sky)"/>
  ${stars.join('')}
  <circle cx="45" cy="98" r="22" fill="url(#vy-sun)"/>
  <circle cx="45" cy="98" r="11" fill="#ffe7bd"/>
  <path d="M0 112 L13 95 L25 105 L40 89 L57 108 L71 93 L90 110 V160 H0Z" fill="#1a2a52"/>
  <path d="M0 126 Q22 112 45 124 T90 119 V160H0Z" fill="#0d1631"/>
  <g fill="#070b1a">${buildings.join('')}</g>
  <g fill="#ffd36e">${windows.join('')}</g>
  <path d="M0 30 Q45 46 90 28" fill="none" stroke="#050912" stroke-width="0.4"/>
  <path d="M0 36 Q45 52 90 34" fill="none" stroke="#050912" stroke-width="0.3"/>
  <path d="M8 22 V70 M82 20 V68" stroke="#050912" stroke-width="0.9"/>
</g>`;
}

const defs = () => `<svg class="svg-defs" width="0" height="0" aria-hidden="true" focusable="false">
<defs>
<linearGradient id="vy-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#091430"/><stop offset="0.42" stop-color="#1c4c92"/><stop offset="0.68" stop-color="#ff9650"/><stop offset="1" stop-color="#ffd08a"/></linearGradient>
<radialGradient id="vy-sun"><stop offset="0" stop-color="#ffd9a0" stop-opacity="0.9"/><stop offset="1" stop-color="#ffd9a0" stop-opacity="0"/></radialGradient>
<filter id="vy-raw" filterUnits="userSpaceOnUse" x="0" y="0" width="90" height="160" color-interpolation-filters="sRGB">
<feGaussianBlur stdDeviation="0.35" result="b"/>
<feFlood x="1" y="1" width="1" height="1"/><feComposite width="2.8" height="2.8"/><feTile result="t"/>
<feComposite in="b" in2="t" operator="in"/><feMorphology operator="dilate" radius="1.4"/>
<feComponentTransfer><feFuncR type="discrete" tableValues="0 0.143 0.286 0.429 0.571 0.714 0.857 1"/><feFuncG type="discrete" tableValues="0 0.143 0.286 0.429 0.571 0.714 0.857 1"/><feFuncB type="discrete" tableValues="0 0.143 0.286 0.429 0.571 0.714 0.857 1"/></feComponentTransfer>
</filter>
<filter id="vy-soft" filterUnits="userSpaceOnUse" x="0" y="0" width="90" height="160" color-interpolation-filters="sRGB">
<feGaussianBlur stdDeviation="0.3"/>
<feComponentTransfer><feFuncR type="discrete" tableValues="0 0.043 0.087 0.13 0.174 0.217 0.261 0.304 0.348 0.391 0.435 0.478 0.522 0.565 0.609 0.652 0.696 0.739 0.783 0.826 0.87 0.913 0.957 1"/><feFuncG type="discrete" tableValues="0 0.043 0.087 0.13 0.174 0.217 0.261 0.304 0.348 0.391 0.435 0.478 0.522 0.565 0.609 0.652 0.696 0.739 0.783 0.826 0.87 0.913 0.957 1"/><feFuncB type="discrete" tableValues="0 0.043 0.087 0.13 0.174 0.217 0.261 0.304 0.348 0.391 0.435 0.478 0.522 0.565 0.609 0.652 0.696 0.739 0.783 0.826 0.87 0.913 0.957 1"/></feComponentTransfer>
</filter>
${scene()}
</defs>
</svg>`;

export const sceneDefs = defs();
export const frameSvg = (kind) => {
  const filter = kind === 'raw' ? ' filter="url(#vy-raw)"' : kind === 'soft' ? ' filter="url(#vy-soft)"' : '';
  return `<svg class="shot-svg" viewBox="0 0 90 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><use href="#vy-scene"${filter}/></svg>`;
};
