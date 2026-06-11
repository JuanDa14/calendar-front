import { writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');
const input = path.join(publicDir, 'calendar.png');

const circleMask = (size) =>
	Buffer.from(
		`<svg><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white"/></svg>`
	);

const toCircularPng = async (size, output) => {
	await sharp(input)
		.resize(size, size, { fit: 'cover' })
		.composite([{ input: circleMask(size), blend: 'dest-in' }])
		.png()
		.toFile(output);
};

await toCircularPng(32, path.join(publicDir, 'favicon.png'));
await toCircularPng(180, path.join(publicDir, 'apple-touch-icon.png'));

writeFileSync(
	path.join(publicDir, 'favicon.svg'),
	`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
	<defs>
		<clipPath id="circle">
			<circle cx="16" cy="16" r="16" />
		</clipPath>
	</defs>
	<image href="/favicon.png" width="32" height="32" clip-path="url(#circle)" preserveAspectRatio="xMidYMid slice" />
</svg>
`
);

console.log('Favicons circulares generados en public/');
