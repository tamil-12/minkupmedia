import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./CinemaIntro.module.css";

interface Props {
  /** Called the moment the frozen frame starts holding — the parent should
   *  begin revealing the hero so its items animate in on top of the frame. */
  onBeginExit: () => void;
  /** Called after the overlay has fully faded out and should unmount. */
  onDone: () => void;
  mp4Src?: string;
  webmSrc?: string;
  posterSrc?: string;
  /** Max duration before auto-dismissing even if the video keeps playing. */
  maxDurationMs?: number;
  /** How long to hold the frozen last frame on top of the home page before fading. */
  holdFrozenMs?: number;
}

type Phase = "playing" | "frozen" | "exiting";

/**
 * CinemaIntro
 * -----------
 * Full-viewport video overlay that plays once per session.
 *
 * Smooth hand-off to the hero:
 * - Video `ended` or fuse → `pause()` on current frame so the last frame holds.
 * - `onBeginExit()` fires immediately, telling the parent to start revealing the
 *   hero. The overlay then fades its opacity 1 → 0 over ~900ms.
 * - `onDone()` fires once the overlay has fully exited (AnimatePresence callback).
 *
 * Resilience:
 * - Autoplay rejection, source errors, or missing videos all skip the overlay.
 * - A hard fuse (default 14s) dismisses even if the video stalls.
 * - A click anywhere dismisses on demand. There is no visible Skip button —
 *   the overlay is short, non-blocking, and discoverable via Escape too.
 * - Reduced-motion is honored by the parent (which skips mounting us).
 */
export default function CinemaIntro({
  onBeginExit,
  onDone,
  mp4Src = "/videos/cinema-camera-hero.mp4",
  webmSrc = "/videos/cinema-camera-hero.webm",
  posterSrc = "/images/hero/cinema-camera-poster.webp",
  // Safety fuse only — kicks in if the video stalls / never fires `ended`.
  // Set well beyond any realistic clip length so the full logo-reveal plays
  // uninterrupted. The real exit is triggered by the `ended` listener below.
  maxDurationMs = 25000,
  // Hold the final frame (company reveal) long enough for the viewer to read
  // it before the overlay fades and the home page takes over.
  holdFrozenMs = 2800,
}: Props) {
  const [phase, setPhase] = useState<Phase>("playing");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fuseRef = useRef<number | null>(null);
  const holdRef = useRef<number | null>(null);
  const dismissedRef = useRef(false);

  const beginExit = () => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;

    if (fuseRef.current !== null) {
      window.clearTimeout(fuseRef.current);
      fuseRef.current = null;
    }

    // Freeze on the current frame so the home page reveal plays over a still.
    try {
      videoRef.current?.pause();
    } catch {
      /* no-op */
    }

    // Enter the frozen phase and tell the parent to begin the home reveal.
    // Hero items animate in during this hold while the frozen frame stays on
    // top; once the hold ends we fade the overlay out to reveal the full home
    // page underneath.
    setPhase("frozen");
    onBeginExit();

    holdRef.current = window.setTimeout(() => {
      setPhase("exiting");
    }, holdFrozenMs);
  };

  // Escape and global clicks dismiss on demand.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") beginExit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Freeze body scroll during the overlay.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Hard fuse — dismiss even if the video stalls or never ends.
  useEffect(() => {
    fuseRef.current = window.setTimeout(beginExit, maxDurationMs);
    return () => {
      if (fuseRef.current !== null) window.clearTimeout(fuseRef.current);
      if (holdRef.current !== null) window.clearTimeout(holdRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxDurationMs]);

  // Video wiring.
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) {
      beginExit();
      return;
    }

    const onError = () => beginExit();
    const onEnded = () => beginExit();
    vid.addEventListener("error", onError);
    vid.addEventListener("ended", onEnded);

    const sources = Array.from(vid.querySelectorAll("source"));
    let unresolved = sources.length;
    const onSourceError = () => {
      unresolved -= 1;
      if (unresolved <= 0) beginExit();
    };
    sources.forEach((s) => s.addEventListener("error", onSourceError));

    const kick = async () => {
      try {
        await vid.play();
      } catch {
        beginExit();
      }
    };
    void kick();

    return () => {
      vid.removeEventListener("error", onError);
      vid.removeEventListener("ended", onEnded);
      sources.forEach((s) => s.removeEventListener("error", onSourceError));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Opacity sequence:
  //   playing → 1 (video plays over everything)
  //   frozen  → 0.995 (visually opaque, but just transparent enough that
  //                    Chrome keeps painting the home page underneath — this
  //                    kills the "frame shutter" that happens when the browser
  //                    skip-paints a fully occluded element then has to catch
  //                    up during the exit fade)
  //   exiting → 0 (single smooth 2s crossfade reveals the home)
  const targetOpacity =
    phase === "playing" ? 1 : phase === "frozen" ? 0.995 : 0;
  const transitionDuration = phase === "exiting" ? 2 : 0.6;
  const isExiting = phase === "exiting";

  return (
    <motion.div
      className={styles.overlay}
      role="dialog"
      aria-label="Intro"
      aria-modal="true"
      onClick={phase === "playing" ? beginExit : undefined}
      initial={{ opacity: 1 }}
      animate={{ opacity: targetOpacity }}
      transition={{ duration: transitionDuration, ease: [0.2, 0.8, 0.2, 1] }}
      onAnimationComplete={() => {
        if (isExiting) onDone();
      }}
      style={{ pointerEvents: phase === "playing" ? "auto" : "none" }}
    >
      <div className={styles.videoMask}>
        <video
          ref={videoRef}
          className={styles.video}
          autoPlay
          muted
          playsInline
          preload="auto"
          poster={posterSrc}
        >
          <source src={webmSrc} type="video/webm" />
          <source src={mp4Src} type="video/mp4" />
        </video>
      </div>

      {/* Subtle vignette so the last frame reads cinematic as it holds. */}
      <div className={styles.vignette} aria-hidden="true" />
    </motion.div>
  );
}
