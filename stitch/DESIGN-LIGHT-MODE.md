# Design System Specification: Clinical High-Tech Editorial

## 1. Overview & Creative North Star: "The Pristine Blueprint"

This design system is a study in clinical precision and architectural clarity. It moves away from the "soft and bubbly" web of the last decade, favoring a **"Pristine Blueprint"** aesthetic. Think of an ultra-high-resolution Apple Pro Display XDR showing a futuristic skyscraper’s schematics: sharp, luminous, and unapologetically technical.

The system breaks the "template" look through **intentional architectural tension**. We use the grace of _Noto Serif_ headlines to provide a human, editorial soul, juxtaposed against the cold, high-performance accuracy of _Space Grotesk_ and monospace data. Layouts should prioritize expansive white space (the "Alabaster" field) interrupted by razor-sharp technical elements and vibrant accent injections.

---

## 2. Colors & Surface Logic

The palette is rooted in a "High-Key" light mode. The goal is a luminous interface that feels like it’s emitting light rather than just reflecting it.

### Named Color Tokens (Material Design Mapping)

- **Background / Surface:** `#F7F9FB` (The base canvas)
- **Primary (The Royal Accent):** `#630ED4` / `#7C3AED` (Used for critical actions and brand signatures)
- **Secondary (The Technical Terminal):** `#006C49` / `#10B981` (Used for success states, data visualization, and technical callouts)
- **Surface Hierarchy:**
  - `surface_container_lowest`: `#FFFFFF` (Pure white for highest-priority cards)
  - `surface_container`: `#ECEEF0` (Standard grouping)
  - `surface_dim`: `#D8DADC` (Deepest recessive layer)

### The "No-Line" Rule

**Explicit Instruction:** Do not use 1px solid borders to section off large areas of the UI. Separation must be achieved through "Tonal Shifts." A card (`surface_container_lowest`) sits on a background (`surface`) without a stroke. The change in hex value is the boundary.

### The "Glass & Gradient" Rule

For floating panels (modals, navigation bars), use **Light Frosting**:

- **Background:** `rgba(255, 255, 255, 0.7)`
- **Backdrop-blur:** `20px`
- **Border:** `1px solid rgba(255, 255, 255, 0.4)` (The "Ghost Border")
- **CTA Gradients:** Use a linear gradient from `primary` (#630ED4) to `primary_container` (#7C3AED) at a 135° angle to give interactive elements a "gemstone" depth.

---

## 3. Typography: The Editorial Contrast

We use typography to balance "The Architect" (Serif) with "The Engineer" (Monospace).

- **Display & Headlines (Noto Serif):** These are your "Editorial" anchors. Use `display-lg` (3.5rem) with tight letter-spacing for hero sections. It conveys authority and premium heritage.
- **Data & Labels (Space Grotesk / Monospace):** All technical metadata, numbers, and system labels must use `label-md`. This provides the "Clinical" feel.
- **Body (Inter):** Used for long-form reading. Set to `body-md` (0.875rem) with generous line-height (1.6) to ensure the clinical aesthetic doesn't feel cramped.

---

## 4. Elevation & Depth: Tonal Layering

Traditional drop shadows are too "dirty" for this system. We use **Ambient Light** and **Physical Stacking**.

- **The Layering Principle:**
  1. Base: `surface` (#F7F9FB)
  2. Section: `surface_container_low` (#F2F4F6)
  3. Element: `surface_container_lowest` (#FFFFFF)
- **Ambient Shadows:** If an element must float (like a dropdown), use a shadow tinted with the `on-surface` color: `box-shadow: 0 10px 30px rgba(25, 28, 30, 0.04);`. It should be almost invisible, felt rather than seen.
- **Sharp Roundness:** All corners are locked to `0px`. This is non-negotiable. The "Clinical" look relies on the mathematical perfection of the right angle.

---

## 5. Component Guidelines

### Buttons (The High-Tech Triggers)

- **Primary:** Gradient fill (`primary` to `primary_container`), white text, `0px` border-radius. On hover, increase the saturation.
- **Secondary:** `surface_container_highest` background with `primary` text. No border.
- **Tertiary:** Pure text using `label-md` (Monospace), all caps, with a `2px` underline in `secondary_fixed` (#6FFBBE).

### Inputs & Fields

- **Style:** Background `surface_container_low`.
- **Indicator:** Instead of a full border, use a `2px` bottom-bar in `outline_variant`. On focus, this bar transforms into `primary` (#630ED4).
- **Labels:** Always use `label-sm` (Space Grotesk) in `on_surface_variant`.

### Cards & Lists

- **The Divider Forbid:** Never use a horizontal line to separate list items. Use `spacing-4` (1.4rem) of vertical white space or alternating tonal shifts (`surface` vs `surface_container_low`).
- **Technical Chips:** Use `secondary_container` (#6CF8BB) background with `on_secondary_container` (#00714D) text. Keep these small and monospace.

### Special Component: The "Blueprint Overlay"

For complex data views, use a background grid pattern: `1px` lines in `outline_variant` at 5% opacity, spaced at `spacing-8` (2.75rem) intervals. This reinforces the "Architectural" theme.

---

## 6. Do’s and Don’ts

### Do:

- **Use Asymmetry:** Place a large `display-lg` headline off-center to create a sophisticated, editorial layout.
- **Embrace High Saturation:** Let the Royal Purple and Terminal Emerald pop against the Alabaster background.
- **Use Monospace for Numbers:** Any numerical data (prices, dates, coordinates) must be in a high-contrast monospace font.

### Don’t:

- **Don't use Border Radius:** No "soft" corners. The system is built on the precision of the grid.
- **Don't use Grey Shadows:** Shadows must be extremely light or non-existent. Use color-filled containers to define space.
- **Don't Overcrowd:** If a screen feels "busy," increase the spacing using `spacing-12` (4rem) or `spacing-16` (5.5rem) blocks. The "Clinical" look requires breathing room.
