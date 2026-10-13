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
 * - Plays once and holds on the final frame instead of looping.
 * - If the video errors out, the poster quietly remains.
 */
export default function ServicesHeroVideo({
  webmSrc,
  mp4Src = "/videos/services-background.mp4",
  posterSrc,
  objectPosition = "70% center",
}: Props) {
  const reduced = useReducedMotion();
  const [canUseVideo, setCanUseVideo] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Mount the video on every viewport (the services page is a video-first
  // design per spec). The only skip condition left is prefers-reduced-motion
  // — users on that setting still get the poster/gradient base.
  useEffect(() => {
    setCanUseVideo(!reduced);
  }, [reduced]);

  // Attach lifecycle listeners once we have a video element.
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const onPlaying = () => setPlaying(true);
    const onEnded = () => vid.pause();
    const onError = () => setFailed(true);
    vid.addEventListener("playing", onPlaying);
    vid.addEventListener("ended", onEnded);
    vid.addEventListener("error", onError);
    return () => {
      vid.removeEventListener("playing", onPlaying);
      vid.removeEventListener("ended", onEnded);
      vid.removeEventListener("error", onError);
    };
  }, [canUseVideo]);

  const showVideo = canUseVideo && !failed;

  return (
    <div className={styles.wrap} aria-hidden="true">
      {/* Base gradient — paints before anything else loads. No black flash. */}
      <div className={styles.base} />

      {/* Poster is optional — rendered only when a path is provided to avoid
          404 noise. The .base gradient always paints first so there is no
          black flash while the video is downloading. */}
      {posterSrc && (
        <img
          src={posterSrc}
          alt=""
          className={`${styles.poster} ${showVideo && playing ? styles.posterHidden : ""}`}
          loading="eager"
          decoding="async"
          style={{ objectPosition }}
        />
      )}

      {showVideo && (
        <video
          ref={videoRef}
          className={`${styles.video} ${playing ? styles.videoVisible : ""}`}
          autoPlay
          muted
          playsInline
          preload="metadata"
          {...(posterSrc ? { poster: posterSrc } : {})}
          style={{ objectPosition }}
        >
          {webmSrc && <source src={webmSrc} type="video/webm" />}
          <source src={mp4Src} type="video/mp4" />
        </video>
      )}

      {/* Left-side readability wash — keeps the heading/CTA column bright
          without heavily tinting the right-side camera and equipment. */}
      <div className={styles.readability} />
    </div>
  );
}
