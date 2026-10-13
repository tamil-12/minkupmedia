import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, ArrowUpRight } from "lucide-react";
import { primaryNav } from "../../data/navigation";
import { siteSettings } from "../../data/siteSettings";
import MobileMenu from "./MobileMenu";
import styles from "./Header.module.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
        data-scrolled={scrolled || undefined}
      >
        <div className={styles.inner}>
          <div className={styles.brandStack}>
            <Link
              to="/"
              className={styles.brand}
              aria-label={`${siteSettings.companyName} — home`}
            >
              <img
                src={siteSettings.logoLight}
                alt={siteSettings.companyName}
                className={styles.logoImg}
              />
            </Link>
            <span
              className={styles.certBadge}
              title="An ISO 9001 : 2015 Certified Organisation"
            >
              <svg
                className={styles.certBadgeIcon}
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
              <span className={styles.certBadgeText}>
                An ISO 9001 : 2015 Certified Organisation
              </span>
            </span>
          </div>

          <nav className={styles.nav} aria-label="Primary">
            {primaryNav.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ""}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className={styles.actions}>
            <Link to="/contact" className={styles.cta}>
              <span>Start a Project</span>
              <ArrowUpRight size={16} strokeWidth={2.4} />
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className={styles.menuBtn}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <Menu size={22} strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
