import { siteSettings } from "../data/siteSettings";

export interface EnquiryPayload {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  budget: string;
  consent: boolean;
}

export interface EnquiryResult {
  ok: boolean;
  mode: "google-forms" | "api" | "none";
  message?: string;
}

const env = import.meta.env;

/**
 * Submit the contact-form payload.
 *
 * - If a backend API base URL is configured, POST to `${API}/enquiries` as JSON.
 * - Otherwise, if a Google Forms endpoint + entry IDs are configured, submit
 *   via the standard `formResponse` encoded body in no-cors mode.
 * - Otherwise, return `ok: false, mode: "none"` so the UI can show a clear
 *   "integration not configured" message instead of pretending we submitted.
 *
 * No fake success states — never claim a submission succeeded when nothing
 * was sent.
 */
export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryResult> {
  if (siteSettings.apiBaseUrl) {
    try {
      const res = await fetch(`${siteSettings.apiBaseUrl.replace(/\/$/, "")}/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      return {
        ok: res.ok,
        mode: "api",
        message: res.ok ? "Enquiry received." : `Backend returned ${res.status}.`,
      };
    } catch (err) {
      return {
        ok: false,
        mode: "api",
        message: err instanceof Error ? err.message : "Network error.",
      };
    }
  }

  if (siteSettings.googleFormsEndpoint) {
    const formData = new FormData();
    const entries: Array<[string | undefined, string]> = [
      [env.VITE_GOOGLE_FORMS_ENTRY_NAME, payload.name],
      [env.VITE_GOOGLE_FORMS_ENTRY_BUSINESS, payload.businessName],
      [env.VITE_GOOGLE_FORMS_ENTRY_EMAIL, payload.email],
      [env.VITE_GOOGLE_FORMS_ENTRY_PHONE, payload.phone],
      [env.VITE_GOOGLE_FORMS_ENTRY_SERVICE, payload.service],
      [env.VITE_GOOGLE_FORMS_ENTRY_MESSAGE, payload.message],
      [env.VITE_GOOGLE_FORMS_ENTRY_BUDGET, payload.budget],
    ];
    for (const [key, value] of entries) {
      if (key && value) formData.append(key, value);
    }

    // Google Forms needs no-cors + opaque response. We can't read the status;
    // treat a lack of thrown error as a submit.
    try {
      await fetch(siteSettings.googleFormsEndpoint, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });
      return { ok: true, mode: "google-forms", message: "Enquiry sent." };
    } catch (err) {
      return {
        ok: false,
        mode: "google-forms",
        message: err instanceof Error ? err.message : "Network error.",
      };
    }
  }

  return {
    ok: false,
    mode: "none",
    message:
      "No backend or Google Form endpoint is configured. Set VITE_GOOGLE_FORMS_ENDPOINT (plus entry IDs) or VITE_API_BASE_URL in .env before accepting enquiries.",
  };
}

function buildMessage(payload?: Partial<EnquiryPayload>): string | null {
  if (!payload) return null;
  const parts = [
    `Hi Minkup — I'd like to talk about a project.`,
    payload.name ? `Name: ${payload.name}` : null,
    payload.businessName ? `Business: ${payload.businessName}` : null,
    payload.service ? `Service: ${payload.service}` : null,
    payload.message ? `Notes: ${payload.message}` : null,
  ].filter(Boolean);
  return parts.join("\n");
}

/** `wa.me` only accepts digit-only phone numbers (no "+" or spaces). */
function toDigits(phone: string): string {
  return phone.replace(/\D+/g, "");
}

/**
 * Legacy single-link helper — used by any caller that still assumes one
 * number. Returns the primary (default) WhatsApp link.
 */
export function whatsappLink(payload?: Partial<EnquiryPayload>): string | null {
  const links = whatsappLinks(payload);
  return links.length > 0 ? links[0].href : null;
}

export interface WhatsAppContact {
  phone: string; // formatted for display, e.g. "+91 97899 80013"
  href: string; // https://wa.me/<digits>?text=<encoded>
}

/**
 * Build a WhatsApp link for every phone number configured in siteSettings.
 * Falls back to the single `whatsappNumber` env setting when the phones
 * array is empty.
 */
export function whatsappLinks(payload?: Partial<EnquiryPayload>): WhatsAppContact[] {
  const message = buildMessage(payload);
  const encoded = message ? `?text=${encodeURIComponent(message)}` : "";

  const phones = siteSettings.contactPhones.filter(Boolean);
  if (phones.length > 0) {
    return phones.map((phone) => ({
      phone,
      href: `https://wa.me/${toDigits(phone)}${encoded}`,
    }));
  }

  if (siteSettings.whatsappNumber) {
    return [
      {
        phone: siteSettings.whatsappNumber,
        href: `https://wa.me/${toDigits(siteSettings.whatsappNumber)}${encoded}`,
      },
    ];
  }

  return [];
}
