<script>
	import CircleIcon from '$lib/icons/circle-icon.svelte';
	import { LightSwitch } from '@skeletonlabs/skeleton';
</script>

<header class="flex items-center justify-between pb-4">
	<div>
		<h1 class="h2 flex items-center font-bold">
			<div class="mr-2 flex items-center">
				<CircleIcon class="size-8" />
				<CircleIcon class="-ml-3 size-8" />
			</div>
			Remove Biji
		</h1>
		<h2 class="h6 text-gray-600 dark:text-gray-400">Hilangkan biji mu dengan mudah</h2>
	</div>
	<div><LightSwitch /></div>
</header>
