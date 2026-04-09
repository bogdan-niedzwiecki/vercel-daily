# Vercel Daily Web

Single-app Next.js repository focused on the Vercel Daily web project.

## Getting Started

```bash
# Install dependencies
pnpm install

# Run the app in dev mode
pnpm dev

# Type check
pnpm check-types

# Build
pnpm build

# Format and lint
pnpm format
pnpm lint
```

## Project Structure

```
vercel-daily/
├── apps/
│   └── web/                    # Vercel Daily app (localhost:3000)
├── turbo.json                  # Turborepo configuration
├── biome.jsonc                 # Biome linting/formatting
└── package.json
```

## App

- **web** (`apps/web`) - Vercel Daily app running on port 3000

## Tech Stack

- [Next.js 16](https://nextjs.org/) - React framework
- [Turborepo](https://turbo.build/repo) - Task runner
- [pnpm](https://pnpm.io/) - Package manager
- [Biome](https://biomejs.dev/) - Linting and formatting
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## License

MIT
