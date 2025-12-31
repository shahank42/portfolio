# Agent Guidelines for Portfolio Project

This document provides instructions and guidelines for AI agents operating within this codebase.

## 1. Project Overview

- **Framework:** [Astro v5](https://astro.build/) with [React v19](https://react.dev/).
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with [Shadcn UI](https://ui.shadcn.com/) patterns.
- **Language:** TypeScript (Strict Mode).
- **Package Manager:** `pnpm`.

## 2. Build, Lint, and Test Commands

### Development
- **Start Dev Server:**
  ```bash
  pnpm run dev
  ```

- **Build for Production:**
  ```bash
  pnpm run build
  ```

- **Preview Production Build:**
  ```bash
  pnpm run preview
  ```

### Verification
- **Type Check:**
  Since there is no dedicated script, use the `astro` CLI directly:
  ```bash
  pnpm exec astro check
  ```

- **Linting:**
  There are no explicit lint scripts configured. Follow existing code style.

- **Testing:**
  There is currently **no test suite** (Jest/Vitest) configured.
  - Do not attempt to run `npm test` or `pnpm test`.
  - If asked to create tests, verify the desired test runner with the user first.

## 3. Code Style & Conventions

### General
- **Indentation:** 2 spaces.
- **Semicolons:** Avoid semicolons in TS/TSX files (except where syntactically required).
- **Quotes:** Use double quotes `"` for strings and imports.

### TypeScript / React
- **Imports:**
  - Use the `@/` alias for imports from `src/` (e.g., `@/lib/utils`, `@/components/ui/button`).
  - Use `import * as React from "react"` for React imports.
  - Group imports: External dependencies first, then internal alias imports, then relative imports.
- **Components:**
  - Use **Named Exports** for components (e.g., `export function Button`).
  - Use Functional Components with Hooks.
  - Props interfaces should be defined or intersected inline (see `src/components/ui/button.tsx`).
- **Naming:**
  - Components: PascalCase (e.g., `Hero.astro`, `SmoothScroller.tsx`).
  - Utilities/Functions: camelCase (e.g., `cn`, `getThemePreference`).
  - Files:
    - Astro/React Components: PascalCase.
    - Utilities/Configs: camelCase.

### Styling (Tailwind CSS)
- Use **Tailwind CSS v4** utility classes.
- Use the `cn()` utility (from `@/lib/utils`) for conditional class merging.
- Use `cva` (class-variance-authority) for defining component variants (Shadcn pattern).
- Support Dark Mode via the `dark:` prefix (system uses `dark` class on `<html>`).
- Use CSS variables for theme values (defined in `src/styles/global.css` or arbitrary values).

### Astro Specifics
- Place component logic in the Frontmatter fence (`---`).
- Use `client:*` directives sparingly, only when interactivity is required (e.g., `client:load`, `client:only`).
- Keep Astro pages in `src/pages/`.

## 4. Project Structure

- `src/components/`: Reusable UI components.
  - `ui/`: Primitives (Buttons, Cards, etc.) following Shadcn UI.
- `src/layouts/`: Astro layouts (e.g., `main.astro`).
- `src/lib/`: Utilities (`utils.ts`) and data (`content.ts`).
- `src/pages/`: Route definitions (`index.astro`).
- `src/styles/`: Global styles (`global.css`).
- `public/`: Static assets.

## 5. Error Handling
- Use specific error types where possible.
- In UI components, handle missing props gracefully or use sensible defaults.

## 6. Visual Design System

### Core Tokens
- **Colors (OKLCH):** Defined in `src/styles/global.css`.
  - **Themes:** Light (default) and Dark (`.dark`).
  - **Key Variables:** `--background`, `--foreground`, `--primary`, `--accent`, `--border`.
  - **Alpha/Transparency:** Frequently used (e.g., `bg-primary/90`, `dark:bg-black/20`).
- **Typography:**
  - **Sans:** `Inter` (`--font-inter`).
  - **Serif:** `Zilla Slab` (`--font-zilla-slab`) - used for headings.
- **Layout Variables:**
  - `--width-gutter`: 16px (Side spacing).
  - `--width-landing-container`: 1024px (Max content width).
  - `--header-height`: 55px.

### Layout Patterns
- **Grid System:**
  - **Desktop:** 3-column grid centering content: `[1fr_minmax(0,var(--width-landing-container))_1fr]`.
  - **Mobile:** Includes gutters: `[var(--width-gutter)_minmax(...)_var(--width-gutter)]`.
- **Golden Ratio:** Specific components (e.g., `Hero`) use 1.618 aspect ratios (`GoldenRatioLayoutDesktop`).
- **Borders:** Extensive use of borders (`border-input`) to define layout regions visually.

### Visual Effects
- **Texture:** `.bg-texture` applies a subtle "black-orchid" pattern to the body.
- **Cursor:** Custom `.inverted-cursor` with `mix-blend-mode: difference` (Desktop only).
- **Backgrounds:** Use of repeating linear gradients for grid-like background effects.

