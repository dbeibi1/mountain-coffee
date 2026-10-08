// Local preview with no dependencies. Only website assets are served.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const port = Number(process.env.PORT || 4173);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.png': 'image/png' };
const server = createServer(async (req, res) => {
  try {
    if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405).end(); return; }
    let pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (pathname.startsWith('/mountain-coffee/')) pathname = pathname.slice('/mountain-coffee'.length);
    if (pathname === '/') pathname = '/index.html';
    const allowed = ['/index.html', '/styles.css', '/script.js'].includes(pathname) || /^\/assets\/[a-z0-9-]+\.(svg|jpg|webp|png)$/.test(pathname);
    if (!allowed) { res.writeHead(404).end('Not found'); return; }
    const data = await readFile(path.join(root, pathname));
    res.writeHead(200, { 'Content-Type': types[path.extname(pathname)], 'Cache-Control': 'no-store' });
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch { res.writeHead(404).end('Not found'); }
});
server.listen(port, '127.0.0.1', () => console.log(`Mountain Coffee preview: http://127.0.0.1:${port}`));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close(() => process.exit(0)));
