// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import { residentServices } from './src/data/residentServices';

const site = "https://www.elmwood-properties.com";

// "Coming soon" placeholder pages stay out of the sitemap (they're also marked
// noindex) until the real feature launches.
const hiddenPages = residentServices
  .filter((s) => s.status === 'coming-soon')
  .map((s) => `${site}/residents/${s.slug}`);

// https://astro.build/config
export default defineConfig({
  site,
  // Build pages as /amenities.html (not /amenities/index.html) so Cloudflare Pages
  // serves the slash-less URLs our links use directly, instead of redirecting
  // every click from /amenities to /amenities/.
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap({ filter: (page) => !hiddenPages.some((p) => page.startsWith(p)) })],
  // The maintenance form moved into the Resident Portal; keep the old URL working.
  redirects: {
    '/maintenance-request': '/residents/maintenance-request',
  },
  // Cloudflare's build pipeline auto-installs this adapter on deploy regardless of
  // whether it's declared here, and defaults its image service to Cloudflare Images
  // (which requires an enabled Images subscription and silently 404s otherwise).
  // Declaring it explicitly with "passthrough" keeps images working without that
  // dependency — no resizing/format conversion, but original files always load.
  adapter: cloudflare({
    imageService: 'passthrough',
  }),
});
