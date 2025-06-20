# Trader UI

This project is a Next.js based interface for managing trading models and viewing market data.

## Getting Started

Install dependencies with [pnpm](https://pnpm.io/):

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Run the linter:

```bash
pnpm lint
```

## Mock Data

During development the application loads a set of sample markets defined in [`lib/mockMarkets.ts`](lib/mockMarkets.ts). These are stored in browser local storage under the key `market-confidences` by the `useMarketConfidence` hook. To reset to the mock data simply clear that item from local storage.

