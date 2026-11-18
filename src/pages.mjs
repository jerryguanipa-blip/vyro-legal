import cfg from '../site.config.mjs';
import { copy } from './copy.mjs';
import { privacy, terms } from './legal.mjs';
import { help } from './help.mjs';
import { shell, esc, icon, path, abs, fill } from './layout.mjs';

const FEATURE_ICONS = ['hd', 'lock', 'chip', 'split', 'scissors', 'text', 'music', 'mute', 'rec', 'biz', 'chat', 'share'];

// ---- home ---------------------------------------------------------------------------------------
function phone(lang) {
  const c = copy[lang];
  const m = c.mock;
  const dec = lang === 'es' ? '27,9' : '27.9';
  return `<div class="phone-stage">
    <div class="glow" aria-hidden="true"></div>
    <div class="float f1" aria-hidden="true">${icon('lock')}<span>${esc(c.hero.float1)}</span></div>
    <div class="float f2" aria-hidden="true">${icon('hd')}<span>${esc(c.hero.float2)}</span></div>
    <div class="float f3" aria-hidden="true">${icon('split')}<span>${esc(c.hero.float3)}</span></div>
    <figure class="phone-fig">
      <div class="phone" role="img" aria-label="${esc(c.hero.caption)}">
        <div class="phone-btn" aria-hidden="true"></div>
        <div class="screen">
          <div class="cam" aria-hidden="true"></div>
          <div class="app-top"><img src="/assets/logo-96.png" alt="" width="26" height="26"><span>${esc(m.app)}</span></div>
          <div class="tile" aria-hidden="true"><span class="tile-play">${icon('play')}</span><span class="tile-badge">1080 × 1920</span></div>
          <div class="ready"><span class="ready-ck">${icon('check')}</span><div><b>${esc(m.ready)}</b><small>${esc(m.readySub)}</small></div></div>
          <div class="stats">
            <div><small>${esc(m.original)}</small><b>519 MB</b><em>2160 × 3840</em></div>
            <div class="opt"><small>${esc(m.optimized)}</small><b>${dec} MB</b><em>1080 × 1920</em></div>
          </div>
          <div class="banner">${esc(m.banner)}</div>
          <div class="cta">${icon('chat')}<span>${esc(m.cta)}</span></div>
        </div>
      </div>
      <figcaption>${esc(c.hero.caption)}</figcaption>
    </figure>
  </div>`;
}

function storeButtons(lang) {
  const c = copy[lang].downloads;
  const out = [];
  if (cfg.stores.googlePlay.url) out.push(`<a class="store" href="${cfg.stores.googlePlay.url}" rel="noopener">${icon('store')}<span><small>${esc(c.play)}</small></span></a>`);
  else out.push(`<div class="store soon" aria-disabled="true">${icon('store')}<span><b>${esc(c.soon)}</b><small>${esc(c.soonSub)}</small></span></div>`);
  if (cfg.stores.appStore.url) out.push(`<a class="store" href="${cfg.stores.appStore.url}" rel="noopener"><span><small>${esc(c.apple)}</small></span></a>`);
  return out.join('\n');
}

