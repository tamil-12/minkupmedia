import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp, Target, Workflow, Receipt, BarChart3, Search } from "lucide-react";
import Button from "../components/common/Button";
import { useScrollReveal } from "../hooks/useScrollReveal";
import styles from "./PerformanceMarketing.module.css";

const pillars = [
  {
    icon: Target,
    title: "Paid social",
    body: "Meta, TikTok, LinkedIn — concepting, media buying, and creative volume at the rate the algorithm needs.",
  },
  {
    icon: Search,
    title: "Paid search & SEO",
    body: "Google and Bing search campaigns alongside organic SEO so paid and earned reinforce each other.",
  },
  {
    icon: Workflow,
    title: "Landing pages & funnels",
    body: "Pages engineered for one job: convert. Component-driven, fast, and A/B-ready.",
  },
  {
    icon: TrendingUp,
    title: "Full-funnel strategy",
    body: "Awareness, consideration, conversion, and retention mapped to channels — not vice versa.",
  },
  {
    icon: Receipt,
    title: "Lead generation",
    body: "Lead magnets, forms, CRM wiring, and nurture flows that keep sales teams in demand instead of in meetings.",
  },
  {
    icon: BarChart3,
    title: "Transparent reporting",
    body: "A dashboard your team actually reads — weekly, with notes on what we changed and why.",
  },
];

const sampleMetrics = [
  { label: "Avg. CAC improvement", value: "−38%", note: "across tracked accounts, trailing 12 mo." },
  { label: "ROAS at steady state", value: "4.2×", note: "typical e-commerce range" },
  { label: "Avg. lead quality lift", value: "+62%", note: "B2B sample, 90-day period" },
];

const funnelStages = [
  { stage: "01", title: "Attention", copy: "Reach the right people with creative that stops the scroll." },
  { stage: "02", title: "Interest", copy: "Retarget and nurture with content that teaches, not pitches." },
  { stage: "03", title: "Action", copy: "Drive to a landing page engineered for a single, measurable action." },
  { stage: "04", title: "Loyalty", copy: "Earn repeat customers with sequencing, not re-acquisition tax." },
];

export default function PerformanceMarketing() {
  const revealRef = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={revealRef} className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className="eyebrow">PERFORMANCE MARKETING</p>
            <h1 className={styles.title}>
              <span>TURN ATTENTION</span>
              <br />
              <span>
                INTO <span className="text-orange">ACTION.</span>
              </span>
            </h1>
            <p className={styles.lede}>
              Paid social, paid search, landing pages, lead-gen funnels, SEO, and
              the kind of weekly optimization that compounds. Attention is cheap —
              action is engineered.
            </p>
            <div className={styles.heroCtas}>
              <Button as="link" to="/contact" variant="primary" size="lg" withArrow>
                Plan Your Next Campaign
              </Button>
              <Button as="link" to="/work" variant="secondary" size="lg" withArrow>
                See performance work
              </Button>
            </div>

            <div className={styles.metricRow}>
              {sampleMetrics.map((m) => (
                <div key={m.label} className={styles.metric}>
                  <span className={styles.metricValue}>{m.value}</span>
                  <span className={styles.metricLabel}>{m.label}</span>
                  <span className={styles.metricNote}>{m.note}</span>
                </div>
              ))}
            </div>
            <p className={styles.sampleDisclaimer}>
              * Illustrative benchmarks only — your results depend on your
              category, budget, and starting point. We&apos;ll quote expectations
              against your account before we start.
            </p>
          </div>

          <div className={styles.heroVisual}>
            <motion.div
              className={styles.dashboard}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <img src="/images/services/performance-dashboard.png" alt="" />
            </motion.div>

            <motion.div
              className={styles.chip}
              initial={{ y: 20, opacity: 0, rotate: -4 }}
              animate={{ y: 0, opacity: 1, rotate: -4 }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              <span className={styles.chipDot} />
              <span>+128% CTR vs. baseline · sample</span>
            </motion.div>

            <motion.div
              className={`${styles.chip} ${styles.chipTwo}`}
              initial={{ y: 20, opacity: 0, rotate: 3 }}
              animate={{ y: 0, opacity: 1, rotate: 3 }}
              transition={{ duration: 0.9, delay: 0.35 }}
            >
              <span className={styles.chipDot} data-tone="orange" />
              <span>CAC trending down · wk 6</span>
            </motion.div>
          </div>
        </div>
      </section>

      <section className={styles.pillars}>
        <div className="container">
          <div className={styles.pillarsHead}>
            <h2 className={styles.pillarsTitle}>
              Six levers. <span className="text-italic">Pulled in order.</span>
            </h2>
            <p className={styles.pillarsCopy}>
              Performance isn&apos;t one dashboard — it&apos;s six disciplines
              working as a loop. We work them in order, measure what moved, and
              reprioritize weekly.
            </p>
          </div>

          <div className={styles.pillarsGrid}>
            {pillars.map((p, i) => (
              <div
                key={p.title}
                className={styles.pillar}
                data-reveal
                data-reveal-delay={Math.min(i * 50, 180)}
              >
                <span className={styles.pillarIcon}>
                  <p.icon size={22} />
                </span>
                <h3 className={styles.pillarTitle}>{p.title}</h3>
                <p className={styles.pillarCopy}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.funnel}>
        <div className="container">
          <p className="eyebrow">THE 4-STAGE FUNNEL</p>
          <h2 className={styles.funnelTitle}>
            One flow. <span className="text-orange">Zero handoff gaps.</span>
          </h2>
          <ol className={styles.funnelList}>
            {funnelStages.map((f) => (
              <li key={f.stage} className={styles.funnelItem}>
                <span className={styles.funnelNum}>{f.stage}</span>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.closingBand}>
        <div className="container">
          <div className={styles.closingCard}>
            <div>
              <p className="eyebrow">READY TO TEST, LEARN, SCALE?</p>
              <h2 className={styles.closingTitle}>
                Plan your next campaign in a 30-minute call.
              </h2>
              <p className={styles.closingCopy}>
                Share the account, your KPIs, and the window you&apos;re working
                in. We&apos;ll come back with a specific plan — not a template.
              </p>
            </div>
            <Button as="link" to="/contact" variant="primary" size="lg" withArrow>
              Plan Your Next Campaign <ArrowUpRight size={16} />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
