export type ProjectCategory =
  | "branding"
  | "social-media"
  | "video"
  | "performance"
  | "creative";

export type ProjectLayout = "feature" | "wide" | "portrait" | "square" | "offset";

export interface Project {
  slug: string;
  title: string;
  client: string;
  category: ProjectCategory;
  categoryLabel: string;
  summary: string;
  year: string;
  layout: ProjectLayout;
  accent: "blue" | "orange" | "navy";
  cover: string;
  /** Optional CSS `object-position` for the cover image — tune per project
   *  so landscape subjects aren't centre-cropped into oblivion. */
  coverPosition?: string;
  thumb?: string;
  deliverables: string[];
  services: string[];
}

export const projectCategories: {
  value: "all" | ProjectCategory;
  label: string;
}[] = [
  { value: "all", label: "All Work" },
  { value: "branding", label: "Branding" },
  { value: "social-media", label: "Social Media" },
  { value: "video", label: "Video" },
  { value: "performance", label: "Performance Campaigns" },
  { value: "creative", label: "Creative Content" },
];

/**
 * Real Minkup Media Technology client work.
 *
 * Order matters — the first entries lead both the /work grid and the Home
 * featured strip (`projects.slice(0, 4)`). The two flagship live clients
 * (Bella Biriyani, Chennai Institute of Technology) are pinned at the top.
 * Remaining case studies are India-based projects.
 *
 * To add another client:
 *   1. Drop the hero image into `public/images/work/<slug>.webp`
 *   2. Insert the entry at the position you want it to render
 *   3. The `cover` path must match the file you added
 */
