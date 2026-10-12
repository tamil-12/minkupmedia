export interface NavLink {
  label: string;
  to: string;
  children?: NavLink[];
}

export const primaryNav: NavLink[] = [
  { label: "Home", to: "/" },
  {
    label: "Services",
    to: "/services",
    children: [
      { label: "Social Media Marketing", to: "/services/social-media-marketing" },
      { label: "Performance Marketing", to: "/services/performance-marketing" },
    ],
  },
  { label: "Work", to: "/work" },
  { label: "Creative Studio", to: "/creative-studio" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];
