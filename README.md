# Minkup Media Technology — Website

Premium 8-page React site for **Minkup Media Technology**, a creative marketing agency. Built with Vite, React, TypeScript, GSAP-ready animation hooks, Framer Motion component transitions, and a tight CSS Modules design system.

---

## Quickstart

```bash
# 1. Install
npm install

# 2. Start the dev server
npm run dev            # → http://localhost:5173

# 3. Production build
npm run build          # outputs ./dist
npm run preview        # local preview of the built site
```

Node 18+ recommended.

---

## Pages

| Route                                   | File                                                 | Purpose                                |
| --------------------------------------- | ---------------------------------------------------- | -------------------------------------- |
| `/`                                     | `src/pages/Home.tsx`                                 | Hero + overview                        |
| `/work`                                 | `src/pages/Work.tsx`                                 | Portfolio w/ filtering                 |
| `/services`                             | `src/pages/Services.tsx`                             | Service index + detail stack           |
| `/services/social-media-marketing`      | `src/pages/SocialMediaMarketing.tsx`                 | Deep dive — social                     |
| `/services/performance-marketing`       | `src/pages/PerformanceMarketing.tsx`                 | Deep dive — performance                |
| `/creative-studio`                      | `src/pages/CreativeStudio.tsx`                       | Studio showreel + gallery              |
| `/about`                                | `src/pages/About.tsx`                                | Philosophy, principles, process        |
| `/contact`                              | `src/pages/Contact.tsx`                              | Enquiry form + WhatsApp                |
| `*`                                     | `src/pages/NotFound.tsx`                             | 404                                    |

---

## Design system

- **Tokens**: `src/styles/tokens.css` — brand palette (`--mk-blue #0BA9E0`, `--mk-orange #F74724`, `--mk-navy #101C2E`, pale sky `#DFF3FF`), type scale, spacing, radii, shadows, motion.
- **Global**: `src/styles/global.css` — resets, atmospheric background gradient, `.container` system, `.eyebrow`, utility classes, reduced-motion guard.
- **Component CSS**: each component / page owns a `*.module.css`. CSS classes are locally scoped — no leaks.
- **Typography**: `Fraunces` (display), `Instrument Serif` (editorial accents), `Rubik` (sans), loaded via Google Fonts in `index.html`.

## Animation

- **Framer Motion** — small UI transitions, menu open/close, staggered reveals.
- **IntersectionObserver + `useScrollReveal` hook** — `[data-reveal]` elements fade/lift into view, respecting `prefers-reduced-motion`.
- **GSAP** installed and ready for ScrollTrigger-driven timelines; add to any page via a dynamic import. The current build keeps the GSAP footprint out of the critical path by not auto-loading until a page requests it.
- **Reduced motion** is honored throughout — see `src/hooks/useReducedMotion.ts` and the global `prefers-reduced-motion` rule in `global.css`.

---

## Assets

```
public/
├── logo/
│   ├── minkup-logo.jpeg          ← supplied Minkup logo (used by Header/Footer/MobileMenu)
│   └── minkup-logo-transparent.svg  ← development stand-in (favicon)
├── images/
│   ├── hero/cinema-camera-poster.png
│   ├── work/*.png
│   ├── services/*.png
│   ├── creative-studio/*.png
│   └── about/*.png
└── videos/
    ├── cinema-camera-hero.mp4    ← the real exploded-camera animation
    └── (cinema-camera-hero.webm) ← drop a WebM re-encode here for smaller delivery
```

- Logo JPEG is rendered with `mix-blend-mode: multiply` and `background-position/size` tuning in each layout CSS so the white padding blends into the sky-blue background and only the orange/blue strokes remain visible. If you later obtain a transparent PNG, swap `siteSettings.logoLight` in `src/data/siteSettings.ts` and drop the `mix-blend-mode` rules.
- Cinema-camera hero video is MP4-only right now. The `CinemaCameraHero` component looks for a WebM first — add one for smaller file size without any code change.
- If a video source 404s, the component falls back to the poster. If the poster also fails, it falls back to an inline SVG exploded-camera illustration (`src/components/hero/ExplodedCamera.tsx`) so the page never looks broken.

See `public/images/README.md` and `public/videos/README.md` for naming + export guidelines.

---

## Contact integrations

The contact form (`src/api/enquiry.ts`) supports two submission paths — pick one:

### Option A — Backend API

```
# .env.local
VITE_API_BASE_URL=https://api.your-domain.com
```

The form will `POST /enquiries` as JSON matching `EnquiryPayload`.

### Option B — Google Forms

