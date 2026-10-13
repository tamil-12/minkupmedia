import { Helmet } from "react-helmet-async";
import {
  SITE_NAME,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_TITLE_SUFFIX,
  TWITTER_HANDLE,
  absoluteUrl,
} from "./siteMeta";

interface Props {
  /** Short page title. The site name is appended automatically unless `rawTitle` is true. */
  title: string;
  description?: string;
  /** Path like `/services` — turned into both canonical and OG `url`. */
  path: string;
  image?: string;
  /** Set true for OG `article` instead of the default `website`. */
  article?: boolean;
  /** If true, use title verbatim without appending the brand suffix. */
  rawTitle?: boolean;
  /** `noindex` — set true for 404s and other non-indexable routes. */
  noindex?: boolean;
  /** JSON-LD graph(s) to inline on this page. Objects are stringified safely. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Universal <head> block for every route — title / description / canonical /
 * Open Graph / Twitter Card / robots / optional JSON-LD.
 */
export default function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  image = DEFAULT_OG_IMAGE,
  article = false,
  rawTitle = false,
  noindex = false,
  jsonLd,
}: Props) {
  const fullTitle = rawTitle ? title : `${title} ${DEFAULT_TITLE_SUFFIX}`;
  const canonical = absoluteUrl(path);
  const ogImage = absoluteUrl(image);
  const graphs = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1"} />
      <meta name="theme-color" content="#DFF3FF" />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {graphs.map((g, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(g)}
        </script>
      ))}
    </Helmet>
  );
}
