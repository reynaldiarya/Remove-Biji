// place files you want to import through the `$lib` alias in this folder.
export const removeFileFromList = (fileToRemove: File, images: FileList | undefined) => {
	if (!images) return;

	// Convert FileList to Array
	const filesArray: File[] = Array.from(images);

	// Find index of file to remove
	const index: number = filesArray.findIndex((file) => file === fileToRemove);

	// Remove the file if found
	if (index > -1) {
		filesArray.splice(index, 1);
	}

	// Create a new DataTransfer object
	const dt: DataTransfer = new DataTransfer();

	// Add remaining files to DataTransfer object
	filesArray.forEach((file) => dt.items.add(file));

	// Return new FileList
	return dt.files;
};

export function base64ToBlob(base64: string) {
	const byteCharacters = atob(base64);
	const byteArrays = [];

	for (let i = 0; i < byteCharacters.length; i++) {
		byteArrays.push(byteCharacters.charCodeAt(i));
	}

	const byteArray = new Uint8Array(byteArrays);
	return new Blob([byteArray], { type: 'image/png' });
}
