import type { RequestHandler } from './$types';
import { removeBackground } from '@imgly/background-removal-node';

export const POST: RequestHandler = async ({ request }) => {
	const formData = await request.formData();
	const files = formData.getAll('image');

	const result = await Promise.allSettled(
		files.map(async (image) => {
			const result = await removeBackground(image); // Process the image
			const base64 = await blobToBase64(result); // Convert the blob to base64
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
