// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: "https://elmwoodpropertiesmn.netlify.app",
  integrations: [sitemap()],
  // Sharp's native binary isn't reliable in Cloudflare Pages' build environment,
  // which silently breaks build-time image transforms. Passthrough avoids that
  // dependency entirely so images work on any static host.
  image: {
    service: passthroughImageService(),
  },
});
