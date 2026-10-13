export interface SocialLink {
  name: string;
  url: string;
  handle: string;
}

export interface Director {
  name: string;
  role: string;
}

export interface CompanyAddress {
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
  mapUrl: string;
}

export interface SiteSettings {
  companyName: string;
  tagline: string;
  closingLine: string;
  logoLight: string;
  logoDark: string;
  socialLinks: SocialLink[];
  contactEmailPlaceholder: string;
  /** Formatted display strings for the primary and secondary contact lines. */
  contactPhones: string[];
  /** Full office address (used by Footer, Contact, About). */
  address: CompanyAddress;
  /** Legacy single-line fallback used by older callers. */
  addressPlaceholder: string;
  /** Legacy single-line placeholder used by older callers. */
  contactPhonePlaceholder: string;
  /** International-format digits only (no "+", no spaces). Used by WhatsApp links. */
  whatsappNumber: string;
  directors: Director[];
  googleFormsEndpoint: string;
  apiBaseUrl: string;
}

const env = import.meta.env;

export const siteSettings: SiteSettings = {
  companyName: "Minkup Media Technology",
  tagline: "We make brands impossible to ignore.",
  closingLine: "MAKE YOUR NEXT MOVE COUNT.",
  logoLight: "/logo/minkup-logo.jpeg",
  logoDark: "/logo/minkup-logo.jpeg",
  socialLinks: [
    { name: "Instagram", url: "#", handle: "@minkupmedia" },
    { name: "LinkedIn", url: "#", handle: "/minkup-media" },
    { name: "YouTube", url: "#", handle: "@minkupmedia" },
    { name: "Behance", url: "#", handle: "/minkupmedia" },
  ],
  contactEmailPlaceholder: "info@minkupmedia.com",
  contactPhones: ["+91 73583 73599", "+91 97899 80013"],
  contactPhonePlaceholder: "+91 73583 73599",
  address: {
    line1: "S.F. No: 360/4 & 360/5, Keeranatham Road",
    line2: "Near KGiSL Campus, Saravanampatti",
    city: "Coimbatore",
    state: "Tamil Nadu",
    pincode: "641035",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Keeranatham+Road+Saravanampatti+Coimbatore+641035",
  },
  addressPlaceholder:
    "Keeranatham Road, Saravanampatti, Coimbatore, Tamil Nadu 641035",
  // India + 10-digit mobile, no "+" prefix — wa.me/<this> opens WhatsApp chat.
  whatsappNumber: env.VITE_WHATSAPP_NUMBER ?? "919789980013",
  directors: [
    { name: "Ranjith Kumar M", role: "Managing Director" },
    { name: "Boopathi Raj K", role: "Managing Director" },
  ],
  googleFormsEndpoint: env.VITE_GOOGLE_FORMS_ENDPOINT ?? "",
  apiBaseUrl: env.VITE_API_BASE_URL ?? "",
};
