# SVR Command Center — TS維修看板 · Layout Specification

> **Single source of truth:** the reference screenshot. Every value below is measured or
> estimated directly from it. This document exists so that another AI or developer can
> reproduce the dashboard pixel-close **without seeing the image**.
>
> **Do not** redesign, modernize, simplify, or invent a different layout. Reproduce as-is.

---

## Overview

### Dashboard purpose
A **full-screen operations "command center" wall board** (数字大屏 / dark-mode kanban) for a
repair/maintenance workshop. It monitors two product categories — **MB** (motherboard) and
**P-CARD** (power card) — tracking:

- Inbound / outbound / waiting-for-repair (WFR) unit counts (the left KPI rail).
- Defective units pending repair, broken down by customer program codes (A31 / N88 / T66 / A26).
- Production-line defects not yet sent to repair, same customer breakdown.
- Work-In-Progress (WIP) aging over the last ~12 days, as stacked bar + line charts.

It is designed to be displayed unattended on a large monitor/TV; hence the sci-fi "HUD"
aesthetic, high-contrast neon-on-dark palette, and a live clock + fullscreen control.

### Overall layout
A single non-scrolling screen (16:9). Three horizontal bands, and within the two upper bands a
left **rail** vs right **content** split:

```
┌──────────────────────────────────────────────────────────────────────┐
│ HEADER  (full width, framed title bar, clock + fullscreen at right)    │
├───────────────┬────────────────────────────────────────────────────────┤
│  MB KPI card  │   Table 1: 不良待修数量  (defect pending-repair qty)     │
│  (rail top)   │                                                        │
├───────────────┼────────────────────────────────────────────────────────┤
│ P-card KPI    │   Table 2: 產線不良品未送修數量 (line defects not sent)   │
│  (rail bot.)  │                                                        │
├───────────────┴────────────────────────────────────────────────────────┤
│  MB WIP Status chart        │        P-Card WIP Status chart            │
│  (bottom band, 2 equal panels, full width)                             │
└──────────────────────────────────────────────────────────────────────┘
```

- **Left rail** ≈ 24% width, holds the two KPI panels stacked vertically.
- **Right content** ≈ 76% width, holds the two tables stacked vertically.
- **Bottom band** is full width and holds two equal chart panels side by side.
- Vertical proportions ≈ **Header 8% · Tables/KPI band 52% · Charts band 40%**.

### Visual hierarchy
1. **Header title** — largest, brightest, centered, serif, glowing.
2. **Panel/section titles** (MB, P-card, table titles, chart titles) — bright cyan, bold.
3. **Table headers & KPI labels** — cyan, medium.
4. **Data values** — white, large in KPI, medium in tables.
5. **Underlined values** — signal drill-down links / thresholds (rendered as underlined numbers).
6. **Chart data ink** — saturated green/yellow/red bars + amber line, on a dim grid.

---

## Canvas

- **Reference resolution:** **1920 × 1080** (design at 1x for this size).
- **Aspect ratio:** **16:9**, locked. The board is not meant to reflow to portrait.
- **Scaling strategy:** Design once at 1920×1080, then **uniformly scale** to the viewport.
  Recommended: a `scale = min(vw/1920, vh/1080)` transform applied to a fixed 1920×1080 stage,
  centered, with letterboxing if the target aspect differs. All internal units are defined in a
  way that survives a single global scale (rem/px on a scaled stage, or `vw/vh`/`clamp()` fluid
  units). **No breakpoint re-layout** — the composition stays identical at every size (see
  *Responsive Rules*).

---

## Layout

Outer page padding around the whole board: ≈ **16–20px** on all sides (thin dark margin between
the panels and the screen edge).

### Header
- Full width, height ≈ **72–80px** (~7% of canvas height).
- A single framed "title plate": a horizontally elongated bar with an angular/notched sci-fi
  frame (brighter top edge, subtle side brackets), spanning most of the width and centered.