```
# .env.local
VITE_GOOGLE_FORMS_ENDPOINT=https://docs.google.com/forms/u/0/d/e/<FORM_ID>/formResponse
VITE_GOOGLE_FORMS_ENTRY_NAME=entry.1234567890
VITE_GOOGLE_FORMS_ENTRY_EMAIL=entry.2345678901
VITE_GOOGLE_FORMS_ENTRY_PHONE=entry.3456789012
VITE_GOOGLE_FORMS_ENTRY_BUSINESS=entry.4567890123
VITE_GOOGLE_FORMS_ENTRY_SERVICE=entry.5678901234
VITE_GOOGLE_FORMS_ENTRY_MESSAGE=entry.6789012345
VITE_GOOGLE_FORMS_ENTRY_BUDGET=entry.7890123456
```

Find the entry IDs by opening the Google Form, inspecting the HTML for each input, and copying its `name="entry.XXXXXXXXXX"`.

### WhatsApp CTA

```
VITE_WHATSAPP_NUMBER=919000000000     # international format, digits only
```

Set it to render the floating WhatsApp pill (`src/components/common/WhatsAppButton.tsx`) and the WhatsApp quick-contact button on the Contact page. If unset, both are gracefully hidden.

### If no integration is configured

The form validates on the client, posts nothing, and shows a clear message explaining that the owner needs to configure the above env vars. No fake success states.

---

## Backend architecture (reference)

If/when you add a Node + PostgreSQL backend, a minimal schema that aligns with the data layer in `src/data/`:

```sql
CREATE TABLE enquiries (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  business_name TEXT,
  email         TEXT NOT NULL,
  phone         TEXT,
  service       TEXT,
  message       TEXT NOT NULL,
  budget        TEXT,
  consent       BOOLEAN NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE projects (
  slug          TEXT PRIMARY KEY,
  title         TEXT NOT NULL,
  client        TEXT NOT NULL,
  category      TEXT NOT NULL,
  summary       TEXT,
  year          TEXT,
  cover_url     TEXT,
  layout        TEXT CHECK (layout IN ('feature','wide','portrait','square','offset')),
  is_sample     BOOLEAN DEFAULT FALSE
);

CREATE TABLE project_media (
  project_slug  TEXT REFERENCES projects(slug) ON DELETE CASCADE,
  url           TEXT NOT NULL,
  kind          TEXT CHECK (kind IN ('image','video')),
  position      INT NOT NULL DEFAULT 0,
  PRIMARY KEY (project_slug, position)
);

CREATE TABLE services (
  slug          TEXT PRIMARY KEY,
  index_number  TEXT NOT NULL,
  title         TEXT NOT NULL,
  short_title   TEXT,
  summary       TEXT,
  description   TEXT,
  accent        TEXT
);

CREATE TABLE site_settings (
  key           TEXT PRIMARY KEY,
  value         JSONB NOT NULL
);
```

A minimal Express or Fastify handler for `POST /enquiries` is all you need to wire the form.

---

## Project structure

```
src/
├── App.tsx                 — routes
├── main.tsx                — entry
├── components/
│   ├── common/             — Button, SectionHeading, VideoPlayer, WhatsAppButton
│   ├── hero/               — CinemaCameraHero + inline ExplodedCamera fallback
│   └── layout/             — Header, MobileMenu, Footer
├── data/
│   ├── navigation.ts
│   ├── projects.ts
│   ├── services.ts
│   └── siteSettings.ts
├── hooks/
│   ├── useReducedMotion.ts
│   └── useScrollReveal.ts
├── pages/                  — one folder/file per route
├── api/
│   └── enquiry.ts          — form submission (Google Forms / API)
└── styles/
    ├── tokens.css
    └── global.css
```

---

## Content policies baked in

- No invented company history, founding dates, awards, or employee counts.
- No invented client names on real case studies — the six portfolio entries are marked `isSample: true` and show a "Sample" badge until replaced.
- No fabricated performance numbers — the Performance Marketing page shows benchmark ranges clearly labelled as *illustrative*.
- No fake form-success states.
- No invented contact details — email / phone / WhatsApp placeholders stay as `siteSettings` entries you fill in deliberately.
- No fake social links — placeholder `url: "#"` sits in `siteSettings.socialLinks` until you supply real URLs.

---

## Shipping checklist

Before pushing to a public host:

1. Replace the sample portfolio data in `src/data/projects.ts` with real case studies.
2. Drop real client assets into `public/images/work/`.
3. Fill in `siteSettings.contactEmailPlaceholder`, `contactPhonePlaceholder`, `addressPlaceholder`, and real `socialLinks` URLs.
4. Configure either `VITE_API_BASE_URL` *or* the full set of Google Forms env vars.
5. If you have a transparent-background version of the logo, swap it in and remove the `mix-blend-mode: multiply` rule from `Header.module.css`, `Footer.module.css`, and `MobileMenu.module.css`.
6. Replace the current `cinema-camera-hero.mp4` with the final high-quality render (and add a WebM re-encode for smaller delivery).
7. Run `npm run build` and verify the output.
# minkupmedia
