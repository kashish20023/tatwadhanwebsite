# TATVDHAN JAIPUR — ARCHITECTURAL & DESIGN SYSTEM BLUEPRINT (`brain.md`)
**Document Version:** 2.0.0 (Post-Audit & Reconstruction Edition)  
**System Architecture:** Next.js 16 (React 19) + Vinext / Vite 8 + Cloudflare Workers + Tailwind CSS v4  
**Classification:** Master Source-of-Truth Blueprint for Engineering, Design & QA  

---

## 1. Executive Summary & Technology Stack

The **Tatvdhan Jaipur — The Wedding Chapter** web application is a high-fashion, editorial digital flagship representing the heritage, craftsmanship, and modern bespoke silhouettes of luxury bridal couture from Jaipur, India.

### Core Technology Stack:
- **Framework:** Next.js 16 (`next@16.3.4`)
- **UI Library:** React 19 (`react@19.2.6`, `react-dom@19.2.6`)
- **Runtime & Bundler:** Vinext (`vinext@1.0.0-beta.5`) running Vite 8 (`vite@8.0.13`)
- **Cloud Infrastructure:** Cloudflare Workers runtime via `@cloudflare/vite-plugin` and Wrangler 4.92
- **Styling Architecture:** Tailwind CSS v4 (`tailwindcss@4.2.1`, `@tailwindcss/postcss@4.2.1`), PostCSS, `@theme inline` design tokens, and vendor shadcn animation rules (`tw-animate-css`)
- **Component Model:** Decoupled, accessible TypeScript client components under `components/tatvdhan/`, orchestrated cleanly by a 46-line `app/page.tsx`

---

## 2. Complete Typographic System & Font Hierarchy

### 2.1 Primary Font Families

| Font Role | CSS Variable Token | Font Family Fallback Stack | Visual Character & Application |
|---|---|---|---|
| **Global Website Font** | `--sans`, `--serif`, `--font-sans`, `--font-serif` | `"Alata", "Open Sans", Arial, Helvetica, sans-serif` | Clean, geometric, high-fashion modern typography loaded from Google Fonts. Applied globally across all elements: Headings (H1–H6), navigation, eyebrows, body text, buttons, and footers. |
| **Founder Signature Accent** | `--signature-font` | `"Flatlion", cursive, "Alata", sans-serif` | Warm cursive calligraphic flourish reserved for Vinayak Agarwal’s personal signature mark. |

### 2.2 Global Font & Smoothing Metrics
- **Base Body Font Size:** `14px` (Desktop) $\rightarrow$ `13px` (Mobile $\le 600\text{px}$)
- **Font Smoothing:** `-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`
- **Text Selection:** `::selection { background: var(--gold); color: var(--black); }` (`#e8c35a` background with `#000000` text)
- **Anchor Offset:** `section[id] { scroll-margin-top: 24px; }` prevents clipped titles on deep links

### 2.3 Comprehensive Type Hierarchy Table

