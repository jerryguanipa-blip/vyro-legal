(function () {
  function apply(lang) {
    document.documentElement.setAttribute('data-lang', lang);
    document.querySelectorAll('.lang-toggle button').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    try { localStorage.setItem('vyro_legal_lang', lang); } catch (e) {}
  }

  function initial() {
    try {
      var stored = localStorage.getItem('vyro_legal_lang');
      if (stored === 'es' || stored === 'en') return stored;
    } catch (e) {}
    return (navigator.language || 'es').toLowerCase().indexOf('es') === 0 ? 'es' : 'en';
  }

  document.addEventListener('DOMContentLoaded', function () {
    apply(initial());
    document.querySelectorAll('.lang-toggle button').forEach(function (btn) {
      btn.addEventListener('click', function () { apply(btn.dataset.lang); });
    });
  });
})();
