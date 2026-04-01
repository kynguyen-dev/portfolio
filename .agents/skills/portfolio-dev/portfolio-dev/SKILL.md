---
name: portfolio-dev
description: Development assistant for the Three Kingdoms Portfolio project. Use for adding/editing characters, managing translations (i18n), and ensuring consistency with MUI/Tailwind/TanStack tech stack.
---

# Three Kingdoms Portfolio Development

This skill provides specialized workflows and standards for maintaining the Three Kingdoms Portfolio application.

## Core Tech Stack

- **Framework**: React 18 (Vite)
- **UI**: MUI 5 (Emotion) + Tailwind CSS (Modern Ink Wash style)
- **Data Fetching**: TanStack Query & Virtual
- **I18n**: i18next (Locales: en, ja, vi)

## Workflows

### 1. Adding/Updating Characters

Characters are stored in `public/data/three-kingdoms/characters.json`.

- **ID format**: Kebab-case (e.g., `cao-cao`, `liu-bei`).
- **Kingdoms**: `Wei`, `Shu`, `Wu`, `Other`.
- **Images**: Reference `/images/three-kingdoms/avatar/{id}.jpg`.
- **Stats**: Scale of 0-100 (Power, Intelligence, Leadership, Charisma).

### 2. Managing Translations

Translations live in `src/i18n/locales/`.

- Always update `en.ts`, `ja.ts`, and `vi.ts` simultaneously to maintain parity.
- Use `useTranslation` hook in components.

### 3. Component Architecture

- **Core**: Reusable base components (Buttons, Typography).
- **Customs**: Domain-specific UI patterns (SkillBox, GradientPaper).
- **Pages**: Section-level components.
- **Stories**: Every UI component MUST have a `.stories.tsx` file in `src/stories/`.

### 4. Design Guidelines (Modern Ink Wash)

- **Colors**: Gold (#C5A059), Dark (#1A1A1B), Kingdom specific colors.
- **Effects**: Glassmorphism, Gradient text, Framer Motion animations.
- **Images**: "Modern Ink Wash" style (Thủy mặc hiện đại).

## Commands & Scripts

- `yarn lint:fix`: Fix linting issues.
- `yarn prettier:fix`: Format code.
- `yarn storybook`: View components in isolation.
- `yarn build`: Verify production build.
