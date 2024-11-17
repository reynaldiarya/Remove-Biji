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
		return outputBlob; // Return the same Blob if no rotation is needed
	}

	const orientationRotationMap: Record<number, number> = {
		1: 0, // Normal
		3: 180, // Upside Down
		6: 90, // Rotated 90° Clockwise
		8: -90 // Rotated 90° Counterclockwise
	};
	// Compute the relative rotation
	const outputRotation = orientationRotationMap[outputOrientation] || 0;
	const inputRotation = orientationRotationMap[inputOrientation] || 0;

	const rotationNeeded = inputRotation - outputRotation;

	// Convert Blob to Bu	ffer
	const buffer = await outputBlob.arrayBuffer();

	// Apply rotation using sharp
	const [err, rotatedBuffer] = await withCatch(
		sharp(Buffer.from(buffer)).rotate(rotationNeeded).toBuffer()
	);
	if (err) {
		console.error('Error rotating image:', err);
		throw new Error('Error rotating image', { cause: err });
	}

	// Convert the rotated Buffer back to a Blob
	const rotatedBlob = new Blob([rotatedBuffer], { type: outputBlob.type });

	return rotatedBlob;
};
