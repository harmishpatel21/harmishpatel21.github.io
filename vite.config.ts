import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// For GitHub Pages, set base to the repository name if deploying to /<repo>/
// For user/organization pages (username.github.io), base should be '/'
// You can override via VITE_BASE from environment when building.
const base = process.env.VITE_BASE || '/';

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      '@components': '/src/components',
      '@data': '/src/data',
      '@utils': '/src/utils',
      '@assets': '/src/assets',
      '@image': '/src/assets/images'
    }
  },
  server: { port: 5173, open: true }
});


