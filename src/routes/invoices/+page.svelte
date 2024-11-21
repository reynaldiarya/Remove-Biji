<script lang="ts">
	import SvelteSeo from 'svelte-seo';
	import { setupViewTransition } from 'sveltekit-view-transition';
	import type { PageData } from './$types';
	import { formatRupiah } from '$lib/utils';
	import { format } from 'date-fns';
	import { id } from 'date-fns/locale/id';
	import MoneyIcon from '$lib/icons/money-icon.svelte';
	import BijiIcon from '$lib/icons/biji-icon.svelte';

	type Props = {
		data: PageData;
	};

	let { data }: Props = $props();

	const title = 'Invoice - Remove Biji';
	const description = 'Invoice Remove Biji';

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
	<h1 class="h1 font-bold">Invoice</h1>
	<h2 class="h5 text-gray-600 dark:text-gray-400">Riwayat pembelianmu</h2>
</div>

<!-- Responsive Container (recommended) -->
<div class="table-container mx-auto mt-10 max-w-2xl">
	<!-- Native Table Element -->
	<table class="table table-hover">
		<thead>
			<tr>
				<th>Paket</th>
				<th>Total Harga</th>
				<th>Status</th>
				<th>Tanggal Dibuat</th>
				<th>Tanggal Dibayar</th>
			</tr>
		</thead>
		<tbody>
			{#each data.invoices as invoice (invoice.id)}
				<tr>
					<td class="flex items-center">
						<BijiIcon />
						{invoice.package}</td
					>
					<td>{formatRupiah(invoice.amount)}</td>
					<td>
						{#if invoice.status === 'PAID'}
							<span class="variant-filled-success badge">{invoice.status}</span>
						{:else if invoice.status === 'UNPAID'}
							<span class="variant-filled-error badge">{invoice.status}</span>
						{:else}
							<span class="variant-filled-warning badge">{invoice.status}</span>
						{/if}
					</td>
					<td
						>{!!invoice.createdAt &&
							format(invoice.createdAt, 'dd MMM yyyy, HH:mm', { locale: id })}</td
					>
					<td>
						{#if invoice.paidAt}
							<span class="flex">
								{format(invoice.paidAt, 'dd MMM yyyy, HH:mm', { locale: id })}
							</span>
						{:else if invoice.status === 'UNPAID'}
							<div class="flex">
								<a href={invoice.checkoutUrl} class="variant-filled-tertiary btn btn-sm">
									<MoneyIcon class="mr-2 size-5" />
									Bayar</a
								>
							</div>
						{:else}
							-
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
