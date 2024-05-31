<script lang="ts">
	import { AppRail, Avatar, getDrawerStore } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
  import { goto } from '$app/navigation';

	export let servers:any[];
	export let guilds:any[];

	if (servers === null || guilds === null) goto('/login');

	const drawerStore = getDrawerStore();

	function getInitials(serverName: string): string {
		const serverSplit = serverName.split(' ');

		if (serverSplit.length > 1) {
			return serverSplit[0][0] + serverSplit[1][0]; // eg: IT
		}
		else if (serverSplit.length === 1) {
			return serverSplit[0][0]; // eg: I
		}
		return "";
	}

	function checkInDb(guilds:any[], id:string) {
		let temp = false;
		guilds.forEach((guild) => {
			if (guild.guildid === id) temp = true;
		});
		return temp;
	}

	$: currentServer = servers.find((server) => server.id === $page.params.id) || servers[0];
	$: indb = checkInDb(guilds, currentServer.id);
	console.log(indb);
	$: listboxItemActive = (href: string) => ($page.route.id === href ? 'bg-primary-active-token' : '');
</script>

<div class="grid grid-cols-[auto_1fr] h-full bg-surface-50-900-token border-r border-surface-500/30 lg:hidden">
	<!-- App Rail -->
	<AppRail background="bg-transparent" border="border-r border-surface-500/30">
		<!-- Mobile Only -->
		<nav>
			<ul class="flex flex-col items-center gap-5 w-full">
				{#each servers as elem}
					<li>
						<a href="/dashboard/{elem.id}" class="hover:bg">
							<Avatar
								src="https://cdn.discordapp.com/icons/{elem.id}/{elem.icon}.png"
								alt="server {elem.id}"
								initials={getInitials(elem.name)}
								class="w-20 h-20 border-white {$page.params.id === elem.id ? 'border-4' : 'hover:rounded-3xl hover:border-2 '}"
								rounded={$page.params.id === elem.id ? 'rounded-3xl' : 'rounded-full'}
							/>
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</AppRail>
	<!-- Nav Links -->
	{#if $page.route.id?.startsWith("/dashboard/[id]")}
		<section class="p-4 pb-20 space-y-4 overflow-y-auto">
			<p class="font-bold pl-4 text-2xl">Home</p>
			<nav class="list-nav">
				<ul>
					<li>
						<a href="/dashboard/{currentServer.id}/" class={listboxItemActive(`/dashboard/[id]`)} data-sveltekit-preload-data="hover" on:keypress on:click={drawerStore.close}>
							<Icon icon="material-symbols:home" class="mr-2"/>
							Start
						</a>
					</li>
					<li>
						<a href="/dashboard/{currentServer.id}/settings" class="{listboxItemActive(`/dashboard/[id]/settings`)} {indb? "" : "text-surface-400-500-token non-cliquable"}" data-sveltekit-preload-data="hover" on:keypress on:click={drawerStore.close}>
							<Icon icon="material-symbols:settings" class="mr-2"/>
							Settings
						</a>
					</li>
				</ul>
			</nav>
			<hr class="!my-6 opacity-50" />
			<p class="font-bold pl-4 text-2xl">Users</p>
			<nav class="list-nav">
				<ul>
					<li>
						<a href="/dashboard/{currentServer.id}/users" class="{listboxItemActive(`/dashboard/[id]/users`)} {indb? "" : "text-surface-400-500-token non-cliquable"}" data-sveltekit-preload-data="hover" on:keypress on:click={drawerStore.close}>
							<Icon icon="mdi:account" class="mr-2"/>
							Add User
						</a>
					</li>
					<li>
						<a href="/dashboard/{currentServer.id}/users-list" class="{listboxItemActive(`/dashboard/[id]/users-list`)} {indb? "" : "text-surface-400-500-token non-cliquable"}" data-sveltekit-preload-data="hover" on:keypress on:click={drawerStore.close}>
							<Icon icon="material-symbols:content-paste" class="mr-2"/>
							List Users
						</a>
					</li>
				</ul>
			</nav>
		</section>
	{/if}
</div>

<style lang="postcss">
	.non-cliquable {
		pointer-events: none;
	}
</style>
