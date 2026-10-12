import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { primaryNav } from "../../data/navigation";
import { siteSettings } from "../../data/siteSettings";
import styles from "./MobileMenu.module.css";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-menu"
          id="mobile-menu"
          className={styles.wrap}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label="Primary navigation"
        >
          <motion.div
            className={styles.sheet}
            initial={{ y: "-6%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-6%", opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className={styles.topBar}>
              <Link to="/" className={styles.brand} onClick={onClose}>
                <span
                  className={styles.logoImg}
                  role="img"
                  aria-label={siteSettings.companyName}
                />
              </Link>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={onClose}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <nav aria-label="Mobile">
              <ul className={styles.list}>
                {primaryNav.map((link, i) => (
                  <motion.li
                    key={link.to}
                    initial={{ y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.4, ease: "easeOut" }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === "/"}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `${styles.link} ${isActive ? styles.active : ""}`
                      }
                    >
                      <span className={styles.linkIndex}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={styles.linkLabel}>{link.label}</span>
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className={styles.footer}>
              <Link to="/contact" className={styles.cta} onClick={onClose}>
                Start a Project <ArrowUpRight size={18} strokeWidth={2.2} />
              </Link>
              <div className={styles.socials}>
                {siteSettings.socialLinks.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    className={styles.socialLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
