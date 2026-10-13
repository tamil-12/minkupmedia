import styles from "./WalkingMascot.module.css";

/**
 * Decorative mascot that walks across its container every ~20 seconds. The
 * character is a tiny SVG cat with four legs that swap positions via a CSS
 * step() animation to give the illusion of walking. Zero runtime deps, zero
 * images, respects `prefers-reduced-motion`.
 *
 * Drop this component inside any `position: relative` container and it will
 * pin to the bottom edge and walk left → right on a loop.
 */
export default function WalkingMascot() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.walker}>
        <svg
          className={styles.cat}
          viewBox="0 0 72 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Tail — gently sways */}
          <path
            className={styles.tail}
            d="M12 26 Q4 20 2 10"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Body */}
          <ellipse cx="36" cy="28" rx="22" ry="9" fill="currentColor" />
          {/* Head */}
          <circle cx="56" cy="22" r="9" fill="currentColor" />
          {/* Ears */}
          <path d="M50 15 L52 7 L55 14 Z" fill="currentColor" />
          <path d="M57 14 L60 7 L62 15 Z" fill="currentColor" />
          {/* Eye */}
          <circle cx="58" cy="22" r="1.2" fill="#0b1a2e" />
          {/* Nose */}
          <circle cx="63" cy="23" r="0.9" fill="var(--mk-orange)" />
          {/* Four legs — the back pair + front pair alternate via CSS */}
          <g className={styles.legs}>
            <rect
              className={`${styles.leg} ${styles.legBackA}`}
              x="18"
              y="35"
              width="3"
              height="10"
              rx="1.5"
              fill="currentColor"
            />
            <rect
              className={`${styles.leg} ${styles.legBackB}`}
              x="25"
              y="35"
              width="3"
              height="10"
              rx="1.5"
              fill="currentColor"
            />
            <rect
              className={`${styles.leg} ${styles.legFrontA}`}
              x="45"
              y="35"
              width="3"
              height="10"
              rx="1.5"
              fill="currentColor"
            />
            <rect
              className={`${styles.leg} ${styles.legFrontB}`}
              x="52"
              y="35"
              width="3"
              height="10"
              rx="1.5"
              fill="currentColor"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
