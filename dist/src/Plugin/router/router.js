import path from 'path';
import fs from 'fs';
export default function Router() {
    return {
        name: 'vite:auto-html-router',
        configureServer(server) {
            server.middlewares.use((req, res, next) => {
                var _a;
                // Only handle GET requests
                if (req.method !== 'GET')
                    return next();
                // Remove query string
                const urlWithoutQuery = ((_a = req.url) === null || _a === void 0 ? void 0 : _a.split('?')[0]) || '';
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
