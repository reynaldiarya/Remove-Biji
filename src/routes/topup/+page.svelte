<script lang="ts">
	import BuyIcon from '$lib/icons/buy-icon.svelte';
	import { formatRupiah } from '$lib/utils';
	import SvelteSeo from 'svelte-seo';
	import { packages } from '$lib/constants/price';
	import clsx from 'clsx';
	import toast from 'svelte-french-toast';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { setupViewTransition } from 'sveltekit-view-transition';
	import BijiIcon from '$lib/icons/biji-icon.svelte';

	type Props = {
		data: PageData;
	};

	let { data }: Props = $props();
	const { form, enhance, delayed } = superForm(data.form, {
		onUpdated({ form }) {
			if (form.message?.type === 'error') {
				toast.error(form.message.message);
			}
		}
	});

	const title = 'Top Up - Remove Biji';
	const description = 'Top Up Remove Biji';

	const { transition } = setupViewTransition();
</script>

<svelte:head>
	<title>{title}</title>
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

<div class="space-y-2 text-center" use:transition={'heading'}>
	<h1 class="h1 font-bold">Top Up</h1>
	<h2 class="h5 text-gray-600 dark:text-gray-400">Isi ulang bijimu</h2>
</div>

<form method="POST" use:enhance>
	<div class="mt-10 flex justify-center">
		<div class="space-y-4">
			{#each packages as row, i}
				<label
					class={clsx(
						'flex items-center space-x-2',
						row.value === $form.package || 'text-gray-600 dark:text-gray-400'
					)}
				>
					<input
						class="radio"
						type="radio"
						name="package"
						bind:group={$form.package}
						value={row.value}
						required={i === 0}
					/>
					<span class="flex w-[75svw] items-center justify-between md:w-[250px]">
						<span class="-ml-2 flex items-center">
							<BijiIcon />
							{row.value}
						</span>
						<span>{formatRupiah(row.totalPrice)}</span>
					</span>
				</label>
			{/each}
		</div>
	</div>

	<div class="mt-6 space-y-5 text-center">
		<p class="flex items-center justify-center text-gray-600 dark:text-gray-400">
			1 <BijiIcon />
			= 1 gambar
		</p>

		<button
			type="submit"
			class="plausible-event-name=Top+Up variant-filled btn"
			disabled={$delayed || !$form.package}
		>
			<BuyIcon class="mr-2 size-5" />
			Beli sekarang (QRIS)
		</button>
	</div>
</form>
