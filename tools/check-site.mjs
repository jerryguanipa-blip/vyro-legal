// Static integrity checks on the generated site (no browser, no dependencies): `node tools/check-site.mjs`
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import cfg from '../site.config.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pages = ['index.html', 'privacy.html', 'terms.html', 'support.html', 'en/index.html', 'en/privacy.html', 'en/terms.html', 'en/support.html', '404.html'];
const fails = [];
const fail = (page, msg) => fails.push(`${page}: ${msg}`);
const read = (p) => readFileSync(join(root, p), 'utf8');
const toUrl = (rel) => '/' + rel.replace(/index\.html$/, '');

const html = Object.fromEntries(pages.map((p) => [p, read(p)]));
const ids = Object.fromEntries(pages.map((p) => [toUrl(p), new Set([...html[p].matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]))]));

for (const [page, h] of Object.entries(html)) {
  const url = toUrl(page);
  const title = h.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
  const desc = h.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
  if (!title || title.length > 70) fail(page, `title length ${title.length}`);
  if (!desc || desc.length < 50 || desc.length > 175) fail(page, `description length ${desc.length}`);
  if ((h.match(/<h1[\s>]/g) ?? []).length !== 1) fail(page, 'must have exactly one <h1>');
  if (!/<link rel="canonical" href="https:\/\/[^"]+">/.test(h)) fail(page, 'canonical missing');
  if (/\{email\}|\{privacyUrl\}|undefined|\[object/.test(h)) fail(page, 'unreplaced placeholder / undefined');
  if (/\sstyle="/.test(h)) fail(page, 'inline style attribute (blocked by CSP)');
  if (/\son[a-z]+="/.test(h)) fail(page, 'inline event handler (blocked by CSP)');
  if (/<script(?![^>]*(src=|type="application\/ld\+json"))/.test(h)) fail(page, 'inline script (blocked by CSP)');
  if (/<style[\s>]/.test(h)) fail(page, '<style> block (blocked by CSP)');
  if (page !== '404.html') {
    for (const lang of ['es', 'en', 'x-default']) if (!h.includes(`hreflang="${lang}"`)) fail(page, `hreflang ${lang} missing`);
    const alt = h.match(/hreflang="es" href="([^"]+)"/)?.[1];
    if (alt && !existsSync(join(root, alt.replace(cfg.siteUrl, '').replace(/\/$/, '/index.html').slice(1)))) fail(page, `hreflang target missing: ${alt}`);
  } else if (!h.includes('noindex')) fail(page, '404 should be noindex');
  for (const m of h.matchAll(/<img [^>]*>/g)) if (!/ alt="/.test(m[0])) fail(page, 'img without alt');
  for (const m of h.matchAll(/<svg [^>]*>/g)) if (!/aria-hidden="true"/.test(m[0])) fail(page, 'svg without aria-hidden');

  // internal links / assets
  for (const m of h.matchAll(/(?:href|src)="([^"#][^"]*|#[^"]*)"/g)) {
    let ref = m[1];
    if (/^(https?:|mailto:|data:)/.test(ref)) continue;
    const [p, frag] = ref.split('#');
    const target = p === '' ? url : p;
    const file = target.endsWith('/') ? target + 'index.html' : target;
    if (!existsSync(join(root, file.slice(1)))) fail(page, `broken link ${ref}`);
    else if (frag && file.endsWith('.html') && !(ids[target.endsWith('/') ? target : target] ?? ids[toUrl(file.slice(1))])?.has(frag)) fail(page, `missing anchor ${ref}`);
  }
  // no hard-coded prices anywhere
  if (/(S\/\s?\d|USD|\$\s?\d|€\s?\d)/.test(h)) fail(page, 'price-looking text found (prices must come from Google Play only)');
  // no store badge unless a real URL is configured
  if (!cfg.stores.googlePlay.url && /play\.google\.com/.test(h)) fail(page, 'Google Play link without a configured listing');
  if (!cfg.stores.appStore.url && /apps\.apple\.com/.test(h)) fail(page, 'App Store link without a configured listing');
}

// sitemap: every indexable page, with alternates
const sm = read('sitemap.xml');
for (const p of pages.filter((x) => x !== '404.html')) if (!sm.includes(`<loc>${cfg.siteUrl}${toUrl(p)}</loc>`)) fail('sitemap.xml', `missing ${toUrl(p)}`);
if (!read('robots.txt').includes(`${cfg.siteUrl}/sitemap.xml`)) fail('robots.txt', 'sitemap line missing');

// legal: ES and EN carry the same sections
for (const doc of ['privacy.html', 'terms.html']) {
  const sec = (p) => [...html[p].matchAll(/<section id="([^"]+)" class="doc-s"/g)].map((m) => m[1]).join(',');
  if (sec(doc) !== sec('en/' + doc)) fail(doc, 'ES/EN section ids differ');
}
const nPriv = [...html['privacy.html'].matchAll(/class="doc-s"/g)].length;
if (nPriv < 24) fail('privacy.html', `only ${nPriv} sections (24 required)`);

if (fails.length) {
  console.error(`✖ ${fails.length} problem(s):\n` + fails.map((f) => '  - ' + f).join('\n'));
  process.exit(1);
}
console.log(`✔ ${pages.length} pages checked: links, anchors, hreflang, metadata, CSP-safety, prices/stores, legal parity`);
