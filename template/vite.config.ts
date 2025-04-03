// vite.config.ts
import { defineConfig } from 'vite';
import Nexu from '@monitio/nexu';

export default defineConfig({
  root: 'src/pages',
  publicDir: 'src/public',
  plugins: [
    Nexu()
  ]
});
