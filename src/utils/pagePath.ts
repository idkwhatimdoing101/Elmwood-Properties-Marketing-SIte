// The site is built as /amenities.html, /floor-plans/studio.html, /index.html
// (build.format "file" in astro.config.mjs), so during the build Astro.url.pathname
// includes ".html". Cloudflare Pages serves those pages at the clean URLs
// (/amenities, /floor-plans/studio, /), so use this to get the address visitors
// actually see, for canonical tags and nav highlighting.
export function cleanPath(pathname: string): string {
  return pathname.replace(/(\/index)?\.html$/, "").replace(/\/$/, "") || "/";
}
