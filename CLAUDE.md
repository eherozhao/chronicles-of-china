# CLAUDE.md — Chronicles of China (华夏春秋)

## Project Overview

A content-first, statically generated Chinese history timeline website. Built with Astro and Tailwind CSS, deployed to GitHub Pages. Features a horizontal-scroll homepage listing 22 dynasties with dedicated detail pages per dynasty.

Live site: `https://eherozhao.github.io/chronicles-of-china/`

---

## Repository Structure

```
chronicles-of-china/
├── .github/workflows/deploy.yml   # CI/CD: GitHub Pages deployment
├── prototype-astro/               # Main application (all dev happens here)
│   ├── src/
│   │   ├── content/
│   │   │   ├── config.ts         # Content Collections schema (figures, events, achievements, references)
│   │   │   └── dynasty/
│   │   │       ├── zh/           # Chinese content Markdown (beisong.md, tang.md, qin.md, …)
│   │   │       └── en/           # English content Markdown
│   │   ├── data/dynasties.ts     # Core data: 22 dynasty entries (slug, name, color, artwork…)
│   │   ├── layouts/Layout.astro  # Base HTML layout (meta, fonts, global styles)
│   │   ├── pages/
│   │   │   ├── index.astro       # Homepage: horizontal scroll timeline
│   │   │   ├── dynasty/[slug].astro  # Legacy redirect (unused)
│   │   │   └── [lang]/dynasty/[slug].astro  # Bilingual dynasty detail pages
│   │   └── styles/global.css     # Design system + scroll UX styles
│   ├── public/images/            # Static assets (hero artwork images)
│   ├── astro.config.mjs          # Site URL, base path, integrations
│   ├── tailwind.config.mjs       # Custom color palette and font families
│   └── tsconfig.json             # TypeScript config (strict, path alias @/*)
├── CLAUDE.md
├── README.md
└── SPEC.md                        # Full product specification
```

---

## Development Workflow

All commands run from the `prototype-astro/` directory:

```bash
cd prototype-astro
npm install       # Install dependencies
npm run dev       # Start dev server (hot reload)
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
```

There is no test suite currently configured.

### Deployment

Pushes to `claude/chinese-history-website-dzHsE` trigger the GitHub Actions workflow (`.github/workflows/deploy.yml`), which builds and deploys to GitHub Pages automatically. Do not push directly to `main` without review.

---

## Tech Stack

| Layer       | Technology            | Notes                                        |
|-------------|----------------------|----------------------------------------------|
| Framework   | Astro 4.16+          | SSG, file-based routing, zero-JS by default  |
| Styling     | Tailwind CSS 3.4     | Utility-first, custom design tokens          |
| Language    | TypeScript 5         | Strict mode, path alias `@/*` → `src/*`      |
| Fonts       | Google Fonts         | Zhi Mang Xing, Ma Shan Zheng, Noto Serif SC  |
| Hosting     | GitHub Pages         | Subpath: `/chronicles-of-china/`                    |
| CI/CD       | GitHub Actions       | Auto-deploy on branch push                   |

---

## Key Architecture Decisions

### Static Site Generation
All pages are pre-rendered at build time. `getStaticPaths()` in `[slug].astro` generates one page per dynasty from `dynasties.ts`. No server-side logic.

### Base URL Handling
The site is served under `/chronicles-of-china/` on GitHub Pages. Always use `import.meta.env.BASE_URL` when constructing internal links, not hardcoded paths:
```astro
<a href={`${import.meta.env.BASE_URL}dynasty/${dynasty.slug}`}>
```
This is configured in `astro.config.mjs` (`base: '/chronicles-of-china/'`).

### JavaScript Strategy
Minimal client-side JS. Interactive behavior (horizontal scroll, drag, keyboard nav, Intersection Observer reveals) lives in `<script>` tags within `.astro` files — no framework components. Preserve this zero-dependency approach unless a feature genuinely requires a component framework.

---

## Data Model

Dynasty entries are defined in `src/data/dynasties.ts`:

```typescript
interface Dynasty {
  slug: string;              // URL segment: kebab-case (e.g. "beisong")
  name: string;              // Chinese name (e.g. "唐")
  englishName: string;       // English name (e.g. "Tang Dynasty")
  period: string;            // Display range (e.g. "618–907")
  years: [number, number];   // Numeric range, negative = BCE (e.g. [-2070, -1600])
  description: string;       // 80–120 word overview
  color: string;             // Hex accent color (e.g. "#8B2252")
  artwork?: string;          // Hero background image path relative to public/ (e.g. "images/qianli-jiangshan.jpg")
  artworkPosition?: string;  // CSS object-position for artwork (e.g. "center 40%")
}
```

### Content Collections (per-dynasty structured data)

Rich content lives in `src/content/dynasty/{lang}/{slug}.md` as Markdown with YAML frontmatter. Schema defined in `src/content/config.ts`:

- `figures[]` — name, englishName, role, years, bio
- `events[]` — year, name, englishName, description
- `achievements` — economy[], politics[], culture[] (each with title, description, artifact, museum)
- `references` — primary[], secondary[]

