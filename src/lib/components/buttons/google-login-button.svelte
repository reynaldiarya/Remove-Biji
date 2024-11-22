<script lang="ts">
	import clsx from 'clsx';

	type Props = {
		className?: string;
	};
	import GoogleIcon from '$lib/icons/google-icon.svelte';

	let { className }: Props = $props();
</script>

<a
	href="/auth/login/google"
	class={clsx(
		'plausible-event-name=Login variant-filled-primary btn btn-sm font-medium ',
		className
	)}
>
	<GoogleIcon class="mr-2 size-5" />
	Login dengan Google
</a>
