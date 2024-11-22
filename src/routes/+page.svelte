<script lang="ts">
	import { setupViewTransition } from 'sveltekit-view-transition';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

	const features = [
		{
			icon: 'lucide:zap',
			title: 'Proses Instan',
			description: 'Hasil dalam hitungan detik dengan teknologi AI terkini'
		},
		{
			icon: 'majesticons:image-line',
			title: 'Kualitas HD',
			description: 'Hasil berkualitas tinggi tanpa mengurangi resolusi asli'
		},
		{
			icon: 'lucide:circle-check-big',
			title: 'Mudah Digunakan',
			description: 'Interface sederhana, upload dan download dengan mudah'
		},
		{
			icon: 'fluent:money-16-regular',
			title: 'Harga terjangkau',
			description: '91% lebih murah dibanding remove.bg'
		}
	];

	const caraKerja = [
		{
			icon: 'material-symbols:upload',
			title: 'Upload Gambar',
			description: 'Drag & drop atau pilih gambar Anda'
		},
		{
			icon: 'material-symbols:upload',
			title: 'Proses Otomatis',
			description: 'AI kami akan memproses gambar Anda'
		},
		{
			icon: 'material-symbols:upload',
			title: 'Download Hasil',
			description: 'Unduh gambar tanpa background'
		}
	];

	const faq = [
		{
			question: 'Kenapa namanya Remove "Biji" ???',
			answer: 'Background -> (Disingkat jadi) BG -> (Dibaca) Bi-ji -> Biji'
		},
		{
			question: 'Apa perbedaan dengan remove.bg? dan kenapa saya harus menggunakan aplikasi ini?',
			answer:
				'Free tier remove.bg menghasilkan output yang berkualitas rendah. Sementara itu, free tier remove biji mampu menghasilkan kualitas gambar yang setara dengan gambar asli. Selain itu, biaya saldo remove biji 91% lebih terjangkau dibandingkan dengan remove.bg.'
		}
	];

	const { transition } = setupViewTransition();
</script>

<svelte:head>
	<title>Remove Biji - Hilangkan bijimu dengan mudah</title>
</svelte:head>

<div class="min-h-screen">
	<header class="container mx-auto px-4 py-16">
		<div class="text-center">
			<h1
				class="mb-4 text-4xl font-bold text-gray-900 md:text-5xl dark:text-gray-50"
				use:transition={'heading'}
			>
				Hapus Background Gambar
				<span class="text-purple-600"> dalam Sekejap</span>
			</h1>
			<p class="mb-12 text-lg text-gray-600 dark:text-gray-400" use:transition={'subtitle'}>
				Solusi AI yang powerful untuk menghapus background foto Anda secara otomatis dalam hitungan
				detik
			</p>
			<a
				href="/app"
				class="rounded-full bg-purple-600 px-8 py-4 text-base font-semibold text-white transition hover:bg-purple-700"
			>
				Mulai Gratis
			</a>
		</div>
	</header>

	<section class="container mx-auto px-4 py-16">
		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
			{#each features as feature}
				<div
					class="rounded-xl bg-slate-100 p-6 shadow-lg transition duration-300 hover:bg-slate-200 dark:bg-slate-800 hover:dark:bg-slate-700"
				>
					<iconify-icon icon={feature.icon} width="3rem" class="mb-2 text-purple-600"
					></iconify-icon>
					<h3 class="mb-2 text-xl font-semibold">{feature.title}</h3>
					<p class="text-gray-600 dark:text-gray-400">{feature.description}</p>
				</div>
			{/each}
		</div>
	</section>

	<section class="py-16">
		<div class="container mx-auto px-4">
			<h2 class="mb-12 text-center text-3xl font-bold">Cara Kerja</h2>
			<div class="grid gap-8 md:grid-cols-3">
				{#each caraKerja as cara, i}
					<div
						class="rounded-xl bg-slate-100 px-2 py-8 text-center shadow-lg transition duration-300 hover:bg-slate-200 dark:bg-slate-800 hover:dark:bg-slate-700"
					>
						<div
							class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-300"
						>
							<iconify-icon icon={cara.icon} width="2rem" class="text-purple-600"></iconify-icon>
						</div>
						<h3 class="mb-2 font-semibold">{i + 1}. {cara.title}</h3>
						<p class="text-gray-600 dark:text-gray-400">{cara.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="py-16">
		<div class="container mx-auto px-4">
			<h2 class="mb-12 text-center text-3xl font-bold">Frequently Asked Questions</h2>
			<Accordion class="mx-auto max-w-2xl space-y-4">
				{#each faq as f}
					<AccordionItem>
						<svelte:fragment slot="summary">
							<span class="font-medium">{f.question}</span>
						</svelte:fragment>
						<svelte:fragment slot="content">
							<span class="text-gray-600 dark:text-gray-400">
								{f.answer}
							</span>
						</svelte:fragment>
					</AccordionItem>
				{/each}
			</Accordion>
		</div>
	</section>

	<section class="container mx-auto px-4 py-16 text-center">
		<h2 class="mb-4 text-3xl font-bold">Siap Mencoba?</h2>
		<p class="mb-8 text-lg text-gray-600 dark:text-gray-400">
			Dapatkan 5 saldo gratis untuk member baru
		</p>
		<a
			href="/app"
			class="rounded-full bg-purple-600 px-8 py-4 text-base font-semibold text-white transition hover:bg-purple-700"
		>
			Mulai Sekarang
		</a>
	</section>
</div>