- **Title** centered inside the frame.
- **Right cluster** (outside/over the right end of the frame): clock icon + datetime, then a
  fullscreen icon + "全屏" label at the far right edge.
- Gap below header before the content band ≈ **12–16px**.

### Sidebar (left rail)
- Width ≈ **24%** of content width (~430–460px at 1920).
- Two stacked KPI panels:
  - **MB** panel (top), aligned to the top of Table 1.
  - **P-card** panel (bottom), aligned to the top of Table 2.
- Vertical gap between the two KPI panels ≈ **16–20px**, matching the gap between the two tables
  so the rail rows line up with the table rows.
- Right gap between rail and tables ≈ **16–20px**.

### Main content (right of rail)
- Width ≈ **76%**.
- Two stacked table panels, equal treatment, same vertical rhythm as the rail.
- Table 1 top edge aligns with MB panel top; Table 2 top edge aligns with P-card panel top.

### Footer
- No dedicated footer bar. A single line of **copyright text** sits in the **bottom-right corner
  over the charts band**: `Copyright © 2025. COMPAL CSW DTD team. All rights reserved.`
- Small (~12px), dim cyan/gray, right-aligned, ~8–12px inset from the bottom-right edge.

### Bottom charts band
- Full width, height ≈ **40%** of canvas.
- Two equal chart panels ("MB WIP Status", "P-Card WIP Status") separated by a ≈ **16–20px** gap.
- Each panel has a centered title header row, then the plot fills the remaining area.

---

## Grid System

The board is best built with **CSS Flexbox/Grid nesting**, not a single uniform grid.

### Top-level (page) — vertical flex / 3-row grid
```
grid-template-rows: auto  1fr  minmax(0, 40%);   /* header · mid band · charts */
```
- Row 1: header (fixed height).
- Row 2: mid band (rail + tables).
- Row 3: charts band.

### Mid band — 2-column flex/grid
```
grid-template-columns: 24fr 76fr;   /* rail · content, ~16px gap */
```
- **Rail column** — vertical stack (flex-direction: column) of 2 KPI panels, equal-ish heights.
- **Content column** — vertical stack of 2 table panels, equal-ish heights.

### KPI panel internals — 3-column grid
Each KPI panel body is a **3-column** grid: `IN QTY | OUT QTY | WFR`, columns of equal width,
label row on top, big value row below.

### Table internals — 6-column grid
`Customer | Total | A31 | N88 | T66 | A26`.
- Column 1 (Customer) is wider (~26–30% of table width, left-aligned).
- Columns 2–6 are roughly equal (~14% each), center-aligned.
- Rows: 1 header row + 3 data rows.

### Charts band — 2-column flex/grid
Two equal columns (`1fr 1fr`) with a gap; each is a titled panel containing one ECharts canvas.

---

## Component Hierarchy

```
Dashboard
├── Header
│   ├── TitlePlate (framed, centered title)
│   ├── Clock (icon + datetime)
│   └── FullscreenButton (icon + 全屏)
├── MidBand
│   ├── Sidebar (rail)
│   │   ├── KpiCard  "MB"      → IN QTY / OUT QTY / WFR
│   │   └── KpiCard  "P-card"  → IN QTY / OUT QTY / WFR
│   └── Content
│       ├── DataTable "不良待修数量"          (defect pending repair)
│       └── DataTable "產線不良品未送修數量"   (line defects not yet sent)
├── ChartsBand
│   ├── ChartPanel "MB WIP Status"     (stacked bars + lines)
│   └── ChartPanel "P-Card WIP Status" (stacked bars + lines)
└── Footer (copyright text, bottom-right overlay)
```

Every component is described in its own section below.

---

## Header

- **Size:** full board width; height ≈ 72–80px.
- **Decorative frame:** an elongated hexagon/parallelogram "title plate" with:
  - A **bright horizontal top rule** (thin cyan line) glowing along the top of the plate.
  - Angular notched corners / bracket accents at the far left and right of the plate.
  - A subtly lighter fill inside the plate than the page background, with a faint inner glow.
  - Left/right ends taper (cut corners) giving the HUD look.
