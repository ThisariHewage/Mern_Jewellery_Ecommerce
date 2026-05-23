import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const videosDir = path.join(__dirname, 'public', 'videos');
if (!fs.existsSync(videosDir)) fs.mkdirSync(videosDir, { recursive: true });

const files = [
  {
    name: 'cat-women.mp4',
    // Woman wearing earrings / luxury fashion close-up
    urls: [
      'https://www.pexels.com/video/10737829/download',
    ],
  },
  {
    name: 'cat-men.mp4',
    // Elegant diamond ring on rustic background
    urls: [
      'https://www.pexels.com/video/31757666/download',
    ],
  },
  {
    name: 'cat-bridal.mp4',
    // Woman with jewellery on hands
    urls: [
      'https://www.pexels.com/video/11122341/download',
    ],
  },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const lib = url.startsWith('https') ? https : http;

    const req = lib.get(url, { headers: { 'User-Agent': 'Mozilla/5.0', 'Referer': 'https://www.pexels.com/' } }, (res) => {
      if ([301, 302, 307, 308].includes(res.statusCode)) {
        file.close();
        fs.unlink(dest, () => { });
        const redirectUrl = new URL(res.headers.location, url).href;
        return download(redirectUrl, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlink(dest, () => { });
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const total = parseInt(res.headers['content-length'] || '0', 10);
      let received = 0;
      res.on('data', (chunk) => {
        received += chunk.length;
        if (total) process.stdout.write(`\r  ${((received / total) * 100).toFixed(0)}%`);
      });
      res.pipe(file);
      file.on('finish', () => { file.close(); process.stdout.write('\n'); resolve(); });
    });
    req.on('error', (err) => { fs.unlink(dest, () => { }); reject(err); });
  });
}

(async () => {
  for (const { name, urls } of files) {
    const dest = path.join(videosDir, name);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 50000) {
      console.log(`✓ ${name} already exists, skipping.`);
      continue;
    }
    let ok = false;
    for (const url of urls) {
      try {
        process.stdout.write(`Downloading ${name} from ${url.slice(0, 60)}...\n`);
        await download(url, dest);
        console.log(`✓ ${name} saved.`);
        ok = true;
        break;
      } catch (e) {
        console.log(`  ✗ failed: ${e.message}`);
      }
    }
    if (!ok) console.log(`✗ Could not download ${name}.`);
  }
  console.log('\nDone.');
})();
