# VYRO official website

Static, dependency-free site for VYRO HD Video Optimizer. Spanish at `/`, English at `/en/`.
Pages are generated from `src/` into the repository root (that output is committed, Vercel serves it as-is).

```bash
npm run generate   # node build.mjs  -> regenerates every page, sitemap, robots, manifest
npm run check      # node tools/check-site.mjs -> links, anchors, hreflang, metadata, CSP-safety, prices/stores, legal parity
node tools/serve.mjs 8766   # local server that applies vercel.json headers (CSP) for realistic testing
python tools/make-assets.py # regenerate logo sizes + Open Graph images from the app icon
```

- Everything configurable (domain, contact e-mail, store links, legal date) is in `site.config.mjs`.
- Text lives in `src/copy.mjs` (landing), `src/legal.mjs` (privacy/terms), `src/help.mjs` (help center).
- `docs/SITE_FACTS.md` lists where each claim comes from. `docs/DOMAIN_EMAIL_SETUP.md` is the domain / mailbox checklist.
- `tools/e2e.mjs` is the Playwright browser test (Playwright is not a dependency of the site; run it from any folder that has it installed).
- Strict CSP: no inline scripts or styles, no third-party requests. Keep it that way.
