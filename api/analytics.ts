import type { VercelRequest, VercelResponse } from '@vercel/node';

import { join } from 'path';
import { randomBytes } from 'crypto';
import { createReadStream } from 'fs';

const COOKIE_HEADER = 'x-ga-beacon-id';

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
	const {
		query: { flat, page, pixel, account },
		headers
	} = req;

	const cid = headers[COOKIE_HEADER] || randomBytes(16).toString('hex');
	const url = `http://www.google-analytics.com/collect?v=1&t=pageview&cid=${cid}&tid=${account}&dp=${page}`;

	const isFlat = typeof flat !== 'undefined';
	const isPixel = typeof pixel !== 'undefined';

	const userAgentString = headers['User-Agent'];

	let userAgent;

	if (Array.isArray(userAgentString)) {
		userAgent = userAgentString[0];
	} else {
		userAgent = userAgentString;
	}

	const capture = await fetch(url, {
		method: 'POST',
		headers: {
			'User-Agent': userAgent,
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
		.then(r => r.text())
		.catch(e => e);

	const image = isFlat ? 'badge-flat' : isPixel ? 'pixel' : 'badge';
	const imagePath = join(process.cwd(), 'public', `${image}.svg`);
	const imageStream = createReadStream(imagePath);

	await new Promise(resolve => {
		res.setHeader('Content-Type', 'image/svg+xml');
		res.setHeader(COOKIE_HEADER, cid);

		imageStream.pipe(res);
		imageStream.on('end', resolve);
	});
}
