import { z } from 'zod';

const supportedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
const maximumImageSize = 5_000_000;

export const imageSchema = z
	.instanceof(File)
	.refine((file) => supportedImageTypes.includes(file.type), 'Tipe gambar tidak didukung')
	.refine(
		(file) => file.size <= maximumImageSize,
		'Ukuran gambar terlalu besar, tidak boleh lebih dari 5MB'
	);