The Markdown body is rendered as the "Overview" prose section. Dynasties without a content file fall back to the `description` from `dynasties.ts`.

The array in `dynasties.ts` is the single source of truth — all pages are generated from it. When adding or modifying dynasties, update only this file.

---

## Historical Terminology

When writing English names for dynasties and periods, use the established academic terms used in sinology and English-language historiography. Do not truncate or paraphrase. Key terms:

| Chinese | Correct English Term | Notes |
|---------|---------------------|-------|
| 五代十国 | Five Dynasties and Ten Kingdoms | Not "Five Dynasties" alone — the Ten Kingdoms (南方十国) are part of the period |
| 春秋 | Spring and Autumn period | |
| 战国 | Warring States period | |
| 南北朝 | Northern and Southern Dynasties | |
| 魏晋南北朝 | Wei, Jin, Northern and Southern Dynasties | When referring to the full era |
| 三国 | Three Kingdoms | |
| 中华民国 | Republic of China | |
| 中华人民共和国 | People's Republic of China | |

When in doubt, prefer the phrasing used by the *Cambridge History of China* or the *Encyclopedia of China*.

---

## Design System

### Color Palette (Tailwind custom tokens)

| Token        | Usage                        |
|--------------|------------------------------|
| `ink`        | Primary text (near-black)    |
| `scroll`     | Page backgrounds (warm off-white) |
| `vermillion` | Accent / CTA elements        |
| `gold`       | Decorative highlights        |
| `jade`       | Secondary accents            |
| `night`      | Dark backgrounds             |
| `cloud`      | Light backgrounds / overlays |

### Typography

- **Headings**: `font-heading` — Georgia, Noto Serif SC (serif, cultural weight)
- **Display**: `font-display` — Zhi Mang Xing, Ma Shan Zheng (calligraphic)
- **Body**: `font-body` — system serif stack with Noto Serif SC fallback

### Design Philosophy

Follow "惜墨如金" (less ink, more meaning):
- Generous whitespace over dense ornamentation
- Thin gold accents, not heavy borders
- Typography-driven hierarchy
- **Avoid**: seal stamps, faux textures, heavy red/gold gradients, overly decorative patterns

---

## Dynasty Detail Page — Interaction Patterns (locked)

The dynasty detail page (`[lang]/dynasty/[slug].astro`) has specific interaction behaviors for figures and events. These were user-approved and should not be changed without explicit direction.

### Key Figures — Click to show detail
- **Desktop (≥1280px)**: Clicking a figure card shows a detail sidebar in the right gutter, positioned `absolute` within the figures section (not `fixed` to viewport). The sidebar scrolls with the page and only appears alongside the Key Figures area. Clicking the close button or pressing Escape hides it.
- **Mobile (<1280px)**: Clicking a figure card shows a bottom sheet popup with backdrop overlay.

### Key Events — Click to expand inline
- **Desktop**: Clicking an event expands its description directly below the event item in the timeline. Only one event can be expanded at a time. Clicking again collapses it.
- **Mobile (<1280px)**: Clicking an event shows a bottom sheet popup.

### Important constraints
- The figures detail sidebar must NOT use `position: fixed` — it must be anchored to the figures section so it scrolls with the page
- The main content column (`max-w-2xl`) must not resize or shift when the sidebar appears
- Events must NOT use the sidebar — they always use inline expand on desktop

---

## Dynasty Detail Page — Typography Scale (locked)

These sizes were user-approved on the 北宋 page and apply to all dynasty detail pages:

| Element | Tailwind class | Notes |
|---------|---------------|-------|
| Chinese dynasty name (h1) | `text-7xl sm:text-9xl` | `font-heading`, calligraphic weight |
| English name | `text-xl` | `font-body`, subdued opacity (`text-scroll/50`) |
| Period dates | `text-3xl` | `font-heading`, gold tint (`text-gold-light/70`) |
| Language toggle (active) | `text-lg` | muted (`text-scroll/60`) |
| Language toggle (link) | `text-lg` | gold hover (`text-gold/60 hover:text-gold`) |
| Section headings (h2) | `text-xl` | `font-heading`, gold left-accent border |
| Sub-section headings (h3) | `text-lg` | `font-heading` |
| Body / prose text | `text-base` | `font-body`, `leading-[1.9]` |
| Reference section | `text-sm` | muted (`text-ink-faint`) |

Do not change these sizes without explicit user approval.

### Font Usage Rules (locked)

These rules were user-approved on the 北宋 page. Apply them to all dynasty detail pages:

| Element | Font | Notes |
|---------|------|-------|
| Section headings (简介, 重要人物, 重大事件, 文化成就) | `font-heading` (Georgia, Noto Serif SC) | The ONLY body-area elements using heading font |
| Avatar circle letter | `font-heading` | Calligraphic weight for single-character display |
| Person names in cards | `body-text` (system-ui) | NOT heading font — treated as body content |
| Event names (陈桥兵变, etc.) | `body-text` (system-ui) | NOT heading font |
| Achievement titles (交子——世界最早的纸币, etc.) | `body-text` (system-ui) | NOT heading font |
| Achievement sub-section labels (经济, 政治, 文化) | `body-text font-semibold` | NOT heading font |
| All other prose / descriptions | `body-text` (system-ui) | Clean reading font, never calligraphic |

