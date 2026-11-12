// Progressive enhancement only: the site is fully readable without JavaScript. No cookies, no storage, no network.
(() => {
  document.documentElement.classList.add('js'); // also set earlier by boot.js to avoid a layout shift

  // mobile menu
  const burger = document.querySelector('.burger');
  const nav = document.getElementById('nav');
  if (burger && nav) {
    const set = (open) => {
      nav.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? burger.dataset.close : burger.dataset.open);
    };
    burger.addEventListener('click', () => set(!nav.classList.contains('open')));
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false); });
    window.matchMedia('(min-width: 1100px)').addEventListener('change', () => set(false));
  }

  // reveal on scroll
  const items = document.querySelectorAll('.reveal');
  if (items.length) {
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('in'));
    } else {
      const io = new IntersectionObserver((entries) => {
        for (const en of entries) if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      items.forEach((el) => io.observe(el));
    }
  }

  // one-at-a-time FAQ is not enforced: every <details> works independently and natively.

  // help center: local search + deep links
  const form = document.querySelector('.search');
  if (form) {
    const input = document.getElementById('q');
    const status = document.getElementById('status');
    const empty = document.getElementById('empty');
    const arts = [...document.querySelectorAll('.art')];
    const cats = [...document.querySelectorAll('.cat')];
    const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    const hay = new Map(arts.map((a) => [a, norm(a.dataset.text || '')]));

    const run = () => {
      const terms = norm(input.value).split(/\s+/).filter(Boolean);
      let n = 0;
      for (const a of arts) {
        const ok = terms.every((t) => hay.get(a).includes(t));
        a.hidden = !ok;
        if (ok) n++;
        if (terms.length && ok && n <= 3) a.open = true;
        else if (!terms.length) a.open = a.id === location.hash.slice(1);
      }
      for (const c of cats) c.hidden = !c.querySelector('.art:not([hidden])');
      empty.hidden = n > 0;
      status.textContent = terms.length ? `${n} ${n === 1 ? form.dataset.one : form.dataset.many}` : '';
    };
    form.addEventListener('submit', (e) => e.preventDefault());
    input.addEventListener('input', run);

    const openHash = () => {
      const t = location.hash && document.getElementById(location.hash.slice(1));
      if (t && t.classList.contains('art')) { t.open = true; t.scrollIntoView({ block: 'center' }); }
    };
    window.addEventListener('hashchange', openHash);
    openHash();
  }
})();
