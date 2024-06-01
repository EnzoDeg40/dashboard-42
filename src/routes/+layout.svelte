<script lang="ts">
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
	import "../app.postcss";
	import { AppShell, AppBar, Avatar, storePopup, initializeStores, Toast, type DrawerSettings, Drawer } from '@skeletonlabs/skeleton';
	initializeStores();
	import {
		computePosition,
		autoUpdate,
		offset,
		shift,
		flip,
		arrow,
	} from "@floating-ui/dom";
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { inject } from '@vercel/analytics';
	import Icon from "@iconify/svelte";
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import SideBar from "$lib/components/SideBar.svelte";
	const drawerStore = getDrawerStore();


	inject();
	injectSpeedInsights();

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	export let data;

	let isHovering = false;
	let menuTimeout:any;

	$: user = data.user;
	$: userintra = data.userintra;
	$: showdiscord = user ? true : false;

	onMount(() => {
		if (data.user) {
			setInterval(() => {
				showdiscord = !showdiscord;
			}, 15000);
		}
	});

	function handleMouseOver() {
		clearTimeout(menuTimeout);
		isHovering = true;
	}

	function handleMouseOut() {
		menuTimeout = setTimeout(() => {
			isHovering = false;
		}, 200);
	}

	function drawerOpen(): void {
		const s: DrawerSettings = { id: 'doc-sidenav' };
		drawerStore.open(s);
	}
</script>

<Drawer class="lg:hidden">
	<SideBar servers={data.servers || []} guilds={data.guilds || []}/>
</Drawer>

<!-- App Shell -->
<AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4">
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<div class="flex items-center space-x-4">
					<!-- Hamburger Menu -->
					{#if data.servers !== null && data.userintra !== null}
						<button on:click={drawerOpen} class="btn-icon btn-icon-sm lg:!hidden">
							<Icon icon="uil:bars" width=32/>
						</button>
					{/if}
					<!-- Logo -->
					<a href="/"><span class="gradient-heading"><strong class="text-xl uppercase">Marty</strong></span></a>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://discord.com/invite/jmtk2qqHq2"
					target="_blank"
					rel="noreferrer"
				>
					<Icon icon="ic:baseline-discord" class="mr-2"/>Discord
				</a>
				<a
					class="btn btn-sm variant-ghost-surface hidden md:flex"
					href="https://github.com/cdurdetrouver/bot-42"
					target="_blank"
					rel="noreferrer"
				>
					<Icon icon="mdi:github" class="mr-2"/> Github
				</a>
				{#if !user}
					<a
						class="btn btn-sm variant-soft-primary"
						href="/login"
						rel="noreferrer"
					>
						Login Discord
					</a>
				{:else if !userintra}
					<a
						class="btn btn-sm variant-soft-primary"
						href="/login_intra"
						rel="noreferrer"
					>
						Login Intra
					</a>
				{:else}
					<div
						class="relative inline-block"
						on:mouseover={handleMouseOver}
						on:mouseout={handleMouseOut}
						on:focus={handleMouseOver}
						on:blur={handleMouseOut}
						tabindex="0"
						role="button"
					>
						<div class="relative w-9 h-9">
							{#if showdiscord}
							<div
							in:fade={{ duration: 500 }}
							out:fade={{ duration: 500 }}>
								<Avatar
									src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=1024`}
									alt={user.username}
									class="absolute w-9 h-9"
								/>
							</div>
							{:else}
							<div
							in:fade={{ duration: 500 }}
							out:fade={{ duration: 500 }}>
								<Avatar
									src={userintra.avatar}
									alt={userintra.username}
									class="absolute w-9 h-9"
								/>
							</div>
							{/if}
						</div>
						{#if isHovering}
							<div class="flex flex-col gap-2 absolute z-10 top-14 right-0 bg-surface-500 p-2 rounded-md shadow-md">
								<a
									class="btn btn-sm variant-soft-primary"
									href="/dashboard"
									rel="noreferrer"
								>
									Dashboard
								</a>
								<a
									class="btn btn-sm variant-soft-warning"
									href="/logout"
									rel="noreferrer"
								>
									Logout Discord
								</a>
								<a
									class="btn btn-sm variant-soft-warning"
									href="/logout_intra"
									rel="noreferrer"
								>
									Logout Intra
								</a>
							</div>
						{/if}
					</div>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
	<Toast />
</AppShell>

<style type="postcss">
	.gradient-heading:hover {
		animation: gradient 3s ease infinite;
		@apply bg-clip-text text-transparent box-decoration-clone;
		@apply bg-gradient-to-br;
		@apply from-primary-500 via-tertiary-500 to-secondary-500;
	}
</style>
