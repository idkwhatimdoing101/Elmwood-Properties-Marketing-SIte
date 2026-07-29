// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: "https://www.elmwood-properties.com",
  integrations: [sitemap()],
  // Cloudflare's build pipeline auto-installs this adapter on deploy regardless of
  // whether it's declared here, and defaults its image service to Cloudflare Images
  // (which requires an enabled Images subscription and silently 404s otherwise).
  // Declaring it explicitly with "passthrough" keeps images working without that
  // dependency — no resizing/format conversion, but original files always load.
  adapter: cloudflare({
    imageService: 'passthrough',
  }),
});
