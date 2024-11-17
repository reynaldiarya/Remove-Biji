import { limiter } from '$lib/rate-limiter';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { removeBackground } from '@imgly/background-removal-node';
import { env } from '$env/dynamic/private';
import { rotateImageToMatch } from '$lib/image';
import { withCatch } from '@tfkhdyt/with-catch';

export const POST: RequestHandler = async (event) => {
	if (env.NODE_ENV === 'production' && (await limiter.isLimited(event))) {
		throw error(429, 'Kamu telah terlalu banyak mencoba, coba lagi nanti');
	}

	const { request } = event;

	const formData = await request.formData();
	const files = formData.getAll('image');

	const result = await Promise.allSettled(
		files.map(async (image) => {
			let [err, output] = await withCatch(removeBackground(image)); // Process the image
			if (err) {
				console.error('Error removing background:', err);
				throw new Error('Error removing background', { cause: err });
			}
			output = await rotateImageToMatch(new Blob([image], { type: 'image/png' }), output!);

			const base64 = await blobToBase64(output); // Convert the blob to base64
			return base64;
		})
	);

	let output: string[] = [];
	for (const item of result) {
		if (item.status === 'fulfilled') {
			output.push(item.value);
		}
	}

	return new Response(JSON.stringify({ images: output }), {
		headers: { 'Content-Type': 'application/json' }
	});
};

async function blobToBase64(blob: Blob) {
	const arrayBuffer = await blob.arrayBuffer();
	const base64 = Buffer.from(arrayBuffer).toString('base64');
	return base64;
}
