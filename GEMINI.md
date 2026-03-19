# Project Mandates (GEMINI.md)

This project is a high-quality React Portfolio application built with Vite, MUI, and TypeScript. Adhere to these rules for all development tasks.

## 1. Technical Stack & Environment

- **Node.js:** Use version `>= 22.0.0`.
- **Package Manager:** Use **Yarn 4.7.0** with `nodeLinker: node-modules`.
- **Framework:** React 18.2 (Vite).
- **Styling:** Material UI (MUI) 5.15+ with Emotion.
- **Routing:** `@tanstack/react-router`.
- **State Management:** Use React Contexts located in `src/contexts/`.
- **Internationalization:** `i18next` with `react-i18next`. Translation files are in `src/i18n/locales/`.

## 2. Component Architecture

Maintain the established directory structure in `src/components/`:

- **core/**: Base UI elements (Buttons, Typography, Headers).
- **customs/**: Specialized UI patterns (Backgrounds, Effects, Lists).
- **pages/**: Large components specific to sections of the site (About, Skills, Experience).
- **stories/**: All new UI components **MUST** have a corresponding `.stories.tsx` file in `src/stories/`.

## 3. Coding Standards

- **TypeScript:** Strict typing is mandatory. Avoid `any`. Use interfaces for component props.
- **Styling Guidelines:**
  - Prefer MUI's `sx` prop for one-off styles.
  - Use `styled()` from `@mui/material/styles` for reusable styled components.
  - Centralize theme values in `src/assets/themes/`.
- **Constants:** Always use centralized constants from `src/constants/` for:
  - Theme names (`APP_THEMES`).
  - Typography variants (`APP_TYPOGRAPHIES`).
  - Router paths (`ROUTER_PATHS`).
- **Icons:**
  - Use `@mui/icons-material` for standard system icons.
  - Use `@icons-pack/react-simple-icons` (fixed at **version 12.0.0**) for brand icons.

## 4. Workflows

- **I18n:** Never hardcode strings in components. Always use the `useTranslation` hook and add keys to `src/i18n/locales/en.ts` (and other locales).
- **Animations:** Use `framer-motion`. Prefer using existing variants from `src/utils/animations/`.
- **Quality Control:**
  - Run `yarn lint:fix` and `yarn prettier:fix` after any modification.
  - Ensure `yarn build` succeeds before finishing a task.
  - If a component is modified, verify its appearance in Storybook using `yarn storybook`.

## 5. Deployment & Compatibility

- **Vercel:** Maintain compatibility with Vercel's deployment environment. Do not upgrade `@icons-pack/react-simple-icons` beyond `12.x` unless the environment supports Node 24.
