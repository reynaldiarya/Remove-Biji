<script>
	import { page } from '$app/stores';
	import HomeIcon from '$lib/icons/home-icon.svelte';
</script>

<div class="flex h-[60dvh] flex-col items-center justify-center text-center">
	<h1 class="text-8xl font-bold md:text-9xl">{$page.status}</h1>
	<h2 class="text-lg text-gray-600 dark:text-gray-400">{$page.error?.message}</h2>

	<a href="/" class="variant-filled btn mt-8">
		<HomeIcon class="mr-2 size-5" />
		Kembali ke halaman utama
	</a>
</div>
