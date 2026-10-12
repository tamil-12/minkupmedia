# Hero video assets

The homepage `CinemaCameraHero` component reads these filenames by default:

- `cinema-camera-hero.webm` — primary source (small, modern codecs).
- `cinema-camera-hero.mp4` — fallback source for Safari and legacy browsers.

Both files should render **against a light / sky-blue background** — see the project brief. If the master render has a dark background, re-render a light-background version instead of using CSS blend modes, which damage the camera's edges and highlights.

The animation should play through:

1. Exploded camera floating in the sky-blue environment.
2. Optical glass, sensor, circuit boards, chassis, and outer shell separate along the optical axis.
3. A brief suspended mechanical view.
4. Precise component reassembly.
5. A dramatic forward movement and final assembled camera reveal.

Export recommendations:

- Resolution: ≥ 1600 × 1200, square or 4:3 aspect preferred so the camera stays legible on tablet.
- Loop target: 8–14 seconds.
- Audio: none (page autoplays muted).
- Compression: WebM VP9 CRF ~32, MP4 H.264 CRF ~24.

Until the real video is dropped in, the component falls back to a shipped-quality **inline SVG exploded-camera illustration** so the page renders in production and development identically.
