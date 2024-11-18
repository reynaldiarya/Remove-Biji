import { guestLimiter } from '$lib/rate-limiter';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { removeBackground } from '@imgly/background-removal-node';
import { env } from '$env/dynamic/private';
import { rotateImageToMatch } from '$lib/image';
import { withCatch } from '@tfkhdyt/with-catch';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq, sql } from 'drizzle-orm';

export const POST: RequestHandler = async (event) => {
	const { request, locals } = event;

	const formData = await request.formData();
	const files = formData.getAll('image');

	const isLimited = await guestLimiter.isLimited(event);

	if (env.NODE_ENV === 'production') {
		if (!locals.user && isLimited) {
			throw error(429, 'Kuota free tier-mu sudah habis, daftar untuk mendapatkan 5 saldo gratis');
		}

		if (locals.user?.creditsAmount === 0 && isLimited) {
			throw error(
				429,
				'Kamu hanya mendapatkan kuota free tier 3 kali per hari, silakan topup terlebih dahulu'
			);
		}
	}

	if (locals.user?.creditsAmount && files.length > locals.user.creditsAmount) {
		throw error(429, 'Saldomu tidak mencukupi, silakan topup terlebih dahulu');
	}

	const result = await Promise.allSettled(
		files.map(async (image) => {
			const [err, output] = await withCatch(removeBackground(image)); // Process the image
			if (err) {
				console.error('Error removing background:', err);
				throw new Error('Error removing background', { cause: err });
			}
			const rotatedOutput = await rotateImageToMatch(
				new Blob([image], { type: 'image/png' }),
				output!
			);

			const base64 = await blobToBase64(rotatedOutput); // Convert the blob to base64
			return base64;
		})
	);

	const output: string[] = [];
	for (const item of result) {
		if (item.status === 'fulfilled') {
			output.push(item.value);
		}
	}

	let creditsAmount = undefined;
	if (locals.user && locals.user.creditsAmount && locals.user.creditsAmount > 0) {
		const row = await db
			.update(table.credits)
			.set({
				amount: sql`${table.credits.amount} - ${files.length}`
			})
			.where(eq(table.credits.id, locals.user.id))
			.returning({ amount: table.credits.amount });
		creditsAmount = row.at(0)?.amount;
	}

	return new Response(JSON.stringify({ images: output, creditsAmount }), {
		headers: { 'Content-Type': 'application/json' }
	});
};

async function blobToBase64(blob: Blob) {
	const arrayBuffer = await blob.arrayBuffer();
	const base64 = Buffer.from(arrayBuffer).toString('base64');
	return base64;
}
