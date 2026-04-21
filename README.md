# Narvo Platform

B2B developer portal for **platform.narvo.news** — Next.js (App Router), static export for Cloudflare Pages.

## Requirements

- Node.js 20+
- [pnpm](https://pnpm.io) 9+

## Setup

```bash
pnpm install
cp .env.example .env.local
# Edit .env.local — see comments in .env.example
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|--------|-------------|
| `pnpm dev` | Development server |
| `pnpm build` | Production build → `out/` |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | TypeScript (`tsc --noEmit`) |

## Documentation (Mintlify)

API reference lives on a **Mintlify subdomain** (default `https://docs.platform.narvo.news`). Configure `NEXT_PUBLIC_DOCS_URL` in `.env.local` for staging or alternate hostnames.

- In-app `/docs/` remains a hub during local dev; on Cloudflare Pages, `public/_redirects` sends `/docs` and `/docs/` to the Mintlify URL (keep this file in sync when changing the production docs hostname).
- Align hash fragments in `lib/docs.ts` usage with your Mintlify page anchors.

## Deployment

Build output is static (`next.config.ts`: `output: "export"`). Deploy `out/` to Cloudflare Pages; set environment variables in the Pages project to match `.env.example` (`NEXT_PUBLIC_*` for client).

## Repository

Remote: `https://github.com/Narvo-Intelligence/narvo_platform`

Execution checklist: [`documentations/current/product/execution/Narvo_Platform_B2B_Execution.md`](../documentations/current/product/execution/Narvo_Platform_B2B_Execution.md) (monorepo path from workspace root).

## Design system

Canonical **Swiss Grid** + structural tokens (8px module, flat surfaces, zero radius; **Narvo Signal / Void** colours retained): [`documentations/current/design/Narvo_Platform_Design_System.md`](../documentations/current/design/Narvo_Platform_Design_System.md). CSS: `styles/portal-css/tokens.css`.
