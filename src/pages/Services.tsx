import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Megaphone,
  LineChart,
  Film,
  PenTool,
  Search,
  Users,
  Target,
  Sparkles,
} from "lucide-react";
import Button from "../components/common/Button";
import ServicesHeroVideo from "../components/hero/ServicesHeroVideo";
import { services, type Service } from "../data/services";
import { useScrollReveal } from "../hooks/useScrollReveal";
import styles from "./Services.module.css";

/**
 * Icon per service slug — a quick visual anchor on each card.
 * Falls back to Sparkles if a new service slug is added without a mapping.
 */
const serviceIcons: Record<string, typeof Megaphone> = {
  "social-media-marketing": Megaphone,
  "performance-marketing": LineChart,
  "video-editing": Film,
  "graphic-design": PenTool,
  seo: Search,
  "influencer-marketing": Users,
  "lead-generation": Target,
};

const stats = [
  { value: "07", label: "Disciplines" },
  { value: "100%", label: "In-house craft" },
  { value: "24h", label: "Response SLA" },
  { value: "365d", label: "Measured outcomes" },
];

export default function Services() {
  const revealRef = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={revealRef} className={styles.page}>
      {/* ============================================================ HERO */}
      <section className={styles.hero}>
        <ServicesHeroVideo />

        <div className={`container ${styles.heroContent}`}>
          <p className="eyebrow">OUR SERVICES</p>
          <h1 className={styles.heroTitle}>
            <span>STRATEGY MEETS</span>
            <br />
            <span>
              <span className="text-blue">CREATIVE</span>{" "}
              <span className="text-orange">EXECUTION.</span>
            </span>
          </h1>
          <p className={styles.heroLede}>
            From the first idea to the final campaign, we bring creative thinking
            and marketing expertise together under one roof. Seven disciplines,
            one relentless question — did it work?
          </p>

          <ul className={styles.statRow}>
            {stats.map((s) => (
              <li key={s.label} className={styles.statChip}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================================================ GRID */}
      <section className={styles.gridSection}>
        <div className="container">
          <div className={styles.gridHead}>
            <p className="eyebrow">WHAT WE DO</p>
            <h2 className={styles.gridTitle}>
              A full creative + growth stack, delivered as one team.
            </h2>
          </div>

          <div className={styles.serviceGrid}>
            {services.map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ CTA */}
      <section className={styles.closing}>
        <div className="container">
          <div className={styles.closingCard}>
            <div className={styles.closingBody}>
              <p className="eyebrow">NOT SURE WHERE TO START?</p>
              <h2 className={styles.closingTitle}>
                We&apos;ll help you pick the right{" "}
                <span className="text-orange">first move</span>.
              </h2>
              <p className={styles.closingCopy}>
                A 30-minute conversation — honest, specific, and free. We'll tell
                you where to focus and how to measure it.
              </p>
            </div>
            <Button
              as="link"
              to="/contact"
              variant="primary"
              size="lg"
              withArrow
              className={styles.closingCta}
            >
              Book a conversation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------- ServiceCard subcomponent */

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = serviceIcons[service.slug] ?? Sparkles;
  const accentClass =
    service.accent === "blue"
      ? styles.accentBlue
      : service.accent === "orange"
      ? styles.accentOrange
      : styles.accentNavy;

  const isLinked = Boolean(service.linkTo);

  const Body = (
    <>
      <div className={styles.cardTop}>
        <span className={`${styles.cardIcon} ${accentClass}`}>
          <Icon size={20} strokeWidth={1.75} />
        </span>
        <span className={styles.cardIndex}>{service.index}</span>
      </div>

      <h3 className={styles.cardTitle}>{service.title}</h3>
      <p className={styles.cardSummary}>{service.summary}</p>

      <ul className={styles.cardOutcomes}>
        {service.outcomes.map((o) => (
          <li key={o} className={styles.cardOutcome}>
            {o}
          </li>
        ))}
      </ul>

      <div className={styles.cardFoot}>
        <span className={styles.cardCta}>
          {isLinked ? "Explore" : "Included in every engagement"}
        </span>
        {isLinked && (
          <span className={styles.cardArrow} aria-hidden="true">
            <ArrowUpRight size={16} strokeWidth={2.2} />
          </span>
        )}
      </div>
    </>
  );

  return (
    <article
      className={`${styles.card} ${accentClass}`}
      data-reveal
      data-reveal-delay={Math.min(index * 40, 160)}
    >
      {isLinked && service.linkTo ? (
        <Link to={service.linkTo} className={styles.cardLink}>
          {Body}
        </Link>
      ) : (
        <div className={styles.cardLink} data-static="true">
          {Body}
        </div>
      )}
    </article>
  );
}