| UI Element | CSS Selector / Component | Font Family | Size (Desktop / Fluid) | Weight | Letter Spacing | Line Height | Case & Styling |
|---|---|---|---|---|---|---|---|
| **Hero Title** | `.hero h1` | Serif | `clamp(39px, 5.6vw, 75px)` | 500 | `0.025em` | `1.06` | Title Case |
| **Hero Eyebrow** | `.hero-eyebrow` | Sans | `9px` | 600 | `0.2em` | `1.6` | Uppercase (`#f0d060`) |
| **Standard Eyebrow** | `.eyebrow` | Sans | `9px` (Mobile: `8px–9px`) | 600 | `0.2em` | `1.6` | Uppercase (`#705030`) |
| **Primary Section Headings** | `.editorial-copy h2`, `.center-heading h2`, `.journal-heading h2` | Serif | `clamp(31px, 3vw, 43px)` | 500 | `-0.02em` | `1.1` | Title Case |
| **Story Backdrop Heading** | `.story-copy h2` | Serif | `clamp(35px, 4vw, 53px)` | 500 | Normal | `1.1` | Title Case |
| **Founder Heading** | `.founder-intro h2` | Serif | `clamp(29px, 3vw, 42px)` | 500 | Normal | `1.05` | Title Case |
| **FAQ Heading** | `.faq-copy h2` | Serif | `clamp(34px, 4vw, 51px)` | 500 | Normal | `1.04` | Title Case (Subtitle `#a57c36`) |
| **Feature Copy Heading** | `.feature-copy h3` | Serif | `clamp(28px, 3vw, 40px)` | 500 | Normal | `1.1` | Title Case |
| **Journal Card Title** | `.journal-card h3` | Serif | `21px` (Mobile: `19px`) | 500 | Normal | `1.1` | Title Case |
| **Campaign Banner Heading** | `.campaign-image > span` | Serif | `25px` (Mobile: `20px`) | Normal | Normal | Normal | Title Case |
| **Main Navigation** | `.main-nav a` | Sans | `10px` | 500 | `0.075em` | Normal | Uppercase |
| **Action Links / CTAs** | `.text-link`, `.hero-link`, `.side-link` | Sans | `9px` | 500 | `0.12em` – `0.15em` | Normal | Uppercase |
| **Body Paragraphs** | `.editorial-copy p`, `.founder-note p`, `.story-copy p` | Sans | `12px` (Mobile: `11px`) | 400 | Normal | `1.8` – `1.9` | Regular (`#62605d`) |
| **Compact Body Copy** | `.copy-small` | Sans | `11px` | 400 | Normal | `1.8` | Regular |
| **Journal Date & Meta** | `.journal-date` | Sans | `8px` | 400 | `0.13em` | Normal | Uppercase (`#8c795e`) |
| **Founder Signature** | `.signature` | Serif | `27px` (Mobile: `21px`) | 400 | Normal | Normal | Italic (`#6b482c`) |
| **Founder Caption** | `.founder-caption` | Sans | `8px` (Mobile: `7px`) | 400 | `0.14em` | Normal | Uppercase (`#8c795e`) |
| **Story Signoff** | `.story-signoff` | Serif | `15px` | 400 | Normal | Normal | Italic (`#f1d58f`) |
| **FAQ Questions** | `.faq-item button` | Serif | `16px` | 400 | Normal | Normal | Regular (`#2a2723`) |
| **FAQ Answers** | `.faq-answer` | Sans | `11px` | 400 | Normal | `1.8` | Regular (`#77716a`) |
| **Footer Store Counter** | `.store-count` | Serif | `22px` | 400 | Normal | `1.1` | Title Case (`#eee7dc`) |
| **Footer Column Headings** | `.footer-column h3` | Sans | `9px` (Mobile: `8px`) | 500 | `0.18em` | Normal | Uppercase (`#d0ad5f`) |
| **Footer Links** | `.footer-column a` | Sans | `10px` (Mobile: `9px`) | 400 | Normal | Normal | Regular (`#c4beb3`) |
| **Footer Legal & Currency**| `.footer-bottom` | Sans | `9px` (Mobile: `8px`) | 400 | Normal | Normal | Regular (`#bcb5a9`) |

---

## 3. Color Palette & Design Tokens

### 3.1 Core Brand Color Tokens (`:root` & `@theme inline`)

```css
:root {
  --black: #000000;
  --near-black: #101010;
  --ivory: #f0f0f0;
  --gold: #e8c35a;
  --heritage: #301010;
  --warm-brown: #705030;
  --terracotta: #b07050;
  --peach: #c09070;
  --journal-bg: #f5f3ef;
  --gallery-bg: #fbfaf8;
  --story-bg: #433027;
  --campaign-surface: #251911;
  --gold-link: #a28349;
  --gold-hover: #9b7530;
  --gold-light: #f1d58f;
  --serif: "Bodoni MT", Didot, "Times New Roman", Georgia, serif;
  --sans: Arial, Helvetica, sans-serif;
}
```

