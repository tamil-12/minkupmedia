import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import styles from "./ServicesHeroVideo.module.css";

interface Props {
  /** Preferred video source (looked up first by the browser). */
  webmSrc?: string;
  /** Fallback MP4 source. */
  mp4Src?: string;
  /** Static poster shown immediately and used as the no-motion fallback. */
  posterSrc?: string;
  /** Optional override for the `object-position` so the subject stays in view. */
  objectPosition?: string;
}

/**
 * Decorative background video for the Services hero.
 *
 * - Always paints a brand gradient first so there's no black flash.
 * - Shows the poster image above the gradient immediately.
 * - Mounts the video only when the user has not requested reduced motion AND the
 *   viewport is wide enough for a video to read well (poster-only on narrow
 *   phones, where motion would compete with the headline).
 * - Fades the video over the poster once a real frame is painted.
 * - If the video errors out, the poster quietly remains.
 */
export default function ServicesHeroVideo({
  webmSrc = "/videos/services-background.webm",
  mp4Src = "/videos/services-background.mp4",
  posterSrc = "/images/services/services-background-poster.webp",
  objectPosition = "70% center",
}: Props) {
  const reduced = useReducedMotion();
  const [canUseVideo, setCanUseVideo] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Decide whether to even mount the video. On narrow screens we stay on the
  // static poster — motion makes the headline harder to read on small viewports.
  useEffect(() => {
    if (reduced) {
      setCanUseVideo(false);
      return;
    }
    const mql = window.matchMedia("(min-width: 768px)");
    const update = () => setCanUseVideo(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [reduced]);

  // Attach lifecycle listeners once we have a video element.
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const onPlaying = () => setPlaying(true);
    const onError = () => setFailed(true);
    vid.addEventListener("playing", onPlaying);
    vid.addEventListener("error", onError);
    return () => {
      vid.removeEventListener("playing", onPlaying);
      vid.removeEventListener("error", onError);
    };
  }, [canUseVideo]);

  const showVideo = canUseVideo && !failed;

  return (
    <div className={styles.wrap} aria-hidden="true">
      {/* Base gradient — paints before anything else loads. No black flash. */}
      <div className={styles.base} />

      {/* Poster always rendered. Fades under the playing video, or stays if the
          video fails to load / isn't mounted (reduced-motion / narrow phone). */}
      <img
        src={posterSrc}
        alt=""
        className={`${styles.poster} ${showVideo && playing ? styles.posterHidden : ""}`}
        loading="eager"
        decoding="async"
        style={{ objectPosition }}
      />

      {showVideo && (
        <video
          ref={videoRef}
          className={`${styles.video} ${playing ? styles.videoVisible : ""}`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={posterSrc}
          style={{ objectPosition }}
        >
          <source src={webmSrc} type="video/webm" />
          <source src={mp4Src} type="video/mp4" />
        </video>
      )}

      {/* Left-side readability wash — keeps the heading/CTA column bright
          without heavily tinting the right-side camera and equipment. */}
      <div className={styles.readability} />
    </div>
  );
}
