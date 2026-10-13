import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  projects,
  projectCategories,
  type Project,
  type ProjectCategory,
} from "../data/projects";
import Button from "../components/common/Button";
import Seo from "../seo/Seo";
import { breadcrumbJsonLd } from "../seo/jsonLd";
import styles from "./Work.module.css";

type Filter = "all" | ProjectCategory;

export default function Work() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <div className={styles.page}>
      <Seo
        title="Our Work — Selected Projects"
        description="A selection of brand films, social campaigns, performance work, and creative systems built by Minkup Media Technology. Case studies across branding, video, social media, and performance marketing."
        path="/work"
        jsonLd={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ])}
      />
      <section className={styles.hero}>
        <div className="container">
          <p className="eyebrow">PORTFOLIO · 2022 — 2025</p>
          <h1 className={styles.title}>
            <span>IDEAS MADE</span>
            <br />
            <span>
              TO <span className="text-blue">MOVE</span>{" "}
              <span className="text-orange">PEOPLE.</span>
            </span>
          </h1>
          <p className={styles.lede}>
            A selection of creative concepts, visual stories, and marketing work
            designed to connect brands with people. Explore by discipline below.
          </p>
        </div>
      </section>

      <section className={styles.filterBar}>
        <div className="container">
          <div className={styles.filters} role="tablist" aria-label="Project categories">
            {projectCategories.map((c) => (
              <button
                key={c.value}
                role="tab"
                aria-selected={filter === c.value}
                className={`${styles.filterChip} ${filter === c.value ? styles.active : ""}`}
                onClick={() => setFilter(c.value)}
              >
                {c.label}
                <span className={styles.filterCount}>
                  {c.value === "all"
                    ? projects.length
                    : projects.filter((p) => p.category === c.value).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.grid}>
        <div className="container">
          <div className={styles.editorialGrid}>
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <ProjectTile key={p.slug} project={p} index={i} />
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div className={styles.empty}>
              <h3>No projects in this category yet.</h3>
              <p>We're always working on something — check back soon or get in touch.</p>
            </div>
          )}
        </div>
      </section>

      <section className={styles.closing}>
        <div className="container">
          <div className={styles.closingCard}>
            <div>
              <p className="eyebrow">HAVE A PROJECT IN MIND?</p>
              <h2 className={styles.closingTitle}>
                We&apos;d love to be your next case study.
              </h2>
            </div>
            <Button as="link" to="/contact" variant="primary" size="lg" withArrow>
              Start a Project
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProjectTile({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      layout
      className={styles.tile}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.25), ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className={styles.cover}>
        <img
          src={project.cover}
          alt={`${project.title} — ${project.client} · ${project.categoryLabel}`}
          width={1200}
          height={900}
          loading={index < 2 ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={index === 0 ? "high" : "auto"}
        />
      </div>
      <div className={styles.meta}>
        <span className={styles.metaCat}>{project.categoryLabel}</span>
        <h3 className={styles.metaTitle}>{project.title}</h3>
        <p className={styles.metaDesc}>{project.summary}</p>
        <div className={styles.metaRow}>
          <span className={styles.metaClient}>
            {project.client} · {project.year}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
