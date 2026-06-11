import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');
const input = path.join(publicDir, 'calendar.png');

const SIZES = {
	'favicon-16.png': 16,
	'favicon-32.png': 32,
	'favicon-48.png': 48,
	'favicon-64.png': 64,
	'favicon-192.png': 192,
	'apple-touch-icon.png': 180,
};

const circleMask = (size) =>
	Buffer.from(
		`<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
			<circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white"/>
		</svg>`
	);

const ringOverlay = (size) =>
	Buffer.from(
		`<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
			<circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 0.5}" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1"/>
		</svg>`
	);

const pngOptions = { compressionLevel: 6, quality: 100, effort: 10 };

const metadata = await sharp(input).metadata();
const side = Math.min(metadata.width, metadata.height);

const iconCrop = {
	left: Math.round((metadata.width - side) / 2),
	top: Math.round(metadata.height * 0.06),
	width: side,
	height: Math.round(side * 0.78),
};

const buildMaster = async (crop) => {
	const base = sharp(input).extract(crop);

	return base
		.resize(1024, 1024, { fit: 'cover', position: 'centre', kernel: sharp.kernel.lanczos3 })
		.modulate({ saturation: 1.05 })
		.sharpen({ sigma: 0.45, m1: 1, m2: 0.35, x1: 2, y2: 10, y3: 20 })
		.composite([
			{ input: circleMask(1024), blend: 'dest-in' },
			{ input: ringOverlay(1024), blend: 'over' },
		])
		.png(pngOptions)
		.toBuffer();
};

const sharpenForSize = (size) => {
	if (size <= 32) return { sigma: 0.35, m1: 0.8, m2: 0.25, x1: 2, y2: 8, y3: 16 };
	if (size <= 64) return { sigma: 0.4, m1: 0.9, m2: 0.3, x1: 2, y2: 10, y3: 18 };
	return { sigma: 0.45, m1: 1, m2: 0.35, x1: 2, y2: 10, y3: 20 };
};

const fullCrop = {
	left: Math.round((metadata.width - side) / 2),
	top: Math.round((metadata.height - side) / 2),
	width: side,
	height: side,
};

const iconMaster = await buildMaster(iconCrop);
const fullMaster = await buildMaster(fullCrop);

const renderSize = async (master, size, output) => {
	await sharp(master)
		.resize(size, size, { kernel: sharp.kernel.lanczos3 })
		.sharpen(sharpenForSize(size))
		.png(pngOptions)
		.toFile(output);
};

for (const [filename, size] of Object.entries(SIZES)) {
	const master = size <= 64 ? iconMaster : fullMaster;
	await renderSize(master, size, path.join(publicDir, filename));
}

await renderSize(iconMaster, 32, path.join(publicDir, 'favicon.png'));

const svgSource = readFileSync(path.join(publicDir, 'favicon-192.png')).toString('base64');

writeFileSync(
	path.join(publicDir, 'favicon.svg'),
	`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192">
	<image href="data:image/png;base64,${svgSource}" width="192" height="192" />
</svg>`
);

console.log('Favicons nítidos generados en public/');