### 3.2 Contextual Surfaces & Border Palette

| Surface / Token | HEX / RGBA Value | Context & Usage |
|---|---|---|
| **Canvas Background** | `#ffffff` | Primary bright white canvas for editorial and look sections |
| **Masthead & Footer** | `#000000` | Pure deep black masthead bar and evening footer canvas |
| **Primary Text** | `#101010` | Obsidian black body and headline text contrast |
| **Journal Canvas** | `#f5f3ef` | Warm neutral parchment tone distinguishing media and updates |
| **Gallery Canvas** | `#fbfaf8` | Subtle warm ivory background for horizontal look track |
| **Story Backdrop** | `#433027` | Deep espresso velvet tone with warm 90% darkening overlay |
| **Campaign Surface** | `#251911` | Dark bronze undertone on full-bleed banner card |
| **Antique Gold Accents** | `#e8c35a`, `#d0ad5f`, `#f1d58f` | Text selection, eyebrows, submit buttons, and signoff text |
| **Action Gold Links** | `#a28349`, `#9b7530` | Underlined links, hover states, and corner arrows |
| **Warm Earthy Umber** | `#705030` | Eyebrow badges and sub-headings |
| **Muted Copy Gray** | `#62605d`, `#69645d`, `#77716a` | Secondary descriptive text |
| **Neutral Dividers** | `#ece9e3`, `#dedbd6`, `#eeeae4` | Header border, FAQ dividers, and mobile menu separators |
| **Dark Borders** | `#38342e`, `#76684d` | Footer horizontal rule and newsletter input underline |

---

## 4. Layout Architecture & Spatial Grid

### 4.1 Global Container & Wrapping Rules
- **`.section-wrap`**:
  - **Desktop (>900px):** `width: min(1240px, calc(100% - 80px)); margin-inline: auto;`
  - **Tablet (601px–900px):** `width: min(100% - 48px, 720px); margin-inline: auto;`
  - **Mobile ($\le 600\text{px}$):** `width: calc(100% - 36px); margin-inline: auto;`
- **Vertical Spacing Rhythms:**
  - **Editorial & Story Sections:** `padding-block: 105px – 115px` (Mobile: `67px – 72px`)
  - **Journal & Gallery Sections:** `padding-block: 72px – 94px` (Mobile: `60px – 68px`)
  - **Founder Section:** `padding-block: 35px – 100px` (Mobile: `20px – 68px`)
  - **Site Footer:** `padding: 70px max(40px, ...) 24px` (Mobile: `58px 20px 22px`)

---

## 5. Section-by-Section Component Specifications

```
┌────────────────────────────────────────────────────────────────────────┐
│ 1. Header (`Header.tsx`): 72px Masthead + Centered Sub-Nav + Drawer   │
├────────────────────────────────────────────────────────────────────────┤
│ 2. Hero (`Hero.tsx`): Full-Bleed Video + Eager Fallback + Preserved Text│
├────────────────────────────────────────────────────────────────────────┤
│ 3. Editorial (`EditorialSection.tsx`): 0.7fr 1.3fr Asymmetric Mosaic   │
├────────────────────────────────────────────────────────────────────────┤
│ 4. Collection (`CollectionSection.tsx`): 3-Look Row + Feature Split    │
├────────────────────────────────────────────────────────────────────────┤
│ 5. Journal (`JournalSection.tsx`): 4-Card Article Grid + Banner        │
├────────────────────────────────────────────────────────────────────────┤
│ 6. Our Story (`OurStory.tsx`): Deep Canvas + Companion + Atomic Sync   │
├────────────────────────────────────────────────────────────────────────┤
│ 7. The Man Himself (`FounderSection.tsx`): 3-Column Founder Narrative  │
├────────────────────────────────────────────────────────────────────────┤
│ 8. Gallery Carousel (`GalleryCarousel.tsx`): Smooth Track + Scroll-Snap│
├────────────────────────────────────────────────────────────────────────┤
│ 9. FAQ Section (`FAQSection.tsx`): 6 Inquiries + Arched Corner Frame   │
├────────────────────────────────────────────────────────────────────────┤
│ 10. Footer (`Footer.tsx`): Newsletter + 5 Stores + 3 Columns + Legal   │
└────────────────────────────────────────────────────────────────────────┘
```