- **Title:** `SVR Command Center-TS維修看板`
  - Centered horizontally within the plate.
  - **Serif** display face, **bold**, near-white (`#EAF6FF`) with a soft cyan glow/text-shadow.
  - Font size ≈ **30–34px**. Mixed Latin + CJK; CJK renders slightly heavier.
  - Letter-spacing slightly positive (~0.5–1px).
- **Clock:** top-right, ≈ 40–56px from the right edge (left of the fullscreen control).
  - A small circular clock **icon** (outline), then text `2026-01-06 17:02`.
  - Text ≈ **20–22px**, medium weight, light cyan-white (`#CFE8F5`).
  - Updates live every second (display shows date + HH:MM; seconds optional).
- **Fullscreen button:** far top-right corner.
  - An "expand" glyph (four outward corner arrows) + label `全屏`.
  - ≈ **18–20px** text, light cyan, clickable → toggles browser fullscreen.

---

## Sidebar

Two **KpiCard** panels (MB, P-card), identical structure.

### Panel frame
- Rounded-rectangle panel with a thin cyan border and dark translucent fill (see *Panel Style*).
- **Title header bar** at the top of each card:
  - Left-aligned title text (`MB`, `P-card`) in bold, ~22–24px.
  - Preceded by a **double-chevron ">>"** glyph badge (cyan, angular).
  - The header bar has a **teal→transparent gradient underline/fill** distinguishing it from the
    body; a subtle brighter band behind the chevron.

### Body — 3 KPI columns
- Three equal columns: **IN QTY · OUT QTY · WFR**.
- **Labels** (top): `IN QTY`, `OUT QTY`, `WFR` — cyan (`#5FC9D8`), ~16–18px, letter-spaced,
  centered over each value.
- **Values** (below): large white numerals, ~34–40px, bold, centered.
  - MB card values: `15`, `1`, `32`.
  - P-card card values: `59`, `23`, `39`.
- **Underline behavior:** the **WFR value only** is **underlined** (a thin cyan underline under
  `32` and `39`), marking it as a drill-down link / highlighted metric. IN/OUT values are not
  underlined.
- **Spacing:** generous vertical padding (~20–28px) top and bottom inside the body; the label→
  value gap ≈ 8–12px. Columns are evenly distributed (space-around).
- **Alignment:** labels and values center-aligned within each column; title header left-aligned.

---

## Tables

Two **DataTable** panels with identical structure; only the title and data differ.

### Panel & title
- Same panel frame as KPI cards. Title header bar at top with **">>"** chevron badge + title:
  - Table 1: `不良待修数量`
  - Table 2: `產線不良品未送修數量`
- Title text bold cyan/white, ~22–24px, left-aligned.

### Structure
6 columns × (1 header + 3 body) rows.

**Table 1 — 不良待修数量**

| Customer   | Total | A31 | N88 | T66 | A26 |
|------------|-------|-----|-----|-----|-----|
| MB         | 32    | 29  | 0   | 2   | 1   |
| P-CARD     | 33    | 29  | 0   | 0   | 4   |
| 最大時數(H) | 218   | 21  | 0   | 218 | 45  |

**Table 2 — 產線不良品未送修數量**

| Customer   | Total | A31 | N88 | T66 | A26 |
|------------|-------|-----|-----|-----|-----|
| MB         | 50    | 1   | 48  | 1   | 0   |
| P-CARD     | 2     | 2   | 0   | 0   | 0   |
| 最大時數(H) | 197   | 13  | 9   | 197 | 0   |

### Headers
- Header row: cyan text (`#4FD6E8`), **bold**, ~22–24px.
- Column headers `Customer / Total / A31 / N88 / T66 / A26`.
- Header has a slightly distinct background band (marginally lighter/tinted) vs body rows.

### Row heights
- Header row ≈ **56–64px**.
- Each body row ≈ **56–64px** (roughly equal to header). Three body rows fill the panel body.

