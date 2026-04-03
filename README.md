# 华夏春秋 Chronicles of China

A bilingual (Chinese/English) interactive website presenting Chinese history chronologically — from ancient legends through the founding of the People's Republic of China.

**Live site:** https://eherozhao.github.io/historyIsFun/

## Features

- **Horizontal scroll UX (数字卷轴)** — Navigate history like unrolling a traditional scroll painting
- **22 dynasties** from 上古传说 to 中华人民共和国, each with dedicated detail pages
- **Modern Chinese aesthetic** — Minimalist design with subtle cultural cues, calligraphic typography (Zhi Mang Xing, Ma Shan Zheng), parchment textures
- **Bilingual support** — Chinese and English (planned)
- **Source-cited content** — Historical content references primary sources like 《史记》《资治通鉴》(planned)

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Astro 4+ |
| Styling | Tailwind CSS |
| Content | Markdown (planned Content Collections) |
| Fonts | Google Fonts (Zhi Mang Xing, Ma Shan Zheng, Noto Serif SC) |
| Deployment | GitHub Pages (gh-pages branch) |

## Development

```bash
cd prototype-astro
npm install
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Project Structure

```
prototype-astro/
├── src/
│   ├── data/dynasties.ts      # Dynasty data (22 entries)
│   ├── layouts/Layout.astro   # Base layout with font loading
│   ├── pages/
│   │   ├── index.astro        # Horizontal scroll homepage
│   │   └── dynasty/[slug].astro  # Dynasty detail pages
│   └── styles/global.css      # Scroll UX styles, design system
├── astro.config.mjs
└── tailwind.config.mjs
```

## Roadmap

See [SPEC.md](./SPEC.md) for the full project specification including milestones, design system, and content plan.