---

### Section 1: Header (`components/tatvdhan/Header.tsx`)
- **Structure:**
  1. **Black Masthead Bar (`.masthead`):**
     - Height: `72px` (Desktop) / `62px` (Mobile)
     - Surface: `#000000`
     - Grid layout: `1fr auto 1fr; align-items: center; padding: 0 5vw;`
     - Logo mark: Centered `image_01.png` (`width: 134px`, mobile `112px`).
     - Mobile toggle: Hamburger button (`.menu-toggle`) hidden on desktop, active on $\le 600\text{px}$.
  2. **White Navigation Bar (`.main-nav`):**
     - Height: Min `50px`, surface `#ffffff`, border-bottom `1px solid #ece9e3`.
     - Links: *Collection*, *Occasions*, *Discover*, *Media*, *Our Story*, *Show More ＋*.
     - Hover State: Transitions to gold `#9b7530` within 0.2s.
     - Mobile Drawer (`.main-nav.is-open`): Expands vertically with elevation shadow `0 12px 20px rgba(0,0,0,0.10)`.

---

### Section 2: Video Hero (`components/tatvdhan/Hero.tsx`)
- **Dimensions:** `min-height: min(69vw, 650px); height: 66vh; max-height: 700px;` (Mobile: `min-height: 560px; height: 78vh`).
- **Layers & Stacking Context:**
  1. **Eager Fallback Image (`.hero-image`):** `/images/image_18.webp` (`object-fit: cover`, `object-position: center 50%`, mobile `53% center`). Guarantees zero layout shift.
  2. **HTML5 Background Video (`.hero-video`):** Full-bleed video element with `autoplay`, `muted`, `loop`, `playsInline`, `poster="/images/image_18.webp"`. Configured for `/videos/hero.mp4` and `/videos/hero.webm`.
  3. **Atmospheric Dark Gradient (`.hero-shade`):** Linear gradient from `rgba(0,0,0,0.12)` down to `rgba(0,0,0,0.66)`.
  4. **Preserved Hero Copy Stack (`.hero-content`, `z-index: 2`):**
     - Eyebrow: `Tatvdhan · Jaipur` in `#f0d060`
     - Title: `The Wedding Chapter` in Bodoni Serif `clamp(39px, 5.6vw, 75px)`
     - Action CTA: `Discover the collection ↓` bordered link to `#collection`

---

### Section 3: Editorial / Lorem Lipsum (`components/tatvdhan/EditorialSection.tsx`)
- **Layout Architecture:** Strict 3-column, 2-row unified grid (`repeat(3, 1fr)`) with `gap: 13px` directly matching reference Image 2 and PDF.
- **Row 1:**
  - **Cell (1, 1) — Text Block (`.editorial-text-card`):**
    - H2 `Lorem Lipsum` in clean sans-serif (`clamp(34px, 3.4vw, 46px)`).
    - Paragraph 1: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the Industry's`.
    - Paragraph 2: `Lorem Ipsum is simply dummy text`.
    - Button: Rectangular outline box `[ Show More ]` (`.editorial-btn`, `border: 1px solid #000; padding: 8px 32px;`).
  - **Cell (1, 2) — Detail Collage (`.editorial-img-detail`):** `/images/image_22.webp` (`object-position: center 50%`).
  - **Cell (1, 3) — Lying Down Portrait (`.editorial-img-lying`):** `/images/image_19.webp` (`object-position: center 40%`).
