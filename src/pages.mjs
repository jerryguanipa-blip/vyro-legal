import cfg from '../site.config.mjs';
import { copy } from './copy.mjs';
import { privacy, terms } from './legal.mjs';
import { help } from './help.mjs';
import { shell, esc, icon, path, abs, fill } from './layout.mjs';
import { sceneDefs, frameSvg } from './scene.mjs';

// ---- home ---------------------------------------------------------------------------------------
function storeButtons(lang) {
  const c = copy[lang].downloads;
  const out = [];
  if (cfg.stores.googlePlay.url) out.push(`<a class="store" href="${cfg.stores.googlePlay.url}" rel="noopener">${icon('store')}<span><b>${esc(c.play)}</b></span></a>`);
  else out.push(`<div class="store soon" aria-disabled="true">${icon('store')}<span><b>${esc(c.soon)}</b><small>${esc(c.soonSub)}</small></span></div>`);
  if (cfg.stores.appStore.url) out.push(`<a class="store" href="${cfg.stores.appStore.url}" rel="noopener"><span><b>${esc(c.apple)}</b></span></a>`);
  return out.join('\n');
}

const head = (id, eyebrow, h2, lead) =>
  `<header class="sec-h reveal"><p class="eyebrow">${esc(eyebrow)}</p><h2 id="t-${id}">${esc(h2)}</h2>${lead ? `<p class="sub">${esc(lead)}</p>` : ''}</header>`;

