<script lang="ts">
	import CircleIcon from '$lib/icons/circle-icon.svelte';
	import CloseIcon from '$lib/icons/close-icon.svelte';
	import GoogleIcon from '$lib/icons/google-icon.svelte';
	import HamburgerIcon from '$lib/icons/hamburger-icon.svelte';
	import LoadingIcon from '$lib/icons/loading-icon.svelte';
	import { getCreditsStore } from '$lib/stores/credit.svelte';
	import { Avatar, LightSwitch } from '@skeletonlabs/skeleton';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import clsx from 'clsx';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { setupViewTransition } from 'sveltekit-view-transition';

	type Props = {
		user: {
			id: number;
			name: string | null;
			email: string;
			picture: string | null;
			creditsAmount: number | null;
		} | null;
	};
	import BuyIcon from '$lib/icons/buy-icon.svelte';
	import BillIcon from '$lib/icons/bill-icon.svelte';

	let { user }: Props = $props();

	const creditStore = getCreditsStore();

	onMount(() => {
		creditStore.setAmount(user?.creditsAmount ?? 0);
	});

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

	const { transition } = setupViewTransition();
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

<header class="flex items-center justify-between pb-4" use:transition={'header'}>
	<div>
		<a class="h2 flex items-center font-bold" href="/">
			<div class="mr-2 flex items-center">
				<CircleIcon class="size-8" />
				<CircleIcon class="-ml-3 size-8" />
			</div>
			Remove Biji
		</a>
		<h2 class="h6 text-gray-600 dark:text-gray-400">Hilangkan biji mu dengan mudah</h2>
	</div>
	<div class="hidden items-center space-x-8 md:flex">
		{#if user}
			<span class="flex items-center">
				Jumlah saldomu:
				<img src="/favicon.ico" alt="biji" class="mx-2 size-4" />
				{#if creditStore.amount !== null}
					{creditStore.amount}
				{:else}
					<LoadingIcon class="size-4 animate-spin" />
				{/if}
			</span>
			<a href="/topup" class="flex items-center hover:text-gray-600 dark:hover:text-gray-300">
				<BuyIcon class="mr-2 size-5" />
				Top Up</a
			>
		{/if}
		<a href="/pricing" class="flex items-center hover:text-gray-600 dark:hover:text-gray-300">
			<BillIcon class="mr-2 size-5" />
			Daftar Harga</a
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
	<div class="flex items-center space-x-4 md:hidden">
		<div class="flex items-center">
			<img src="/favicon.ico" alt="biji" class="mx-2 size-4" />
			{#if creditStore.amount !== null}
				{creditStore.amount}
			{:else}
				<LoadingIcon class="size-4 animate-spin" />
			{/if}
		</div>
		<button onclick={handleToggle} aria-label="Menu"> <HamburgerIcon class="size-10" /> </button>
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
	<button onclick={handleToggle} class="ml-auto" aria-label="close">
		<CloseIcon class="size-5" />
	</button>
	<div class="w-full space-y-3">
		<div class="flex items-center justify-between rounded px-4 py-2">
			<div>Jumlah saldomu</div>
			<div class="flex items-center">
				{#if creditStore.amount !== null}
					<img src="/favicon.ico" alt="biji" class="mx-2 size-4" />
					{creditStore.amount}
				{:else}
					<LoadingIcon class="size-4 animate-spin" />
				{/if}
			</div>
		</div>
		<a
			href="/topup"
			class="flex items-center justify-between rounded px-4 py-2 hover:bg-surface-300 dark:hover:bg-surface-800"
			onclick={handleToggle}
		>
			<span>Top Up</span>
			<BuyIcon class="size-5" />
		</a>
		<a
			href="/pricing"
			class="flex items-center justify-between rounded px-4 py-2 hover:bg-surface-300 dark:hover:bg-surface-800"
			onclick={handleToggle}
		>
			<span>Daftar Harga</span>
			<BillIcon class="size-5" />
		</a>
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