- **Row 2:**
  - **Cell (2, 1) — Standing Portrait (`.editorial-img-standing`):** `/images/image_21.webp` (`object-position: center 25%`), positioned directly below the text block with identical width.
  - **Cell (2, 2–3) — Wide Palace Gazebo (`.editorial-img-palace`):** `/images/image_02.webp` (`object-position: center 48%`), spanning 2 columns directly below both the detail collage and the lying-down portrait.
- **Micro-Interaction:** Hovering any figure triggers micro-zoom `transform: scale(1.035)` over `0.7s cubic-bezier(0.2, 0.7, 0.3, 1)`.

---

### Section 4: Collection Story & Occasions (`components/tatvdhan/CollectionSection.tsx`)
- **Top Heading (`.center-heading`):** Centered text block (max-width 640px) with eyebrow `Made for the moments you remember` and H2 `Lorem Lipsum`.
- **3-Look Card Row (`#occasions`, `.look-row`):**
  - 3-column grid (`repeat(3, 1fr)`), height 380px (mobile `min(62vw, 275px)`), background `#e7dfd2`.
  - Look 1: `/images/image_20.webp` (blush embroidered sherwani)
  - Look 2: `/images/image_05.webp` (relaxed portrait in blush)
  - Look 3: `/images/image_03.webp` (seated traditional couture look)
- **Feature Copy Split (`.feature-copy`):**
  - Asymmetric grid: `0.8fr 1fr`, gap `clamp(40px, 8vw, 110px)`, margin-top 85px.
  - Left: Eyebrow `The art of dressing well`, H3 `Lorem Lipsum`, descriptive copy, `Show More ↗`.
  - Right: Architectural palace portrait figure (`310px` tall, `/images/image_02.webp`, `object-position: center 48%`).

---

### Section 5: Media & House Journal (`components/tatvdhan/JournalSection.tsx`)
- **Surface:** `#f5f3ef` warm parchment tone.
- **Header Row:** Flex container with eyebrow `From the house`, H2 `News & collections`, and right link `Discover Tatvdhan ↗`.
- **4-Card Article Grid (`.journal-grid`):**
  - 4-column desktop grid (2-column on tablet and mobile) with 174px card figures on `#d1c2ad`.
  - Card 1: *Araico Collection launch* (`image_04.webp`)
  - Card 2: *Araico Collection launch* (`image_18.webp`, `object-position: center 45%`)
  - Card 3: *Clothing Drive 2020* (`image_02.webp`, `object-position: center 50%`)
  - Card 4: *F/W 2020 Sneak Peek* (`image_05.webp`)
  - Metadata: Date `Tatvdhan Journal · Jaipur`, 21px serif title, summary copy, and hoverable gold corner arrow (`↗`).
- **Full-Width Campaign Banner (`.campaign-image`):**
  - Height 300px (220px mobile), 17px rounded corners, dark base `#251911`, image `/images/image_04.webp`.
  - Dark gradient fade with overlay title `Explore the Wedding Chapter ↗` in 25px Bodoni serif.

---

### Section 6: Our Story (`components/tatvdhan/OurStory.tsx`)
- **Layout Architecture:** Asymmetric 2-column layout (`1.25fr 0.62fr`) with fluid gap `clamp(34px, 7vw, 94px)`.
- **Left Canvas (`.story-backdrop`):**
  - Deep espresso background `#433027`, minimum height 510px (440px tablet).
  - Background image `/images/image_31.webp` with warm 90% darkening overlay.
  - Floating Copy: Eyebrow `Rooted in tradition` in `#ecd18b`, H2 `Our Story` (`clamp(35px, 4vw, 53px)`), narrative paragraph, and italic signoff `Tatvdhan — Rooted in tradition. Made for today.` in `#f1d58f`.
- **Right Column (`.story-side`):**
  - Companion portrait `/images/image_03.webp` (height 365px, `object-position: center 40%`).
  - Action link: `Discover our story ↗` with bottom border `#d8d2ca`.
