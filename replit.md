# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Update (2026-04-24): i18n + Theming + Share

- **Localization**: Default UI is Simplified Chinese (zh-Hans), with Traditional Chinese (zh-Hant) and English options. Translations live in `artifacts/meal-planner/i18n/index.ts` (UI strings) and `artifacts/meal-planner/i18n/recipes.ts` (recipe names, steps, ingredient names, units).
- **Theming**: User-selectable theme color among red/orange/yellow/cyan/blue/purple/pink, defined in `artifacts/meal-planner/constants/themes.ts`. Applied via `hooks/useColors.ts` which now overrides primary/secondary/accent/tint based on the active theme.
- **Settings**: New `SettingsContext` (`context/SettingsContext.tsx`) holds locale + themeColor, persisted to AsyncStorage under `settings_v1`. Wraps the app above `PlanProvider`.
- **Settings tab**: New `app/(tabs)/settings.tsx` with language selector and 7 theme color swatches.
- **Share**: New `app/share-preview.tsx` modal renders a polished shareable card of this week's menu + grocery list. Uses `react-native-view-shot` to capture an image, `expo-media-library` to save, and `expo-sharing` to share. Web fallback uses `navigator.share` text.
- All existing screens were updated to use `t()` from `useSettings()`.
