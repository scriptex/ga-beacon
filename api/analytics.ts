import type { VercelRequest, VercelResponse } from '@vercel/node';

import { join } from 'path';
import { randomBytes } from 'crypto';
import { createReadStream } from 'fs';

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
	const {
		query: { flat, page, pixel, account }
	} = req;

	const cid = randomBytes(16).toString('hex');
	const url = `http://www.google-analytics.com/collect?v=1&t=pageview&cid=${cid}&tid=${account}&dp=${page}`;

	const isFlat = typeof flat !== 'undefined';
	const isPixel = typeof pixel !== 'undefined';

	const userAgentString = req.headers['User-Agent'];

	let userAgent;

	if (Array.isArray(userAgentString)) {
		userAgent = userAgentString[0];
	} else {
		userAgent = userAgentString;
	}

	await fetch(url, {
		method: 'POST',
		headers: {
			'User-Agent': userAgent,
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	}).catch(e => e);

	const imagePath = join(process.cwd(), 'public', isFlat ? 'badge-flat.svg' : isPixel ? 'pixel.svg' : 'badge.svg');
	const imageStream = createReadStream(imagePath);

	await new Promise(resolve => {
		res.setHeader('Content-Type', 'image/svg+xml');

		imageStream.pipe(res);
		imageStream.on('end', resolve);
	});
}
