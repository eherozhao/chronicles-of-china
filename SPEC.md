# Project Spec: Chronicles of China (华夏春秋)

## Vision
A bilingual (Chinese/English) interactive website presenting Chinese history chronologically — from ancient legends through the founding of the PRC. Content is sourced from authentic historical texts with citations. The site features a **modern Chinese-aesthetic UX** that feels contemporary, not antiquated.

## Core Principles
1. **Content-first**: History content drives the experience; UI serves readability
2. **Bilingual**: Full Chinese and English support, togglable per-page
3. **Source-cited**: All historical content references primary sources (《史记》《资治通鉴》《二十四史》etc.)
4. **Modern Chinese aesthetic**: Minimalist design with subtle cultural cues — NOT heavy traditional ornamentation
5. **Iterative**: Ship early, improve continuously

---

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | **Astro 4+** | Content-first, zero JS by default, built-in i18n, Content Collections for Markdown |
| Styling | **Tailwind CSS 4** | Utility-first, rapid iteration |
| Content | **Markdown/MDX** | Stored in `content/zh/` and `content/en/`, no backend needed |
| i18n | Astro built-in | Route-based: `/zh/...` and `/en/...` |
| Deployment | **GitHub Pages** via GitHub Actions | Free, integrated with repo |
| Interactive | Astro Islands (React/Svelte as needed) | Only hydrate what needs interactivity |

---

## Design System

### Modern Chinese Aesthetic (v2)

**Philosophy**: "Less ink, more meaning" (惜墨如金). Think modern museum exhibition design — generous whitespace, restrained palette, typography-driven hierarchy, with cultural identity expressed through subtle details rather than heavy ornamentation.

#### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `ink` | `#1a1a2e` | Primary text, deep navy-black |
| `ink-light` | `#4a4a5a` | Secondary text |
| `silk` | `#faf9f6` | Background, warm white |
| `silk-dark` | `#f0ede6` | Card backgrounds, subtle contrast |
| `vermillion` | `#c0392b` | Primary accent (links, highlights, active states) |
| `gold` | `#b8860b` | Secondary accent (subtle dividers, metadata) |
| `jade` | `#2d6a4f` | Tertiary accent (tags, success states) |
| `cloud` | `#e8e4dd` | Borders, dividers |

#### Typography
- **Headings**: System serif stack — `Georgia, "Noto Serif SC", "Source Han Serif SC", "Songti SC", serif`
- **Body**: System sans — `"Inter", system-ui, -apple-system, "Noto Sans SC", sans-serif`
- **Scale**: Modular scale (1.25 ratio), generous line-height (1.7+ for body)
- **No custom web fonts in v1** (performance priority; revisit later)

#### Design Elements — DO vs DON'T
| DO | DON'T |
|----|-------|
| Generous whitespace | Heavy ornamental borders |
| Thin gold accent lines as dividers | Corner bracket decorations |
| Subtle ink-wash gradient (barely visible) | Seal stamp logos |
| Large, confident typography | Cloud pattern backgrounds |
| Smooth scroll-triggered animations | Static, dense layouts |
| Clean card shadows | Faux-paper textures |
| Color as accent, not decoration | Red-and-gold everywhere |
| Horizontal rules with cultural meaning | Decorative SVG patterns |

#### Core UX Concept: The Digital Scroll (数字卷轴)

The homepage is a **horizontal scroll experience** — the user moves from right to left (following traditional Chinese reading direction), and the page feels like unrolling an actual scroll painting.

**Key characteristics:**
- **Horizontal navigation**: User scrolls/drags left to traverse history from ancient to modern
- **Scroll unfurling animation**: As the user moves, the scroll visually "unrolls" — content appears with a flowing, ink-on-silk feeling
- **Dynasty content embedded in scroll**: Dynasties are NOT separate cards floating above a timeline; they are **part of the scroll surface itself**, like text and illustrations painted onto silk
- **Flowing transitions between eras**: Ink-wash dividers or subtle gradient transitions between dynasties, creating a sense of continuous historical flow
- **Scroll rollers**: Decorative scroll ends (轴杆) visible at the left/right edges as visual anchors
- **Dark backdrop outside scroll**: The scroll "paper" is warm silk/parchment color, floating on a dark background to create depth and focus
- **Parallax depth**: Subtle parallax layers (background texture moves slower than content) for depth

**Inspiration**: Imagine browsing the 《清明上河图》(Along the River During the Qingming Festival) digitally — that sense of discovery as you scroll through a continuous, richly detailed horizontal panorama.

#### Interaction Patterns
- **Horizontal scroll/drag**: Primary navigation on homepage (mouse wheel maps to horizontal, drag supported)
- **Scroll-triggered reveal**: Content fades/flows in as the scroll "reaches" that section
- **Smooth page transitions** between dynasty pages
- **Hover**: Subtle lift + vermillion accent shift on interactive elements
- **Language toggle**: Clean pill switch, not a flag dropdown

#### Layout Principles
- Max content width: 768px (for readability)
- Max layout width: 1200px
- Mobile-first responsive
- Generous padding: 2rem+ on sections
- Asymmetric grids for visual interest on detail pages

---

## Content Structure

### Directory Layout
```
content/
├── zh/
│   ├── dynasties/
│   │   ├── wudai.md          # 五代十国 (starting dynasty)
│   │   ├── tang.md
│   │   └── ...
│   └── index.md
├── en/
│   ├── dynasties/
│   │   ├── wudai.md
│   │   ├── tang.md
│   │   └── ...
│   └── index.md
```

