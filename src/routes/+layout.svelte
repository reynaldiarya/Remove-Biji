<script lang="ts">
	import { env } from '$env/dynamic/public';
	import Footer from '$lib/components/footer.svelte';
	import Header from '$lib/components/header.svelte';
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import '@fontsource/roboto/100.css';
	import '@fontsource/roboto/300.css';
	import '@fontsource/roboto/400.css';
	import '@fontsource/roboto/500.css';
	import '@fontsource/roboto/700.css';
	import '@fontsource/roboto/900.css';
	import { storePopup } from '@skeletonlabs/skeleton';
	import type { Snippet } from 'svelte';
	import { Toaster } from 'svelte-french-toast';
	import SvelteSeo from 'svelte-seo';
	import { setupViewTransition } from 'sveltekit-view-transition';
	import '../app.css';
	import type { LayoutData } from './$types';

	type Props = {
		data: LayoutData;
		children: Snippet<[]>;
	};

	let { children, data }: Props = $props();

	const title = 'Remove Biji - Hilangkan bijimu dengan mudah';
	const description =
		'Remove Biji adalah aplikasi background remover minimalis yang mudah digunakan';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	setupViewTransition();
</script>

<svelte:head>
	<script
		defer
		data-domain={env.PUBLIC_PLAUSIBLE_DATA_DOMAIN}
		src="https://bunseki.biji.my.id/js/script.file-downloads.outbound-links.tagged-events.js"
	></script>
</svelte:head>

<SvelteSeo
	{title}
	{description}
	applicationName="Remove Biji"
	keywords="hapus background foto online, remove background gambar, background remover gratis, penghapus background otomatis, edit background foto online, cara menghapus background foto online, aplikasi hapus background foto gratis, remove background gambar HD, background remover tanpa watermark, edit background foto profesional, background remover AI, hapus background foto batch, remove background transparan, edit background foto bulk, background eraser HD, remove background foto produk, edit background foto profil, hapus background foto dokumen, background remover untuk jualan online, edit background foto KTP, background remover Indonesia, hapus background foto bahasa Indonesia, remove background gambar web Indonesia, aplikasi background remover terbaik, software hapus background tercepat, background remover vs photoshop, alternatif remove.bg, remove background png, edit background foto cepat, background remover untuk marketplace, hapus background foto sekali klik, aplikasi edit background terpopuler, cara edit background foto online gratis, edit background foto resolution tinggi, background remover untuk pemula"
	openGraph={{
		title,
		description,
		type: 'website',
		site_name: 'Remove Biji'
	}}
	twitter={{
		card: 'summary',
		site: '@tfkhdyt__',
		title,
		description
	}}
/>

<main class="mx-auto flex min-h-screen flex-col px-4 lg:container md:px-6 lg:px-8">
	<div class="flex-grow py-8">
		<Header user={data.user} />
		<div class="py-8">
			{@render children()}
		</div>
	</div>
	<Footer />
</main>

<Toaster position="top-right" />
