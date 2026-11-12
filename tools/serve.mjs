// Tiny static server that applies the headers from vercel.json (CSP included), so local tests see what
// production sends. usage: node tools/serve.mjs [port]
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { dirname, join, extname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const port = Number(process.argv[2] ?? 8766);
const cfg = JSON.parse(readFileSync(join(root, 'vercel.json'), 'utf8'));
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.webmanifest': 'application/manifest+json', '.json': 'application/json' };
const hidden = /^\/(src|tools|\.git|\.vercel|build\.mjs|site\.config\.mjs|package\.json|README\.md|docs)(\/|$)/;

const headersFor = (url) => {
  const out = {};
  for (const rule of cfg.headers) {
    if (new RegExp('^' + rule.source.replace('(.*)', '.*') + '$').test(url)) for (const h of rule.headers) out[h.key] = h.value;
  }
  return out;
};

createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  let file = normalize(join(root, url.endsWith('/') ? url + 'index.html' : url));
  let status = 200;
  if (hidden.test(url) || !file.startsWith(root) || !existsSync(file) || statSync(file).isDirectory()) {
    file = join(root, '404.html');
    status = 404;
  }
  res.writeHead(status, { 'Content-Type': types[extname(file)] ?? 'application/octet-stream', ...headersFor(url) });
  res.end(readFileSync(file));
}).listen(port, () => console.log(`serving ${root} on http://localhost:${port}`));
