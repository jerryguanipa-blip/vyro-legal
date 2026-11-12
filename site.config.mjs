// Single source of truth for everything that changes when the domain, the contact mailbox or the
// store listings change. `node build.mjs` regenerates every page, the sitemap and the metadata.
export default {
  // Public base URL (no trailing slash). Change it when a custom domain is connected.
  siteUrl: 'https://vyro-hd.vercel.app',

  brand: 'VYRO',
  product: 'VYRO HD Video Optimizer',
  operator: 'Jerry Boy Official',
  packageId: 'com.statusmax.statusmax',

  // Public support mailbox. Keep the current one until a business mailbox is verified to receive AND send.
  contactEmail: 'jerryguanipa@gmail.com',

  // Store listings. A store button is rendered ONLY when `url` is a real listing URL.
  // Verified 2026-11-12: Google Play listing returns 404 (not published), no App Store listing exists
  // and the optimisation engine is Android-only.
  stores: {
    googlePlay: { url: null },
    appStore: { url: null },
  },

  // Legal documents
  legal: {
    version: '2.0',
    isoDate: '2026-11-12',
    dateEs: '12 de noviembre de 2026',
    dateEn: 'November 12, 2026',
  },
};
