# Vercel Daily

This is the repository for the Vercel Daily project.

## Project Overview

A Turborepo monorepo with one Next.js application:

```
vercel-daily/
├── apps/
│   └── web/          # Vercel Daily app (port 3000)
├── vercel.json       # Vercel deployment configuration
├── pnpm-workspace.yaml # Workspace package definitions
├── turbo.json        # Turborepo task configuration
├── biome.jsonc       # Linting and formatting (Biome + ultracite)
└── package.json      # Root workspace configuration
```

## Tech Stack

- **Next.js 16** - React framework with App Router
- **React 19** - Latest React with Server Components
- **TypeScript** - Strict mode enabled
- **Tailwind CSS 4** - Utility-first styling
- **Turborepo** - Monorepo build orchestration
- **Biome** - Fast linting and formatting (replaces ESLint/Prettier)
- **pnpm** - Fast, disk-efficient package manager
- **Vercel CLI** - Deploy, link projects, manage env vars

## Workflows

### Initial Setup

```bash
# Install Vercel CLI globally
pnpm add -g vercel

# Authenticate with Vercel
vercel login

# Clone and install
git clone https://github.com/YOUR_USERNAME/vercel-daily
cd vercel-daily
pnpm install

# Link to your Vercel project
vercel link

# Pull environment variables
vercel env pull
```

### Development

```bash
# Start the app in dev mode
pnpm dev
# web: http://localhost:3000

# Start a specific app
pnpm dev --filter @repo/web
```

### Vercel CLI

```bash
# Check deployment status
vercel list

# View deployment logs
vercel logs <deployment-url>

# Pull latest env vars
vercel env pull

# Open project in dashboard
vercel open
```

### Quality Checks

```bash
# Type check the app
pnpm check-types

# Lint with Biome
pnpm lint

# Format with Biome
pnpm format

# Run all checks
pnpm check
```

### Building

```bash
# Build the app
pnpm build

# Build specific app
pnpm build --filter @repo/web
```

## App Dependencies

Use local imports for app code and server data helpers:

```tsx
import { ArticlesSection } from "@/components/articles-section";
import { getArticles } from "@/lib/server/vercel-daily-api";
```

### Adding Dependencies

```bash
# Add to specific app
pnpm add <package> --filter @repo/web

# Add dev dependency to root
pnpm add -D <package> -w
```

## TypeScript Configuration

This project uses strict TypeScript with Matt Pocock's recommended settings:

- `strict: true` - Full strict mode
- `noUncheckedIndexedAccess: true` - Safer array/object access
- `noImplicitOverride: true` - Explicit override keyword required
- `noPropertyAccessFromIndexSignature: true` - Bracket notation for index signatures

Path aliases are configured:

- `@/*` - Local app imports

## Biome (Linting & Formatting)

This project uses Biome instead of ESLint/Prettier. Configuration extends `ultracite` preset.

```bash
# Check for issues
pnpm lint

# Auto-fix issues
pnpm format

# Check everything (lint + format)
pnpm check
```

## Turborepo Tasks

Defined in `turbo.json`:

| Task          | Cached | Description               |
| ------------- | ------ | ------------------------- |
| `dev`         | No     | Start development servers |
| `build`       | Yes    | Production build          |
| `check-types` | Yes    | TypeScript type checking  |
| `start`       | No     | Start production servers  |

## Common Patterns

### Server Components (Default)

All components in the App Router are Server Components by default:

```tsx
// app/page.tsx - This is a Server Component
import { getArticles } from "@/lib/server/vercel-daily-api";

export default async function Page() {
  const articles = await getArticles();
  return <ArticlesSection articles={articles} />;
}
```

### Client Components

Add `"use client"` directive for interactivity:

```tsx
"use client";

import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}
```

### App Components

Keep reusable UI in `apps/web/src/components` and import via local aliases:

```tsx
import { HeroSection } from "@/components/hero-section";
```

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different ports
PORT=3002 pnpm dev --filter @repo/web
```

### Type Errors After Dependency Changes

```bash
# Clear Turborepo cache and rebuild
pnpm clean
pnpm install
pnpm build
```

### Biome Conflicts with Editor

Disable ESLint/Prettier extensions and enable Biome extension in your editor.

## Project Guidelines

Use these guidelines while working in this repository:

1. **Prioritize changes in `apps/web`** unless instructed otherwise
2. **Focus on `apps/web`** for exercises
3. **Use `apps/web/src/lib/server/vercel-daily-api.ts`** for server-side data access
4. **Follow existing project patterns** - keep changes consistent across the app

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Biome Documentation](https://biomejs.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
