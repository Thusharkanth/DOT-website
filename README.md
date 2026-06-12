# DOT Technical Systems

DOT Technical Systems is an interactive React showroom for a fictional premium hardware brand. The app presents DOT phones and audio products through a dark, tactile, technical interface with product search, detailed spec drawers, product customization, cart simulation, a DOT-OS software simulator, and an editorial about page.

The project was generated from Google AI Studio, but the current codebase is a standalone Vite + React + TypeScript frontend.

## Features

- Hardware storefront with a hero product, featured product grid, animated product cards, and responsive layouts.
- Product search across product name, tagline, and description.
- Product customizer modal with selectable frame color, back glass option, glyph/audio options, engraving, and a live preview.
- Cart drawer with item quantity controls, removal, subtotal, shipping, tax, and simulated checkout logs.
- Product and system specification drawers for both individual products and general technical concepts.
- DOT-OS software simulator with a phone UI, live uptime, glyph controls, audio visualizer, sliders, event logs, and tabbed simulator views.
- About/manifesto page describing the fictional brand philosophy and design rules.
- Newsletter signup simulation that generates a synthetic system identifier after a short loading flow.

## Tech Stack

- React 19
- TypeScript
- Vite 6
- Tailwind CSS 4 via `@tailwindcss/vite`
- Lucide React icons
- Motion is installed, although the current UI mainly uses React state and CSS transitions
- Google Gemini SDK dependency is present from the AI Studio template, but the current frontend does not call Gemini APIs directly

## Project Structure

```text
.
├── assets/
│   └── .aistudio/              # AI Studio placeholder assets
├── src/
│   ├── components/
│   │   ├── AboutView.tsx       # Brand manifesto/about screen
│   │   ├── CartDrawer.tsx      # Cart, pricing, and checkout simulation
│   │   ├── ProductCustomizer.tsx
│   │   ├── SoftwareSim.tsx     # Interactive DOT-OS simulator
│   │   └── SpecDetailsDrawer.tsx
│   ├── App.tsx                 # Main application shell, tabs, hero, product flow
│   ├── data.ts                 # Product catalogue and technical spec content
│   ├── index.css               # Tailwind import, theme tokens, custom global styles
│   ├── main.tsx                # React entry point
│   └── types.ts                # Shared Product, CartItem, and TechSpec types
├── .env.example                # Template environment variables
├── index.html                  # Vite HTML entry
├── metadata.json               # AI Studio metadata
├── package.json                # Scripts and dependencies
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js 18 or newer is recommended.
- npm, included with Node.js.

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` if you need local environment values:

```bash
cp .env.example .env.local
```

The template includes:

- `GEMINI_API_KEY`: Present for AI Studio/Gemini compatibility. The current UI does not require it to render.
- `APP_URL`: Used by AI Studio deployments for hosted app URLs and callbacks. The current UI does not require it locally.

For normal local frontend development, the app can run without setting these variables.

### Run Locally

```bash
npm run dev
```

The dev server is configured to run on:

```text
http://localhost:3000
```

The Vite script uses `--host=0.0.0.0`, so the app can also be accessed from other devices on the same network if your firewall allows it.

## Available Scripts

```bash
npm run dev
```

Starts the Vite development server on port `3000`.

```bash
npm run build
```

Creates a production build in `dist/`.

```bash
npm run preview
```

Serves the production build locally for verification.

```bash
npm run lint
```

Runs TypeScript checking with `tsc --noEmit`.

```bash
npm run clean
```

Removes `dist` and `server.js`. Note: this script uses Unix-style `rm -rf`, so it may require Git Bash, WSL, or another Unix-like shell on Windows.

## Application Flow

The app is organized around three top-level tabs managed inside `src/App.tsx`:

- `hardware`: Main product showroom, search flow, product cards, spec sections, and newsletter simulation.
- `software`: Interactive DOT-OS simulator from `src/components/SoftwareSim.tsx`.
- `about`: Brand philosophy page from `src/components/AboutView.tsx`.

Most state is kept in `App.tsx`, including:

- Active tab
- Search query
- Cart contents
- Cart drawer visibility
- Active product customizer
- Active spec drawer
- Newsletter simulation state
- Hero/product micro-interaction state

The main data source is `src/data.ts`. Product objects follow the `Product` interface in `src/types.ts`, and general technology cards follow the `TechSpec` interface.

## Product and Cart Model

Products include:

- `id`
- `name`
- `tagline`
- `description`
- `price`
- `image`
- `category`
- optional `series`
- optional `refId`
- optional key-value `specs`

Cart items store the selected product plus customization values:

- quantity
- selected color
- engraving
- audio EQ preset, when applicable

When a customized item is added to cart, `App.tsx` creates a unique cart ID from product ID, color, engraving, and EQ preset. If the same configuration already exists, the quantity is incremented.

## Styling Notes

Styling is split between Tailwind utility classes in components and global design primitives in `src/index.css`.

Important global styles include:

- Tailwind CSS import and custom theme tokens
- Google font imports for Space Grotesk, JetBrains Mono, and Hanken Grotesk
- `glass-panel` for blurred translucent panels
- `tactile-button` for pressed-button interaction
- `pedestal` for product image display surfaces
- `noise-overlay` and `scanline` for the technical display texture

The visual language is dark, clinical, hardware-focused, and uses `#FF3100` as the signal accent color.

## Deployment

Build the project before deployment:

```bash
npm run build
```

The static output will be placed in `dist/`. It can be deployed to any static hosting provider that supports Vite apps, such as Netlify, Vercel, Cloudflare Pages, GitHub Pages, or a static server.

If deploying through Google AI Studio/Cloud Run, keep `metadata.json` and the AI Studio environment variables in mind.

## Extending the App

To add a product:

1. Add a new item to `PRODUCTS` in `src/data.ts`.
2. Make sure the `category` is one of `phone`, `audio`, or `accessories`.
3. Add product specs if you want them to appear in the spec drawer.
4. Reference the product in `App.tsx` if it needs a custom featured-card placement.

To add a general technology spec:

1. Add a new item to `TECH_SPECS` in `src/data.ts`.
2. Include `id`, `code`, `title`, `description`, and `details`.
3. The hardware page will automatically render it in the technical specs section.

To change the theme:

1. Update theme tokens in `src/index.css`.
2. Adjust repeated Tailwind color utilities in component files if needed.
3. Keep contrast high, because most UI surfaces are dark and text-heavy.

## Known Notes

- Product images are currently loaded from remote Google-hosted URLs. The app needs network access for those images to appear.
- There is no backend checkout or payment integration. Checkout is a frontend-only simulation.
- Cart state is stored in React state only and resets on refresh.
- The Gemini/API-related dependencies and environment variables are inherited from the AI Studio template and are not currently used by the visible app.
- No automated test suite is currently configured beyond TypeScript checking.