### Borders
- Thin **cyan/steel 1px grid lines** between cells (both row separators and column separators),
  low opacity (~15–25% cyan). Outer panel border slightly brighter.
- Vertical dividers separate the numeric columns; the Customer column divider is present too.

### Typography
- First column (Customer values `MB`, `P-CARD`, `最大時數(H)`): white/light, ~20–22px,
  left-aligned, medium weight.
- Numeric cells: white numerals, ~22–24px, centered.

### Underline links
- **Every numeric data value in the breakdown columns is underlined** (rendered as an underlined
  number = drill-down link), including zeros. Observed underlined values:
  - Table 1: A31 col `29 / 29 / 21`, N88 `0 / 0 / 0`, T66 `2 / 0 / 218`, A26 `1 / 4 / 45`.
  - Table 2: A31 `1 / 2 / 13`, N88 `48 / 0 / 9`, T66 `1 / 0 / 197`, A26 `0 / 0 / 0`.
  - The **Total** column values (32/33/218, 50/2/197) appear **not** underlined (plain).
  - Underline = thin cyan line directly under the digits; color matches text or slightly dimmer.

### Alignment
- Customer column: **left-aligned**, with left cell padding ~16–20px.
- All numeric columns: **center-aligned**.
- Vertical alignment: middle.

---

## Charts

Two ECharts panels: **MB WIP Status** (left) and **P-Card WIP Status** (right). Both are combined
**stacked-bar + line** charts sharing the same encoding.

### Panel
- Titled panel; title centered at top (`MB WIP Status`, `P-Card WIP Status`), bold white/cyan,
  ~24–26px, with soft glow. Same panel frame family as the tables but this band has its own
  larger surrounding frame containing both charts.
- Inner chart padding ≈ 16–24px; extra room at top for the legend.

### Legend
- Centered near the top of each plot, single row, 5 entries in order:
  1. `≤4天` — **green** filled square.
  2. `4-7天` — **yellow/amber** filled square.
  3. `>7天` — **red** filled square.
  4. `OUT` — **green** line marker (small line + dot).
  5. `IN` — **amber/yellow** line marker (small line + dot).
- Legend text small (~14–16px), light cyan-gray.

### Axes
- **X axis:** category, daily dates `12/25, 12/26, 12/27, 12/28, 12/29, 12/30, 12/31, 01/01,
  01/02, 01/03, 01/04, 01/05` (12 categories). Labels ~13–14px, light gray-cyan, horizontal.
- **Dual Y axes:**
  - **Left Y** (bars): 0 → 60, gridlines at 10 intervals (0,10,20,30,40,50,60).
  - **Right Y** (lines): 0 → 120, gridlines at 20 intervals (0,20,…,120).
  - Both charts show both axes; the P-Card panel additionally renders an outer scale up to ~120
    on the left as well (dual-range look). Axis line color dim cyan; tick labels ~13px.
- Horizontal **gridlines** are faint dashed/solid cyan at low opacity (~10–15%).

### Stacked bars
- One bar per date, **stacked** in aging order bottom→top: **≤4天 (green)** → **4-7天 (yellow)**
  → **>7天 (red)**.
- Bar width ~50–60% of category band; slightly rounded or flat top.
- **Data labels** printed inside/atop segments (white numerals ~12px), e.g. left chart 12/25 shows
  `46` (green), `2` (yellow), `5` (red); subsequent bars `26/1/5`, `22/1/6`, `17/…/6`, `13/1`,
  `9/1`, small values, then `23/…/1` at 01/05. Zeros are shown near the baseline in amber.
- Segment colors are fully saturated (see palette); labels are legible against them.

### Line charts
- Two overlaid line series plotted against the **right Y axis**:
  - **OUT** — green line with dot markers.
  - **IN** — amber/yellow line with dot markers.
