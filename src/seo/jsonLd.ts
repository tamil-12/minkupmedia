import { siteSettings } from "../data/siteSettings";
import { services } from "../data/services";
import { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION, absoluteUrl } from "./siteMeta";

/**
 * Organization + LocalBusiness JSON-LD.
 * Rendered once in the HTML <head> on every page via <Seo />.
 */
export function organizationJsonLd(): Record<string, unknown> {
  const addr = siteSettings.address;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/logo/minkup-logo.jpeg"),
    image: absoluteUrl("/images/hero/cinema-camera-poster.webp"),
    description: DEFAULT_DESCRIPTION,
    email: siteSettings.contactEmailPlaceholder,
    telephone: siteSettings.contactPhones[0],
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${addr.line1}, ${addr.line2}`,
      addressLocality: addr.city,
      addressRegion: addr.state,
      postalCode: addr.pincode,
      addressCountry: "IN",
    },
    sameAs: siteSettings.socialLinks.map((s) => s.url).filter((u) => u && u !== "#"),
    founder: siteSettings.directors.map((d) => ({
      "@type": "Person",
      name: d.name,
      jobTitle: d.role,
    })),
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Place", name: "Global" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Marketing & Creative Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.summary,
          url: absoluteUrl(s.linkTo ?? "/services"),
        },
      })),
    },
  };
}

/** WebSite JSON-LD enabling Google search box sitelinks. */
export function websiteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-IN",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/work?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/** BreadcrumbList JSON-LD — call per route with [{ name, path }, …]. */
export function breadcrumbJsonLd(
  crumbs: { name: string; path: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

/** Service-page JSON-LD for /services/* detail routes. */
export function serviceJsonLd(slug: string): Record<string, unknown> | null {
  const s = services.find((svc) => svc.slug === slug);
  if (!s) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.description,
    url: absoluteUrl(s.linkTo ?? `/services/${s.slug}`),
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "India" },
    serviceType: s.shortTitle,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
    },
  };
}
