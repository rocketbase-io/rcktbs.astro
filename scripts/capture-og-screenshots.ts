/**
 * Local-only script: capture 1200x630 screenshots of pages for use as OG images.
 *
 * Usage:   pnpm og:capture
 *
 * The script starts its own `astro dev` server on a free port, waits for it
 * to be reachable, takes screenshots, and tears the server down. No other
 * shells/preview processes needed.
 *
 * Outputs PNGs to public/og-screenshots/<slug>.png. Screenshots present there
 * are automatically preferred over the generated OG template (SEO.astro).
 */
import { chromium } from '@playwright/test';
import { spawn, type ChildProcess } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { createServer } from 'node:net';
import { resolve } from 'node:path';

const OUT_DIR = resolve(process.cwd(), 'public/og-screenshots');

const TARGETS: Array<{ path: string; slug: string }> = [
  { path: '/', slug: 'index' },
  { path: '/mission', slug: 'mission' },
  { path: '/leistungen', slug: 'leistungen' },
  { path: '/arbeitsweise', slug: 'arbeitsweise' },
  { path: '/referenzen', slug: 'referenzen' },
  { path: '/kontakt', slug: 'kontakt' },
];

function findFreePort(): Promise<number> {
  return new Promise((res, rej) => {
    const server = createServer();
    server.unref();
    server.on('error', rej);
    server.listen(0, () => {
      const addr = server.address();
      if (typeof addr === 'object' && addr) {
        const port = addr.port;
        server.close(() => res(port));
      } else {
        rej(new Error('could not determine port'));
      }
    });
  });
}

async function waitForReady(url: string, timeoutMs = 30_000): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const r = await fetch(url);
      if (r.ok || r.status === 404) return;
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error(`dev server not reachable at ${url} within ${timeoutMs}ms`);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const port = await findFreePort();
  const baseUrl = `http://localhost:${port}`;
  console.log(`→ starting astro dev on port ${port}`);

  const child: ChildProcess = spawn(
    'pnpm',
    ['exec', 'astro', 'dev', '--port', String(port), '--host', '127.0.0.1'],
    { stdio: ['ignore', 'pipe', 'pipe'] },
  );

  child.stdout?.on('data', (b) => process.stdout.write(`  [dev] ${b}`));
  child.stderr?.on('data', (b) => process.stderr.write(`  [dev] ${b}`));

  const cleanup = () => {
    if (!child.killed) child.kill('SIGTERM');
  };
  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);

  try {
    await waitForReady(baseUrl);
    console.log(`→ dev server ready`);

    const browser = await chromium.launch();
    const context = await browser.newContext({
      viewport: { width: 1200, height: 630 },
      deviceScaleFactor: 2,
      colorScheme: 'light',
    });
    const page = await context.newPage();

    // Hide Astro's dev toolbar on every page before screenshotting.
    await page.addStyleTag({
      content: 'astro-dev-toolbar, astro-dev-overlay { display: none !important; }',
    });
    await page.addInitScript(() => {
      const style = document.createElement('style');
      style.textContent =
        'astro-dev-toolbar, astro-dev-overlay { display: none !important; }';
      document.head.appendChild(style);
    });

    for (const { path, slug } of TARGETS) {
      const url = `${baseUrl}${path}`;
      console.log(`→ ${url}`);
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 });
        // Remove the dev toolbar element if Astro injected it after load.
        await page.evaluate(() => {
          document
            .querySelectorAll('astro-dev-toolbar, astro-dev-overlay')
            .forEach((el) => el.remove());
        });
        await page.waitForTimeout(800);
        const outPath = resolve(OUT_DIR, `${slug}.png`);
        await page.screenshot({
          path: outPath,
          clip: { x: 0, y: 0, width: 1200, height: 630 },
        });
        console.log(`  ✓ ${outPath}`);
      } catch (err) {
        console.warn(`  ✗ ${url}: ${(err as Error).message}`);
      }
    }

    await browser.close();
  } finally {
    cleanup();
    await new Promise((r) => setTimeout(r, 200));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
