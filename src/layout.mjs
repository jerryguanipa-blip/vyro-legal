import cfg from '../site.config.mjs';
import { copy } from './copy.mjs';

export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---- URLs -------------------------------------------------------------------------------------
const PAGES = { home: '', privacy: 'privacy.html', terms: 'terms.html', support: 'support.html' };

export function path(lang, page) {
  const base = lang === 'en' ? '/en/' : '/';
  return base + PAGES[page];
}
export const abs = (p) => cfg.siteUrl + p;
export const other = (lang) => (lang === 'es' ? 'en' : 'es');

// {email} / {privacyUrl} placeholders used by the legal + help sources
export function fill(html, lang) {
  return html.replaceAll('{email}', cfg.contactEmail).replaceAll('{privacyUrl}', path(lang, 'privacy'));
}

// ---- icons ------------------------------------------------------------------------------------
const ICONS = {
  hd: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M8 9v6M12 9v6M8 12h4M15 9v6h1.6a2.2 2.2 0 0 0 0-6z"/>',
  lock: '<rect x="5" y="11" width="14" height="9" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  chip: '<rect x="7" y="7" width="10" height="10" rx="2"/><path d="M10 3v3M14 3v3M10 18v3M14 18v3M3 10h3M3 14h3M18 10h3M18 14h3"/>',
  split: '<rect x="3" y="6" width="8" height="12" rx="2"/><rect x="13" y="6" width="8" height="12" rx="2"/>',
  scissors: '<circle cx="6" cy="7" r="2.5"/><circle cx="6" cy="17" r="2.5"/><path d="M8 8.5 20 18M8 15.5 20 6"/>',
  text: '<path d="M5 6h14M12 6v13M9 19h6"/>',
  music: '<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>',
  mute: '<path d="M4 10v4h3.5L12 18V6L7.5 10zM16 9.5l4 5M20 9.5l-4 5"/>',
  rec: '<rect x="4" y="7" width="12" height="10" rx="2.5"/><path d="m16 11 4-2.5v7L16 13"/>',
  biz: '<path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-4 4v-4h0A2.5 2.5 0 0 1 4 13.5z"/><path d="M8.5 9h7M8.5 12h4"/>',
  chat: '<path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-4 4v-4A2.5 2.5 0 0 1 4 13.5z"/><path d="m9 10 2 2 4-4"/>',
  share: '<circle cx="6" cy="12" r="2.5"/><circle cx="17" cy="6" r="2.5"/><circle cx="17" cy="18" r="2.5"/><path d="m8.2 10.8 6.6-3.6M8.2 13.2l6.6 3.6"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  play: '<path d="M8 5.5v13l11-6.5z"/>',
  phone: '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
  shield: '<path d="M12 3 5 6v5.5c0 4.2 2.8 7.6 7 9.5 4.2-1.9 7-5.3 7-9.5V6z"/><path d="m9 12 2.2 2.2L15.5 10"/>',
  cloud: '<path d="M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 10a4 4 0 0 1-.5 8z"/>',
  trash: '<path d="M5 7h14M10 7V4.5h4V7M7 7l1 13h8l1-13M10 11v6M14 11v6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
  mail: '<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="m4 8 8 5.5L20 8"/>',
  store: '<path d="M5 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 5 4.5z"/>',
};
export const icon = (name, cls = 'ic') =>
  `<svg class="${cls}" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name]}</svg>`;

