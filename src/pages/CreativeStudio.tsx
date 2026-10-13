import { motion } from "framer-motion";
import { Play, ArrowUpRight, Film, PenTool, Camera, Rocket } from "lucide-react";
import Button from "../components/common/Button";
import VideoPlayer from "../components/common/VideoPlayer";
import { useScrollReveal } from "../hooks/useScrollReveal";
import Seo from "../seo/Seo";
import { breadcrumbJsonLd } from "../seo/jsonLd";
import styles from "./CreativeStudio.module.css";

const disciplines = [
  {
    icon: Film,
    title: "Video & reels",
    body: "Short-form hooks and brand films — paced, scored, and shaped around retention.",
  },
  {
    icon: PenTool,
    title: "Graphic design",
    body: "Identities, campaign toolkits, posters, packaging. Design systems built to be used, not admired.",
  },
  {
    icon: Camera,
    title: "Direction & stills",
    body: "Art direction, concepting, and stills work that becomes the backbone of every campaign asset.",
  },
  {
    icon: Rocket,
    title: "Campaign content",
    body: "Launch moments, seasonal pushes, and influencer collabs produced end-to-end.",
  },
];

const captions = [
  {
    kind: "Brand Film · 02:14",
    title: "Northline Hotel Group",
    note: "Directed · Shot · Edited",
  },
  {
    kind: "Launch Film · 01:40",
    title: "Ascend Athletic Wear",
    note: "Concepted · Produced",
  },
  {
    kind: "Reel Series · 00:28",
    title: "Lumen Coffee Collective",
    note: "Scripted · Edited · Scored",
  },
];

