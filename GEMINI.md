# Project Mandates (GEMINI.md)

This project is a high-quality React Portfolio application built with Vite, Tailwind CSS v4, and TypeScript, following the **Algorithmic Atelier** design system.

## 1. Technical Stack & Environment

- **Node.js:** Use version `>= 22.0.0`.
- **Package Manager:** Use **Yarn 4.7.0** with `nodeLinker: node-modules`.
- **Framework:** React 18.2 (Vite).
- **Styling:** Tailwind CSS v4 with `@tailwindcss/vite` plugin. Design tokens defined in `src/index.css` via `@theme`.
- **Routing:** `@tanstack/react-router`.
- **State Management:** Use React Contexts located in `src/contexts/`.
- **Internationalization:** `i18next` with `react-i18next`. Translation files are in `src/i18n/locales/`.
- **Animation:** `@react-spring/web` for physics-based animations. `motion` (framer-motion) is available for Aceternity UI components.
- **UI Components:** Aceternity UI patterns in `src/components/customs/aceternity/`. These are copy-paste components adapted for react-spring.

## 2. Component Architecture

Maintain the established directory structure in `src/components/`:

- **core/**: Base UI elements (Buttons, Typography, Headers).
- **customs/**: Specialized UI patterns (Backgrounds, Effects, Lists, Aceternity UI).
- **customs/aceternity/**: Aceternity UI components (HoverEffect, SpotlightCard, MovingBorder, TextGenerateEffect, Lamp, ThreeDCard, WavyBackground).
- **pages/**: Large components specific to sections of the site (About, Skills, Experience).
- **stories/**: All new UI components **MUST** have a corresponding `.stories.tsx` file in `src/stories/`.

## 3. Coding Standards

- **TypeScript:** Strict typing is mandatory. Avoid `any`. Use interfaces for component props.
- **Styling Guidelines:**
  - Use Tailwind CSS utility classes exclusively for styling.
  - Use the `cn()` utility from `@utils/core/cn` (clsx + tailwind-merge) for conditional class merging.
  - Use design tokens from `src/index.css` — never hardcode colors. Reference via Tailwind classes like `text-ct-secondary`, `bg-ct-surface-container-low`, etc.
  - Use CSS utility classes from `src/index.css`: `glass-panel`, `glass-elevated`, `topology-grid`, `ghost-border`, `tonal-hover`, `hud-label`, `hud-breadcrumb`, `primary-glow`, `mint-glow`, `weaver-gradient`.
- **Constants:** Always use centralized constants from `src/constants/` for:
  - Theme names (`APP_THEMES`).
  - Typography variants (`APP_TYPOGRAPHIES`).
  - Router paths (`ROUTER_PATHS`).
- **Icons:**
  - Use `@phosphor-icons/react` as the **sole icon library** for all UI icons.
  - **Always use the `Icon` suffix naming convention** (e.g., `ArrowLeftIcon`, `GithubLogoIcon`, `EnvelopeIcon`). The names without `Icon` suffix (e.g., `ArrowLeft`, `GithubLogo`) are **deprecated** in phosphor v2.1+.
  - When aliasing icons for readability, use the `Icon` suffix source with a descriptive alias: `import { CaretLeftIcon as ChevronLeft } from '@phosphor-icons/react'`.
  - For brand icons not available in Phosphor (e.g., Zalo), use custom inline SVG components in `src/components/customs/icons/`.
  - **Do NOT** use `lucide-react`, `@mui/icons-material`, `@icons-pack/react-simple-icons`, or any other icon library.
- **Imports:**
  - **Always use `@` path aliases** for imports (e.g., `@components/core`, `@utils/core/cn`, `@constants`, `@contexts/theme-mode`). **Never** use relative paths like `./` or `../` for cross-directory imports.
  - Path aliases are configured in `tsconfig.app.json` and `vite.config.ts`.
- **Third-Party UI:**
  - **Do NOT** use `npx shadcn` CLI to add components. It injects conflicting CSS, `@theme` overrides, and `lib/utils` that break the existing design system.
  - Instead, manually copy Aceternity/shadcn component source code into `src/components/customs/aceternity/` and adapt it to use the project's `cn()` utility and design tokens.

## 4. Design System — Algorithmic Atelier

- **Design Reference:** Always refer to `stitch/DESIGN.md` for philosophy and `stitch/prototype.html` for layout specs.
- **Color Palette:** Purple primary (#d0bcff), Mint secondary (#4edea3), Obsidian surfaces (#10141a).
- **Typography:** `Noto Serif` for display/headline ("The Weaver"), `Space Grotesk` for body/labels ("The Architect").
- **No-Line Rule:** Replace solid borders with tonal shifts and glassmorphism. Use `glass-panel` class for card containers.
- **Section Headers:** Use the pattern `<h2 class="text-ct-secondary text-xs font-black tracking-[0.3em] uppercase">01 // SECTION_LABEL</h2>`.

## 5. Workflows

- **I18n:** Never hardcode strings in components. Always use the `useTranslation` hook and add keys to `src/i18n/locales/en.ts` (and other locales).
- **Animations:** Use `@react-spring/web` for component animations. Prefer using existing variants from `src/utils/animations/`.
- **Quality Control:**
  - Run `yarn lint:fix` and `yarn prettier:fix` after any modification.
  - Ensure `yarn build` succeeds before finishing a task.
  - If a component is modified, verify its appearance in Storybook using `yarn storybook`.

## 6. Deployment & Compatibility

- **Vercel:** Maintain compatibility with Vercel's deployment environment.