export const projects: Project[] = [
  // ----- Priority: active flagship clients, always first.
  {
    slug: "bella-biriyani",
    title: "Bella Biriyani — A Golden Feast",
    client: "Bella Biriyani · Ramanathapuram, Tamil Nadu",
    category: "branding",
    categoryLabel: "Restaurant Branding · Food Photography",
    summary:
      "Bringing Bella Biriyani's food experience to life through premium food visuals, creative branding, and engaging digital content.",
    year: "2025",
    layout: "feature",
    accent: "orange",
    cover: "/images/work/bella-biriyani.webp",
    deliverables: [
      "Restaurant brand presentation",
      "Food photography & visual content",
      "Social media creative design",
      "Promotional content production",
    ],
    services: ["Branding", "Social Media", "Creative Content"],
  },
  {
    slug: "chennai-institute-of-technology",
    title: "Chennai Institute of Technology — Campus Showcase",
    client: "Chennai Institute of Technology · Chennai, Tamil Nadu",
    category: "social-media",
    categoryLabel: "Education Marketing · Digital Campaigns",
    summary:
      "Showcasing campus life and academic opportunities through engaging creative content and digital campaign visuals.",
    year: "2025",
    layout: "portrait",
    accent: "blue",
    cover: "/images/work/chennai-institute-of-technology.webp",
    deliverables: [
      "Educational campaign creatives",
      "Campus & promotional visuals",
      "Reel and video production",
      "Digital campaign design",
    ],
    services: ["Social Media", "Video", "Creative Content"],
  },
  {
    slug: "rs-automotive",
    title: "RS Automotive — Built For The Drive",
    client: "RS Automotive · Race Course, Coimbatore",
    category: "creative",
    categoryLabel: "Automotive · Creative Content",
    summary:
      "A premium automotive visual direction for a Coimbatore car-accessories destination — refined interiors, alloy wheels, in-car tech, and lifestyle visuals that make every upgrade feel aspirational.",
    year: "2025",
    layout: "wide",
    accent: "navy",
    cover: "/images/work/rs-automotive.webp",
    coverPosition: "center 42%",
    deliverables: [
      "Automotive creative direction",
      "Product & accessory photography",
      "Promotional campaign visuals",
      "Social media content system",
    ],
    services: ["Creative Content", "Social Media", "Branding"],
  },
  {
    slug: "hotel-sri-annamaghil",
    title: "Hotel Sri Annamaghil — A Warm South Indian Welcome",
    client: "Hotel Sri Annamaghil · Tamil Nadu",
    category: "branding",
    categoryLabel: "Restaurant Branding · Food Photography",
    summary:
      "A restaurant-focused visual identity for a vegetarian dining destination — appetising South Indian food imagery, warm ambience, and digital content that mirrors the hospitality of the room.",
    year: "2025",
    layout: "square",
    accent: "orange",
    cover: "/images/work/hotel-sri-annamaghil.webp",
    coverPosition: "center 28%",
    deliverables: [
      "Restaurant branding & visual identity",
      "Food photography & creative visuals",
      "Social media content design",
      "Promotional campaign creatives",
    ],
    services: ["Branding", "Social Media", "Creative Content"],
  },

  // ----- Supporting case studies — all India-based clients.
  {
    slug: "beyond-the-ordinary",
    title: "Beyond The Ordinary",
    client: "Elements Coffee Co. · Bengaluru",
    category: "branding",
    categoryLabel: "Branding · Identity",
    summary:
      "A full rebrand for a specialty coffee roaster — a visual system built around light, craft, and a slower ritual.",
    year: "2025",
    layout: "feature",
    accent: "orange",
    cover: "/images/work/beyond-the-ordinary.webp",
    deliverables: ["Identity system", "Packaging", "Campaign film", "Store signage"],
    services: ["Branding", "Video", "Creative Content"],
  },
  {
    slug: "made-to-be-remembered",
    title: "Made To Be Remembered",
    client: "Suryagarh Heritage Hotels · Rajasthan",
    category: "video",
    categoryLabel: "Brand Film · Cinema",
    summary:
      "A 90-second cinematic brand film positioning a boutique heritage hotel group for a new generation of slow travellers.",
    year: "2025",
    layout: "wide",
    accent: "navy",
    cover: "/images/work/made-to-be-remembered.webp",
    deliverables: ["Script & direction", "Production", "Edit & color", "Social cutdowns"],
    services: ["Video", "Creative Content"],
  },
  {
    slug: "culture-in-motion",
    title: "Culture In Motion",
    client: "Shift Athleisure · Mumbai",
    category: "social-media",
    categoryLabel: "Social Media · Content",
    summary:
      "A year-long social system for an Indian athleisure brand — reels, carousels, and campaign drops in one voice.",
    year: "2025",
    layout: "portrait",
    accent: "blue",
    cover: "/images/work/culture-in-motion.webp",
    deliverables: ["Strategy", "Monthly reels", "Design system", "Community"],
    services: ["Social Media", "Creative Content"],
  },
  {
    slug: "from-clicks-to-customers",
    title: "From Clicks To Customers",
    client: "Vedika Wellness · Pune",
    category: "performance",
    categoryLabel: "Performance · Paid Ads",
    summary:
      "A performance marketing engine for a wellness D2C brand — concepting, creative testing, and funnel engineering.",
    year: "2024",
    layout: "square",
    accent: "orange",
    cover: "/images/work/from-clicks-to-customers.webp",
    deliverables: ["Media buying", "Creative concepting", "Landing pages", "Weekly optimization"],
    services: ["Performance Marketing", "Creative Content"],
  },
  {
    slug: "signal-above-noise",
    title: "Signal Above Noise",
    client: "Sonara Audio · Bengaluru",
    category: "creative",
    categoryLabel: "Creative Content · Launch",
    summary:
      "A launch campaign for a Hi-Fi speaker brand — editorial stills, product film, and a 6-city influencer rollout.",
    year: "2024",
    layout: "offset",
    accent: "navy",
    cover: "/images/work/signal-above-noise.webp",
    deliverables: ["Launch concept", "Photography", "Film", "Influencer rollout"],
    services: ["Creative Content", "Influencer Marketing"],
  },
  {
    slug: "unmissable",
    title: "Unmissable",
    client: "Udaan Pay · Chennai",
    category: "performance",
    categoryLabel: "Performance · Fintech",
    summary:
      "A 90-day performance sprint for an Indian fintech launch — thousands of ad variations, one disciplined funnel.",
    year: "2024",
    layout: "square",
    accent: "blue",
    cover: "/images/work/unmissable.webp",
    deliverables: ["Full-funnel strategy", "Creative volume", "Analytics", "A/B testing"],
    services: ["Performance Marketing"],
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