// ---- shell ------------------------------------------------------------------------------------
export function shell({ lang, page, title, description, bodyClass = '', main, jsonld = [], noindex = false, canonicalPath, alternates, ogImage }) {
  const c = copy[lang];
  const canon = abs(canonicalPath ?? path(lang, page));
  const home = path(lang, 'home');
  const anchor = (id) => `${home}#${id}`;
  const nav = [
    ['home', c.nav.home, home],
    ['how', c.nav.how, anchor('how')],
    ['features', c.nav.features, anchor('features')],
    ['compare', c.nav.compare, anchor('compare')],
    ['plans', c.nav.plans, anchor('plans')],
    ['faq', c.nav.faq, anchor('faq')],
    ['support', c.nav.support, path(lang, 'support')],
    ['downloads', c.nav.downloads, anchor('downloads')],
  ];
  const og = ogImage ?? (lang === 'en' ? '/assets/og-en.png' : '/assets/og.png');
  const alts = alternates === undefined
    ? { es: abs(path('es', page)), en: abs(path('en', page)) }
    : alternates;
  const hreflang = alts
    ? `<link rel="alternate" hreflang="es" href="${alts.es}">\n<link rel="alternate" hreflang="en" href="${alts.en}">\n<link rel="alternate" hreflang="x-default" href="${alts.es}">`
    : '';
  const switchHref = alts ? (lang === 'es' ? path('en', page) : path('es', page)) : path(other(lang), 'home');
  const ld = jsonld.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n');

  return `<!doctype html>
<html lang="${c.htmlLang}" data-page="${page}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#07080c">
<meta name="color-scheme" content="dark">
${noindex ? '<meta name="robots" content="noindex">' : ''}
<link rel="canonical" href="${canon}">
${hreflang}
<link rel="icon" type="image/png" href="/assets/favicon.png">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${cfg.brand}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canon}">
<meta property="og:locale" content="${c.locale}">
<meta property="og:image" content="${abs(og)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(c.title)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${abs(og)}">
<link rel="stylesheet" href="/assets/style.css">
${ld}
</head>
<body class="${bodyClass}">
<a class="skip" href="#main">${esc(c.skip)}</a>
<header class="hdr" id="top">
  <div class="wrap hdr-in">
    <a class="brand" href="${home}" aria-label="${cfg.brand}"><img src="/assets/logo-96.png" alt="" width="36" height="36"><span>VYRO</span></a>
    <nav class="nav" id="nav" aria-label="${esc(c.nav.menu)}">
      ${nav.map(([k, label, href]) => `<a href="${href}"${k === page || (k === 'home' && page === 'home') ? ' aria-current="page"' : ''}>${esc(label)}</a>`).join('\n      ')}
    </nav>
    <div class="hdr-tools">
      <a class="lang" href="${switchHref}" hreflang="${other(lang)}" lang="${other(lang)}" title="${esc(c.langSwitch.title)}" aria-label="${esc(c.langSwitch.title)}">${c.langSwitch.short}</a>
      <button class="burger" type="button" aria-controls="nav" aria-expanded="false" aria-label="${esc(c.nav.menu)}" data-open="${esc(c.nav.menu)}" data-close="${esc(c.nav.close)}">${icon('menu', 'ic ic-open')}${icon('close', 'ic ic-close')}</button>
    </div>
  </div>
</header>
<main id="main">
${main}
</main>
${footer(lang)}
<script src="/assets/site.js" defer></script>
</body>
</html>
`;
}

function footer(lang) {
  const c = copy[lang];
  const f = c.footer;
  const home = path(lang, 'home');
  return `<footer class="ftr">
  <div class="wrap">
    <div class="ftr-grid">
      <div class="ftr-brand">
        <a class="brand" href="${home}"><img src="/assets/logo-96.png" alt="" width="36" height="36"><span>VYRO</span></a>
        <p>${esc(cfg.product)}</p>
        <p class="muted">${esc(f.by)} ${esc(cfg.operator)}</p>
      </div>
      <div>
        <h2 class="ftr-h">${esc(f.product)}</h2>
        <ul>
          <li><a href="${home}#how">${esc(c.nav.how)}</a></li>
          <li><a href="${home}#features">${esc(c.nav.features)}</a></li>
          <li><a href="${home}#plans">${esc(c.nav.plans)}</a></li>
          <li><a href="${home}#downloads">${esc(c.nav.downloads)}</a></li>
        </ul>
      </div>
      <div>
        <h2 class="ftr-h">${esc(f.legal)}</h2>
        <ul>
          <li><a href="${path(lang, 'privacy')}">${esc(f.privacy)}</a></li>
          <li><a href="${path(lang, 'terms')}">${esc(f.terms)}</a></li>
          <li><a href="${path(lang, 'support')}">${esc(f.support)}</a></li>
        </ul>
      </div>
      <div>
        <h2 class="ftr-h">${esc(f.contact)}</h2>
        <ul>
          <li><a href="mailto:${cfg.contactEmail}">${esc(cfg.contactEmail)}</a></li>
        </ul>
      </div>
    </div>
    <p class="ftr-note">${esc(f.disclaimer)}</p>
    <p class="ftr-copy">© ${new Date().getFullYear()} ${esc(cfg.operator)}. ${esc(f.rights)}</p>
  </div>
</footer>`;
}