- **Synchronized Multi-Chapter Navigation:**
  - Atomic state transition via `activeStoryIndex`: Next/Prev circular arrows cycle through 3 chapters (*"Rooted in tradition"*, *"The Wedding Chapter"*, *"Crafted for Generations"*) switching both left copy and right companion portrait simultaneously.

---

### Section 7: The Man Himself (`components/tatvdhan/FounderSection.tsx`)
- **Layout Architecture:** Strict 3-column horizontal grid (`0.83fr 0.8fr 1fr`), fluid gap `clamp(36px, 6vw, 84px)`.
- **Column 1 (`.founder-intro`):** Eyebrow `A vision for today`, H2 `The Man Himself` (`clamp(29px, 3vw, 42px)`), founder philosophy intro.
- **Column 2 (`.founder-portrait`):** Height 390px (360px tablet, 260px mobile), 5px rounded corners, portrait image `/images/image_34.webp` (`object-position: center 23%`).
- **Column 3 (`.founder-note`):** Extended vision statement, founder signature `Vinayak Agarwal` (27px serif italic, color `#6b482c`), and uppercase sub-caption `FOUNDER, TATVDHAN JAIPUR`.
- **Responsive Adaptations:** Tablet collapses to 2 columns with founder note spanning full width below; mobile rearranges to an asymmetrical 2-column layout with intro on top.

---

### Section 8: Gallery Carousel Showcase (`components/tatvdhan/GalleryCarousel.tsx`)
- **Visual Presentation:** Pure white canvas (`#ffffff`) with clean, centered sans-serif heading and subtitle directly matching the PDF reference.
  - Heading: `Lorem Lipsum` in clean sans display font (`clamp(34px, 3.5vw, 44px)`).
  - Subtitle: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`
  - Removed eyebrow ("A CLOSER LOOK") and manual arrow buttons to match the exact PDF layout.
- **Continuous Right-to-Left Slider Mechanism:**
  - Automatically advances cards smoothly from right to left every 2.8 seconds.
  - As each card transitions into the exact center position, it dynamically expands into the featured center card:
    - Center Card: Wider (`clamp(245px, 26vw, 295px)`), taller (`clamp(290px, 31vw, 360px)`), hanging lower down while top-aligned, subtle shadow (`0 14px 35px rgba(0,0,0,0.08)`), `border-radius: 18px`.
    - Side Cards: Standard dimensions (`clamp(200px, 22vw, 245px)` by `clamp(245px, 26vw, 300px)`), top-aligned at `0px`.
  - Infinite seamless wrap-around without visual jumps or animation glitches.
  - Interactive features: Hover pauses slider, touch swipe navigates, clicking any card slides it to center, keyboard navigation (`ArrowLeft`/`ArrowRight`), respects `prefers-reduced-motion`.

---

### Section 9: FAQ Accordion (`components/tatvdhan/FAQSection.tsx`)
- **Layout Architecture:** 2-column layout (`0.9fr 1.1fr`) with fluid gap `clamp(55px, 8vw, 116px)`.
- **Left Column (`.faq-copy`):**
  - Eyebrow: `Here to help`
  - H2: `Got Questions?` with antique gold subtitle `We’ve Got Answers` (`#a57c36`)
  - Introductory caption: `Everything you need to know before getting started.`
  - Interactive Accordion: 6 inquiries with accessible buttons (`aria-expanded`, `aria-controls`), mutually exclusive expansion, and circular toggle indicators (`+` when closed, `−` when open).
- **Right Column (`.faq-image`):**
  - Asymmetrical architectural arched frame: `border-radius: 5px 75px 5px 5px` (54px on mobile), height 480px, displaying `/images/image_02.webp` (`object-position: center 45%`).

---

### Section 10: Site Footer & Newsletter (`components/tatvdhan/Footer.tsx`)
- **Canvas:** Pure Black `#000000` with ivory text `#f4f0e8`.
- **Column 1 — Newsletter & Physical Stores:**
  - Eyebrow `Stay in the know` (`#d0ad5f`), 24px Bodoni serif title.
  - Inline underline form (`border-bottom: 1px solid #76684d`) with transparent input and gold submit CTA (`Sign up ↗`).
  - Privacy consent checkbox and live feedback message on submit (*"Thank you for signing up."*).
  - Physical store counter: `5 Stores worldwide` in 22px Bodoni serif with `Find a Store ↗` action link.
