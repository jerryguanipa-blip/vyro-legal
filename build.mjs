// Static site generator. `node build.mjs` writes every page into the repo root (what Vercel serves).
// No dependencies. Generated files are committed so Vercel needs no build step.
import { mkdirSync, writeFileSync, copyFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import cfg from './site.config.mjs';
import { home, legal, support, notFound } from './src/pages.mjs';
import { path, abs } from './src/layout.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const out = (rel, data) => {
  const file = join(root, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, data);
  return rel;
};

const written = [];
const pagesByLang = {
  es: { home: () => home('es'), privacy: () => legal('es', 'privacy'), terms: () => legal('es', 'terms'), support: () => support('es') },
  en: { home: () => home('en'), privacy: () => legal('en', 'privacy'), terms: () => legal('en', 'terms'), support: () => support('en') },
};
for (const lang of ['es', 'en']) {
  for (const [page, render] of Object.entries(pagesByLang[lang])) {
    const p = path(lang, page); // e.g. "/en/privacy.html" or "/en/"
    written.push(out((p.endsWith('/') ? p + 'index.html' : p).slice(1), render()));
  }
}
written.push(out('404.html', notFound()));

// static assets
const staticDir = join(root, 'src', 'static');
for (const f of ['style.css', 'site.js']) {
  mkdirSync(join(root, 'assets'), { recursive: true });
  copyFileSync(join(staticDir, f), join(root, 'assets', f));
  written.push('assets/' + f);
}

// sitemap with hreflang alternates
const pages = ['home', 'privacy', 'terms', 'support'];
const urls = pages
  .flatMap((page) => ['es', 'en'].map((lang) => {
    const loc = abs(path(lang, page));
    return `  <url>
    <loc>${loc}</loc>
    <xhtml:link rel="alternate" hreflang="es" href="${abs(path('es', page))}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${abs(path('en', page))}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(path('es', page))}"/>
    <lastmod>${cfg.legal.isoDate}</lastmod>
  </url>`;
  }))
  .join('\n');
written.push(out('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`));
written.push(out('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n`));
written.push(out('manifest.webmanifest', JSON.stringify({
  name: cfg.product,
  short_name: cfg.brand,
  start_url: '/',
  display: 'browser',
  background_color: '#07080c',
  theme_color: '#07080c',
  icons: [
    { src: '/assets/logo-512.png', sizes: '512x512', type: 'image/png' },
    { src: '/assets/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
  ],
}, null, 2) + '\n'));

for (const a of ['logo-96.png', 'logo-512.png', 'apple-touch-icon.png', 'og.png', 'og-en.png', 'favicon.png']) {
  if (!existsSync(join(root, 'assets', a))) console.warn('missing asset: assets/' + a + ' (run: python tools/make-assets.py)');
}
console.log(`built ${written.length} files for ${cfg.siteUrl}`);