export function home(lang) {
  const c = copy[lang];
  const h = path(lang, 'home');
  const heroCtaHref = `${h}#downloads`;

  const main = `
<section class="hero" aria-labelledby="h1">
  <div class="wrap hero-in">
    <p class="pill"><span class="dot"></span>${esc(c.hero.pill)}</p>
    <h1 id="h1"><span>${esc(c.hero.h1a)}</span> <span class="grad">${esc(c.hero.h1b)}</span></h1>
    <p class="lead">${esc(c.hero.lead)}</p>
    <div class="hero-cta">
      <a class="btn btn-primary" href="${heroCtaHref}">${esc(c.hero.cta1)}${icon('arrow', 'ic ic-sm')}</a>
      <a class="btn btn-ghost" href="${h}#how">${esc(c.hero.cta2)}</a>
    </div>
    <ul class="chips" aria-label="${esc(c.hero.pill)}">${c.hero.chips.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
  </div>
  <div class="wrap">${phone(lang)}</div>
</section>

<section class="sec" id="problem" aria-labelledby="t-problem">
  <div class="wrap">
    <header class="sec-h reveal"><p class="eyebrow">${esc(c.problem.eyebrow)}</p><h2 id="t-problem">${esc(c.problem.h2)}</h2><p class="sub">${esc(c.problem.lead)}</p></header>
    <ol class="flow reveal">
      ${c.problem.steps.map((s, i) => `<li class="flow-i${i === 1 ? ' hi' : ''}"><span class="flow-n">${i + 1}</span><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p></li>`).join('\n      ')}
    </ol>
    <p class="note reveal">${icon('shield', 'ic ic-sm')}<span>${esc(c.problem.note)}</span></p>
  </div>
</section>

<section class="sec alt" id="how" aria-labelledby="t-how">
  <div class="wrap">
    <header class="sec-h reveal"><p class="eyebrow">${esc(c.how.eyebrow)}</p><h2 id="t-how">${esc(c.how.h2)}</h2><p class="sub">${esc(c.how.lead)}</p></header>
    <ol class="steps">
      ${c.how.steps.map((s) => `<li class="step reveal"><span class="step-n">${s.n}</span><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p></li>`).join('\n      ')}
    </ol>
  </div>
</section>

<section class="sec" id="features" aria-labelledby="t-features">
  <div class="wrap">
    <header class="sec-h reveal"><p class="eyebrow">${esc(c.features.eyebrow)}</p><h2 id="t-features">${esc(c.features.h2)}</h2><p class="sub">${esc(c.features.lead)}</p></header>
    <ul class="bento">
      ${c.features.items.map((f, i) => `<li class="card feat reveal${f.w === 2 ? ' w2' : ''}"><span class="ico">${icon(FEATURE_ICONS[i])}</span><h3>${esc(f.t)}</h3><p>${esc(f.d)}</p></li>`).join('\n      ')}
    </ul>
  </div>
</section>

<section class="sec alt" id="compare" aria-labelledby="t-compare">
  <div class="wrap">
    <header class="sec-h reveal"><p class="eyebrow">${esc(c.compare.eyebrow)}</p><h2 id="t-compare">${esc(c.compare.h2)}</h2><p class="sub">${esc(c.compare.lead)}</p></header>
    <div class="cmp card reveal">
      <div class="bars" aria-hidden="true">
        <div class="bar-row"><span>${esc(c.compare.colA)}</span><div class="bar"><i class="full"></i></div><b>519 MB</b></div>
        <div class="bar-row"><span>${esc(c.compare.colB)}</span><div class="bar"><i class="tiny"></i></div><b>${lang === 'es' ? '27,9' : '27.9'} MB</b></div>
      </div>
      <div class="tbl-wrap">
        <table class="tbl">
          <thead><tr><th scope="col"></th><th scope="col">${esc(c.compare.colA)}</th><th scope="col" class="hi">${esc(c.compare.colB)}</th></tr></thead>
          <tbody>${c.compare.rows.map((r) => `<tr><th scope="row">${esc(r[0])}</th><td>${esc(r[1])}</td><td class="hi">${esc(r[2])}</td></tr>`).join('')}</tbody>
        </table>
      </div>
    </div>
    <p class="note reveal">${icon('shield', 'ic ic-sm')}<span>${esc(c.compare.note)}</span></p>
  </div>
</section>

<section class="sec" id="privacy" aria-labelledby="t-privacy">
  <div class="wrap">
    <header class="sec-h reveal"><p class="eyebrow">${esc(c.privacy.eyebrow)}</p><h2 id="t-privacy">${esc(c.privacy.h2)}</h2><p class="sub">${esc(c.privacy.lead)}</p></header>
    <ul class="trio">
      ${c.privacy.cards.map((x, i) => `<li class="card reveal"><span class="ico">${icon(['phone', 'cloud', 'trash'][i])}</span><h3>${esc(x.t)}</h3><p>${esc(x.d)}</p></li>`).join('\n      ')}
    </ul>
    <p class="center reveal"><a class="link" href="${path(lang, 'privacy')}">${esc(c.privacy.link)}${icon('arrow', 'ic ic-sm')}</a></p>
  </div>
</section>

<section class="sec alt" id="plans" aria-labelledby="t-plans">
  <div class="wrap">
    <header class="sec-h reveal"><p class="eyebrow">${esc(c.plans.eyebrow)}</p><h2 id="t-plans">${esc(c.plans.h2)}</h2><p class="sub">${esc(c.plans.lead)}</p></header>
    <div class="plans">
      ${['free', 'pro'].map((k) => {
        const p = c.plans[k];
        return `<article class="card plan reveal${k === 'pro' ? ' pro' : ''}">
        ${p.badge ? `<span class="badge">${esc(p.badge)}</span>` : ''}
        <p class="plan-tag">${esc(p.tag)}</p>
        <h3>${esc(p.name)}</h3>
        <ul>${p.items.map((i) => `<li>${icon('check', 'ic ic-sm')}<span>${esc(i)}</span></li>`).join('')}</ul>
      </article>`;
      }).join('\n      ')}
    </div>
    <p class="fine reveal">${esc(c.plans.fine)}</p>
  </div>
</section>

<section class="sec" id="faq" aria-labelledby="t-faq">
  <div class="wrap narrow">
    <header class="sec-h reveal"><p class="eyebrow">${esc(c.faq.eyebrow)}</p><h2 id="t-faq">${esc(c.faq.h2)}</h2></header>
    <div class="acc reveal">
      ${c.faq.items.map((f) => `<details><summary><span>${esc(f.q)}</span>${icon('arrow', 'ic ic-chev')}</summary><div class="acc-b"><p>${esc(f.a)}</p></div></details>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="sec cta-sec" id="downloads" aria-labelledby="t-dl">
  <div class="wrap">
    <div class="cta-box reveal">
      <p class="eyebrow">${esc(c.downloads.eyebrow)}</p>
      <h2 id="t-dl">${esc(c.downloads.h2)}</h2>
      <p class="sub">${esc(c.downloads.lead)}</p>
      <div class="stores">${storeButtons(lang)}</div>
      <p class="fine">${esc(c.downloads.ios)}</p>
    </div>
    <div class="help-strip reveal">
      <div><h3>${esc(c.contact.h)}</h3><p>${esc(c.contact.p)}</p></div>
      <a class="btn btn-ghost" href="${path(lang, 'support')}">${esc(c.contact.cta)}${icon('arrow', 'ic ic-sm')}</a>
    </div>
  </div>
</section>`;

  const jsonld = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: cfg.brand,
      url: abs(h),
      inLanguage: lang,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: cfg.product,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Android',
      description: c.description,
      url: abs(h),
      author: { '@type': 'Organization', name: cfg.operator },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: c.faq.items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ];
  return shell({ lang, page: 'home', title: c.title, description: c.description, main, jsonld });
}

// ---- legal ----------------------------------------------------------------------------------------
function renderSection(s, lang, n) {
  const paras = (s.p ?? []).map((p) => `<p>${fill(p, lang)}</p>`).join('');
  let block = '';
  if (s.ul) block += `<ul>${s.ul.map((x) => `<li>${fill(x, lang)}</li>`).join('')}</ul>`;
  if (s.table) {
    block += `<div class="tbl-wrap"><table class="tbl"><thead><tr>${s.table.head.map((x) => `<th scope="col">${esc(x)}</th>`).join('')}</tr></thead><tbody>${s.table.rows
      .map((r) => `<tr>${r.map((x, i) => (i === 0 ? `<th scope="row">${esc(x)}</th>` : `<td>${esc(x)}</td>`)).join('')}</tr>`)
      .join('')}</tbody></table></div>`;
  }
  // Lists and tables come first when a section has both; its paragraphs then follow as a closing note.
  const body = block ? block + paras : paras;
  return `<section id="${s.id}" class="doc-s"><h2><span class="num">${n}</span>${esc(s.h)}</h2>${body}</section>`;
}

export function legal(lang, kind) {
  const doc = (kind === 'privacy' ? privacy : terms)[lang];
  const c = copy[lang];
  const date = lang === 'es' ? cfg.legal.dateEs : cfg.legal.dateEn;
  const label = lang === 'es' ? 'Vigente desde' : 'Effective';
  const ver = lang === 'es' ? 'Versión' : 'Version';
  const toc = lang === 'es' ? 'En esta página' : 'On this page';
  const main = `
<article class="wrap doc">
  <header class="doc-h">
    <p class="eyebrow">${esc(label)}: ${esc(date)} · ${esc(ver)} ${cfg.legal.version}</p>
    <h1>${esc(doc.h1)}</h1>
    <p class="sub">${esc(doc.lead)}</p>
  </header>
  <div class="doc-grid">
    <nav class="toc" aria-label="${esc(toc)}"><p class="toc-h">${esc(toc)}</p><ol>${doc.sections.map((s) => `<li><a href="#${s.id}">${esc(s.h)}</a></li>`).join('')}</ol></nav>
    <div class="doc-body">${doc.sections.map((s, i) => renderSection(s, lang, i + 1)).join('\n')}</div>
  </div>
</article>`;
  return shell({
    lang,
    page: kind,
    title: `${doc.h1} | VYRO`,
    description: lang === 'es'
      ? (kind === 'privacy' ? 'Cómo trata VYRO tus datos: qué se queda en tu teléfono, qué se envía temporalmente, durante cuánto tiempo y con qué proveedores.' : 'Términos y condiciones de uso de VYRO HD Video Optimizer: planes, suscripciones, entrega por WhatsApp y responsabilidades.')
      : (kind === 'privacy' ? 'How VYRO handles your data: what stays on your phone, what is sent temporarily, for how long and with which providers.' : 'Terms and conditions for VYRO HD Video Optimizer: plans, subscriptions, WhatsApp delivery and responsibilities.'),
    main,
  });
}

// ---- help center ------------------------------------------------------------------------------------
export function support(lang) {
  const h = help[lang];
  const c = copy[lang];
  const cats = Object.keys(h.cats);
  const art = (a) => {
    const body = a.ol
      ? `<ol>${a.ol.map((x) => `<li>${fill(x, lang)}</li>`).join('')}</ol>`
      : a.a.map((x) => `<p>${fill(x, lang)}</p>`).join('');
    const text = fill([a.q, ...(a.ol ?? a.a)].join(' '), lang).replace(/<[^>]+>/g, ' ');
    return `<details class="art" id="${a.id}" data-cat="${a.cat}" data-text="${esc(text.toLowerCase())}"><summary><span>${esc(a.q)}</span>${icon('arrow', 'ic ic-chev')}</summary><div class="acc-b">${body}</div></details>`;
  };
  const main = `
<section class="wrap help">
  <header class="doc-h">
    <p class="eyebrow">${esc(c.nav.support)}</p>
    <h1>${esc(h.h1)}</h1>
    <p class="sub">${esc(h.lead)}</p>
    <form class="search" role="search" data-one="${esc(h.count[0])}" data-many="${esc(h.count[1])}">
      <label class="sr" for="q">${esc(h.searchLabel)}</label>
      ${icon('search')}
      <input id="q" type="search" placeholder="${esc(h.searchPlaceholder)}" autocomplete="off" spellcheck="false">
    </form>
    <p class="search-status" id="status" role="status" aria-live="polite"></p>
  </header>
  <div class="cat-nav" aria-label="${esc(h.h1)}">${cats.map((k) => `<a href="#cat-${k}">${esc(h.cats[k])}</a>`).join('')}</div>
  <div id="articles">
    ${cats.map((k) => `<section class="cat" id="cat-${k}"><h2>${esc(h.cats[k])}</h2><div class="acc">${h.articles.filter((a) => a.cat === k).map(art).join('')}</div></section>`).join('\n    ')}
  </div>
  <p class="empty" id="empty" hidden>${esc(h.noResults)}</p>
  <div class="help-strip">
    <div><h3>${esc(h.contactH)}</h3><p>${fill(h.contactP, lang)}</p></div>
    <a class="btn btn-primary" href="mailto:${cfg.contactEmail}">${icon('mail', 'ic ic-sm')}${esc(cfg.contactEmail)}</a>
  </div>
</section>`;
  const jsonld = [{
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: h.articles.map((a) => ({ '@type': 'Question', name: a.q, acceptedAnswer: { '@type': 'Answer', text: (a.ol ?? a.a).join(' ').replace(/<[^>]+>/g, '').replaceAll('{email}', cfg.contactEmail).replaceAll('{privacyUrl}', abs(path(lang, 'privacy'))) } })),
  }];
  return shell({
    lang, page: 'support',
    title: `${h.h1} | VYRO`,
    description: lang === 'es'
      ? 'Centro de ayuda de VYRO: cómo usar la app, entrega por WhatsApp, calidad, planes y pagos, privacidad y problemas frecuentes.'
      : 'VYRO help center: how to use the app, WhatsApp delivery, quality, plans and payments, privacy and common issues.',
    main, jsonld,
  });
}

export function notFound() {
  const c = copy.es;
  const main = `<section class="wrap nf"><p class="eyebrow">404</p><h1>${esc(c.notFound.h)}</h1><p class="sub">${esc(c.notFound.p)}</p><p><a class="btn btn-primary" href="/">${esc(c.notFound.back)}</a></p></section>`;
  return shell({ lang: 'es', page: 'home', title: `${c.notFound.h} | VYRO`, description: `${c.notFound.p} Vuelve al inicio de VYRO para encontrar lo que buscas.`, main, noindex: true, canonicalPath: '/', alternates: null });
}
