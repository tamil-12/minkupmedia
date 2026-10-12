export interface Service {
  slug: string;
  index: string;
  title: string;
  shortTitle: string;
  summary: string;
  description: string;
  deliverables: string[];
  outcomes: string[];
  accent: "blue" | "orange" | "navy";
  linkTo?: string;
  heroEyebrow?: string;
  heroTagline?: string;
}

export const services: Service[] = [
  {
    slug: "social-media-marketing",
    index: "01",
    title: "Social Media Marketing & Management",
    shortTitle: "Social Media",
    summary: "Make your brand part of the daily conversation.",
    description:
      "End-to-end social media for brands that want more than posts. Strategy, content planning, account management, reel production, campaign concepts, and engagement that compounds.",
    deliverables: [
      "Monthly content strategy",
      "Reel & video production",
      "Design-led static grids",
      "Account management",
      "Community moderation",
      "Monthly performance review",
    ],
    outcomes: ["Grow audience", "Build recall", "Earn attention"],
    accent: "blue",
    linkTo: "/services/social-media-marketing",
    heroEyebrow: "Social Media Marketing",
    heroTagline: "Content people stop scrolling for.",
  },
  {
    slug: "performance-marketing",
    index: "02",
    title: "Performance Marketing & Paid Ads",
    shortTitle: "Performance Marketing",
    summary: "Turn attention into pipeline, paid and precise.",
    description:
      "Paid social, paid search, landing pages, lead-gen funnels, and tracking that answers the only question that matters: did it work?",
    deliverables: [
      "Meta & Google ad strategy",
      "Creative concepts & copy",
      "Landing pages",
      "Conversion tracking",
      "Weekly optimization",
      "Transparent reporting",
    ],
    outcomes: ["Drive sales", "Lower CAC", "Scale predictably"],
    accent: "orange",
    linkTo: "/services/performance-marketing",
    heroEyebrow: "Performance Marketing",
    heroTagline: "Attention is cheap. Action is engineered.",
  },
  {
    slug: "video-editing",
    index: "03",
    title: "Video Editing & Reel Production",
    shortTitle: "Video",
    summary: "Edits that hold the first three seconds — and the next thirty.",
    description:
      "From hooks and short-form reels to brand films. Our editors work in rhythm, pacing, and story — not just transitions.",
    deliverables: [
      "Hook-first short-form reels",
      "YouTube long-form edits",
      "Brand films & commercials",
      "Motion graphics",
      "Color & sound polish",
    ],
    outcomes: ["Boost retention", "Lift share-rate", "Build character"],
    accent: "blue",
  },
  {
    slug: "graphic-design",
    index: "04",
    title: "Graphic Design & Branding",
    shortTitle: "Branding",
    summary: "Identities that feel inevitable, not interchangeable.",
    description:
      "Logos, systems, campaign toolkits, packaging, and typographic worlds designed to make a brand immediately recognizable.",
    deliverables: [
      "Logo & wordmark design",
      "Full identity systems",
      "Brand guidelines",
      "Campaign toolkits",
      "Packaging & print",
    ],
    outcomes: ["Build recognition", "Clarify positioning", "Earn premium"],
    accent: "orange",
  },
  {
    slug: "seo",
    index: "05",
    title: "SEO & Website Optimization",
    shortTitle: "SEO",
    summary: "Rank for the queries your buyers actually type.",
    description:
      "Technical audits, content strategy, on-page SEO, Core Web Vitals, and ongoing optimization that stacks up over quarters, not weeks.",
    deliverables: [
      "Technical SEO audit",
      "Content & keyword strategy",
      "On-page optimization",
      "Core Web Vitals",
      "Monthly rank & traffic review",
    ],
    outcomes: ["Earn traffic", "Compound authority", "Lower paid dependency"],
    accent: "navy",
  },
  {
    slug: "influencer-marketing",
    index: "06",
    title: "Influencer Marketing",
    shortTitle: "Influencers",
    summary: "Creator partnerships that read like editorial, not ads.",
    description:
      "We cast, brief, and produce with creators your audience already trusts. From single posts to long-form series — concept to contract.",
    deliverables: [
      "Creator sourcing & casting",
      "Campaign concepting",
      "Briefs & contracting",
      "Production support",
      "Performance tracking",
    ],
    outcomes: ["Buy trust", "Open new audiences", "Compound creative"],
    accent: "orange",
  },
  {
    slug: "lead-generation",
    index: "07",
    title: "Lead Generation & Business Growth",
    shortTitle: "Lead Generation",
    summary: "The commercial engine behind every creative campaign.",
    description:
      "Lead-gen funnels, CRM workflows, nurture sequences, and growth playbooks that keep sales teams in demand instead of in meetings.",
    deliverables: [
      "Funnel mapping",
      "Lead-magnet creative",
      "CRM & automation setup",
      "Nurture email sequences",
      "Sales enablement assets",
    ],
    outcomes: ["Fill pipeline", "Shorten cycles", "Compound revenue"],
    accent: "blue",
  },
];

export const serviceBySlug = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);
