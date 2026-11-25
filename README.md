# Spield Documentation

Public-facing documentation for **Spield**, the fixed-income layer for Stellar, built with
[Fumadocs](https://fumadocs.dev) (Next.js + MDX).

Spield follows the Pendle V2 architecture (SR, PT, YT, and a PT/SR AMM), is live on Stellar mainnet
since September 2026, and has two yield sources: Blend USDC and Etherfuse USTRY (testnet today).
The site explains what Spield does, how users interact with it, and how developers integrate
with it (including the `@spield/sdk` package). It intentionally documents only the **public
interface** of the protocol: no internal implementation details, private business logic, or
security-sensitive infrastructure.

## Tech stack

- **Fumadocs** (`fumadocs-ui`, `fumadocs-core`, `fumadocs-mdx`) on **Next.js**
- **MDX** content with Tailwind CSS v4 theming (brand teal `#00ffcc` on near-black, matching the app)
- **Mermaid** diagrams (client-rendered, theme-aware)
- **Orama** local search, OG image generation, and `llms.txt` output out of the box

## Local development

```bash
pnpm install
pnpm dev      # http://localhost:3000  (redirects to /docs/introduction)
```

## Build

```bash
pnpm build    # production build
pnpm start    # serve the production build
pnpm types:check
```

## Content structure

All documentation lives in [`content/docs`](content/docs) as MDX. Navigation and ordering are
controlled by the `meta.json` file in each folder.

```
content/docs/
  index.mdx              Docs home (/docs)
  introduction/          What Spield is, why Stellar, core concepts, benefits
  getting-started/       Wallets, funding, trustlines, first deposit
  how-it-works/          PT/YT, Standardized Return (SR), yield source, treasury series (USTRY),
                         solvency, lifecycle, series and maturities
  features/              Vault, PT/YT, market, liquidity, bridge, solvency dashboard, protocol fees
  guides/                Step-by-step tutorials: earn fixed yield, long yield, provide liquidity,
                         trade with SR, treasury yield (USTRY), bridge USDC, redeem at maturity
  developers/            Architecture, contracts, tokens, reading state, integrating, events,
                         addresses, SDK
  faq.mdx
  resources/             Glossary, risks, links
```

The root path `/` redirects to `/docs/introduction`. The marketing site (`www.spield.live`) and the app
(`app.spield.live`) are separate deployments, so these docs go straight to content.

## Customizing

- **Branding / theme:** [`src/app/global.css`](src/app/global.css)
- **Site name, app URL, GitHub repo:** [`src/lib/shared.ts`](src/lib/shared.ts)
- **Navbar links & CTA:** [`src/lib/layout.shared.tsx`](src/lib/layout.shared.tsx)
- **MDX components (Mermaid, callouts, tabs, etc.):** [`src/components/mdx.tsx`](src/components/mdx.tsx)
- **Logo:** [`src/components/logo.tsx`](src/components/logo.tsx)

## Deployment

The project builds to a standard Next.js app and deploys cleanly to Vercel (or any Next.js
host). Set the deployment domain and, if served under a subpath, configure `basePath` in
`next.config.mjs`.
