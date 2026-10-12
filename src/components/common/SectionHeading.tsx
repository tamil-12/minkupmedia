import { ReactNode } from "react";
import styles from "./SectionHeading.module.css";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  contrast?: boolean;
  indexLabel?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  contrast,
  indexLabel,
}: Props) {
  return (
    <header
      className={`${styles.heading} ${styles[`align-${align}`]} ${contrast ? styles.contrast : ""}`}
    >
      {indexLabel && <div className={styles.index}>{indexLabel}</div>}
      {eyebrow && (
        <p className={`eyebrow ${contrast ? "eyebrow--contrast" : ""}`}>{eyebrow}</p>
      )}
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
    </header>
  );
}
