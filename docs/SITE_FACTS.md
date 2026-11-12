# VYRO site — claims and where each one comes from (verified 2026-11-12)

Rule: nothing on the site is invented. If a claim cannot be traced to code, a measurement or a live check, it is not on the site.

| Claim on the site | Source |
|---|---|
| Android only, no iPhone version / App Store listing | App is Flutter + Kotlin Media3 (Android-only exporter); no App Store listing exists (checked) |
| Not published on Google Play yet → "Próximamente" | `https://play.google.com/store/apps/details?id=com.statusmax.statusmax` returned 404 on 2026-11-12. Button appears only when `stores.googlePlay.url` is set in `site.config.mjs` |
| Optimization is local (originals never uploaded) | `VyroExporter.kt`, `media_optimizer.dart`; only the optimized file is uploaded for WhatsApp delivery |
| Optimized video is uploaded temporarily and encrypted (HTTPS) | `delivery` client in app; backend `src/*` |
| Code is single-use, valid 30 min | backend `src/config.js` (`TOKEN_TTL_MINUTES`), `src/db.js` |
| File deleted after confirmed delivery, ≈1 h at most | `src/cleanup.js` (token TTL + grace + 5-min sweep) |
| Twilio media links expire in 15 min | `src/config.js` (`TWILIO_MEDIA_TTL_MINUTES`) |
| Message identifiers/status kept 7 days | `src/messagingStore.js` (`KEEP_MS`) |
| Finished-job metadata purged after 30 days | `src/cleanup.js` (`JOB_METADATA_KEEP_MS`), backend commit 49685fe, covered by `test/jobMetadataPurge.test.js`. **Takes effect once that backend version is deployed.** |
| Phone number is not stored in the DB; logs show it masked | Schemas in `src/db.js` / `src/messagingStore.js` have no phone column; `src/providers/mask.js` keeps only the last 4 digits (`maskAddress`) and `redactNumbers` scrubs error text |
| Hosted on Fly.io, US (Ashburn `iad`) | `fly.toml` (`primary_region = "iad"`). **Backend not yet deployed to Fly at the time of writing.** |
| FREE: watermark "VYRO FREE", 30 s parts; PRO: no watermark, 45 s (1080p) and 60 s (720p) parts | `status_budget.dart`, `config_screen.dart`, `strings.dart` |
| Features list (trim, text, music, mute, record, WhatsApp/Business choice, direct share) | App screens and code |
| 57 s 4K source: 519 MB → 2 parts totalling 27.9 MB, ≈42 s on a Galaxy S25 Ultra | `docs/measurements/lab_2026-11-10/results.json` (`sourceInfo.sizeBytes` 519,096,546; P0 production flow `sizeBytes` 27,910,871; `wallMs` 42,027) |
| Output 1080×1920, 30 fps | same results file (`output`) |
| No ads / tracking SDKs | grep of `pubspec.yaml` and `android/app/build.gradle*` for ads/analytics/crash SDKs (none found, 2026-11-12) |
| Site uses no cookies/analytics/storage | `src/static/site.js` (no storage/network APIs), no third-party requests (CSP `default-src 'self'`) |

## Deliberately NOT on the site
- Prices, ratings, download counts, testimonials: none are verified. Plans point to Google Play for price/currency/trial.
- Any statement that WhatsApp's compression is avoided: it is not. The site says the opposite.
- Comparisons with other apps.
- Real app screenshots: the phone is a CSS illustration labelled "Interfaz ilustrativa" and uses real measured numbers. Replace it with real captures when available (the phone was not connected during this work).
