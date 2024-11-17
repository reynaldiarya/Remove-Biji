import { withCatch } from '@tfkhdyt/with-catch';
import sharp from 'sharp';

const getOrientation = async (blob: Blob): Promise<number> => {
	const buffer = await blob.arrayBuffer();
	const [err, metadata] = await withCatch(sharp(Buffer.from(buffer)).metadata());
	if (err) {
		console.error('Error reading orientation:', err);
		throw new Error('Error reading orientation', { cause: err });
	}

	return metadata.orientation || 1; // Default to 1 (normal orientation)
};

export const rotateImageToMatch = async (inputBlob: Blob, outputBlob: Blob): Promise<Blob> => {
	const inputOrientation = await getOrientation(inputBlob);
	const outputOrientation = await getOrientation(outputBlob);

	if (inputOrientation === outputOrientation) {
		console.log('No rotation needed. Output image matches input orientation.');
		return outputBlob; // Return the same Blob if no rotation is needed
	}

	// Determine the rotation needed to correct the output image
	const rotationMap: Record<number, number> = {
		3: 180, // Upside down
		6: 90, // Rotated 90° CW
		8: -90 // Rotated 90° CCW
	};
	const rotationDegrees = rotationMap[outputOrientation] || 0;

	if (rotationDegrees) {
		// Convert Blob to Buffer
		const buffer = await outputBlob.arrayBuffer();

		// Apply rotation using sharp
		const [err, rotatedBuffer] = await withCatch(
			sharp(Buffer.from(buffer)).rotate(rotationDegrees).toBuffer()
		);
		if (err) {
			console.error('Error rotating image:', err);
			throw new Error('Error rotating image', { cause: err });
		}

		// Convert the rotated Buffer back to a Blob
		const rotatedBlob = new Blob([rotatedBuffer], { type: outputBlob.type });
		console.log('Output image rotated successfully.');
		return rotatedBlob;
	} else {
		console.log('Unknown orientation, no rotation applied.');
		return outputBlob;
	}
};
