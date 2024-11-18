<script lang="ts">
	import { packages } from '$lib/constants/price';
	// import BuyIcon from '$lib/icons/buy-icon.svelte';
	import { formatRupiah } from '$lib/utils';
	import SvelteSeo from 'svelte-seo';

	const title = 'Daftar Harga - Remove Biji';
	const description = 'Daftar Harga Remove Biji';
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

<div class="space-y-2 text-center">
	<h1 class="h1 font-bold">Daftar Harga</h1>
	<h2 class="h5 text-gray-600 dark:text-gray-400">91% lebih murah dibanding remove.bg</h2>
</div>

<!-- Responsive Container (recommended) -->
<div class="table-container mt-10">
	<!-- Native Table Element -->
	<table class="table table-hover mx-auto max-w-xl">
		<thead>
			<tr>
				<th>Jumlah biji*</th>
				<th>Harga</th>
				<th>Harga per biji</th>
			</tr>
		</thead>
		<tbody>
			{#each packages as row}
				<tr>
					<td class="font-medium">{row.value} biji</td>
					<td>{formatRupiah(row.totalPrice)}</td>
					<td>{formatRupiah(row.pricePerImage)} / biji</td>
				</tr>
			{/each}
		</tbody>
		<!-- <tfoot>
			<tr>
				<th colspan="3">Calculated Total Weight</th>
				<td>{totalWeight}</td>
			</tr>
		</tfoot> -->
	</table>
</div>

<div class="mt-6 space-y-5 text-center">
	<p class="text-gray-600 dark:text-gray-400">*1 biji = 1 gambar</p>

	<!-- <a href="/topup" class="variant-filled btn">
		<BuyIcon class="mr-2 size-5" />
		Beli sekarang
	</a> -->
</div>
