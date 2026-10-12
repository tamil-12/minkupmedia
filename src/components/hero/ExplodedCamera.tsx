interface Props {
  className?: string;
}

/**
 * Inline SVG exploded cinema-camera illustration.
 * Final production hero should be a WebM/MP4 that renders at the same frame.
 * This SVG is a shipped-quality fallback so the page ships before video arrives.
 */
export default function ExplodedCamera({ className }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 780 620"
      role="img"
      aria-label="Exploded cinema camera illustration"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Glow filter around lens / elements */}
        <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Lens glass gradient */}
        <radialGradient id="lensGlass" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#8be6ff" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#0ba9e0" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#063a52" stopOpacity="1" />
        </radialGradient>

        {/* Metallic body gradient */}
        <linearGradient id="bodyMetal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2b3545" />
          <stop offset="45%" stopColor="#121923" />
          <stop offset="100%" stopColor="#060a12" />
        </linearGradient>

        <linearGradient id="bodyMetalLight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a4556" />
          <stop offset="100%" stopColor="#0e1521" />
        </linearGradient>

        {/* Orange heat glow for internal structures */}
        <radialGradient id="orangeGlow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#ff7a56" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#f74724" stopOpacity="0" />
        </radialGradient>

        {/* Blue electric trail */}
        <linearGradient id="blueTrail" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0ba9e0" stopOpacity="0" />
          <stop offset="50%" stopColor="#50c8f0" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#0ba9e0" stopOpacity="0" />
        </linearGradient>

        {/* Circuit board */}
        <pattern id="circuit" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <rect width="24" height="24" fill="#0a3b2f" />
          <path d="M0 12 L10 12 L10 4 L20 4" stroke="#1ad186" strokeWidth="0.6" fill="none" />
          <path d="M0 20 L14 20 L14 24" stroke="#1ad186" strokeWidth="0.4" fill="none" />
          <circle cx="10" cy="12" r="1" fill="#20ff9c" />
          <circle cx="20" cy="4" r="0.9" fill="#20ff9c" />
        </pattern>
      </defs>

      {/* ambient trails */}
      <path
        d="M60 310 Q 220 220 400 320 T 740 310"
        stroke="url(#blueTrail)"
        strokeWidth="1.6"
        fill="none"
        opacity="0.9"
      />
      <path
        d="M80 360 Q 260 280 440 360 T 760 360"
        stroke="url(#blueTrail)"
        strokeWidth="1"
        fill="none"
        opacity="0.5"
      />

      {/* Orange ambient flare behind sensor stack */}
      <ellipse cx="500" cy="330" rx="180" ry="90" fill="url(#orangeGlow)" opacity="0.6" />

      {/* === LENS GROUP (left side) ======================================= */}
      <g filter="url(#softGlow)">
        {/* outer lens hood */}
        <g transform="translate(100,220)">
          <rect x="0" y="0" width="34" height="200" rx="8" fill="url(#bodyMetalLight)" />
          <rect x="0" y="0" width="34" height="12" fill="#0ba9e0" opacity="0.75" />
          <rect x="0" y="188" width="34" height="12" fill="#0ba9e0" opacity="0.6" />
        </g>

        {/* Big front glass element */}
        <g transform="translate(150,210)">
          <ellipse cx="60" cy="110" rx="62" ry="112" fill="#09131e" />
          <ellipse cx="60" cy="110" rx="54" ry="104" fill="url(#lensGlass)" />
          <ellipse cx="42" cy="80" rx="18" ry="38" fill="#ffffff" opacity="0.35" />
          <ellipse cx="34" cy="60" rx="8" ry="14" fill="#ffffff" opacity="0.75" />
          {/* lens ring text */}
          <text
            x="60"
            y="212"
            fill="#8ad7f0"
            fontFamily="monospace"
            fontSize="9"
            textAnchor="middle"
            opacity="0.85"
          >
            T2.1 · 50MM · PL
          </text>
        </g>
      </g>

      {/* Optical glass elements floating between lens and body */}
      <g>
        {/* element 1 */}
        <g transform="translate(260,250)">
          <ellipse cx="25" cy="60" rx="22" ry="60" fill="#0a1a28" />
          <ellipse cx="25" cy="60" rx="18" ry="54" fill="url(#lensGlass)" opacity="0.9" />
          <ellipse cx="18" cy="46" rx="6" ry="18" fill="#ffffff" opacity="0.35" />
        </g>
        {/* element 2 */}
        <g transform="translate(312,260)">
          <ellipse cx="20" cy="50" rx="18" ry="50" fill="#0a1a28" />
          <ellipse cx="20" cy="50" rx="14" ry="46" fill="#1b708e" />
          <ellipse cx="15" cy="40" rx="4" ry="14" fill="#ffffff" opacity="0.4" />
        </g>
        {/* element 3 — orange tint for subtle warm aberration */}
        <g transform="translate(358,268)">
          <ellipse cx="16" cy="42" rx="15" ry="42" fill="#0a1a28" />
          <ellipse cx="16" cy="42" rx="11" ry="38" fill="#f74724" opacity="0.35" />
          <ellipse cx="16" cy="42" rx="9" ry="36" fill="#0ba9e0" opacity="0.5" />
        </g>
        {/* element 4 */}
        <g transform="translate(398,275)">
          <ellipse cx="14" cy="36" rx="13" ry="36" fill="#0a1a28" />
          <ellipse cx="14" cy="36" rx="10" ry="32" fill="url(#lensGlass)" />
        </g>
      </g>

      {/* iris / aperture ring */}
      <g transform="translate(432,284)">
        <circle cx="14" cy="28" r="22" fill="#0a1a28" />
        <circle cx="14" cy="28" r="18" fill="#1f2b3b" />
        {/* iris blades */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const x1 = 14 + Math.cos(angle) * 4;
          const y1 = 28 + Math.sin(angle) * 4;
          const x2 = 14 + Math.cos(angle) * 16;
          const y2 = 28 + Math.sin(angle) * 16;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#f74724"
              strokeWidth="1.4"
              opacity="0.7"
            />
          );
        })}
        <circle cx="14" cy="28" r="5" fill="#0ba9e0" opacity="0.9" />
      </g>

      {/* === SENSOR + CIRCUIT STACK ======================================= */}
      <g>
        {/* sensor housing */}
        <g transform="translate(478,250)">
          <rect x="0" y="0" width="46" height="104" rx="4" fill="url(#bodyMetal)" />
          <rect x="4" y="6" width="38" height="92" fill="#060a12" />
          {/* sensor silicon */}
          <rect x="7" y="12" width="32" height="80" fill="#0a1a30" />
          <rect x="9" y="14" width="28" height="76" fill="url(#blueTrail)" />
          <rect x="9" y="14" width="28" height="76" fill="#0ba9e0" opacity="0.3" />
          {/* grid */}
          {Array.from({ length: 10 }).map((_, i) => (
            <line
              key={i}
              x1={9}
              y1={14 + i * 7.6}
              x2={37}
              y2={14 + i * 7.6}
              stroke="#50c8f0"
              strokeWidth="0.2"
              opacity="0.4"
            />
          ))}
        </g>

        {/* circuit board */}
        <g transform="translate(538,232)">
          <rect x="0" y="0" width="80" height="156" rx="3" fill="url(#circuit)" />
          <rect
            x="0"
            y="0"
            width="80"
            height="156"
            rx="3"
            fill="none"
            stroke="#101c2e"
            strokeWidth="1"
          />
          {/* chips */}
          <rect x="10" y="18" width="24" height="14" fill="#101c2e" />
          <rect x="12" y="20" width="20" height="10" fill="#2b3545" />
          <rect x="46" y="30" width="24" height="14" fill="#101c2e" />
          <rect x="48" y="32" width="20" height="10" fill="#2b3545" />
          <rect x="14" y="60" width="52" height="30" fill="#101c2e" />
          <rect x="16" y="62" width="48" height="26" fill="#1b2a44" />
          <text
            x="40"
            y="80"
            fill="#f74724"
            fontFamily="monospace"
            fontSize="7"
            textAnchor="middle"
          >
            MINKUP · ISP
          </text>
          {/* pins */}
          {Array.from({ length: 14 }).map((_, i) => (
            <rect
              key={i}
              x={6 + i * 5}
              y={132}
              width={2}
              height={14}
              fill="#f0c070"
            />
          ))}
        </g>
      </g>

      {/* === CAMERA BODY (right side) ===================================== */}
      <g filter="url(#softGlow)">
        <g transform="translate(628,180)">
          {/* main chassis */}
          <rect x="0" y="20" width="130" height="260" rx="12" fill="url(#bodyMetal)" />
          <rect x="0" y="20" width="130" height="12" rx="12" fill="#2b3545" />
          <rect x="0" y="268" width="130" height="12" rx="12" fill="#2b3545" />

          {/* top handle */}
          <rect x="20" y="0" width="90" height="22" rx="6" fill="#1b2130" />
          <rect x="26" y="4" width="78" height="4" fill="#2b3545" />

          {/* side panel */}
          <rect x="8" y="40" width="114" height="80" rx="4" fill="#060a12" />
          <rect
            x="8"
            y="40"
            width="114"
            height="80"
            rx="4"
            fill="none"
            stroke="#2b3545"
            strokeWidth="1"
          />
          {/* display */}
          <rect x="18" y="52" width="60" height="40" rx="2" fill="#061a24" />
          <rect x="20" y="54" width="56" height="36" rx="1" fill="#0ba9e0" opacity="0.3" />
          <text
            x="48"
            y="76"
            fill="#50c8f0"
            fontFamily="monospace"
            fontSize="8"
            textAnchor="middle"
          >
            REC · 4K · 25
          </text>

          {/* dials */}
          <circle cx="94" cy="68" r="12" fill="#1b2130" />
          <circle cx="94" cy="68" r="9" fill="#2b3545" />
          <circle cx="94" cy="68" r="2" fill="#f74724" />

          <circle cx="110" cy="100" r="7" fill="#1b2130" />
          <circle cx="110" cy="100" r="4" fill="#f74724" opacity="0.9" />

          {/* vents */}
          {Array.from({ length: 6 }).map((_, i) => (
            <rect
              key={i}
              x={14}
              y={140 + i * 8}
              width={100}
              height={2}
              rx={1}
              fill="#1b2130"
            />
          ))}

          {/* bottom port */}
          <rect x="20" y="220" width="90" height="40" rx="3" fill="#0a0f18" />
          <rect x="26" y="226" width="78" height="28" rx="2" fill="#060a12" />
          <circle cx="36" cy="240" r="4" fill="#0ba9e0" opacity="0.9" />
          <circle cx="50" cy="240" r="4" fill="#f74724" opacity="0.9" />
          <circle cx="64" cy="240" r="4" fill="#1b2130" />
          <circle cx="78" cy="240" r="4" fill="#1b2130" />
          <circle cx="92" cy="240" r="4" fill="#1b2130" />
        </g>
      </g>

      {/* small accent sparks */}
      <g opacity="0.9">
        <circle cx="340" cy="140" r="2.5" fill="#0ba9e0" />
        <circle cx="520" cy="470" r="3" fill="#f74724" />
        <circle cx="200" cy="500" r="2" fill="#0ba9e0" opacity="0.6" />
        <circle cx="640" cy="110" r="2" fill="#0ba9e0" opacity="0.7" />
        <circle cx="420" cy="520" r="2.4" fill="#f74724" opacity="0.5" />
      </g>

      {/* subtle dashed assembly guide line through optical axis */}
      <line
        x1="30"
        y1="320"
        x2="760"
        y2="320"
        stroke="#0ba9e0"
        strokeWidth="0.6"
        strokeDasharray="2 6"
        opacity="0.35"
      />
    </svg>
  );
}
