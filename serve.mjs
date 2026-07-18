// 简单的本地开发服务器，用于正确加载模块化 SPA（赛博算命等）
// 用法: node serve.mjs
// 然后打开 http://localhost:3000
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
  let filePath = path.join(__dirname, urlPath === '/' ? 'index.html' : urlPath);

  // 防目录穿越
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.stat(filePath, (err, stat) => {
    if (err) {
      // 文件不存在 → 门户首页（SPA 回退）
      filePath = path.join(__dirname, 'index.html');
      fs.readFile(filePath, (e2, buf) => {
        if (e2) { res.writeHead(404); return res.end('Not found'); }
        res.writeHead(200, { 'Content-Type': MIME['.html'] });
        res.end(buf);
      });
      return;
    }
    if (stat.isDirectory()) {
      // 目录 → 尝试目录下的 index.html
      const indexPath = path.join(filePath, 'index.html');
      fs.stat(indexPath, (e2, stat2) => {
        if (e2 || !stat2.isFile()) {
          // 目录没有 index.html → 门户首页
          filePath = path.join(__dirname, 'index.html');
        } else {
          filePath = indexPath;
        }
        fs.readFile(filePath, (e3, buf) => {
          if (e3) { res.writeHead(500); return res.end('Read error'); }
          res.writeHead(200, { 'Content-Type': MIME['.html'] });
          res.end(buf);
        });
      });
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    fs.readFile(filePath, (e3, buf) => {
      if (e3) { res.writeHead(500); return res.end('Read error'); }
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      res.end(buf);
    });
  });
});

server.listen(PORT, () => {
  console.log(`✨ 门户已启动: http://localhost:${PORT}`);
});
