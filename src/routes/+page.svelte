<script lang="ts">
	import ImagePickerCard from '$lib/components/cards/image-picker-card.svelte';
	import ResultCard from '$lib/components/cards/result-card.svelte';
	import Footer from '$lib/components/footer.svelte';
	import Header from '$lib/components/header.svelte';
	import type { PageData } from './$types';

	type Props = {
		data: PageData;
	};

	let { data }: Props = $props();

	let images = $state<FileList>();
	let imagePreviews = $derived(
		images && Array.from(images).map((image) => URL.createObjectURL(image))
	);

	let outputs = $state<Blob[]>([]);
	const outputPreviews = $derived(
		outputs && Array.from(outputs).map((output) => URL.createObjectURL(output))
	);

	let isLoading = $state(false);

	$effect(() => {
		if (!images || images.length === 0) {
			outputs = [];
			outputPreviews.forEach(URL.revokeObjectURL);
		}
	});
</script>

<svelte:head>
	<title>{isLoading ? '[Processing...] ' : ''}Remove Biji - Hilangkan biji mu dengan mudah</title>
</svelte:head>

<main class="container mx-auto flex min-h-screen flex-col px-4 md:px-6 lg:px-8">
	<div class="flex-grow py-8">
		<Header user={data.user} />
		<div class="mt-4 flex flex-wrap items-start gap-4 md:flex-nowrap">
			<ImagePickerCard bind:images {imagePreviews} bind:outputs bind:isLoading />
			<ResultCard {isLoading} {outputs} {outputPreviews} />
		</div>
	</div>
	<Footer />
</main>
