import { ArrowUpRight, Megaphone, Clapperboard, Users, Sparkles, Palette, LineChart } from "lucide-react";
import { motion } from "framer-motion";
import Button from "../components/common/Button";
import { useScrollReveal } from "../hooks/useScrollReveal";
import Seo from "../seo/Seo";
import { breadcrumbJsonLd, serviceJsonLd } from "../seo/jsonLd";
import styles from "./SocialMediaMarketing.module.css";

const capabilities = [
  {
    icon: Megaphone,
    title: "Strategy & planning",
    body: "Monthly content strategy anchored to a brand voice, visual system, and specific audience outcomes.",
  },
  {
    icon: Clapperboard,
    title: "Reel production",
    body: "Hook-first short-form video — concept, shoot, edit, post. Built for retention, shares, and recall.",
  },
  {
    icon: Palette,
    title: "Design-led posts",
    body: "A grid that looks curated, not catalogued. Templates designed for scale without feeling repetitive.",
  },
  {
    icon: Users,
    title: "Community moderation",
    body: "Human replies, intelligent routing, and tone that matches the brand — not a canned FAQ.",
  },
  {
    icon: Sparkles,
    title: "Campaign concepts",
    body: "Standalone launches, seasonal pushes, and reactive moments that feel designed, not pasted.",
  },
  {
    icon: LineChart,
    title: "Performance review",
    body: "Monthly deep-dives on what performed, why, and what we're changing in the next cycle.",
  },
];

const cadence = [
  { day: "MON", block: "Planning · Scripts", color: "blue" },
  { day: "TUE", block: "Shoot · Studio day", color: "orange" },
  { day: "WED", block: "Edit · Reels", color: "blue" },
  { day: "THU", block: "Design · Grid", color: "navy" },
  { day: "FRI", block: "Publish · Community", color: "orange" },
];

export default function SocialMediaMarketing() {
  const revealRef = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={revealRef} className={styles.page}>
      <Seo
        title="Social Media Marketing & Management"
        description="End-to-end social media marketing — strategy, content planning, reel production, account management, campaign concepts, and community moderation. Make your brand part of the daily conversation."
        path="/services/social-media-marketing"
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "Social Media Marketing", path: "/services/social-media-marketing" },
          ]),
          serviceJsonLd("social-media-marketing") ?? {},
        ]}
      />
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className="eyebrow">SOCIAL MEDIA MARKETING</p>
            <h1 className={styles.title}>
              <span>MAKE YOUR BRAND</span>
              <br />
              <span>
                PART OF THE <span className="text-blue">CONVERSATION.</span>
              </span>
            </h1>
            <p className={styles.lede}>
              Full-service social media — strategy, content planning, reel
              production, account management, campaign concepts, and the
              community moderation that quietly keeps a brand loved.
            </p>
            <div className={styles.heroCtas}>
              <Button as="link" to="/contact" variant="primary" size="lg" withArrow>
                Discuss Social Media
              </Button>
              <Button as="link" to="/work" variant="secondary" size="lg" withArrow>
                See social work
              </Button>
            </div>
          </div>

          <div className={styles.heroCollage}>
            <motion.div
              className={`${styles.collageTile} ${styles.collageMain}`}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <img
                src="/images/services/social-media.webp"
                alt="Social media content frame showing a reel still from a Minkup campaign"
                width={1200}
                height={1500}
                loading="lazy"
                decoding="async"
              />
              <span className={styles.collageTag}>REEL · 00:12</span>
            </motion.div>

            <motion.div
              className={`${styles.collageTile} ${styles.collageSide} ${styles.collageTileSurface}`}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.2, 0.8, 0.2, 1] }}
              aria-hidden="true"
            >
              <div className={styles.gridNine}>
                {Array.from({ length: 9 }).map((_, k) => (
                  <span key={k} />
                ))}
              </div>
              <span className={styles.collageTag}>GRID · 1 of 9</span>
            </motion.div>

            <motion.div
              className={`${styles.collageTile} ${styles.collageMini} ${styles.collageTileSurface}`}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.16, ease: [0.2, 0.8, 0.2, 1] }}
              aria-hidden="true"
            >
              <div className={styles.storyRing} />
              <span className={styles.collageTag}>STORY</span>
            </motion.div>

            <div className={styles.collageBadge}>
              <span className={styles.collageBadgeStat}>+312%</span>
              <span className={styles.collageBadgeLabel}>
                reach lift
                <br />
                <em>client campaign</em>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.capsSection}>
        <div className="container">
          <div className={styles.capsHead}>
            <h2 className={styles.capsTitle}>
              Six disciplines, <span className="text-italic">one voice</span>.
            </h2>
            <p className={styles.capsCopy}>
              Every social engagement combines these — because a social presence
              that only ships reels, or only ships copy, feels partial. We work the
              whole system.
            </p>
          </div>

          <div className={styles.capsGrid}>
            {capabilities.map((c, i) => (
              <div
                key={c.title}
                className={styles.capCard}
                data-reveal
                data-reveal-delay={Math.min(i * 50, 180)}
              >
                <span className={styles.capIcon}>
                  <c.icon size={22} />
                </span>
                <h3 className={styles.capTitle}>{c.title}</h3>
                <p className={styles.capBody}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cadenceSection}>
        <div className="container">
          <div className={styles.cadenceHead}>
            <p className="eyebrow eyebrow--contrast">WEEKLY CADENCE</p>
            <h2 className={styles.cadenceTitle}>
              A rhythm you can plan the rest of the business around.
            </h2>
            <p className={styles.cadenceCopy}>
              Our working rhythm. We adapt around studio shoots, product
              launches, and travel — but the beat stays consistent.
            </p>
          </div>

          <ul className={styles.cadenceList}>
            {cadence.map((c) => (
              <li key={c.day} className={styles.cadenceItem} data-accent={c.color}>
                <span className={styles.cadenceDay}>{c.day}</span>
                <span className={styles.cadenceBlock}>{c.block}</span>
                <ArrowUpRight size={18} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.proof}>
        <div className="container">
          <div className={styles.proofGrid}>
            <div className={`${styles.proofImage} ${styles.proofImageSurface}`} aria-hidden="true">
              <div className={styles.proofMark}>
                <span>SOCIAL</span>
                <span>STUDIO</span>
              </div>
            </div>
            <div className={styles.proofBody}>
              <p className="eyebrow">WHAT TO EXPECT</p>
              <h2 className={styles.proofTitle}>
                You get a <span className="text-blue">studio</span>, not a vendor.
              </h2>
              <p className={styles.proofCopy}>
                We embed into your brand like an in-house team — a creative lead, a
                content producer, an editor, and a strategist. One channel, one
                calendar, one standard.
              </p>
              <ul className={styles.proofList}>
                <li>12–20 pieces of content per month</li>
                <li>2–4 reels per week, scripted and shot by us</li>
                <li>Monthly performance review with next-cycle plan</li>
                <li>Transparent pricing — no surprise retainers</li>
              </ul>
              <Button as="link" to="/contact" variant="navy" size="lg" withArrow>
                Discuss Social Media
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
