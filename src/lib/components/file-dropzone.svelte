<script lang="ts">
	import FileUploadIcon from '$lib/icons/file-upload-icon.svelte';
	import { FileDropzone } from '@skeletonlabs/skeleton';

	type Props = {
		images: FileList | undefined;
	};

	let { images = $bindable() }: Props = $props();
</script>

<FileDropzone
	name="files"
	bind:files={images}
	multiple
	accept=".jpg, .jpeg, .png, .webp"
	id="file-upload"
>
	<svelte:fragment slot="lead"
		><FileUploadIcon width="3em" height="3em" class="mx-auto" /></svelte:fragment
	>
	<svelte:fragment slot="message"><strong>Pilih gambar</strong> atau drag and drop</svelte:fragment>
	<svelte:fragment slot="meta">Hanya JPEG, PNG, dan WebP (Maksimal 2MB)</svelte:fragment>
</FileDropzone>
