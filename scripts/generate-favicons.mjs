import { readFileSync, writeFileSync, copyFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');

const ICON_SVG = path.join(publicDir, 'brand-icon.svg');
const LOGO_SVG = path.join(publicDir, 'brand-logo.svg');

const ICON_SIZES = {
	'favicon-16.png': 16,
	'favicon-32.png': 32,
	'favicon-48.png': 48,
	'favicon-64.png': 64,
	'favicon-128.png': 128,
	'favicon-192.png': 192,
	'favicon-256.png': 256,
};

const pngOptions = {
	compressionLevel: 9,
	quality: 100,
	effort: 10,
	palette: false,
};

const rasterizeSvg = async (svgPath, size) => {
	const svg = readFileSync(svgPath);
	const supersample = 8;

	return sharp(svg, { density: 72 * supersample })
		.resize(size * supersample, size * supersample, {
			kernel: sharp.kernel.lanczos3,
			fit: 'fill',
		})
		.resize(size, size, { kernel: sharp.kernel.lanczos3 })
		.png(pngOptions)
		.toBuffer();
};

for (const [filename, size] of Object.entries(ICON_SIZES)) {
	const buffer = await rasterizeSvg(ICON_SVG, size);
	await sharp(buffer).toFile(path.join(publicDir, filename));
}

const appleBuffer = await rasterizeSvg(LOGO_SVG, 180);
await sharp(appleBuffer).toFile(path.join(publicDir, 'apple-touch-icon.png'));

await sharp(await rasterizeSvg(ICON_SVG, 32)).toFile(path.join(publicDir, 'favicon.png'));

copyFileSync(ICON_SVG, path.join(publicDir, 'favicon.svg'));

console.log('Favicons vectoriales generados desde SVG');
