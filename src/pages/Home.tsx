import { useEffect, useState } from "react";
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
import Seo from "../seo/Seo";
import { organizationJsonLd, websiteJsonLd } from "../seo/jsonLd";
import styles from "./Home.module.css";

/**
 * Local 3D/glossy service icons bundled with the site. Files live in
 * `public/images/service-icons/` and are named after the matching service
 * slug so adding a new service only means dropping `<slug>.png` into that
 * folder — no code change needed if a matching file exists.
 */
const homeServiceIconUrls: Record<string, string> = {
  "social-media-marketing": "/images/service-icons/social-media-marketing.webp",
  "performance-marketing": "/images/service-icons/performance-marketing.webp",
  "video-editing": "/images/service-icons/video-editing.webp",
  "graphic-design": "/images/service-icons/graphic-design.webp",
  seo: "/images/service-icons/seo.webp",
  "influencer-marketing": "/images/service-icons/influencer-marketing.webp",
  "lead-generation": "/images/service-icons/lead-generation.webp",
};

const FALLBACK_ICON_URL = "/images/service-icons/social-media-marketing.webp";

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
  // Hero items animate IN during the intro video (not after). By the time
  // the overlay fades, the hero is already a fully-settled static layout —
  // the fade reveals a finished composition instead of triggering a burst
  // of animations, which kills the "frame shutter" moment.
  const initialSkip = reduced || hasSeenIntro();
  const [heroVisible, setHeroVisible] = useState<boolean>(true);
  const [introMounted, setIntroMounted] = useState<boolean>(!initialSkip);

  // Safety fuse — if the intro ever fails to call onBeginExit (video error,
  // autoplay blocked, etc.), the hero still becomes visible so the page is
  // never stuck with a hidden headline.
  useEffect(() => {
    if (heroVisible) return;
    const t = window.setTimeout(() => setHeroVisible(true), 8500);
    return () => window.clearTimeout(t);
  }, [heroVisible]);

  const featuredProjects = projects.slice(0, 4);

  return (
    <div ref={revealRef}>
      <Seo
        title="Creative Marketing Agency in Coimbatore"
        description="Minkup Media Technology — a creative marketing agency building unforgettable brands through social media, performance marketing, video production, SEO, and lead generation. Based in Coimbatore, serving brands worldwide."
        path="/"
        jsonLd={[organizationJsonLd(), websiteJsonLd()]}
      />
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

      {/* --------------------------------------------------- SERVICES INTRO
          Dark navy band with the full seven-service lineup as compact icon
          cards (Iconify twemoji icons for brand-colored illustration). */}
      <section id="services-intro" className={styles.svcBand}>
        <div className="container">
          <div className={styles.svcHead}>
            <div className={styles.svcHeadMain}>
              <p className={`eyebrow eyebrow--contrast ${styles.svcEyebrow}`}>
                OUR SERVICES
              </p>
              <h2 className={styles.svcTitle}>
                <span>CREATIVITY WITH</span>
                <br />
                <span>
                  A <span className="text-blue">CLEAR</span>{" "}
                  <span className="text-orange">PURPOSE.</span>
                </span>
              </h2>
            </div>
            <p className={styles.svcLede}>
              Every idea has a job to do. We combine strategy, design, content,
              and performance to help brands grow.
            </p>
            <Link to="/services" className={styles.svcCta}>
              View All Services <ArrowUpRight size={16} strokeWidth={2.2} />
            </Link>
          </div>

          <ul className={styles.svcRow}>
            {services.map((s) => {
              const iconUrl = homeServiceIconUrls[s.slug] ?? FALLBACK_ICON_URL;
              const accent =
                s.accent === "blue"
                  ? styles.svcAccentBlue
                  : s.accent === "orange"
                  ? styles.svcAccentOrange
                  : styles.svcAccentNavy;
              return (
                <li
                  key={s.slug}
                  className={`${styles.svcCard} ${accent}`}
                  data-reveal
                  data-reveal-delay={Number(s.index) * 50}
                >
                  <Link
                    to={s.linkTo ?? "/services"}
                    className={styles.svcCardLink}
                    aria-label={s.title}
                  >
                    <span className={styles.svcCardTop}>
                      <span className={styles.svcCardIcon}>
                        <img
                          src={iconUrl}
                          alt=""
                          width={96}
                          height={96}
                          loading="lazy"
                          decoding="async"
                        />
                      </span>
                      <span className={styles.svcCardNum}>{s.index}</span>
                    </span>
                    <span className={styles.svcCardTitle}>{s.shortTitle}</span>
                    <span className={styles.svcCardArrow} aria-hidden="true">
                      <ArrowUpRight size={14} strokeWidth={2} />
                    </span>
                  </Link>
                </li>
              );
            })}
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
                  <img
                    src={p.cover}
                    alt={`${p.title} — ${p.client}`}
                    width={1200}
                    height={900}
                    loading="lazy"
                    decoding="async"
                  />
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
        // Initial follows `active` so a page that renders with the hero already
        // visible (reduced motion, repeat visitors who've seen the intro, any
        // route hop) skips the slide-up and shows the headline immediately.
        initial={{ y: active ? "0%" : "110%" }}
        animate={{ y: active ? "0%" : "110%" }}
        transition={{ duration: 0.75, delay, ease: [0.2, 0.8, 0.2, 1] }}
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
