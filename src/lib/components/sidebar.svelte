<script lang="ts">
	import BillIcon from '$lib/icons/bill-icon.svelte';
	import BuyIcon from '$lib/icons/buy-icon.svelte';
	import CloseIcon from '$lib/icons/close-icon.svelte';
	import LoadingIcon from '$lib/icons/loading-icon.svelte';
	import LogoutIcon from '$lib/icons/logout-icon.svelte';
	import { getCreditsStore } from '$lib/stores/credit.svelte';
	import { Avatar, LightSwitch } from '@skeletonlabs/skeleton';
	import clsx from 'clsx';
	import { fade } from 'svelte/transition';
	import GoogleLoginButton from './buttons/google-login-button.svelte';
	import InvoiceIcon from '$lib/icons/invoice-icon.svelte';
	import BijiIcon from '$lib/icons/biji-icon.svelte';

	type Props = {
		user: {
			id: number;
			name: string | null;
			email: string;
			picture: string | null;
			creditsAmount: number | null;
		} | null;
		isOpen: boolean;
		handleToggle: () => void;
	};

	let { user, isOpen, handleToggle }: Props = $props();

	const creditStore = getCreditsStore();
</script>

<!-- backdrop -->
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

<!-- mobile sidebar -->
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
		{#if user}
			<div class="flex items-center justify-between rounded px-4 py-2">
				<div>Jumlah bijimu</div>
				<div class="flex items-center">
					{#if creditStore.amount !== null}
						<BijiIcon />
						{creditStore.amount}
					{:else}
						<LoadingIcon class="size-4 animate-spin" />
					{/if}
				</div>
			</div>
			<a
				href="/topup"
				class="flex items-center justify-between rounded px-4 py-2 hover:bg-surface-300 dark:hover:bg-surface-800"
			>
				<span>Top Up</span>
				<BuyIcon class="size-5" />
			</a>
			<a
				href="/invoices"
				class="flex items-center justify-between rounded px-4 py-2 hover:bg-surface-300 dark:hover:bg-surface-800"
			>
				<span>Invoice</span>
				<InvoiceIcon class="size-5" />
			</a>
		{/if}
		<a
			href="/pricing"
			class="flex items-center justify-between rounded px-4 py-2 hover:bg-surface-300 dark:hover:bg-surface-800"
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
			<a href="/auth/logout" class="variant-ghost-error btn mt-4 w-full">
				<LogoutIcon class="mr-2 size-5" />
				Logout</a
			>
		{:else}
			<GoogleLoginButton className="w-full btn-md" />
		{/if}
	</div>
</div>
