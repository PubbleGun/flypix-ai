# FlyPix AI website

Responsive FlyPix AI marketing site built with React, TypeScript, and vinext.

## Local preview on Windows

Double-click `START-SITE.cmd`. The launcher builds the current site, starts the
local preview, and opens `http://localhost:3000/`.

Keep the server window open while viewing the local site.

## Public publishing

Double-click `PUBLISH-TO-GITHUB.cmd`. It validates the current site, creates the
static GitHub Pages version, commits the project, and publishes it to:

https://pubblegun.github.io/flypix-ai/

## Development

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run build
npm run lint
node --test tests/rendered-html.test.mjs
```

## Main files

- `app/page.tsx` - landing-page structure and interactions
- `app/globals.css` - design system and responsive layout
- `app/globe-lab/` - standalone interactive globe lab
- `public/assets/` - imagery, partner logos, and motion assets
- `public/world-map.svg` - vector map texture for the globe
- `scripts/create-static-preview.mjs` - self-contained preview generator
