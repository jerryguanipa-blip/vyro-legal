# Custom domain and business e-mail — checklist (nothing here has been purchased or changed)

## Domain status (checked 2026-11-12 with the Vercel registrar API)
- `viro.com`, `vyro.com`, `vyro.app` are registered by third parties. VIRO is not VYRO; do not substitute it.
- Available at check time: `vyrohd.com` (≈ $12/yr) and `vyrohd.app` (≈ $10 first year, higher renewal). Re-check before buying.
- **A purchase requires the owner's explicit authorization.** Nothing was bought.

## When a domain is owned
1. Vercel → project `vyro-hd` → Domains → add `example.com` and `www.example.com`; set DNS as Vercel indicates (A / CNAME). If the domain is registered at Vercel, DNS is automatic.
2. Edit `siteUrl` in `site.config.mjs`, run `npm run generate` and `npm run check`, commit, deploy. Canonical, hreflang, sitemap, robots and Open Graph URLs all follow `siteUrl`.
3. Keep `vyro-hd.vercel.app` redirecting to the new domain (Vercel does this when it is added as primary).
4. Update the Play Console privacy-policy URL only after the new URL answers 200.

## Business mailbox (e.g. `soporte@<domain>`)
Only publish it after it has been tested **both ways** (receive and send).
- Provider options to evaluate: Zoho Mail (free tier exists — confirm its current limits for custom domains, IMAP/SMTP access and number of users at signup time), Google Workspace, or simple forwarding (receive only — not enough on its own for replying as the domain).
- DNS records the provider will ask for (values come from the provider; these are the types):
  - `MX` — mail routing (usually 2–3 records with priorities).
  - `TXT` SPF — `v=spf1 include:<provider-spf> ~all` (one SPF record only).
  - `TXT`/`CNAME` DKIM — selector record given by the provider.
  - `TXT` DMARC at `_dmarc` — start with `v=DMARC1; p=none; rua=mailto:<mailbox>` and tighten to `quarantine` after a week of clean reports.
- Test: send to and from Gmail, check headers show `spf=pass dkim=pass dmarc=pass`, check spam placement.
- Then change `contactEmail` in `site.config.mjs`, regenerate, deploy, and update the Play Console support e-mail and the privacy policy contact (same value, single source).
