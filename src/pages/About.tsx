import { MapPin, Phone, Mail } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import Button from "../components/common/Button";
import { siteSettings } from "../data/siteSettings";
import Seo from "../seo/Seo";
import { breadcrumbJsonLd } from "../seo/jsonLd";
import styles from "./About.module.css";

const principles = [
  {
    n: "01",
    title: "Strategy before execution.",
    body: "Nothing ships without a clear thesis. We only start making things once we agree on what the thing is for.",
  },
  {
    n: "02",
    title: "Taste is a discipline.",
    body: "The small decisions compound. Spacing, pacing, color, typography — we obsess about them so the final work feels effortless.",
  },
  {
    n: "03",
    title: "Measure or move on.",
    body: "Creative work with no yardstick is a hobby. Every project ends with a scorecard — and the next quarter's bet.",
  },
  {
    n: "04",
    title: "One team, one accountability.",
    body: "You get a single creative lead who owns the output end-to-end. No hand-offs, no finger-pointing, no slide decks about slide decks.",
  },
];

const process = [
  {
    n: "01",
    title: "Discovery",
    sub: "Week 1",
    body: "Deep dive into brand, audience, and category. Interviews, audits, and a sharp set of hypotheses.",
  },
  {
    n: "02",
    title: "Strategy",
    sub: "Week 2",
    body: "Positioning, messaging, channel plan, and the KPIs we'll measure against.",
  },
  {
    n: "03",
    title: "Creative sprint",
    sub: "Weeks 3–5",
    body: "Concept, script, design, shoot, edit. Daily reviews. No committees — one empowered lead on your side.",
  },
  {
    n: "04",
    title: "Launch & learn",
    sub: "Weeks 6+",
    body: "Phase one goes live. We measure, iterate, and plan the next cycle before this one ends.",
  },
];