- Lines are thin (~2px) with small circular markers; values annotated at points (e.g. left chart
  IN peaks `16/17` around 01/04, OUT low near baseline). The amber (IN) line is the more prominent
  one, spiking on specific days (e.g. P-Card `42` spike near 01/03, `19` at 01/05).
- Lines sit **in front of** the bars.

### Colors (chart ink)
- ≤4天 green: `#22C38A`–`#2ED4A0` (emerald).
- 4-7天 yellow: `#F2C94C`–`#F5D64E` (amber-yellow).
- >7天 red: `#E7443B`–`#EB5545` (red).
- OUT line: green (matches ≤4天 family, `#2ED47A`).
- IN line: amber (matches 4-7天 family, `#F2C94C`).
- Axis/grid: dim cyan `rgba(90,190,220,0.15)`.

### Spacing & chart proportions
- Each plot area is roughly **as wide as its panel minus ~48px** and **~200–260px tall**.
- Plot aspect per panel ≈ **16:6** (wide and short).
- Equal left/right panels; equal internal grid margins so the two charts read as a matched pair.

---

## Typography

- **Font family:**
  - **Title (header):** a **serif** display face (Times/Songti-like), bold — used only for the
    main dashboard title.
  - **Everything else:** a clean **sans-serif** UI stack. Suggested:
    `"Microsoft YaHei", "PingFang SC", "Noto Sans SC", "Segoe UI", Roboto, Arial, sans-serif`.
    Numerals may use a slightly condensed/techno digit face but the standard sans is acceptable.
- **Font sizes (at 1920×1080 reference):**
  - Dashboard title: **30–34px**.
  - Chart panel titles: **24–26px**.
  - Section/table/KPI titles (MB, P-card, table names): **22–24px**.
  - Table headers: **22–24px**.
  - Table cell values: **22–24px**; Customer labels **20–22px**.
  - KPI big values: **34–40px**.
  - KPI labels (IN QTY / OUT QTY / WFR): **16–18px**.
  - Clock: **20–22px**; Fullscreen label: **18–20px**.
  - Legend: **14–16px**; axis labels: **13–14px**; bar data labels: **12px**.
  - Footer copyright: **12px**.
- **Font weights:** Titles/headers **700**; KPI values **700**; table values **500–600**;
  labels/axes **400–500**.
- **Line heights:** compact, ~1.1–1.3 for headings and values; ~1.4 for small labels.
- **Letter spacing:** headings & labels slightly positive (**0.5–1.5px**); uppercase KPI/column
  labels get the most tracking (~1px).

---

## Color System

Approximate palette sampled from the screenshot.

```
/* Backgrounds */
--bg-deep:        #061224;  /* darkest page base (corners)      */
--bg-base:        #0A1B30;  /* main dark navy background         */
--bg-panel:       #0E2540;  /* panel fill (slightly lighter)    */
--bg-panel-soft:  rgba(18, 48, 82, 0.55); /* translucent panel  */
--bg-header-row:  #113050;  /* table header band                */

/* Cyan / teal accents */
--accent-cyan:    #2FE0D0;  /* primary teal (header gradient L)  */
--accent-cyan-2:  #17C3E6;  /* bright cyan (titles, chevrons)    */
--accent-blue:    #1E7FD6;  /* header gradient right / blue      */
--line-cyan:      rgba(90, 190, 220, 0.18); /* grid/borders     */
--border-panel:   rgba(60, 170, 210, 0.45); /* panel border     */

/* Text */
--text-title:     #EAF6FF;  /* near-white glowing title          */
--text-primary:   #FFFFFF;  /* data values                       */
--text-cyan:      #4FD6E8;  /* labels, table headers             */
--text-cyan-dim:  #5FC9D8;  /* KPI labels                        */
--text-muted:     #8FB4C8;  /* axis labels, footer               */

/* Chart data ink */
--chart-green:    #2ED4A0;  /* ≤4天 / OUT line                   */
--chart-yellow:   #F2C94C;  /* 4-7天 / IN line                   */
--chart-red:      #EB5545;  /* >7天                              */

/* Glow */
--glow-cyan:      rgba(47, 224, 208, 0.45);
```

