// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// This lab lives at kylepace.dev/lab-slug/. It's its own Worker, mounted on that path by
// the routes in wrangler.jsonc; the hub (kyle-pace/kylepace.dev) serves everything else
// on the domain, including the favicon, robots.txt and the privacy page.
// Everything this site serves sits under /lab-slug/: pages in src/pages/lab-slug/,
// public files in public/lab-slug/, and built assets at /lab-slug/_astro/. (Astro's
// `base` option isn't used: with the Cloudflare adapter it serves files from the wrong
// folder.)
export default defineConfig({
  site: 'https://kylepace.dev',
  build: { assets: 'lab-slug/_astro' },
  session: false,
  adapter: cloudflare({ imageService: 'compile' }),
});
