<script lang="ts">
	import PrivacyPolicy from '$lib/components/privacy-policy.svx';
	import SvelteSeo from 'svelte-seo';

	const title = 'Privacy Policy - Remove Biji';
	const description = 'Privacy policy Remove Biji';
	const url = 'https://remove.biji.my.id';
</script>

<svelte:head>
	<title>Privacy Policy - Remove Biji</title>
</svelte:head>

<SvelteSeo
	{title}
	{description}
	applicationName="Remove Biji"
	canonical={url}
	keywords="hapus background foto online, remove background gambar, background remover gratis, penghapus background otomatis, edit background foto online, cara menghapus background foto online, aplikasi hapus background foto gratis, remove background gambar HD, background remover tanpa watermark, edit background foto profesional, background remover AI, hapus background foto batch, remove background transparan, edit background foto bulk, background eraser HD, remove background foto produk, edit background foto profil, hapus background foto dokumen, background remover untuk jualan online, edit background foto KTP, background remover Indonesia, hapus background foto bahasa Indonesia, remove background gambar web Indonesia, aplikasi background remover terbaik, software hapus background tercepat, background remover vs photoshop, alternatif remove.bg, remove background png, edit background foto cepat, background remover untuk marketplace, hapus background foto sekali klik, aplikasi edit background terpopuler, cara edit background foto online gratis, edit background foto resolution tinggi, background remover untuk pemula"
	openGraph={{
		title,
		description,
		type: 'website',
		site_name: 'Remove Biji',
		url
	}}
	twitter={{
		card: 'summary',
		site: '@tfkhdyt__',
		title,
		description
	}}
/>

<main class="prose max-w-4xl dark:prose-invert">
	<PrivacyPolicy />
</main>
