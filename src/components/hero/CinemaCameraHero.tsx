import { useState } from "react";
import ExplodedCamera from "./ExplodedCamera";
import styles from "./CinemaCameraHero.module.css";

interface Props {
  /** PNG/WebP that renders the camera against the sky-blue scene. */
  posterSrc?: string;
  /** Opt-in: play a sky-blue-composited video (WebM, falls back to MP4). */
  playVideo?: boolean;
  webmSrc?: string;
  mp4Src?: string;
  className?: string;
}

/**
 * CinemaCameraHero
 * ----------------
 * Renders the homepage hero camera scene. By default it displays the
 * sky-blue poster image so the hero reads as one continuous atmosphere
 * (no black rectangle, no CSS blend hacks).
 *
 * When a transparent-background or sky-composited video is available, pass
 * `playVideo` and the component will fall back to the poster on load error.
 * If both video and poster fail, it ships the inline SVG exploded-camera
 * illustration — the page never looks broken.
 */
export default function CinemaCameraHero({
  posterSrc = "/images/hero/cinema-camera-poster.png",
  playVideo = false,
  webmSrc = "/videos/cinema-camera-hero.webm",
  mp4Src = "/videos/cinema-camera-hero.mp4",
  className,
}: Props) {
  const [videoFailed, setVideoFailed] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);

  const showVideo = playVideo && !videoFailed;
  const showPoster = !showVideo && !posterFailed;

  return (
    <div className={`${styles.wrap} ${className ?? ""}`} aria-hidden="true">
      {showVideo && (
        <video
          className={styles.media}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={posterSrc}
          onError={() => setVideoFailed(true)}
        >
          <source src={webmSrc} type="video/webm" />
          <source src={mp4Src} type="video/mp4" />
        </video>
      )}

      {showPoster && (
        <img
          className={styles.media}
          src={posterSrc}
          alt=""
          onError={() => setPosterFailed(true)}
        />
      )}

      {!showVideo && !showPoster && <ExplodedCamera className={styles.svg} />}
    </div>
  );
}