export default function CreativeStudio() {
  const revealRef = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={revealRef} className={styles.page}>
      <Seo
        title="Creative Studio — Film, Design, Direction"
        description="Video, design, and direction under one roof. We write, shoot, cut, score, and ship — all in-house. Films that get remembered, grids that look designed, campaigns that behave like a brand."
        path="/creative-studio"
        jsonLd={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Creative Studio", path: "/creative-studio" },
        ])}
      />
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className="eyebrow">THE CREATIVE STUDIO</p>
          <h1 className={styles.title}>
            <span>STORIES DESIGNED</span>
            <br />
            <span>
              TO BE <span className="text-blue">REMEMBERED.</span>
            </span>
          </h1>
          <p className={styles.lede}>
            Video, design, and direction under one roof. We write, shoot, cut,
            score, and ship — all in-house. Films that get remembered. Grids that
            look designed. Campaigns that behave like a brand.
          </p>
          <div className={styles.heroCtas}>
            <Button as="link" to="/contact" variant="primary" size="lg" withArrow>
              Start a Creative Project
            </Button>
            <a href="#showreel" className={styles.playInline}>
              <span className={styles.playInlineDot}>
                <Play size={14} fill="currentColor" strokeWidth={0} />
              </span>
              Watch the showreel
            </a>
          </div>
        </div>

        <div className={styles.heroImageRow}>
          <motion.img
            src="/images/creative-studio/sunset.webp"
            alt="Cinematic studio set at golden hour — Minkup Media Technology creative studio"
            className={styles.heroImageA}
            width={1600}
            height={2000}
            loading="eager"
            decoding="async"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          />
          <motion.div
            className={`${styles.heroImageB} ${styles.heroImageMark}`}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.2, 0.8, 0.2, 1] }}
            aria-hidden="true"
          >
            <span className={styles.heroImageMarkNum}>09</span>
            <span className={styles.heroImageMarkLabel}>FILMS /<br />2024</span>
          </motion.div>
        </div>
      </section>

      <section id="showreel" className={styles.showreel}>
        <div className="container-xl">
          <div className={styles.showreelHead}>
            <div>
              <p className="eyebrow eyebrow--contrast">THE SHOWREEL · 2025</p>
              <h2 className={styles.showreelTitle}>
                12 seconds. <span className="text-italic">One brand moment.</span>
              </h2>
            </div>
            <span className={styles.showreelHint}>
              Hover to control playback
            </span>
          </div>

          <VideoPlayer
            sources={[{ src: "/videos/showreel.mp4", type: "video/mp4" }]}
            poster="/images/creative-studio/showreel.webp"
            title="Minkup Studio — Showreel 2025"
            caption="Direction · Editing · Design"
            autoPlay
            loop
            ratio="16 / 9"
            maskWatermark
          />

          <ul className={styles.captions}>
            {captions.map((c) => (
              <li key={c.title} className={styles.captionItem}>
                <span className={styles.captionKind}>{c.kind}</span>
                <span className={styles.captionTitle}>{c.title}</span>
                <span className={styles.captionNote}>{c.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.disciplines}>
        <div className="container">
          <div className={styles.discHead}>
            <h2 className={styles.discTitle}>
              Four crafts, <span className="text-orange">one team</span>.
            </h2>
            <p className={styles.discCopy}>
              Our studio practice is organized around four core disciplines.
              They&apos;re rarely booked in isolation — the best work lives at the
              intersection.
            </p>
          </div>

          <div className={styles.discGrid}>
            {disciplines.map((d, i) => (
              <div
                key={d.title}
                className={styles.discCard}
                data-reveal
                data-reveal-delay={Math.min(i * 60, 180)}
              >
                <span className={styles.discIcon}>
                  <d.icon size={22} />
                </span>
                <h3>{d.title}</h3>
                <p>{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.gallery}>
        <div className="container-xl">
          <div className={styles.galleryHead}>
            <p className="eyebrow">RECENT STUDIO WORK</p>
            <h2 className={styles.galleryTitle}>
              Frames we&apos;re proud of.
            </h2>
          </div>

          <div className={styles.galleryGrid}>
            <figure className={`${styles.gTile} ${styles.gLarge} ${styles.gSurface}`} data-accent="warm">
              <span className={styles.gMarkKind}>FILM</span>
              <span className={styles.gMarkNum}>01</span>
              <figcaption>
                <strong>Golden hour mood piece</strong>
                <span>Studio set, 85mm · directed in-house</span>
              </figcaption>
            </figure>

            <figure className={`${styles.gTile} ${styles.gSurface}`} data-accent="blue">
              <span className={styles.gMarkKind}>LAUNCH</span>
              <span className={styles.gMarkNum}>02</span>
              <figcaption>
                <strong>Product mood launch</strong>
                <span>Composited and animated · campaign</span>
              </figcaption>
            </figure>

            <figure className={`${styles.gTile} ${styles.gSurface}`} data-accent="navy">
              <span className={styles.gMarkKind}>SOCIAL</span>
              <span className={styles.gMarkNum}>03</span>
              <figcaption>
                <strong>Culture-in-motion series</strong>
                <span>Social sequence · hero + 9 cutdowns</span>
              </figcaption>
            </figure>

            <figure className={`${styles.gTile} ${styles.gWide} ${styles.gSurface}`} data-accent="orange">
              <span className={styles.gMarkKind}>KEY VISUAL</span>
              <span className={styles.gMarkNum}>04</span>
              <figcaption>
                <strong>Launch key visual</strong>
                <span>Hero still across OOH + social</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className={styles.ctaBand}>
        <div className="container">
          <div className={styles.ctaCard}>
            <div>
              <p className="eyebrow">BRING YOUR NEXT CAMPAIGN TO THE STUDIO</p>
              <h2 className={styles.ctaTitle}>
                Have an idea? We&apos;ll help you make it unforgettable.
              </h2>
              <p className={styles.ctaCopy}>
                From a concept scribble to a full campaign — the studio is yours.
                Share the brief and we&apos;ll come back with a plan.
              </p>
            </div>
            <Button as="link" to="/contact" variant="primary" size="lg" withArrow>
              Start a Creative Project <ArrowUpRight size={16} />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
