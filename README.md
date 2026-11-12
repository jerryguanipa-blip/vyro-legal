# VYRO Legal

Public legal site for VYRO HD Video Optimizer (Android, package `com.statusmax.statusmax`):
Privacy Policy, Terms & Conditions, and Support, in Spanish and English.

No VYRO source code, APK/AAB, keys, or secrets are stored in this repository.

Live site: see GitHub Pages URL in the repository settings once enabled.

## Site structure (2026-11-12 redesign)

- `index.html` - official VYRO landing page (hero, how it works, features, plans, FAQ, contact), ES/EN.
- `privacy.html`, `terms.html`, `support.html` - legal/help pages, same design.
- `assets/style.css` - shared styles (tokens mirror the app theme).
- `assets/site.js` - **single place to change the public contact email** (`VYRO_CONTACT_EMAIL`); every `<a class="contact-email">` is filled from it.
- `assets/lang.js` - ES/EN toggle. `assets/og.png` - social share image.
