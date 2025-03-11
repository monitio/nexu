import { IncomingMessage, ServerResponse } from 'http';

export function router(req: IncomingMessage, res: ServerResponse) {
  if (!req.url) {
    res.statusCode = 400;
    return res.end('Bad Request');
  }

  if (req.url === '/' && req.method === 'GET') {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Welcome to My Framework');
  } else if (req.url === '/api' && req.method === 'GET') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Hello from the API' }));
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
}
