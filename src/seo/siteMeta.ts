/**
 * Site-wide SEO constants. Change SITE_URL once and everything else
 * (canonical URLs, OG tags, JSON-LD, sitemap) picks it up.
 */
export const SITE_URL = "https://minkupmedia.trdigital.in";

export const SITE_NAME = "Minkup Media Technology";

export const DEFAULT_TITLE_SUFFIX = "— Minkup Media Technology";

export const DEFAULT_DESCRIPTION =
  "Creative storytelling, intelligent marketing, and digital experiences that turn attention into business growth. Social media, performance marketing, video, branding, SEO, and lead generation under one roof in Coimbatore, India.";

export const DEFAULT_OG_IMAGE = "/images/hero/cinema-camera-poster.webp";

export const TWITTER_HANDLE = "@minkupmedia";

/** Absolute URL helper — joins the site base with a relative path. */
export function absoluteUrl(path: string): string {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${clean}`;
}
