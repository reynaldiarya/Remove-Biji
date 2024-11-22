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

<main class="flex min-h-screen flex-col">
	<div class="flex-grow pt-8">
		<div class="mx-auto px-4 lg:container md:px-6 lg:px-8">
			<Header user={data.user} />
		</div>
		<div class="pt-8">
			{@render children()}
		</div>
	</div>
	<div class="bg-surface-100 dark:bg-surface-800">
		<div class="mx-auto px-4 lg:container md:px-6 lg:px-8">
			<Footer />
		</div>
	</div>
</main>
