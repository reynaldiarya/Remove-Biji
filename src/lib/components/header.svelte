<script>
	import CircleIcon from '$lib/icons/circle-icon.svelte';
	import { LightSwitch } from '@skeletonlabs/skeleton';
</script>

<header class="flex items-center justify-between pb-4">
	<div>
		<h2 class="h2 flex items-center font-bold">
			<div class="mr-2 flex items-center">
				<CircleIcon class="size-8" />
				<CircleIcon class="-ml-3 size-8" />
			</div>
			Remove Biji
		</h2>
		<h6 class="h5 font-light">Hilangkan biji mu dengan mudah</h6>
	</div>
	<div><LightSwitch /></div>
</header>
