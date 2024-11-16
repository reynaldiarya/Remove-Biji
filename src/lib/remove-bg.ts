import { imageSchema } from './schema/image-schema';

export const removeBg = async (images: FileList | undefined) => {
	if (!images) throw new Error('Tidak ada gambar yang dikirim');

	const payload = imageSchema.array().max(4).safeParse(Array.from(images));
	if (!payload.success) {
		throw payload.error;
	}

	const form = new FormData();
	for (const image of payload.data) {
		form.append('image', image);
	}

	const resp = await fetch('/api/remove-biji', {
		method: 'POST',
		body: form
	});
	const data = await resp.json();

	if (!resp.ok) {
		throw new Error(data.message as string);
	}

	return data.images as { images: string[] };
};
