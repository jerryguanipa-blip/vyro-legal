// Single source of truth for everything that changes when the domain, the contact mailbox or the
// store listings change. `node build.mjs` regenerates every page, the sitemap and the metadata.
export default {
  // Public base URL (no trailing slash). Change it when a custom domain is connected.
  siteUrl: (process.env.SITE_URL || 'https://vyro-hd.vercel.app').replace(/\/+$/, ''),

  brand: 'VYRO',
  product: 'VYRO HD Video Optimizer',
  operator: process.env.OPERATOR_NAME || 'CARIBE CURRIER E.I.R.L.',
  packageId: 'com.statusmax.statusmax',

  // Public support mailbox. Keep the current one until a business mailbox is verified to receive AND send.
  contactEmail: process.env.CONTACT_EMAIL || 'jerryguanipa@gmail.com',

  // Store listings. A store button is rendered ONLY when `url` is a real listing URL.
  // Verified 2026-11-12: Google Play listing returns 404 (not published), no App Store listing exists
  // and the optimisation engine is Android-only.
  stores: {
    googlePlay: { url: null },
    appStore: { url: null },
  },

  // Legal documents
  legal: {
    version: '2.1',
    isoDate: '2026-11-18',
    dateEs: '18 de noviembre de 2026',
    dateEn: 'November 18, 2026',
  },
};
