import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, Instagram, Linkedin, Youtube, Figma } from "lucide-react";
import { primaryNav } from "../../data/navigation";
import { services } from "../../data/services";
import { siteSettings } from "../../data/siteSettings";
import styles from "./Footer.module.css";

const socialIcons: Record<string, LucideIcon> = {
  Instagram,
  LinkedIn: Linkedin,
  YouTube: Youtube,
  Behance: Figma,
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.topBand} aria-hidden="true" />

      <div className={styles.hero}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>MINKUP MEDIA TECHNOLOGY</p>
          <h2 className={styles.statement}>
            {siteSettings.closingLine.split(" ").map((word, i) => (
              <span key={i} className={i === 2 ? styles.statementAccent : undefined}>
                {word}{" "}
              </span>
            ))}
          </h2>
          <Link to="/contact" className={styles.cta}>
            Start a Project <ArrowUpRight size={18} strokeWidth={2.2} />
          </Link>
        </div>
      </div>

      <div className={styles.divider} aria-hidden="true" />

      <div className={styles.grid}>
        <div className={styles.brandCol}>
          <Link
            to="/"
            className={styles.brand}
            aria-label={`${siteSettings.companyName} — home`}
          >
            <span className={styles.logoImg} aria-hidden="true" />
            <span className={styles.brandText}>
              <span className={styles.brandWord}>Minkup</span>
              <span className={styles.brandSub}>Media Technology</span>
            </span>
          </Link>
          <p className={styles.tagline}>
            A creative marketing agency building unforgettable brands through strategy,
            performance, and cinematic creative work.
          </p>
          <p className={styles.certification}>
            <svg
              className={styles.certIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 2 4.5 5v7c0 4.5 3.4 8.7 7.5 10 4.1-1.3 7.5-5.5 7.5-10V5L12 2z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            An ISO 9001 : 2015 Certified Organisation
          </p>
        </div>

        <nav className={styles.col} aria-label="Site">
          <h4 className={styles.colTitle}>Navigate</h4>
          <ul className={styles.linkList}>
            {primaryNav.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className={styles.footerLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className={styles.col} aria-label="Services">
          <h4 className={styles.colTitle}>Services</h4>
          <ul className={styles.linkList}>
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  to={s.linkTo ?? `/services#${s.slug}`}
                  className={styles.footerLink}
                >
                  {s.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Contact</h4>
          <ul className={styles.linkList}>
            <li>
              <a
                className={styles.footerLink}
                href={`mailto:${siteSettings.contactEmailPlaceholder}`}
              >
                {siteSettings.contactEmailPlaceholder}
              </a>
            </li>
            {siteSettings.contactPhones.map((num) => (
              <li key={num}>
                <a
                  className={styles.footerLink}
                  href={`tel:${num.replace(/\s+/g, "")}`}
                >
                  {num}
                </a>
              </li>
            ))}
            <li>
              <a
                className={styles.footerLink}
                href={siteSettings.address.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {siteSettings.address.line1}
                <br />
                {siteSettings.address.line2}
                <br />
                {siteSettings.address.city} · {siteSettings.address.state}{" "}
                {siteSettings.address.pincode}
              </a>
            </li>
          </ul>

          <div className={styles.social}>
            {siteSettings.socialLinks.map((s) => {
              const Icon = socialIcons[s.name];
              return (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.socialIcon}
                  aria-label={s.name}
                  title={s.name}
                >
                  {Icon ? <Icon size={18} strokeWidth={1.8} /> : s.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {siteSettings.directors.length > 0 && (
        <section className={styles.leadership} aria-label="Leadership">
          <p className={styles.leadershipLabel}>Leadership</p>
          <h3 className={styles.leadershipHeading}>
            The team behind every project
          </h3>
          <ul className={styles.leadershipList}>
            {siteSettings.directors.map((d) => (
              <li key={d.name} className={styles.leaderCard}>
                <span className={styles.leaderAvatar} aria-hidden="true">
                  {d.name
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <span className={styles.leaderName}>{d.name}</span>
                <span className={styles.leaderRole}>{d.role}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className={styles.legal}>
        <span>© {year} Minkup Media Technology. All rights reserved.</span>
        <span className={styles.legalLinks}>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Cookies</a>
        </span>
      </div>
    </footer>
  );
}