### Markdown Frontmatter Schema
```yaml
---
title: "五代十国"
englishTitle: "Five Dynasties and Ten Kingdoms"
period: "907 - 979 CE"
startYear: 907
endYear: 979
order: 15
color: "#8B4513"        # Accent color for this dynasty
heroImage: "/images/dynasties/wudai-hero.jpg"  # Optional
tags: ["division", "military", "transition"]
sources:
  - "《旧五代史》(Old History of the Five Dynasties) - 薛居正"
  - "《新五代史》(New History of the Five Dynasties) - 欧阳修"
  - "《资治通鉴》(Comprehensive Mirror in Aid of Governance) - 司马光"
---
```

### Content Per Dynasty
1. **Overview**: 2-3 paragraphs establishing the era
2. **Key Figures**: 3-5 major historical figures with brief bios
3. **Major Events**: Chronological list of defining events
4. **Cultural Achievements**: Art, literature, technology, philosophy
5. **Legacy**: How this period shaped subsequent history
6. **Sources**: Full bibliography with primary source references

---

## Dynasties (Full List, Chronological)

| Order | Chinese | English | Period |
|-------|---------|---------|--------|
| 1 | 上古传说 | Ancient Legends | ~2852 - 2070 BCE |
| 2 | 夏 | Xia Dynasty | ~2070 - 1600 BCE |
| 3 | 商 | Shang Dynasty | ~1600 - 1046 BCE |
| 4 | 西周 | Western Zhou | ~1046 - 771 BCE |
| 5 | 东周 (春秋/战国) | Eastern Zhou | 770 - 221 BCE |
| 6 | 秦 | Qin Dynasty | 221 - 206 BCE |
| 7 | 西汉 | Western Han | 202 BCE - 9 CE |
| 8 | 东汉 | Eastern Han | 25 - 220 CE |
| 9 | 三国 | Three Kingdoms | 220 - 280 CE |
| 10 | 西晋 | Western Jin | 266 - 316 CE |
| 11 | 东晋 | Eastern Jin | 317 - 420 CE |
| 12 | 南北朝 | Northern & Southern | 420 - 589 CE |
| 13 | 隋 | Sui Dynasty | 581 - 618 CE |
| 14 | 唐 | Tang Dynasty | 618 - 907 CE |
| 15 | 五代十国 | Five Dynasties | 907 - 979 CE |
| 16 | 北宋 | Northern Song | 960 - 1127 CE |
| 17 | 南宋 | Southern Song | 1127 - 1279 CE |
| 18 | 元 | Yuan Dynasty | 1271 - 1368 CE |
| 19 | 明 | Ming Dynasty | 1368 - 1644 CE |
| 20 | 清 | Qing Dynasty | 1644 - 1912 CE |
| 21 | 中华民国 | Republic of China | 1912 - 1949 CE |
| 22 | 中华人民共和国 | People's Republic | 1949 - present |

---

## Milestones

### M1: Website Foundation (Current)
- [x] Initialize Astro project with Tailwind
- [x] Basic layout (Header, Footer, Language toggle)
- [x] Homepage with interactive timeline
- [x] Dynasty detail page template
- [x] GitHub Pages deployment pipeline
- [ ] **Modernize UX** — replace heavy traditional ornamentation with contemporary Chinese aesthetic
- [ ] Scroll-triggered animations on timeline
- [ ] Responsive mobile design polish

### M2: Content Pipeline
- [ ] Set up Astro Content Collections for Markdown
- [ ] Create Markdown frontmatter schema
- [ ] Directory structure: `content/zh/` and `content/en/`
- [ ] Markdown rendering with typography styles (prose)
- [ ] Bilingual route switching (`/zh/dynasty/xxx` ↔ `/en/dynasty/xxx`)

### M3: First Content — Five Dynasties and Ten Kingdoms (五代十国)
- [ ] Research and write Chinese content based on primary sources
  - 《旧五代史》《新五代史》《资治通鉴》
- [ ] Key figures: 朱温, 李存勖, 柴荣, 赵匡胤 (pre-Song), 李煜
- [ ] Major events: 唐朝灭亡, 后梁建立, 后周改革, 陈桥兵变
- [ ] Translate to English
- [ ] Add source citations

### M4: Content Expansion (2-3 more dynasties)
- [ ] Tang Dynasty (唐) — golden age context leading into Five Dynasties
- [ ] Northern Song (北宋) — what came after
- [ ] One ancient dynasty (e.g., 秦 or 汉) for range diversity

### M5: Rich Media & Interactivity
- [ ] Dynasty territory maps (open-source/public domain)
- [ ] Figure portrait illustrations (copyright-free sources)
- [ ] Interactive map component (Astro Island)
- [ ] Search functionality
- [ ] Reading progress indicator

### M6: Polish & Scale
- [ ] All 22 dynasties content complete
- [ ] SEO optimization (meta tags, structured data, sitemap)
- [ ] Performance audit (Core Web Vitals)
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Social sharing (Open Graph images per dynasty)

---

## Image & Copyright Policy
- Prefer public domain sources: Wikimedia Commons, National Palace Museum Open Data, Library of Congress
- All images must be CC0, CC-BY, or public domain
- Maintain an `ATTRIBUTIONS.md` for all media credits
- For maps: use open-source historical map datasets or create original SVG maps

---

## References & Inspiration
- [LingDong-/grand-timeline](https://github.com/LingDong-/grand-timeline) — interactive timeline of 30,800 Chinese historical figures
- [quzhi1/ChineseHistoricalSource](https://github.com/quzhi1/ChineseHistoricalSource) — searchable Twenty-Four Histories
- [cadicex/history_map](https://github.com/cadicex/history_map) — Chinese historical atlas
- Modern design references: Palace Museum digital exhibitions, Apple China, contemporary Chinese tea brand websites
