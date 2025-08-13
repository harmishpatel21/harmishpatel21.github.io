## Minimal Portfolio (Vite + React + TypeScript)

Lightweight, accessible, SEO-friendly single-page portfolio. Responsive layout with a fixed sidebar on desktop and top bar on mobile. Dark/Light theme via CSS variables.

### Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

### Customize

- Update name/title/photo in `src/components/Sidebar.tsx`
- Edit bio in `src/components/Summary.tsx`
- Replace sample data in `src/data/*.json`
- Set environment variables in `.env` for APIs:
  - `VITE_GITHUB_TOKEN` and optional `VITE_GITHUB_USERNAME`
  - `VITE_MEDIUM_USERNAME` (e.g., `@username` or `username`)

### API Notes (Dev-only)

- LinkedIn: Add `?li_token=YOUR_ACCESS_TOKEN` to the URL during local dev. Stored in `localStorage` as `li_token`.
- GitHub: Set `VITE_GITHUB_TOKEN` or store once in `localStorage` as `gh_token`.
- Medium: Set `VITE_MEDIUM_USERNAME`. RSS requests may be blocked by CORS; app will fall back to JSON samples.

### Build

```bash
npm run build
npm run preview
```

### Deploy to GitHub Pages

1. If deploying to `username.github.io` (user site): set base to `/` (default). Run:
   ```bash
   npm run build
   npx gh-pages -d dist -b gh-pages
   ```
   Then in repository Settings → Pages, choose branch `gh-pages`.

2. If deploying to a project site (e.g., `/repo-name/`): build with base path:
   ```bash
   VITE_BASE=/repo-name/ npm run build
   npx gh-pages -d dist -b gh-pages
   ```

For SPA routing on Pages, this template uses HashRouter to avoid server rewrites.


