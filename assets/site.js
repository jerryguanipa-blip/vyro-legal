/* Single place to change the public contact address for the whole site.
   Every <a class="contact-email"> (mailto + visible text) is filled from here. */
(function () {
  var VYRO_CONTACT_EMAIL = 'jerryguanipa@gmail.com';
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.contact-email').forEach(function (el) {
      el.setAttribute('href', 'mailto:' + VYRO_CONTACT_EMAIL);
      el.textContent = VYRO_CONTACT_EMAIL;
    });
  });
})();