export default function About() {
  const revealRef = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={revealRef} className={styles.page}>
      <Seo
        title="About — Our Approach & Leadership"
        description="A creative marketing agency that treats strategy and craft as the same discipline. Based in Coimbatore, led by Ranjith Kumar M and Boopathi Raj K. Our principles, process, and leadership."
        path="/about"
        jsonLd={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <section className={styles.hero}>
        <div className="container">
          <p className="eyebrow">ABOUT MINKUP</p>
          <h1 className={styles.title}>
            <span>GOOD CREATIVE</span>
            <br />
            <span>
              STARTS WITH <span className="text-blue">PURPOSE.</span>
            </span>
          </h1>
          <div className={styles.heroGrid}>
            <p className={styles.lede}>
              Minkup Media Technology is a creative marketing agency that treats
              strategy and craft as the same discipline. We build identities,
              campaigns, films, and performance engines for brands that want to be
              <em> remembered</em> — not just seen.
            </p>
            <div className={styles.heroCard}>
              <span className={styles.heroArrow} aria-hidden="true">↗</span>
              <p>
                We&apos;re named for the arrow in our mark — the one pointing up
                and to the right. Everything we do is in service of that direction.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.philosophy}>
        <div className="container">
          <div className={styles.philGrid}>
            <div>
              <p className="eyebrow">PHILOSOPHY</p>
              <h2 className={styles.philTitle}>
                Attention is cheap. <br />
                <span className="text-italic">Memory is earned.</span>
              </h2>
            </div>
            <p className={styles.philCopy}>
              Most marketing optimizes for the next click. We optimize for the next
              time your customer thinks about your category. That means harder
              briefs, slower first drafts, and work that compounds — because the
              brand people recall is the brand people choose.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.principles}>
        <div className="container">
          <div className={styles.principlesHead}>
            <p className="eyebrow">OUR PRINCIPLES</p>
            <h2 className={styles.principlesTitle}>
              Four rules we won&apos;t break.
            </h2>
          </div>

          <div className={styles.principlesGrid}>
            {principles.map((p, i) => (
              <article
                key={p.n}
                className={styles.principle}
                data-reveal
                data-reveal-delay={Math.min(i * 60, 180)}
              >
                <span className={styles.principleN}>{p.n}</span>
                <h3 className={styles.principleTitle}>{p.title}</h3>
                <p>{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.processSection}>
        <div className="container">
          <p className="eyebrow eyebrow--contrast">HOW WE WORK</p>
          <h2 className={styles.processTitle}>
            A clear process. <span className="text-italic">Fewer surprises.</span>
          </h2>

          <ol className={styles.processList}>
            {process.map((step, i) => (
              <li
                key={step.n}
                className={styles.processItem}
                data-reveal
                data-reveal-delay={Math.min(i * 60, 180)}
              >
                <div className={styles.processNumber}>
                  <span>{step.n}</span>
                  <small>{step.sub}</small>
                </div>
                <div className={styles.processBody}>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.leadership}>
        <div className="container">
          <div className={styles.leadershipHead}>
            <p className="eyebrow">LEADERSHIP · OFFICE</p>
            <h2 className={styles.leadershipTitle}>
              Who you&apos;ll <span className="text-orange">work with</span>, and where to find us.
            </h2>
          </div>

          <div className={styles.leadershipGrid}>
            <div className={styles.directorList}>
              {siteSettings.directors.map((d, i) => (
                <article
                  key={d.name}
                  className={styles.directorCard}
                  data-reveal
                  data-reveal-delay={Math.min(i * 60, 180)}
                >
                  <span className={styles.directorInitial}>
                    {d.name
                      .split(" ")
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <div>
                    <h3 className={styles.directorName}>{d.name}</h3>
                    <p className={styles.directorRole}>{d.role}</p>
                  </div>
                </article>
              ))}
            </div>

            <aside className={styles.officeCard}>
              <h3 className={styles.officeTitle}>Office</h3>
              <a
                className={styles.officeAddress}
                href={siteSettings.address.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin size={16} />
                <span>
                  {siteSettings.companyName}
                  <br />
                  {siteSettings.address.line1}
                  <br />
                  {siteSettings.address.line2}
                  <br />
                  {siteSettings.address.city}, {siteSettings.address.state}{" "}
                  {siteSettings.address.pincode}
                </span>
              </a>

              <div className={styles.officeContact}>
                {siteSettings.contactPhones.map((num) => (
                  <a
                    key={num}
                    href={`tel:${num.replace(/\s+/g, "")}`}
                    className={styles.officeLink}
                  >
                    <Phone size={14} /> {num}
                  </a>
                ))}
                <a
                  href={`mailto:${siteSettings.contactEmailPlaceholder}`}
                  className={styles.officeLink}
                >
                  <Mail size={14} /> {siteSettings.contactEmailPlaceholder}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.images}>
        <div className="container-xl">
          <div className={styles.imageGrid}>
            <img
              src="/images/about/global.webp"
              alt="Minkup team working across global time zones"
              className={styles.imageA}
              width={1600}
              height={1000}
              loading="lazy"
              decoding="async"
            />
            <img
              src="/images/about/mountains.webp"
              alt="Studio location — mountain landscape near Coimbatore"
              className={styles.imageB}
              width={1200}
              height={1500}
              loading="lazy"
              decoding="async"
            />
          </div>
          <blockquote className={styles.quote}>
            <span className={styles.quoteMark}>"</span>
            <p>
              Every brand we work with becomes an argument for a different way of
              marketing — slower first drafts, sharper edits, work that earns the
              right to be seen a second time.
            </p>
            <footer>— Studio ethos · Minkup</footer>
          </blockquote>
        </div>
      </section>

      <section className={styles.ctaBand}>
        <div className="container">
          <div className={styles.ctaCard}>
            <div>
              <p className="eyebrow">LET&apos;S WORK TOGETHER</p>
              <h2 className={styles.ctaTitle}>
                Tell us about your brand. We&apos;ll tell you what we&apos;d do.
              </h2>
            </div>
            <Button as="link" to="/contact" variant="primary" size="lg" withArrow>
              Let&apos;s Work Together
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
