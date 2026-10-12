import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import CinemaCameraHero from "../components/hero/CinemaCameraHero";
import CinemaIntro from "../components/hero/CinemaIntro";
import SectionHeading from "../components/common/SectionHeading";
import Button from "../components/common/Button";
import { services } from "../data/services";
import { projects } from "../data/projects";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useReducedMotion } from "../hooks/useReducedMotion";
import styles from "./Home.module.css";

const INTRO_SESSION_KEY = "minkup:intro-seen";

/**
 * Allow `?intro=1` to force a replay (useful for client review and QA),
 * and `?intro=skip` to bypass it entirely. The flag is session-scoped so
 * normal visitors see it once per browser session.
 */
function hasSeenIntro(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const params = new URLSearchParams(window.location.search);
    const override = params.get("intro");
    if (override === "1" || override === "force") {
      window.sessionStorage.removeItem(INTRO_SESSION_KEY);
      return false;
    }
    if (override === "skip" || override === "0") return true;
    return window.sessionStorage.getItem(INTRO_SESSION_KEY) === "1";
  } catch {
    return true;
  }
}

function markIntroSeen(): void {
  try {
    window.sessionStorage.setItem(INTRO_SESSION_KEY, "1");
  } catch {
    /* storage disabled — no-op */
  }
}

const capabilities = [
  { label: "SOCIAL MEDIA", sub: "Grow Audience" },
  { label: "PERFORMANCE ADS", sub: "Drive Sales" },
  { label: "CREATIVE CONTENT", sub: "Build Brands" },
];

const steps = [
  { n: "01", title: "Strategy Driven" },
  { n: "02", title: "Creative Execution" },
  { n: "03", title: "Measurable Growth" },
];