- **Columns 2, 3 & 4 — Information Directories:**
  - **The Company:** About Us, Sustainability, Couture Process, Runways, Association, Career.
  - **Need Help:** Contact Us, Visit Store, Shipping, FAQ's, Profile.
  - **Legal:** Privacy & Cookies, Fees And Payment, Term And Condition.
- **Bottom Bar (`.footer-bottom`):**
  - Left: Copyright `© 2026 Tatvadhan`.
  - Center: Centered brand mark `/images/image_01.png` (`width: 77px`, opacity 0.8) linking to `#top`.
  - Right: Currency selector `🇮🇳   INR`.

---

## 6. Responsive Breakpoint Matrix

| Viewport Category | Container Width | Editorial Layout | Look Row | Journal Grid | Founder Layout | Footer Layout |
|---|---|---|---|---|---|---|
| **Desktop (>900px)** | `min(1240px, calc(100% - 80px))` | `0.7fr 1.3fr` (2-col) | 3-card row (380px) | 4 columns | 3 columns (`0.83fr 0.8fr 1fr`) | 4 columns (`1.8fr 0.8fr 0.8fr 0.8fr`) |
| **Tablet (601px–900px)**| `min(100% - 48px, 720px)` | 1 column (38px gap) | 3-card row (310px) | 2 columns (30px row-gap) | 2 columns (note span 1/-1) | 3 columns (`1.3fr 1fr 1fr`, newsletter full width) |
| **Mobile ($\le$ 600px)** | `calc(100% - 36px)` | 1 column (mosaic rows fluid `48vw`) | 3-card row (`min(62vw, 275px)`) | 2 columns (145px cards) | Asymmetric 2-column (intro on top) | 2 columns (`1fr 1fr`, newsletter full width) |

---

## 7. Complete Asset Inventory Matrix (`/public/images/`)

| Asset Filename | Format | File Size | Natural Dimensions | Focal Alignment (`object-position`) | Component & Section Usages |
|---|---|---|---|---|---|
| **`image_01.png`** | PNG (Alpha) | 44.8 KB | 400 × 120 | Center | Masthead Brand Mark & Footer Brand Mark |
| **`image_02.webp`** | WebP | 254.8 KB | 1200 × 1600 | `center 50%` / `center 45%` | Editorial Mosaic 4, Feature Split, Journal Card 3, FAQ Arched Frame |
| **`image_03.webp`** | WebP | 139.5 KB | 900 × 1200 | `center 40%` | Occasions Look 3, Story Companion Look, Gallery Track |
| **`image_04.webp`** | WebP | 198.0 KB | 1200 × 800 | `center 49%` | Journal Card 1, Full-Width Campaign Banner Card |
| **`image_05.webp`** | WebP | 56.2 KB | 800 × 1067 | `center 40%` | Occasions Look 2, Journal Card 4, Gallery Track |
| **`image_18.webp`** | WebP | 181.9 KB | 1400 × 933 | `center 50%` (Mobile: `53% center`) | Hero Video Poster & Eager Fallback Image, Journal Card 2 |
| **`image_19.webp`** | WebP | 204.9 KB | 1000 × 1500 | `center 39%` | Editorial Mosaic 2 (Tall), Gallery Track |
| **`image_20.webp`** | WebP | 142.7 KB | 900 × 1200 | `center 30%` | Occasions Look 1, Gallery Track |
| **`image_21.webp`** | WebP | 162.7 KB | 900 × 1200 | `center 32%` | Editorial Mosaic 3 (Embroidery Portrait), Gallery Track |
| **`image_22.webp`** | WebP | 110.4 KB | 800 × 1000 | `center 54%` | Editorial Mosaic 1 (Textile Close-Up Detail) |
| **`image_31.webp`** | WebP | 499.1 KB | 1600 × 1067 | `center 47%` | Our Story Deep Velvet Espresso Backdrop Canvas |
| **`image_34.webp`** | WebP | 78.7 KB | 700 × 933 | `center 23%` | The Man Himself — Vinayak Agarwal Founder Portrait |

