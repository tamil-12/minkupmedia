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
  thumb?: string;
  deliverables: string[];
  services: string[];
  isSample?: boolean;
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

// NOTE: These projects are illustrative placeholders for layout and content.
// Replace with real client case studies before launch.
export const projects: Project[] = [
  {
    slug: "beyond-the-ordinary",
    title: "Beyond The Ordinary",
    client: "Lumen Coffee Collective",
    category: "branding",
    categoryLabel: "Branding · Identity",
    summary:
      "A full rebrand for a specialty coffee roaster — a visual system built around light, craft, and a slower ritual.",
    year: "2025",
    layout: "feature",
    accent: "orange",
    cover: "/images/work/beyond-the-ordinary.png",
    deliverables: ["Identity system", "Packaging", "Campaign film", "Store signage"],
    services: ["Branding", "Video", "Creative Content"],
    isSample: true,
  },
  {
    slug: "made-to-be-remembered",
    title: "Made To Be Remembered",
    client: "Northline Hotel Group",
    category: "video",
    categoryLabel: "Brand Film · Cinema",
    summary:
      "A 90-second cinematic brand film positioning a boutique hotel group for a new generation of slow travelers.",
    year: "2025",
    layout: "wide",
    accent: "navy",
    cover: "/images/work/made-to-be-remembered.png",
    deliverables: ["Script & direction", "Production", "Edit & color", "Social cutdowns"],
    services: ["Video", "Creative Content"],
    isSample: true,
  },
  {
    slug: "culture-in-motion",
    title: "Culture In Motion",
    client: "Ascend Athletic Wear",
    category: "social-media",
    categoryLabel: "Social Media · Content",
    summary:
      "A year-long social system for an athletic apparel brand — reels, carousels, and campaign drops in one voice.",
    year: "2025",
    layout: "portrait",
    accent: "blue",
    cover: "/images/work/culture-in-motion.png",
    deliverables: ["Strategy", "Monthly reels", "Design system", "Community"],
    services: ["Social Media", "Creative Content"],
    isSample: true,
  },
  {
    slug: "from-clicks-to-customers",
    title: "From Clicks To Customers",
    client: "Field & Form D2C",
    category: "performance",
    categoryLabel: "Performance · Paid Ads",
    summary:
      "A performance marketing engine for a wellness D2C brand — concepting, creative testing, and funnel engineering.",
    year: "2024",
    layout: "square",
    accent: "orange",
    cover: "/images/work/from-clicks-to-customers.png",
    deliverables: ["Media buying", "Creative concepting", "Landing pages", "Weekly optimization"],
    services: ["Performance Marketing", "Creative Content"],
    isSample: true,
  },
  {
    slug: "signal-above-noise",
    title: "Signal Above Noise",
    client: "Harbor Audio",
    category: "creative",
    categoryLabel: "Creative Content · Launch",
    summary:
      "A launch campaign for a Hi-Fi speaker brand — editorial stills, product film, and a 6-city influencer rollout.",
    year: "2024",
    layout: "offset",
    accent: "navy",
    cover: "/images/work/signal-above-noise.png",
    deliverables: ["Launch concept", "Photography", "Film", "Influencer rollout"],
    services: ["Creative Content", "Influencer Marketing"],
    isSample: true,
  },
  {
    slug: "unmissable",
    title: "Unmissable",
    client: "Daybreak Fintech",
    category: "performance",
    categoryLabel: "Performance · Fintech",
    summary:
      "A 90-day performance sprint for a fintech launch — thousands of ad variations, one disciplined funnel.",
    year: "2024",
    layout: "square",
    accent: "blue",
    cover: "/images/work/unmissable.png",
    deliverables: ["Full-funnel strategy", "Creative volume", "Analytics", "A/B testing"],
    services: ["Performance Marketing"],
    isSample: true,
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