export default function Home() {
  const revealRef = useScrollReveal<HTMLDivElement>();
  const reduced = useReducedMotion();
  // Two-state intro gate so the hero fades IN while the overlay is still
  // fading out — one smooth crossfade instead of a blank gap.
  const initialSkip = reduced || hasSeenIntro();
  const [heroVisible, setHeroVisible] = useState<boolean>(initialSkip);
  const [introMounted, setIntroMounted] = useState<boolean>(!initialSkip);

  const featuredProjects = projects.slice(0, 4);

  return (
    <div ref={revealRef}>
      {introMounted && (
        <CinemaIntro
          onBeginExit={() => {
            // Reveal the hero in parallel with the overlay fade-out.
            markIntroSeen();
            setHeroVisible(true);
          }}
          onDone={() => setIntroMounted(false)}
        />
      )}

      {/* ------------------------------------------------------------- HERO */}
      <section className={styles.hero}>
        <div className={styles.heroCamera} aria-hidden="true">
          <CinemaCameraHero />
        </div>

        <div className={styles.heroGrid}>
          <div className={styles.heroContent}>
            <motion.p
              className={styles.eyebrow}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: heroVisible ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <span className={styles.eyebrowRule} aria-hidden="true" />
              CREATIVE MARKETING AGENCY
            </motion.p>

            <h1 className={styles.heroHeading}>
              <HeroLine delay={0.15} active={heroVisible}>
                <span className={styles.lineNavy}>WE MAKE BRANDS</span>
              </HeroLine>
              <HeroLine delay={0.3} active={heroVisible}>
                <span className={styles.lineBlue}>IMPOSSIBLE</span>{" "}
                <span className={styles.lineNavy}>TO</span>{" "}
                <span className={styles.lineOrange}>IGNORE.</span>
              </HeroLine>
            </h1>

            <motion.p
              className={styles.heroLede}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: heroVisible ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.72, ease: "easeOut" }}
            >
              Creative storytelling, intelligent marketing, and digital experiences
              that turn attention into business growth.
            </motion.p>

            <motion.div
              className={styles.heroCtas}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: heroVisible ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.86, ease: "easeOut" }}
            >
              <Link to="/contact" className={styles.ctaPrimary}>
                <span>Let&apos;s Build Your Brand</span>
                <ArrowUpRight size={16} strokeWidth={2.4} />
              </Link>
              <Link to="/creative-studio#showreel" className={styles.ctaSecondary}>
                <span className={styles.playDot}>
                  <Play size={10} fill="currentColor" strokeWidth={0} />
                </span>
                Watch Showreel
              </Link>
            </motion.div>

            <motion.div
              className={styles.capabilities}
              initial="hidden"
              animate={heroVisible ? "shown" : "hidden"}
              variants={{
                hidden: {},
                shown: { transition: { staggerChildren: 0.06, delayChildren: 0.5 } },
              }}
            >
              {capabilities.map((c, i) => (
                <motion.div
                  key={c.label}
                  className={styles.capability}
                  variants={{
                    hidden: { y: 10, opacity: 0 },
                    shown: { y: 0, opacity: 1 },
                  }}
                >
                  <span className={styles.capIcon} aria-hidden="true">
                    <CapGlyph index={i} />
                  </span>
                  <div className={styles.capText}>
                    <span className={styles.capLabel}>{c.label}</span>
                    <span className={styles.capSub}>{c.sub}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className={styles.heroFooter}>
          <ul className={styles.steps}>
            {steps.map((s) => (
              <li key={s.n}>
                <span className={styles.stepN}>{s.n}</span>
                <span className={styles.stepTitle}>{s.title}</span>
              </li>
            ))}
          </ul>
          <a href="#services-intro" className={styles.scrollCue} aria-label="Scroll to content">
            <MouseGlyph />
            <span>Scroll Down</span>
          </a>
        </div>
      </section>

      {/* --------------------------------------------------- SERVICES INTRO */}
      <section id="services-intro" className={styles.servicesIntro}>
        <div className="container">
          <div className={styles.servicesHead}>
            <SectionHeading
              eyebrow="WHAT WE DO"
              indexLabel="01 / Our Craft"
              title={
                <>
                  We blend <span className="text-blue">strategy</span>, creative,
                  and <span className="text-orange">performance</span> under one
                  roof.
                </>
              }
              description="From brand systems and reel production to full-funnel paid campaigns, every service is tied back to a single measure — did it move the brand forward?"
            />
            <div className={styles.servicesHeadCta}>
              <Button as="link" to="/services" variant="navy" withArrow>
                Explore all services
              </Button>
            </div>
          </div>

          <ul className={styles.servicesList}>
            {services.slice(0, 5).map((s, i) => (
              <li
                key={s.slug}
                className={styles.serviceItem}
                data-reveal
                data-reveal-delay={i * 60}
              >
                <Link to={s.linkTo ?? "/services"} className={styles.serviceLink}>
                  <span className={styles.serviceIndex}>{s.index}</span>
                  <span className={styles.serviceTitle}>{s.title}</span>
                  <span className={styles.serviceSummary}>{s.summary}</span>
                  <span className={styles.serviceArrow}>
                    <ArrowUpRight size={28} strokeWidth={1.6} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------- FEATURED WORK */}
      <section className={styles.workIntro}>
        <div className="container">
          <SectionHeading
            eyebrow="SELECTED WORK"
            indexLabel="02 / Case Studies"
            title={
              <>
                Ideas built to <span className="text-blue">move</span> people —
                and <span className="text-orange">markets</span>.
              </>
            }
            description="A snapshot of brand films, campaign work, and creative systems built for clients we're proud of."
          />

          <div className={styles.workGrid}>
            {featuredProjects.map((p, i) => (
              <Link
                to="/work"
                key={p.slug}
                className={`${styles.workCard} ${styles[`workSize-${i % 3}`]}`}
                data-reveal
                data-reveal-delay={i * 80}
              >
                <div className={styles.workCover}>
                  <img src={p.cover} alt={p.title} loading="lazy" />
                </div>
                <div className={styles.workMeta}>
                  <span className={styles.workCategory}>{p.categoryLabel}</span>
                  <h3 className={styles.workTitle}>{p.title}</h3>
                  <span className={styles.workClient}>
                    {p.client} · {p.year}
                  </span>
                </div>
                <span className={styles.workBadge}>
                  <ArrowUpRight size={18} strokeWidth={2} />
                </span>
              </Link>
            ))}
          </div>

          <div className={styles.workFooter}>
            <Button as="link" to="/work" variant="navy" size="lg" withArrow>
              See all work
            </Button>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- STATEMENT */}
      <section className={styles.statement} id="showreel">
        <div className="container">
          <div className={styles.statementInner} data-reveal>
            <p className="eyebrow eyebrow--contrast">OUR PHILOSOPHY</p>
            <h2 className={styles.statementText}>
              Attention is cheap. <em>Memory is earned.</em>{" "}
              We&apos;re here for the <span className="text-blue">brands</span>{" "}
              that want to be <span className="text-orange">remembered</span>, not just seen.
            </h2>
            <div className={styles.statementActions}>
              <Button as="link" to="/about" variant="secondary" size="lg" withArrow>
                Our approach
              </Button>
              <Button as="link" to="/creative-studio" variant="ghost" size="lg" withArrow>
                Visit the Creative Studio
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- CTA */}
      <section className={styles.ctaBand}>
        <div className="container">
          <div className={styles.ctaCard} data-reveal>
            <div>
              <p className="eyebrow">LET&apos;S WORK TOGETHER</p>
              <h2 className={styles.ctaTitle}>
                Have a brand ready for its next move?
              </h2>
              <p className={styles.ctaCopy}>
                Tell us about your business, your goals, and the kind of creative
                impact you want to make. We&apos;ll take it from there.
              </p>
            </div>
            <div className={styles.ctaActions}>
              <Button as="link" to="/contact" variant="primary" size="lg" withArrow>
                Start a Project
              </Button>
              <Button as="link" to="/services" variant="ghost" size="lg" withArrow>
                Explore services
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ----------------------------- Helpers ----------------------------- */

function HeroLine({
  children,
  delay = 0,
  active,
}: {
  children: React.ReactNode;
  delay?: number;
  active: boolean;
}) {
  return (
    <span className={styles.heroLine}>
      <motion.span
        className={styles.heroLineInner}
        initial={{ y: "110%" }}
        animate={{ y: active ? "0%" : "110%" }}
        transition={{ duration: 0.9, delay, ease: [0.2, 0.8, 0.2, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function CapGlyph({ index }: { index: number }) {
  // Three distinct icons rendered as compact outline SVGs so we don't ship
  // a dependency for three characters of visual info.
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (index === 0) {
    return (
      <svg {...common}>
        <rect x="6" y="3" width="12" height="18" rx="3" />
        <circle cx="12" cy="18" r="1" />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg {...common}>
        <path d="M4 20V12" />
        <path d="M10 20V8" />
        <path d="M16 20v-6" />
        <path d="M22 20V4" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <polygon points="10,8 16,12 10,16" fill="currentColor" />
      <rect x="4" y="5" width="16" height="14" rx="2" />
    </svg>
  );
}

function MouseGlyph() {
  return (
    <svg
      width="18"
      height="26"
      viewBox="0 0 18 26"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <rect x="1" y="1" width="16" height="24" rx="8" />
      <line x1="9" y1="6" x2="9" y2="10" />
    </svg>
  );
}
