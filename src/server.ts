import { createServer } from 'http';
import { router } from './router';

export function runServer() {
  const PORT = process.env.PORT || 3000;
  const server = createServer((req, res) => router(req, res));
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}
