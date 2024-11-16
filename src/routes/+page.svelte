<script lang="ts">
	import FileDropzone from '$lib/components/file-dropzone.svelte';
	import BgReplaceIcon from '$lib/icons/bg-replace-icon.svelte';
	import DownloadIcon from '$lib/icons/download-icon.svelte';
	import DownloadMultipleIcon from '$lib/icons/download-multiple-icon.svelte';
	import ResetIcon from '$lib/icons/reset-icon.svelte';
	import TrashIcon from '$lib/icons/trash-icon.svelte';
	import ViewIcon from '$lib/icons/view-icon.svelte';
	import { imageSchema } from '$lib/schema/image-schema';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import clsx from 'clsx';
	import { v4 as uuidv4 } from 'uuid';
	import toast from 'svelte-french-toast';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import { z } from 'zod';
	import { match } from 'ts-pattern';
	import JSZip from 'jszip';
	import CircleIcon from '$lib/icons/circle-icon.svelte';

	let images = $state<FileList>();
	let imagePreviews = $derived(
		images && Array.from(images).map((image) => URL.createObjectURL(image))
	);

	let outputs = $state<Blob[]>([]);
	let outputPreviews = $derived(
		outputs && Array.from(outputs).map((output) => URL.createObjectURL(output))
	);

	// $effect(() => {
	// 	return async () => {
	// 		await Promise.all([
	// 			...(imagePreviews || []).map(URL.revokeObjectURL),
	// 			...(outputPreviews || []).map(URL.revokeObjectURL)
	// 		]);
	// 	};
	// });

	const isImageExist = $derived(images && images.length > 0);

	const removeFileFromList = (fileToRemove: File) => {
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

	let isLoading = $state(false);

	const removeBg = async () => {
		if (!images) throw new Error('Tidak ada gambar yang dikirim');

		const payload = imageSchema.array().safeParse(Array.from(images));
		if (!payload.success) {
			throw payload.error;
		}

		const result = await Promise.allSettled(
			payload.data.map(async (image) => {
				const form = new FormData();
				form.append('image', image);

				const resp = await fetch('/api/remove-biji', {
					method: 'POST',
					body: form
				});
				if (!resp.ok) {
					throw new Error(resp.statusText);
				}

				const data = await resp.blob();

				return data;
			})
		);

		return result;
	};

	const handleRemoveBg = async () => {
		isLoading = true;

		await toast.promise(removeBg(), {
			loading: 'Sedang dalam proses',
			success: (result) => {
				for (const item of result) {
					if (item.status === 'fulfilled') {
						outputs.push(item.value);
					}
				}

				isLoading = false;

				return 'Proses berhasil';
			},
			error: (err: unknown) => {
				if (err instanceof z.ZodError) {
					return err.errors.at(0)?.message ?? 'Proses gagal';
				}

				isLoading = false;

				return 'Proses gagal';
			}
		});
	};

	function downloadBlob(url: string, fileName = 'download'): void {
		// Create download link
		const link = document.createElement('a');
		link.href = url;
		link.download = fileName;

		// Trigger download
		link.click();
	}

	async function downloadAll() {
		if (!imagePreviews) return;

		const zip = new JSZip();

		for (const file of outputs) {
			zip.file(`remove-biji-${uuidv4()}.png`, file); // adds the image file to the zip file
		}

		const zipData = await zip.generateAsync({
			type: 'blob',
			streamFiles: true
		});

		const link = document.createElement('a');
		link.href = window.URL.createObjectURL(zipData);
		link.download = `remove-biji-batch-${uuidv4()}.zip`;
		link.click();

		window.URL.revokeObjectURL(link.href);
	}
</script>

<svelte:head>
	<title>Remove Biji - Hilangkan biji mu dengan mudah</title>
</svelte:head>

<main class="container mx-auto py-8">
	<header class="flex items-center justify-between pb-4">
		<div>
			<h2 class="h2 flex items-center font-bold">
				<div class="mr-2 flex items-center">
					<CircleIcon class="size-8" />
					<CircleIcon class="-ml-2 size-8" />
				</div>
				Remove Biji
			</h2>
			<h6 class="h5 font-light">Hilangkan biji mu dengan mudah</h6>
		</div>
		<div><LightSwitch /></div>
	</header>
	<div class="mt-4 flex items-stretch gap-4">
		<div class="card w-1/2">
			<header class="h4 card-header font-medium">Pilih gambar</header>
			<section class="max-h-[600px] overflow-y-auto p-4">
				{#if images && images.length > 0}
					<div
						class={clsx(
							'grid grid-cols-4 gap-4',
							match(images.length)
								.with(1, () => 'grid-cols-1')
								.with(2, () => 'grid-cols-2')
								.with(3, () => 'grid-cols-3')
								.otherwise(() => 'grid-cols-4')
						)}
					>
						{#each images as image, index (image.name)}
							<div
								class="group relative mx-auto aspect-square max-h-[550px] object-cover"
								animate:flip={{ duration: 400 }}
								transition:fade={{ duration: 400 }}
							>
								<img
									src={imagePreviews?.at(index)}
									alt={image.name}
									class="aspect-square max-h-[550px] rounded-lg object-cover"
								/>
								<div
									class="absolute left-0 top-0 z-10 hidden h-full w-full rounded-tr-lg bg-gradient-to-bl from-slate-900 via-transparent to-transparent group-hover:block"
								></div>
								<button
									class="absolute right-2 top-2 z-20 hidden text-white/75 hover:text-red-500 group-hover:block"
									onclick={() => (images = removeFileFromList(image))}
								>
									<TrashIcon class="size-6" />
								</button>
							</div>
						{/each}
					</div>
				{:else}
					<div>
						<FileDropzone bind:images />
					</div>
				{/if}
			</section>
			{#if isImageExist}
				<footer
					class={clsx(
						'card-footer flex pt-4 text-center',
						isImageExist ? 'justify-between' : 'justify-center'
					)}
				>
					<button
						type="button"
						class="variant-filled-surface btn"
						onclick={() => {
							images = undefined;
							outputs = [];
						}}
						disabled={isLoading}
					>
						<ResetIcon class="mr-2 size-5" />
						Reset</button
					>
					<button
						type="button"
						class="variant-filled btn"
						onclick={handleRemoveBg}
						disabled={isLoading}
					>
						<BgReplaceIcon class="mr-2 size-6" />
						Remove the biji</button
					>
				</footer>
			{/if}
		</div>
		<div class="card flex w-1/2 flex-col">
			<header class="h4 card-header font-medium">Hasil</header>
			<section class="min-h-0 flex-1 overflow-y-auto p-4 pb-0">
				{#if outputs && outputs.length > 0}
					<div
						class={clsx(
							'grid grid-cols-4 gap-4',
							match(outputs.length)
								.with(1, () => 'grid-cols-1')
								.with(2, () => 'grid-cols-2')
								.with(3, () => 'grid-cols-3')
								.otherwise(() => 'grid-cols-4')
						)}
					>
						{#each outputs as output, i (i)}
							<div
								class="group relative mx-auto aspect-square max-h-[550px] object-cover"
								animate:flip={{ duration: 400 }}
								transition:fade={{ duration: 400 }}
							>
								<img
									src={outputPreviews[i]}
									alt="output {i + 1}"
									class="aspect-square max-h-[550px] rounded-lg object-cover"
								/>
								<div
									class="absolute inset-x-0 bottom-0 hidden items-center space-x-2 p-2 group-hover:flex"
								>
									<a
										href={outputPreviews[i]}
										class="variant-filled-surface btn rounded-lg"
										target="_blank"><ViewIcon class="size-5" /></a
									>
									<button
										class="variant-filled btn rounded-lg"
										onclick={() => downloadBlob(outputPreviews[i], `remove-biji-${uuidv4()}.png`)}
										><DownloadIcon class="size-5" /></button
									>
								</div>
							</div>
						{/each}
					</div>
				{:else}
					<div class="flex h-full items-center justify-center">
						<p class="text-center text-white/50">Hasil akan muncul di sini</p>
					</div>
				{/if}
			</section>
			{#if outputs && outputs.length > 1}
				<footer class="card-footer flex pt-4 text-center">
					<button type="button" class="variant-filled btn mx-auto" onclick={downloadAll}>
						<DownloadMultipleIcon class="mr-2 size-6" />
						Download semua
					</button>
				</footer>
			{/if}
		</div>
	</div>
</main>