---

## Background

- **Base gradient:** a dark **radial/vertical navy gradient** — slightly lighter toward the center
  and top, darker at the corners (`--bg-deep` corners → `--bg-base` center).
- **Grid texture:** a faint **technical grid / mesh overlay** across the whole board (thin cyan
  lines, very low opacity ~4–6%), plus subtle diagonal "circuit"/world-map ghost imagery visible
  behind the middle band (barely perceptible, decorative only).
- **Glow:** soft cyan glows behind titles and along panel top edges; a faint teal vignette-inverse
  (center brighter) suggests screen backlight.
- **Overlays / transparency:** panels are semi-transparent dark fills over the textured background
  so the grid faintly shows through; header title plate has an inner glow overlay.
- **Header gradient bar:** the section title header bars (MB, P-card, table titles, and the main
  frame) use a **left-to-right teal→blue gradient** (`--accent-cyan` → `--accent-blue`), brightest
  on the left where the chevron sits, fading right.

---

## Panel Style

- **Borders:** 1px, `--border-panel` (semi-transparent cyan), sometimes doubled with a brighter
  1px top edge for a "lit" look.
- **Corner radius:** small, **6–8px** on panels; title header bars share the top radius.
- **Shadows:** outer drop shadow subtle and dark (`0 6px 18px rgba(0,0,0,0.35)`); the "glow" is an
  **inner/edge cyan glow** rather than a big blur (`inset 0 0 12px rgba(47,224,208,0.10)` +
  top-edge `0 -1px 0 rgba(47,224,208,0.5)`).
- **Fill:** `--bg-panel` or `--bg-panel-soft` (translucent) over the textured background.
- **Padding:** panel body inner padding ≈ **16–20px**; title header bar height ≈ **40–48px** with
  ~16px horizontal padding and the chevron badge inset ~12px from the left.
- **Title header bar:** distinct gradient band (teal→blue), separated from the body by a thin rule;
  chevron ">>" badge on the far left, title text following it.

---

## Spacing System

Estimated tokens (at 1920×1080 reference):

```
--space-1:   4px;
--space-2:   8px;
--space-3:  12px;
--space-4:  16px;   /* default gap between panels                */
--space-5:  20px;
--space-6:  24px;
--space-8:  32px;
```

- **Board outer margin:** `--space-4` to `--space-5` (16–20px) all sides.
- **Gaps between panels** (rail↔content, table↔table, chart↔chart, KPI↔KPI): `--space-4` (16px),
  up to `--space-5` (20px).
- **Panel inner padding:** `--space-4`/`--space-5`.
- **Label→value gap (KPI):** `--space-2`/`--space-3`.
- **Table cell padding:** horizontal `--space-4` (Customer col), numeric cols centered with
  ~`--space-3` vertical.
- **Radius token:** `--radius: 8px;` (`--radius-sm: 6px;`).

---

## CSS Variables

Suggested consolidated variable set (values reference-sized; scale globally, see Responsive).

