// vite.config.ts
import { defineConfig } from 'vite';
import Nexu_Core from 'nexu';

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  plugins: [
    Nexu_Core()
  ]
});
