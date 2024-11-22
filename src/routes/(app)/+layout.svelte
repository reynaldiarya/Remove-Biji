<script lang="ts">
	import Footer from '$lib/components/footer.svelte';
	import Header from '$lib/components/header.svelte';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	type Props = {
		data: LayoutData;
		children: Snippet<[]>;
	};

	let { children, data }: Props = $props();
</script>

<main class="mx-auto flex min-h-screen flex-col px-4 lg:container md:px-6 lg:px-8">
	<div class="flex-grow py-8">
		<Header user={data.user} />
		<div class="py-8">
			{@render children()}
		</div>
	</div>
	<Footer />
</main>
