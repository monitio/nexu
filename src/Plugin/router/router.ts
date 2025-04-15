import { Plugin } from 'vite';
import path from 'path';
import fs from 'fs';

export default function Router(): Plugin {
  return {
    name: 'vite:auto-html-router',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Only handle GET requests
        if (req.method !== 'GET') return next();

        // Remove query string
        const urlWithoutQuery = req.url?.split('?')[0] || '';

        // If the request has no file extension
        if (urlWithoutQuery && !path.extname(urlWithoutQuery)) {
          // Construct the expected file path in /pages folder
          const filePath = path.join(server.config.root, 'pages', urlWithoutQuery + '.html');

          if (fs.existsSync(filePath)) {
            // Rewrite the URL to the file path relative to root
            req.url = '/pages' + urlWithoutQuery + '.html';
          }
        }
        next();
      });
    },
  };
}
