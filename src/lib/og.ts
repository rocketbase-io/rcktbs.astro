import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import satori from 'satori';
import { html } from 'satori-html';
import sharp from 'sharp';
import siteConfig from '@/config/site.config';

export interface OGImageOptions {
  title: string;
  description?: string;
  type?: 'website' | 'article';
}

const fontCaches = new Map<string, ArrayBuffer>();
let logoCache: string | null = null;

const siteHostname = new URL(siteConfig.url).hostname;

function loadFontFile(filename: string): ArrayBuffer {
  if (!fontCaches.has(filename)) {
    const fontPath = resolve(process.cwd(), 'public/fonts', filename);
    fontCaches.set(filename, readFileSync(fontPath).buffer as ArrayBuffer);
  }
  return fontCaches.get(filename)!;
}

async function loadLogo(): Promise<string> {
  if (!logoCache) {
    const svgPath = resolve(process.cwd(), 'src/assets/branding/logomark.svg');
    const svgBuffer = readFileSync(svgPath);
    const pngBuffer = await sharp(svgBuffer).resize(54, 61).png().toBuffer();
    logoCache = `data:image/png;base64,${pngBuffer.toString('base64')}`;
  }
  return logoCache;
}

export async function generateOGImage(options: OGImageOptions): Promise<Buffer> {
  const { title, description, type = 'website' } = options;

  const fontData = loadFontFile('inter-latin-400-normal.ttf');
  const fontBoldData = loadFontFile('inter-latin-700-normal.ttf');
  const logoDataUri = await loadLogo();

  const truncatedDescription = description
    ? description.length > 120
      ? description.slice(0, 117) + '...'
      : description
    : '';

  const badgeLabel = type === 'article' ? 'Artikel' : 'Seite';

  const markup = html`
    <div style="height: 100%; width: 100%; display: flex; flex-direction: column; background: linear-gradient(135deg, #0d0f14 0%, #161a24 50%, #0d0f14 100%); padding: 60px 80px; font-family: 'Inter'; position: relative;">
      <!-- Left accent bar -->
      <div style="display: flex; position: absolute; top: 0; left: 0; width: 6px; height: 100%; background: linear-gradient(180deg, #6372A5 0%, #8b9bd4 50%, #6372A5 100%);"></div>
      <div style="display: flex; flex-direction: column; justify-content: space-between; height: 100%; padding-left: 20px;">
        <!-- Top: type badge -->
        <div style="display: flex; align-items: center;">
          <div style="display: flex; padding: 8px 18px; background: rgba(99, 114, 165, 0.12); border: 1px solid rgba(99, 114, 165, 0.35); border-radius: 9999px; color: #8b9bd4; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.08em;">${badgeLabel}</div>
        </div>
        <!-- Middle: title + description -->
        <div style="display: flex; flex-direction: column; gap: 20px;">
          <div style="display: flex; font-size: ${title.length > 50 ? '48px' : '60px'}; font-weight: 700; color: #f4f4f5; line-height: 1.15; letter-spacing: -0.025em;">${title}</div>
          <div style="display: ${truncatedDescription ? 'flex' : 'none'}; font-size: 22px; font-weight: 400; color: #8b9bd4; line-height: 1.5; max-width: 820px;">${truncatedDescription}</div>
        </div>
        <!-- Bottom: logo + site name + domain -->
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 14px;">
            <img src="${logoDataUri}" style="width: 32px; height: 36px;" />
            <span style="font-size: 20px; font-weight: 700; color: #f4f4f5; letter-spacing: -0.01em;">${siteConfig.name}</span>
          </div>
          <span style="font-size: 15px; font-weight: 400; color: #52525b;">${siteHostname}</span>
        </div>
      </div>
    </div>
  `;

  // @ts-expect-error satori-html VNode is compatible with satori
  const svg = await satori(markup, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Inter',
        data: fontData,
        weight: 400,
        style: 'normal',
      },
      {
        name: 'Inter',
        data: fontBoldData,
        weight: 700,
        style: 'normal',
      },
    ],
  });

  return Buffer.from(
    await sharp(Buffer.from(svg)).resize(1200).png().toBuffer()
  );
}
