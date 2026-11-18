// Real-browser tests (Playwright, not a repo dependency). Run from a folder where `playwright` is installed:
//   node e2e.mjs <baseUrl> <shotsDir> [chromeExecutable]
// Serves nothing itself: point it at a local static server or a deployment URL.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const base = (process.argv[2] ?? 'http://localhost:8765').replace(/\/$/, '');
const shots = process.argv[3] ?? './shots';
const exe = process.argv[4];
mkdirSync(shots, { recursive: true });

const WIDTHS = [320, 375, 400, 414, 768, 1024, 1280, 1440, 1920];
const PAGES = ['/', '/privacy.html', '/terms.html', '/support.html', '/en/', '/en/privacy.html', '/en/terms.html', '/en/support.html'];
const results = [];
const fails = [];
const check = (name, ok, detail = '') => { results.push({ name, ok, detail }); if (!ok) fails.push(`${name} ${detail}`); };

const browser = await chromium.launch(exe ? { executablePath: exe } : {});
for (const w of WIDTHS) {
  const ctx = await browser.newContext({ viewport: { width: w, height: w < 700 ? 800 : 900 }, deviceScaleFactor: 1, ...(w < 700 ? { isMobile: true, hasTouch: true } : {}) });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => { if (['error', 'warning'].includes(m.type())) errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('requestfailed', (r) => errors.push('requestfailed ' + r.url()));
  page.on('response', (r) => { if (r.status() >= 400 && !r.url().endsWith('/favicon.ico')) errors.push(`HTTP ${r.status()} ${r.url()}`); });
  for (const p of PAGES) {
    errors.length = 0;
    await page.goto(base + p, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.querySelectorAll('.reveal').forEach((e) => e.classList.add('in')));
    const m = await page.evaluate((W) => {
      const de = document.documentElement;
      const h1 = document.querySelector('h1').getBoundingClientRect();
      const wide = [...document.querySelectorAll('body *')].filter((e) => {
        const r = e.getBoundingClientRect();
        return r.width > 0 && r.right > W + 1 && !e.closest('.tbl-wrap, .glow') && !e.classList.contains('glow');
      }).slice(0, 3).map((e) => e.tagName + '.' + e.className);
      const imgsBad = [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src);
      const small = [...document.querySelectorAll('a.btn, .burger, .lang, summary, .search input')].filter((e) => {
        const r = e.getBoundingClientRect();
        return r.width && (r.height < 36);
      }).length;
      return { sw: de.scrollWidth, iw: W, h1r: Math.round(h1.right), h1l: Math.round(h1.left), h1lines: Math.round(h1.height / parseFloat(getComputedStyle(document.querySelector('h1')).lineHeight)), wide, imgsBad, small };
    }, w);
    const tag = `${w}px ${p}`;
    check(`no-hscroll ${tag}`, m.sw <= m.iw, `scrollWidth ${m.sw} > ${m.iw}`);
    check(`h1-in-viewport ${tag}`, m.h1l >= 0 && m.h1r <= m.iw, `h1 ${m.h1l}..${m.h1r} of ${m.iw}`);
    check(`overflow-free ${tag}`, m.wide.length === 0, m.wide.join(','));
    check(`images ${tag}`, m.imgsBad.length === 0, m.imgsBad.join(','));
    check(`tap-targets ${tag}`, m.small === 0, `${m.small} too small`);
    check(`console-clean ${tag}`, errors.length === 0, errors.join(' | '));
    if (p === '/' && [320, 375, 400, 768, 1440, 1920].includes(w)) {
      await page.screenshot({ path: `${shots}/home_${w}.png`, fullPage: true });
      m.h1lines && console.log(`  h1 lines @${w}: ${m.h1lines}`);
    }
    if (['/privacy.html', '/support.html', '/en/'].includes(p) && [400, 1440].includes(w)) await page.screenshot({ path: `${shots}/${p.replace(/\W+/g, '_')}_${w}.png`, fullPage: true });
  }
  await ctx.close();
}

// ---- behaviour (desktop + phone) ----
{
  const ctx = await browser.newContext({ viewport: { width: 375, height: 800 }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  const nav = page.locator('#nav');
  check('mobile nav hidden by default', !(await nav.isVisible()));
  await page.click('.burger');
  check('mobile nav opens', await nav.isVisible());
  check('burger aria-expanded', (await page.getAttribute('.burger', 'aria-expanded')) === 'true');
  await page.keyboard.press('Escape');
  check('mobile nav closes on Esc', !(await nav.isVisible()));
  await ctx.close();
}
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(base + '/support.html', { waitUntil: 'networkidle' });
  const total = await page.locator('.art').count();
  await page.fill('#q', 'marca de agua');
  const vis = await page.locator('.art:not([hidden])').count();
  check('help search filters', vis > 0 && vis < total, `${vis}/${total}`);
  check('help search status', /resultado/.test(await page.textContent('#status')));
  await page.fill('#q', 'zzzxqy');
  check('help search empty state', await page.locator('#empty').isVisible());
  await page.fill('#q', '');
  check('help search reset', (await page.locator('.art:not([hidden])').count()) === total);
  await page.goto(base + '/support.html#cancelar', { waitUntil: 'networkidle' });
  check('help deep link opens article', await page.locator('#cancelar').evaluate((e) => e.open));
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.click('#faq details:first-child summary');
  check('faq accordion opens', await page.locator('#faq details:first-child').evaluate((e) => e.open));
  check('lang switch ES->EN', (await page.getAttribute('.lang', 'href')) === '/en/');
  check('no store badge without real listing', (await page.locator('a[href*="play.google.com"], a[href*="apps.apple.com"]').count()) === 0);
  check('hero primary CTA goes to #how', (await page.getAttribute('.hero-cta .btn-primary', 'href')) === '/#how');
  check('4 plans, one recommended', (await page.locator('.plan').count()) === 4 && (await page.locator('.plan.rec').count()) === 1);
  check('recommended plan is Mensual', /Mensual/.test(await page.textContent('.plan.rec')));
  const fonts = await page.evaluate(async () => { await document.fonts.ready; return ['Bricolage Grotesque', 'JetBrains Mono'].map((f) => document.fonts.check(`16px "${f}"`)); });
  check('both Google Fonts families load', fonts.every(Boolean), JSON.stringify(fonts));
  check('footer has contact email and no company name', /contacto@vyrohd\.com/.test(await page.textContent('.ftr')) && !/CARIBE|gmail/i.test(await page.textContent('.ftr')));
  check('coming-soon label present', /Próximamente/.test(await page.textContent('#downloads')));
  await ctx.close();
}
{
  // no-JS: content must still be fully readable
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  check('no-JS: sections visible', await page.locator('#features .feat').first().isVisible());
  check('no-JS: nav visible', await page.locator('#nav').isVisible());
  await ctx.close();
}
{
  // reduced motion: nothing hidden waiting for an animation
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  const op = await page.locator('#features .feat').first().evaluate((e) => getComputedStyle(e).opacity);
  check('reduced-motion: content visible without animation', op === '1', 'opacity ' + op);
  await ctx.close();
}
await browser.close();

const bad = results.filter((r) => !r.ok);
console.log(`\n${results.length - bad.length}/${results.length} checks passed`);
if (bad.length) { console.log('FAILURES:'); for (const b of bad) console.log(' - ' + b.name + ' ' + b.detail); process.exit(1); }
