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
                  to={s.linkTo ?? "/services"}
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

          {siteSettings.directors.length > 0 && (
            <div className={styles.directors}>
              <h5 className={styles.colSubTitle}>Leadership</h5>
              <ul className={styles.linkList}>
                {siteSettings.directors.map((d) => (
                  <li key={d.name} className={styles.quietLine}>
                    <strong>{d.name}</strong>
                    <br />
                    <span>{d.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

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
