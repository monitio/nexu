// vite.config.ts
import { defineConfig } from 'vite';
import Web from 'webbed';

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  plugins: [
    Web({})
  ]
});
