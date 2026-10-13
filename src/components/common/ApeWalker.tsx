import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import styles from "./ApeWalker.module.css";

/**
 * "Ape walk 1" Lottie animation (Summer kc on LottieFiles) that strolls
 * continuously across the bottom of the viewport. Site-wide — mounted in
 * App.tsx so it rides every route.
 *
 * The dotLottie file is loaded straight from LottieFiles' CDN — no local
 * asset, no build step.
 *
 * Respects `prefers-reduced-motion` by not mounting at all.
 */
const APE_LOTTIE_URL =
  "https://assets-v2.lottiefiles.com/a/264c90aa-1179-11ee-9cd7-034f618a04da/mVCH4kdSmR.lottie";

export default function ApeWalker() {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.walker}>
        <DotLottieReact
          src={APE_LOTTIE_URL}
          autoplay
          loop
          renderConfig={{ autoResize: true }}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
}