**Rule**: `font-heading` is reserved for section-level titles and the avatar circle only. Everything else (names, event titles, achievement titles, descriptions) uses `system-ui` body font. Never use `font-display` (Zhi Mang Xing / Ma Shan Zheng) inside the content area — it is only for the dynasty H1 name in the hero.

---

## Routing

| URL Pattern                              | File                                      |
|------------------------------------------|-------------------------------------------|
| `/chronicles-of-china/`                  | `src/pages/index.astro`                   |
| `/chronicles-of-china/zh/dynasty/:slug`  | `src/pages/[lang]/dynasty/[slug].astro`   |
| `/chronicles-of-china/en/dynasty/:slug`  | `src/pages/[lang]/dynasty/[slug].astro`   |

Bilingual routing is implemented. Each dynasty page has `/zh/` and `/en/` variants with a language toggle in the hero. Slugs come from the `slug` field in `dynasties.ts`.

Valid slugs: `shanggu`, `xia`, `shang`, `xizhou`, `dongzhou`, `qin`, `xihan`, `donghan`, `sanguo`, `xijin`, `dongjin`, `nanbeichao`, `sui`, `tang`, `wudai`, `beisong`, `nansong`, `yuan`, `ming`, `qing`, `minguo`, `gongheguo`.

---

## Adding a New Dynasty

1. Add an entry to the `dynasties` array in `src/data/dynasties.ts` (maintain chronological order by `years[0]`)
2. Choose a unique `slug` in kebab-case
3. Pick an accent `color` that distinguishes it visually
4. Optionally add `artwork` and `artworkPosition` for a hero background image (place image in `public/images/`, keep file size under 200KB)
5. Create content files in `src/content/dynasty/zh/{slug}.md` and `src/content/dynasty/en/{slug}.md` with YAML frontmatter matching the schema in `config.ts`
6. Run `npm run build` to verify `getStaticPaths()` generates the page correctly
7. No other files need changes — pages and navigation are generated automatically

---

## Current Implementation Status

### Completed
- Horizontal-scroll homepage with drag, wheel, touch, and keyboard support
- Bilingual routing (`/zh/`, `/en/` prefixes) with language toggle
- Content Collections (Markdown pipeline for rich per-dynasty content)
- Dynasty detail pages with prev/next navigation
- Structured sections: Overview, Key Figures, Key Events, Cultural Achievements, References
- Hero artwork backgrounds (with compressed images in `public/images/`)
- Scroll-triggered reveal animations (Intersection Observer)
- Progress bar and active-era indicator on homepage
- GitHub Pages CI/CD pipeline
- Custom design system (Tailwind config + global CSS)

### Not Yet Implemented (see SPEC.md)
- Content for most dynasties (only beisong, tang, qin have content files)
- Maps and multimedia
- Search or filtering

---

## Git Workflow

### When to push directly to `main`
Push directly (no PR) for any change that does **not** touch content Markdown files:
- CSS / styling (`global.css`, `tailwind.config.mjs`)
- Astro templates / layouts (`.astro` files)
- TypeScript / JavaScript logic
- Configuration files (`astro.config.mjs`, `deploy.yml`, etc.)
- Data file (`src/data/dynasties.ts`)
- Docs (`CLAUDE.md`, `README.md`, `SPEC.md`)

Pushing to `main` automatically triggers the GitHub Actions build and deploys to GitHub Pages.

### When to open a PR for review
Open a PR **only** when the change includes new or edited **content Markdown** files (future `content/zh/` or `content/en/` directories). These need human review for historical accuracy and translation quality before going live.

---

## Code Conventions

- **Astro components**: frontmatter (TypeScript) + HTML template + optional `<script>` and `<style>` blocks
- **Imports**: Use `@/` alias for `src/` paths (e.g. `import { dynasties } from '@/data/dynasties'`)
- **Tailwind**: Prefer utility classes; use custom component classes (`.scroll-surface`, `.dynasty-section`) only for repeated patterns defined in `global.css`
- **TypeScript**: Strict mode enabled; define interfaces for all data shapes
- **No test files yet**: Do not add test infrastructure without a clear requirement

---

## Important Notes for AI Assistants

- The working application is entirely within `prototype-astro/`. Do not create files at the repo root unless they are repo-level docs.
- `astro.config.mjs` sets `base: '/chronicles-of-china/'` — this must remain consistent with the GitHub Pages deployment path. Do not change without also updating the workflow and repository settings.
- Client-side interactivity uses vanilla JS in `<script>` blocks. Do not introduce React, Vue, or other component frameworks without explicit direction.
- The data file `src/data/dynasties.ts` is the canonical source; do not duplicate dynasty data elsewhere.
- When modifying styles, check both `global.css` (base layer / custom classes) and `tailwind.config.mjs` (tokens) before adding new ones.
