<script lang="ts">
	import CircleIcon from '$lib/icons/circle-icon.svelte';
	import CloseIcon from '$lib/icons/close-icon.svelte';
	import GoogleIcon from '$lib/icons/google-icon.svelte';
	import HamburgerIcon from '$lib/icons/hamburger-icon.svelte';
	import { Avatar, LightSwitch } from '@skeletonlabs/skeleton';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import clsx from 'clsx';
	import { fade } from 'svelte/transition';

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

	let isOpen = $state(false);

	function handleToggle() {
		isOpen = !isOpen;
	}
</script>

{#snippet loginWithGoogle(className?: string)}
	<a
		href="/auth/login/google"
		class={clsx('plausible-event-name=Login variant-filled-tertiary btn btn-sm', className)}
	>
		<GoogleIcon class="mr-2 size-5" />
		Login dengan Google
	</a>
{/snippet}

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
	<div class="hidden items-center space-x-8 md:flex">
		<a
			href="/pricing"
			class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-500">Harga</a
		>
		{#if user}
			<div use:popup={profilePopup}>
				<Avatar src={user.picture ?? undefined} width="w-10" rounded="rounded-full" />
			</div>
		{:else}
			{@render loginWithGoogle()}
		{/if}
		<LightSwitch />
	</div>
	<div class="md:hidden">
		<button onclick={handleToggle}> <HamburgerIcon class="size-10" /> </button>
	</div>
</header>

<div class="card max-w-56 p-4 shadow-xl" data-popup="profilePopup">
	<div>
		<p>Hello, {user?.name}</p>

		<a href="/auth/logout" class="variant-ghost-error btn mt-4 w-full">Logout</a>
	</div>
	<div class="bg-surface-100-800-token arrow"></div>
</div>

{#if isOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- eslint-disable-next-line svelte/valid-compile -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-40 bg-black/35"
		onclick={handleToggle}
		transition:fade={{ duration: 300 }}
	></div>
{/if}

<div
	class={clsx(
		'fixed inset-y-0 right-0 z-50 w-64 space-y-3 bg-surface-100 p-4 shadow-lg transition-all duration-300 dark:bg-surface-900',
		isOpen ? 'translate-x-0' : 'translate-x-full'
	)}
>
	<button onclick={handleToggle} class="ml-auto"> <CloseIcon class="size-5" /> </button>
	<div class="w-full space-y-3">
		<a
			href="/pricing"
			class="block rounded px-4 py-2 hover:bg-surface-300 dark:hover:bg-surface-800">Harga</a
		>
		<div class="flex items-center justify-between rounded px-4 py-2">
			Tema
			<LightSwitch />
		</div>
		{#if user}
			<div class="flex items-center justify-between px-4">
				{user.name}
				<Avatar src={user.picture ?? undefined} width="w-10" rounded="rounded-full" />
			</div>
			<a href="/auth/logout" class="variant-ghost-error btn mt-4 w-full">Logout</a>
		{:else}
			{@render loginWithGoogle('w-full btn-md')}
		{/if}
	</div>
</div>
