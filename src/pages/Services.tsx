import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  CheckCircle2,
  Megaphone,
  LineChart,
  Film,
  PenTool,
  Search,
  Users,
  Target,
  Sparkles,
  Workflow,
} from "lucide-react";
import Button from "../components/common/Button";
import ServicesHeroVideo from "../components/hero/ServicesHeroVideo";
import { services, type Service } from "../data/services";
import { useScrollReveal } from "../hooks/useScrollReveal";
import styles from "./Services.module.css";

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
  { value: "01", label: "Integrated team" },
  { value: "24h", label: "Response rhythm" },
  { value: "365d", label: "Growth focus" },
];

const workflow = [
  {
    title: "Diagnose",
    copy: "We map your audience, offer, content gaps, and conversion path before making noise.",
  },
  {
    title: "Build",
    copy: "Creative, media, pages, tracking, and reporting are produced as one operating system.",
  },
  {
    title: "Optimize",
    copy: "Every month tightens the message, spend, visuals, and funnel from real campaign data.",
  },
];

export default function Services() {
  const revealRef = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={revealRef} className={styles.page}>
      <ServicesHeroVideo />

      <section className={styles.hero}>
        <div className={`container ${styles.heroShell}`}>
          <div className={styles.heroContent}>
            <p className="eyebrow">OUR SERVICES</p>
            <h1 className={styles.heroTitle}>
              <span>Marketing systems</span>
              <span>
                built for <span className="text-blue">attention</span> and{" "}
                <span className="text-orange">action.</span>
              </span>
            </h1>
            <p className={styles.heroLede}>
              Strategy, content, paid media, design, SEO, creators, and lead
              generation under one roof. We connect the work so your brand does
              not feel like seven separate vendors taped together.
            </p>

            <div className={styles.heroActions}>
              <Button as="link" to="/contact" variant="primary" size="lg" withArrow>
                Start a project
              </Button>
              <Button as="link" to="/work" variant="secondary" size="lg">
                View work
              </Button>
            </div>

            <ul className={styles.statRow}>
              {stats.map((s) => (
                <li key={s.label} className={styles.statChip}>
                  <span className={styles.statValue}>{s.value}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className={styles.heroPanel} aria-label="Services overview">
            <div className={styles.panelHeader}>
              <span className={styles.panelIcon}>
                <Workflow size={20} strokeWidth={1.9} />
              </span>
              <span>Full-stack service map</span>
            </div>
            <div className={styles.serviceOrbit}>
              {services.map((service, index) => {
                const Icon = serviceIcons[service.slug] ?? Sparkles;
                return (
                  <Link
                    key={service.slug}
                    to={service.linkTo ?? "/contact"}
                    className={styles.orbitItem}
                    style={{ "--i": index } as React.CSSProperties}
                  >
                    <Icon size={17} strokeWidth={1.9} />
                    <span>{service.shortTitle}</span>
                  </Link>
                );
              })}
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.workflowSection}>
        <div className={`container ${styles.workflowGrid}`}>
          {workflow.map((step, index) => (
            <article
              key={step.title}
              className={styles.workflowCard}
              data-reveal
              data-reveal-delay={index * 70}
            >
              <span className={styles.workflowIndex}>0{index + 1}</span>
              <h2>{step.title}</h2>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.gridSection}>
        <div className="container">
          <div className={styles.gridHead}>
            <div>
              <p className="eyebrow">WHAT WE DO</p>
              <h2 className={styles.gridTitle}>
                One connected stack for creative growth.
              </h2>
            </div>
            <p className={styles.gridIntro}>
              Pick one service, combine a few, or hand us the whole growth
              engine. Every discipline is designed to feed the next one.
            </p>
          </div>

          <div className={styles.serviceGrid}>
            {services.map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.closing}>
        <div className="container">
          <div className={styles.closingCard}>
            <div className={styles.closingBody}>
              <p className="eyebrow">READY WHEN YOU ARE</p>
              <h2 className={styles.closingTitle}>
                Bring us a goal. We will build the{" "}
                <span className="text-orange">route to market</span>.
              </h2>
              <p className={styles.closingCopy}>
                The first conversation is direct: what to fix, what to launch,
                what to measure, and which services should move first.
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
          <Icon size={22} strokeWidth={1.75} />
        </span>
        <span className={styles.cardIndex}>{service.index}</span>
      </div>

      <h3 className={styles.cardTitle}>{service.title}</h3>
      <p className={styles.cardSummary}>{service.summary}</p>
      <p className={styles.cardDescription}>{service.description}</p>

      <ul className={styles.cardOutcomes}>
        {service.deliverables.slice(0, 4).map((o) => (
          <li key={o} className={styles.cardOutcome}>
            <CheckCircle2 size={14} strokeWidth={2.1} />
            {o}
          </li>
        ))}
      </ul>

      <div className={styles.cardFoot}>
        <span className={styles.cardCta}>
          {isLinked ? "Explore service" : "Build into your plan"}
        </span>
        <span className={styles.cardArrow} aria-hidden="true">
          <ArrowUpRight size={16} strokeWidth={2.2} />
        </span>
      </div>
    </>
  );

  return (
    <article
      className={`${styles.card} ${accentClass}`}
      data-reveal
      data-reveal-delay={Math.min(index * 55, 220)}
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
