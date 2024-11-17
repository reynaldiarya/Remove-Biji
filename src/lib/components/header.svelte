<script lang="ts">
	import CircleIcon from '$lib/icons/circle-icon.svelte';
	import GoogleIcon from '$lib/icons/google-icon.svelte';
	import { Avatar, LightSwitch } from '@skeletonlabs/skeleton';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	type Props = {
		user: {
			id: number;
			name: string | null;
			email: string;
			picture: string | null;
		} | null;
	};

	let { user }: Props = $props();

	const profilePopup: PopupSettings = {
		// Represents the type of event that opens/closed the popup
		event: 'click',
		// Matches the data-popup value on your popup element
		target: 'profilePopup',
		// Defines which side of your trigger the popup will appear
		placement: 'bottom'
	};
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
	<div class="flex items-center space-x-4">
		<LightSwitch />
		{#if user}
			<div use:popup={profilePopup}>
				<Avatar src={user.picture ?? undefined} width="w-10" rounded="rounded-full" />
			</div>
		{:else}
			<a href="/auth/login/google" class="variant-filled-tertiary btn btn-sm">
				<GoogleIcon class="mr-2 size-5" />
				Login with Google
			</a>
		{/if}
	</div>
</header>

<div class="card max-w-56 p-4 shadow-xl" data-popup="profilePopup">
	<div>
		<p>Hello, {user?.name}</p>

		<a href="/auth/logout" class="variant-ghost-error btn mt-4 w-full">Logout</a>
	</div>
	<div class="bg-surface-100-800-token arrow"></div>
</div>