```
:root {
  /* Colors — see Color System */
  --bg-deep:#061224; --bg-base:#0A1B30; --bg-panel:#0E2540;
  --bg-panel-soft:rgba(18,48,82,0.55); --bg-header-row:#113050;
  --accent-cyan:#2FE0D0; --accent-cyan-2:#17C3E6; --accent-blue:#1E7FD6;
  --line-cyan:rgba(90,190,220,0.18); --border-panel:rgba(60,170,210,0.45);
  --text-title:#EAF6FF; --text-primary:#FFFFFF; --text-cyan:#4FD6E8;
  --text-cyan-dim:#5FC9D8; --text-muted:#8FB4C8;
  --chart-green:#2ED4A0; --chart-yellow:#F2C94C; --chart-red:#EB5545;
  --glow-cyan:rgba(47,224,208,0.45);

  /* Spacing */
  --space-1:4px; --space-2:8px; --space-3:12px; --space-4:16px;
  --space-5:20px; --space-6:24px; --space-8:32px;

  /* Radius */
  --radius-sm:6px; --radius:8px;

  /* Shadows / glow */
  --shadow-panel:0 6px 18px rgba(0,0,0,0.35);
  --glow-edge:0 -1px 0 rgba(47,224,208,0.5);
  --glow-inner:inset 0 0 12px rgba(47,224,208,0.10);
  --glow-text:0 0 8px rgba(47,224,208,0.45);

  /* Typography */
  --font-serif:"Times New Roman","Songti SC",serif;
  --font-sans:"Microsoft YaHei","PingFang SC","Noto Sans SC","Segoe UI",Roboto,Arial,sans-serif;
  --fs-title:32px; --fs-chart-title:25px; --fs-section:23px;
  --fs-th:23px; --fs-td:23px; --fs-kpi:38px; --fs-kpi-label:17px;
  --fs-clock:21px; --fs-legend:15px; --fs-axis:13px; --fs-footer:12px;
  --fw-bold:700; --fw-med:500;
}
```

---

## Responsive Rules

Goal: **identical composition at every size** — no reflow, no breakpoint changes. This is a
fixed 16:9 wall board; it scales as a whole, it never re-lays-out.

**Method: fixed stage + transform scale (implemented).**
The board is rendered on a fixed `1920×1080` stage and scaled to fit:

```
scale = min(innerWidth / 1920, innerHeight / 1080)   // composables/useScale.js
transform-origin: top center;                        // App.vue .app-stage
transform: translateX(-50%) scale(scale);            // top-center anchored
```

- **Anchoring — top-center (not centered).** The stage is pinned to `top: 0; left: 50%` and
  scaled from `transform-origin: top center`. On viewports taller than 16:9 (portrait / tall
  screens) the extra space falls **below** the board instead of splitting above and below, so
  the board never floats in the middle of an empty screen. On 16:9 it fills exactly.
- **Uniform scale, no layout deltas.** At **1366×768** → `min(0.711, 0.711) = 0.711`; everything
  shrinks ~29% with proportions preserved exactly. Letterboxing (the atmospheric background)
  shows only when the viewport aspect ≠ 16:9.
- **Do not** switch to a stacked/mobile layout, hide columns, or change font ratios. KPI rail
  stays left, tables stay right, charts stay in a 2-up row — at every size.
- **Charts:** call ECharts `resize()` on `window` resize so canvases stay crisp; `grid`, legend
  and axis-label proportions stay constant.

**Small portrait screens — rotate hint (implemented).**
Because a 1920-wide board scaled to a phone's width makes text unreadable, portrait phones get a
full-screen prompt instead of the tiny board:

```
@media (orientation: portrait) and (max-width: 680px) {
  .app-stage  { display: none; }   /* hide the board */
  .rotate-hint{ display: flex; }   /* "Xoay ngang / Rotate to landscape" */
}
```

- The hint disappears the moment the device is rotated to landscape (orientation query flips),
  where the board fills the screen and is usable.
- Tablets (≥ 680px) and all landscape sizes always show the board.
- The rotate icon animates unless `prefers-reduced-motion: reduce`.
- This is a *presentation* wrapper only — it does **not** reflow or alter the board itself.

---

## Vue Component Tree

```
<DashboardView>                         // 1920×1080 stage + global scale wrapper
├── <AppHeader>
│   ├── <TitlePlate title="SVR Command Center-TS維修看板" />
│   ├── <LiveClock />                   // ticks every 1s
│   └── <FullscreenToggle label="全屏" />
├── <MidBand>
│   ├── <SidebarRail>
│   │   ├── <KpiCard title="MB"     :metrics="{ inQty:15, outQty:1,  wfr:32 }" />
│   │   └── <KpiCard title="P-card" :metrics="{ inQty:59, outQty:23, wfr:39 }" />
│   └── <ContentColumn>
│       ├── <DataTable title="不良待修数量"        :columns="cols" :rows="table1Rows" />
│       └── <DataTable title="產線不良品未送修數量" :columns="cols" :rows="table2Rows" />
├── <ChartsBand>
│   ├── <WipChartPanel title="MB WIP Status"     :data="mbWip" />
│   └── <WipChartPanel title="P-Card WIP Status" :data="pcardWip" />
└── <FooterCopyright text="Copyright © 2025. COMPAL CSW DTD team. All rights reserved." />
```

