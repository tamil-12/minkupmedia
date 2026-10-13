import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import styles from "./VideoPlayer.module.css";

interface Props {
  sources: { src: string; type: string }[];
  poster?: string;
  title?: string;
  caption?: string;
  autoPlay?: boolean;
  loop?: boolean;
  ratio?: string;
  className?: string;
  /**
   * Overlay a Minkup brand plate on the bottom-right corner, covering any
   * source-video watermark (Gemini / Sora sparkle) with an intentional
   * creative sign-off. No video crop — the frame stays untouched.
   */
  maskWatermark?: boolean;
}

export default function VideoPlayer({
  sources,
  poster,
  title,
  caption,
  autoPlay,
  loop,
  ratio = "16 / 9",
  className,
  maskWatermark = false,
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState<boolean>(!!autoPlay);
  const [muted, setMuted] = useState<boolean>(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onLoaded = () => setLoaded(true);
    vid.addEventListener("play", onPlay);
    vid.addEventListener("pause", onPause);
    vid.addEventListener("loadeddata", onLoaded);
    return () => {
      vid.removeEventListener("play", onPlay);
      vid.removeEventListener("pause", onPause);
      vid.removeEventListener("loadeddata", onLoaded);
    };
  }, []);

  const toggle = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play().catch(() => {
        /* autoplay blocked — user interaction will re-enable */
      });
    } else {
      vid.pause();
    }
  };

  const toggleMute = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setMuted(vid.muted);
  };

  return (
    <figure
      className={`${styles.player} ${maskWatermark ? styles.masked : ""} ${className ?? ""}`}
      style={{ aspectRatio: ratio }}
    >
      <div className={styles.frame}>
        <video
          ref={videoRef}
          className={styles.video}
          poster={poster}
          autoPlay={autoPlay}
          loop={loop}
          muted
          playsInline
          preload="metadata"
        >
          {sources.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>

        {!loaded && poster && (
          <div className={styles.placeholder}>
            <img src={poster} alt="" className={styles.poster} />
          </div>
        )}
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.playBtn}
          onClick={toggle}
          aria-label={playing ? "Pause video" : "Play video"}
        >
          {playing ? <Pause size={22} /> : <Play size={22} />}
        </button>
        <button
          type="button"
          className={styles.muteBtn}
          onClick={toggleMute}
          aria-label={muted ? "Unmute video" : "Mute video"}
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>

      {(title || caption) && (
        <figcaption className={styles.caption}>
          {title && <strong>{title}</strong>}
          {caption && <span>{caption}</span>}
        </figcaption>
      )}
    </figure>
  );
}
