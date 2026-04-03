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
│   │   ├── data/dynasties.ts     # Core data: 22 dynasty entries
│   │   ├── layouts/Layout.astro  # Base HTML layout (meta, fonts, global styles)
│   │   ├── pages/
│   │   │   ├── index.astro       # Homepage: horizontal scroll timeline
│   │   │   └── dynasty/[slug].astro  # Dynamic detail pages
│   │   └── styles/global.css     # Design system + scroll UX styles
│   ├── astro.config.mjs          # Site URL, base path, integrations
│   ├── tailwind.config.mjs       # Custom color palette and font families
│   └── tsconfig.json             # TypeScript config (strict, path alias @/*)
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
}
```

The array in `dynasties.ts` is the single source of truth — all pages are generated from it. When adding or modifying dynasties, update only this file.

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

## Routing

| URL Pattern            | File                              |
|------------------------|-----------------------------------|
| `/chronicles-of-china/`       | `src/pages/index.astro`           |
| `/chronicles-of-china/dynasty/:slug` | `src/pages/dynasty/[slug].astro` |

Slugs come from the `slug` field in `dynasties.ts`. Valid slugs: `shanggu`, `xia`, `shang`, `zhou`, `chunqiu`, `zhanguo`, `qin`, `han`, `sanguo`, `jin`, `nanbeichao`, `sui`, `tang`, `wudai`, `beisong`, `nansong`, `yuan`, `ming`, `qing`, `minguo`, `prc`.

---

## Adding a New Dynasty

1. Add an entry to the `dynasties` array in `src/data/dynasties.ts` (maintain chronological order by `years[0]`)
2. Choose a unique `slug` in kebab-case
3. Pick an accent `color` that distinguishes it visually
4. Run `npm run build` to verify `getStaticPaths()` generates the page correctly
5. No other files need changes — pages and navigation are generated automatically

---

## Current Implementation Status

### Completed
- Horizontal-scroll homepage with drag, wheel, touch, and keyboard support
- Dynasty detail pages with prev/next navigation
- Scroll-triggered reveal animations (Intersection Observer)
- Progress bar and active-era indicator on homepage
- GitHub Pages CI/CD pipeline
- Custom design system (Tailwind config + global CSS)

### Not Yet Implemented (see SPEC.md)
- Content Collections (Markdown pipeline for rich per-dynasty content)
- Bilingual routing (`/zh/`, `/en/` prefixes)
- Images, maps, and multimedia
- Placeholder content sections (currently show skeleton state)
- Search or filtering

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