Shared building blocks:
- `<PanelFrame>` — the bordered/glowing container with an optional gradient `<PanelTitleBar>`
  (chevron badge + title), reused by KpiCard, DataTable, and WipChartPanel.
- `<ChevronBadge>` — the ">>" HUD glyph.
- `<UnderlineValue>` — a numeric value rendered as an underlined drill-down link.

---

## Implementation Notes

1. **Fixed 16:9 stage.** Build inside a `1920×1080` container and scale globally; never let content
   wrap. This guarantees fidelity from 1920×1080 down to 1366×768.
2. **Three-band grid**: rows `auto / 1fr / 40%`; mid band columns `24% / 76%` with 16px gaps.
   The KPI rail and the two tables share the same row rhythm so their top edges align.
3. **Panel title bars** all use the same **teal→blue left-to-right gradient** and a left ">>"
   chevron badge; keep them consistent across KPI, tables, and (larger) chart band.
4. **Underlines are semantic**, not decorative: WFR in KPI cards and every breakdown-column number
   in the tables (A31/N88/T66/A26, including zeros) are underlined links; **Total** column values
   are plain. Reproduce exactly which cells are underlined per the tables above.
5. **Exact table data** (do not alter):
   - T1 rows: `MB 32|29|0|2|1`, `P-CARD 33|29|0|0|4`, `最大時數(H) 218|21|0|218|45`.
   - T2 rows: `MB 50|1|48|1|0`, `P-CARD 2|2|0|0|0`, `最大時數(H) 197|13|9|197|0`.
   - KPI: MB `15/1/32`, P-card `59/23/39`.
6. **Charts** are combined bar+line with a **dual Y axis** (bars→left 0–60, lines→right 0–120).
   Stack order ≤4天(green, bottom) → 4-7天(yellow) → >7天(red, top). Two lines: OUT (green),
   IN (amber). Print segment value labels and line-point labels as in the screenshot. X = 12 daily
   categories `12/25 … 01/05`.
7. **Chart colors** must match the legend: green `#2ED4A0`, yellow `#F2C94C`, red `#EB5545`; OUT
   line green, IN line amber. Keep bar segments fully saturated; labels white 12px.
8. **Title is the only serif element** — bold serif with cyan text-glow; all other text is the sans
   UI stack. Numerals large and bold in KPI, medium in tables.
9. **Background** = dark navy radial gradient + faint cyan tech-grid overlay + ghost world-map/
   circuit imagery behind the mid band at very low opacity. Panels are semi-transparent so the
   texture shows through faintly. Add soft cyan edge/inner glow to panels and a bright top rule.
10. **Header right cluster**: live clock (`YYYY-MM-DD HH:MM`) with a small clock icon, then a
    fullscreen "expand" icon + `全屏` label at the extreme top-right; both light cyan.
11. **Footer** is just a small dim copyright line pinned bottom-right over the charts band:
    `Copyright © 2025. COMPAL CSW DTD team. All rights reserved.`
12. **Glow discipline**: use edge/top-rule glows and subtle text-shadows; avoid heavy blur so the
    board stays crisp on a large display.
13. **Live behavior**: clock updates each second; charts should call ECharts `resize()` whenever the
    stage scale changes so canvases render sharply at any viewport.
14. When any measurement is uncertain, prefer **relative consistency** (equal gaps, aligned rows,
    matched left/right chart panels) over guessed absolute pixels — the screenshot's proportions,
    not exact px, are the target.