---

## 8. Client State Management & Interactivity Contracts

1. **Header Mobile Navigation (`Header.tsx`):**
   - Controlled or autonomous boolean state `menuOpen`.
   - Accessible ARIA bindings: `aria-expanded`, `aria-label`.
   - Links auto-close the drawer on click.
2. **Hero Video Lifecycle (`Hero.tsx`):**
   - Eager fallback image renders immediately to prevent Cumulative Layout Shift (CLS).
   - Video element attempts silent auto-play (`muted`, `playsInline`) with opacity cross-fade upon `onLoadedData`.
3. **Synchronized Multi-Chapter Story Navigation (`OurStory.tsx`):**
   - Single atomic state pointer: `const [activeStoryIndex, setActiveStoryIndex] = useState(0)`.
   - Left-hand copy (eyebrow, title, narrative, signoff, backdrop image) and right-hand companion portrait/link update simultaneously.
4. **Gallery Carousel Track Navigation (`GalleryCarousel.tsx`):**
   - `useRef<HTMLDivElement>` attached to `.look-carousel`.
   - Programmatic smooth stepping: `galleryRef.current.scrollBy({ left: direction * 330, behavior: "smooth" })`.
   - Keystroke listeners: `ArrowLeft` and `ArrowRight` trigger navigation.
5. **FAQ Interactive Accordion (`FAQSection.tsx`):**
   - Mutually exclusive state index: `const [openIndex, setOpenIndex] = useState<number | null>(null)`.
   - Accessibility bindings: `aria-expanded={isOpen}`, `aria-controls={contentId}`, `role="region"`.
6. **Newsletter Submission (`Footer.tsx`):**
   - Form state: `email`, `agreed`, `signupMessage`.
   - Dispatches live confirmation message (*"Thank you for signing up."*) and clears inputs without page refresh.

---

## 9. UI Primitive Catalog (`components/ui/`)

The application includes 61 enterprise-grade Radix / shadcn primitives ready for feature extension:
- **Overlays & Dialogs:** `dialog.tsx`, `drawer.tsx`, `sheet.tsx`, `popover.tsx`, `tooltip.tsx`, `alert-dialog.tsx`, `dropdown-menu.tsx`, `context-menu.tsx`
- **Form Controls:** `button.tsx`, `input.tsx`, `textarea.tsx`, `select.tsx`, `combobox.tsx`, `checkbox.tsx`, `switch.tsx`, `slider.tsx`, `radio-group.tsx`, `input-otp.tsx`
- **Data Display & Layout:** `card.tsx`, `carousel.tsx`, `table.tsx`, `chart.tsx`, `badge.tsx`, `avatar.tsx`, `separator.tsx`, `scroll-area.tsx`, `tabs.tsx`, `skeleton.tsx`, `progress.tsx`

---

## 10. Developer & Designer Guidelines

1. **Preserve Exact Typography:** Never substitute browser default fonts or arbitrary Google Fonts for the Bodoni Serif (`--serif`) or Sans (`--sans`) stacks.
2. **Preserve Color Palette Integrity:** Never introduce bright, oversaturated, or generic neon colors. Rely strictly on the curated Jaipur palette tokens (`--gold`, `--warm-brown`, `--heritage`, `--terracotta`, `--near-black`, `#f5f3ef`, `#433027`).
3. **Zero Layout Shift Rule:** Whenever modifying photography or video elements, maintain `object-fit: cover` and preset height containers.
4. **Accessible Motion:** Always verify that smooth scroll and animations degrade gracefully under `@media (prefers-reduced-motion: reduce)`.
