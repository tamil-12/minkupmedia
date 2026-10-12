# Image assets

Drop campaign and project imagery here. The site references these paths out of the box — swap in your real photography keeping the same filenames or update `src/data/projects.ts` to match.

```
public/images/
├── hero/
│   └── cinema-camera-poster.webp     ← poster fallback when the hero video can't play
├── work/
│   ├── beyond-the-ordinary.webp
│   ├── made-to-be-remembered.webp
│   ├── culture-in-motion.webp
│   ├── from-clicks-to-customers.webp
│   ├── signal-above-noise.webp
│   └── unmissable.webp
├── services/
├── creative-studio/
├── about/
└── contact/
```

Any file that is missing simply falls back to an inline SVG placeholder — the site will not throw, but you'll see a muted graphic until the asset is dropped in.

Guidelines:

- Prefer **WebP** at 1600–2200 px wide.
- Portrait assets should be 3:4 or 4:5; landscape 16:9 or 3:2.
- Keep file sizes under 350 KB for carousel/thumb use.
