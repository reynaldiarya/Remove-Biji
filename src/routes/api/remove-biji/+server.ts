import { z } from 'zod';
import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import { removeBackground } from '@imgly/background-removal-node';
import { imageSchema } from '$lib/schema/image-schema';

const removeBijiSchema = z.object({
	image: imageSchema
});

export const POST: RequestHandler = async ({ request }) => {
	const formData = await request.formData();
	const body = Object.fromEntries(formData);

	const payload = removeBijiSchema.safeParse(body);
	if (!payload.success) {
		console.error(payload.error);
		return error(422, payload.error.issues.join(', '));
	}

	const result = await removeBackground(payload.data.image);

	return new Response(result);
};
