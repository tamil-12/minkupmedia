import { siteSettings } from "../../data/siteSettings";
import styles from "./WhatsAppButton.module.css";

export default function WhatsAppButton() {
  const number = siteSettings.whatsappNumber;
  if (!number) return null;

  const href = `https://wa.me/${number}?text=${encodeURIComponent(
    "Hi Minkup — I'd like to talk about a project."
  )}`;

  return (
    <a
      className={styles.btn}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Minkup on WhatsApp"
    >
      <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true">
        <path
          fill="currentColor"
          d="M19.11 17.21c-.28-.14-1.63-.8-1.88-.9-.25-.09-.43-.14-.62.14-.18.28-.71.9-.87 1.08-.16.18-.32.21-.6.07-.28-.14-1.17-.43-2.23-1.38a8.32 8.32 0 0 1-1.54-1.9c-.16-.28 0-.43.12-.57.12-.12.28-.32.42-.49.14-.16.18-.28.28-.46.09-.18.05-.35-.02-.49-.07-.14-.62-1.5-.85-2.06-.22-.54-.45-.47-.62-.48h-.53c-.18 0-.46.07-.7.35-.24.28-.92.9-.92 2.2 0 1.3.94 2.56 1.07 2.73.14.18 1.85 2.83 4.49 3.97.63.27 1.12.43 1.5.55.63.2 1.21.17 1.67.1.51-.08 1.57-.64 1.79-1.26.22-.62.22-1.15.16-1.27-.07-.11-.25-.18-.53-.32zM16 3C9.37 3 4 8.37 4 15c0 2.14.56 4.14 1.54 5.88L4 29l8.3-2.17a11.9 11.9 0 0 0 3.7.6c6.63 0 12-5.37 12-12S22.63 3 16 3zm0 21.86c-1.18 0-2.33-.22-3.4-.63l-.24-.09-5 1.3 1.33-4.87-.16-.25A9.86 9.86 0 1 1 16 24.86z"
        />
      </svg>
    </a>
  );
}