export function home(lang) {
  const c = copy[lang];
  const h = path(lang, 'home');

  const main = `
<section class="hero" aria-labelledby="h1">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="eyebrow"><span class="tick" aria-hidden="true"></span>${esc(c.hero.eyebrow)}</p>
      <h1 id="h1"><span>${esc(c.hero.h1a)}</span> <span class="acc">${esc(c.hero.h1b)}</span></h1>
      <p class="thesis">${esc(c.hero.thesis)}</p>
      <div class="hero-cta">
        <a class="btn btn-primary" href="${h}#how">${esc(c.hero.cta1)}${icon('arrow', 'ic ic-sm')}</a>
        <a class="btn btn-ghost" href="${h}#plans">${esc(c.hero.cta2)}</a>
      </div>
      <ul class="chips">${c.hero.chips.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
    </div>
    <div class="readout" role="group" aria-label="${esc(c.readout.aria)}">
      <p class="ro-label"><span>${esc(c.readout.label)}</span><span>${esc(c.readout.device)}</span></p>
      <p class="ro-big"><span class="ro-from">${esc(c.readout.from)}</span><span class="ro-arrow" aria-hidden="true">→</span><span class="ro-to">${esc(c.readout.to)}</span></p>
      <div class="ro-bar" aria-hidden="true"><i></i></div>
      <p class="ro-foot">${esc(c.readout.foot)}</p>
      <dl class="ro-rows">${c.readout.rows.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
    </div>
  </div>
</section>

<section class="sec" id="contrast" aria-labelledby="t-contrast">
  <div class="wrap">
    ${head('contrast', c.contrast.eyebrow, c.contrast.h2, c.contrast.lead)}
    ${sceneDefs}
    <div class="strip reveal" role="group" aria-label="${esc(c.contrast.alt)}">
      ${c.contrast.frames.map((f, i) => `<figure class="frame${i === 2 ? ' win' : ''}">
        <div class="shot"><span class="ill mono">${lang === 'es' ? 'ILUSTRATIVO' : 'ILLUSTRATIVE'}</span>${frameSvg(['orig', 'raw', 'soft'][i])}</div>
        <figcaption><b>${esc(f.t)}</b><span class="mono">${esc(f.m)}</span><span class="d">${esc(f.d)}</span></figcaption>
      </figure>`).join('\n      ')}
    </div>
    <p class="fine reveal">${esc(c.contrast.label)}</p>
  </div>
</section>

<section class="sec" id="how" aria-labelledby="t-how">
  <div class="wrap how-grid">
    <div class="how-intro">${head('how', c.how.eyebrow, c.how.h2, c.how.lead)}</div>
    <div class="how-body">
      <ol class="steps">
        ${c.how.steps.map((s, i) => `<li class="step reveal${i === 2 ? ' key' : ''}"><span class="step-n mono">${s.n}</span><div><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p></div></li>`).join('\n        ')}
      </ol>
      <aside class="why reveal"><h3>${esc(c.how.whyH)}</h3><p>${esc(c.how.why)}</p></aside>
    </div>
  </div>
</section>

<section class="sec" id="features" aria-labelledby="t-features">
  <div class="wrap">
    ${head('features', c.features.eyebrow, c.features.h2)}
    <ul class="feats">
      ${c.features.items.map((f) => `<li class="feat reveal"><span class="tag mono">${esc(f.tag)}</span><h3>${esc(f.t)}</h3><p>${esc(f.d)}</p></li>`).join('\n      ')}
    </ul>
    <p class="more reveal">${esc(c.features.more)} <a class="link" href="${path(lang, 'privacy')}">${esc(c.features.moreLink)}${icon('arrow', 'ic ic-sm')}</a></p>
  </div>
</section>

<section class="sec" id="proof" aria-labelledby="t-proof">
  <div class="wrap">
    ${head('proof', c.proof.eyebrow, c.proof.h2, c.proof.lead)}
    <ul class="bigstats reveal">${c.proof.stats.map((x) => `<li><b class="mono">${esc(x.v)}</b><span>${esc(x.l)}</span></li>`).join('')}</ul>
    <div class="tbl-wrap reveal">
      <table class="tbl proof-tbl">
        <thead><tr><th scope="col"><span class="sr">${esc(c.proof.eyebrow)}</span></th><th scope="col">${esc(c.proof.colA)}</th><th scope="col" class="hi">${esc(c.proof.colB)}</th></tr></thead>
        <tbody>${c.proof.rows.map((r) => `<tr><th scope="row">${esc(r[0])}</th><td class="mono">${esc(r[1])}</td><td class="mono hi">${esc(r[2])}</td></tr>`).join('')}</tbody>
      </table>
    </div>
    <p class="fine reveal">${esc(c.proof.note)}</p>
  </div>
</section>

<section class="sec" id="plans" aria-labelledby="t-plans">
  <div class="wrap">
    ${head('plans', c.plans.eyebrow, c.plans.h2, c.plans.lead)}
    <ul class="plans">
      ${c.plans.items.map((p) => `<li class="plan reveal${p.rec ? ' rec' : ''}">
        ${p.rec ? `<span class="badge mono">${esc(c.plans.rec)}</span>` : ''}
        <h3>${esc(p.name)}</h3>
        <p class="price mono">${esc(p.price)}<small>${p.per ? esc(p.per) : '&nbsp;'}</small></p>
        <p class="cap"><b class="mono">${esc(p.cap)}</b> <span>${esc(p.capPer)}</span></p>
        <p class="pnote">${esc(p.note)}</p>
      </li>`).join('\n      ')}
    </ul>
    <p class="fine reveal">${esc(c.plans.fine)}</p>
  </div>
</section>

<section class="sec" id="downloads" aria-labelledby="t-dl">
  <div class="wrap dl-grid">
    <div class="dl reveal">
      <p class="eyebrow">${esc(c.downloads.eyebrow)}</p>
      <h2 id="t-dl">${esc(c.downloads.h2)}</h2>
      <p class="sub">${esc(c.downloads.lead)}</p>
      <div class="stores">${storeButtons(lang)}</div>
      <p class="fine">${esc(c.downloads.ios)}</p>
    </div>
    <div class="faq reveal" id="faq">
      <h3 class="faq-h">${esc(c.downloads.faqH)}</h3>
      <div class="acc">
        ${c.faq.items.map((f) => `<details><summary><span>${esc(f.q)}</span>${icon('arrow', 'ic ic-chev')}</summary><div class="acc-b"><p>${esc(f.a)}</p></div></details>`).join('\n        ')}
      </div>
      <p class="more"><span>${esc(c.contact.h)}</span> <a class="link" href="${path(lang, 'support')}">${esc(c.contact.cta)}${icon('arrow', 'ic ic-sm')}</a></p>
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
