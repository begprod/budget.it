budget.it

## Project Overview

Vue 3 + TypeScript PWA for personal daily/monthly budget tracking. Client-side only (localStorage), works offline.

## Tech Stack

- **Framework**: Vue 3 (Composition API, `<script setup lang="ts">`)
- **Language**: TypeScript (strict mode)
- **Build**: Vite ^8.0.16
- **State**: Pinia ^3.0.3
- **Router**: Vue Router ^4.5.1
- **Testing**: Vitest (jsdom) + @vue/test-utils + @pinia/testing
- **Lint**: ESLint + Prettier
- **PWA**: vite-plugin-pwa (Workbox)
- **Utils**: date-fns, @vueuse/core, lucide-vue-next, yup, uuid, @formkit/drag-and-drop

## Quick Commands

| Command                   | Description                   |
| ------------------------- | ----------------------------- |
| `npm run dev`             | Start dev server              |
| `npm run build`           | Type-check + production build |
| `npm run preview`         | Preview production build      |
| `npm run test:unit`       | Run all unit tests            |
| `npm run test:unit:watch` | Watch mode                    |
| `npm run test:coverage`   | Coverage report               |
| `npm run lint`            | ESLint (auto-fix)             |
| `npm run prettier:check`  | Check formatting              |
| `npm run prettier:format` | Format all src/               |
| `npm run type:check`      | TypeScript type-check         |

## Conventions

### File & Folder Naming

- Components: `BaseName/BaseName.vue` (PascalCase, one folder per component)
- Views: `PascalCaseView.vue` (suffixed with `View`)
- Stores: `stores/<name>/<name>.ts` (kebab-case dir, camelCase file)
- Helpers: `helpers/<name>/<name>.ts` (camelCase)
- Tests: `*.spec.ts` colocated next to source file

### Code Style

- Vue 3 Composition API with `<script setup lang="ts">`
- Single-file components (`.vue`)
- Interfaces prefixed with `I` (`IExpense`, `IDay`)
- Types in `src/types.ts`
- Path alias `@/` → `./src/`
- Pinia stores: Options API (`state`/`getters`/`actions`)
- Barrel exports via `stores/index.ts`, `helpers/index.ts`
- Pure CSS (no preprocessors, no Tailwind)
- Prettier: semi, singleQuote, tabWidth 2, printWidth 100, trailingComma all
- ESLint: no-console error, no-debugger error, single quotes, semicolons required

### Git Hooks

- `pre-commit`: prettier:check → type:check → lint
- `pre-push`: test:unit

## Architecture

```
View → Component → Store → localStorage
```

No API layer. All data persists in localStorage keys: `budget.it:expenses`, `budget.it:months`, `budget.it:days`, etc.

## Key Patterns

- Import stores: `import { useExpensesStore } from '@/stores'`
- Import helpers: `import { generateDays } from '@/helpers'`
- Import types: `import type { IExpense } from '@/types'`
- New component: create `BaseFoo/BaseFoo.vue` + `BaseFoo.spec.ts`
- New store: create `stores/<name>/<name>.ts` + `<name>.spec.ts`
- New helper: create `helpers/<name>/<name>.ts` + `<name>.spec.ts`
