<script lang="ts">
	import { AppShell } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';

	export let data;

	$: indb = data.indb;
</script>

<!-- App Shell -->
<AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4 border-r-4 border-gray-700">
	<!-- Page Route Content -->
	<svelte:fragment slot="sidebarLeft">
		<!-- Insert the list: -->
		<nav class="list-nav">
			<p class="font-bold pl-4 pb-2 text-2xl">Home</p>
			<ul>
				<li>
					<a class={$page.route.id === "/dashboard/[id]" ? "bg-primary-active-token" : ""} href="/dashboard/{$page.params.id}">
						<Icon icon="material-symbols:home" class="mr-2"/>
						Start
					</a>
				</li>
				<li>
					<a class="{$page.route.id === "/dashboard/[id]/settings" ? "bg-primary-active-token" : ""} {indb ? "" : "text-surface-400-500-token non-cliquable"}" href="/dashboard/{$page.params.id}/settings">
						<Icon icon="material-symbols:settings" class="mr-2"/>
						Settings
					</a>
				</li>
			</ul>
			<p class="font-bold pl-4 pt-4 pb-2 text-2xl">Users</p>
			<ul>
				<li>
					<a class="{$page.route.id === "/dashboard/[id]/users" ? "bg-primary-active-token" : ""} {indb ? "" : "text-surface-400-500-token non-cliquable"}" href="/dashboard/{$page.params.id}/users">
						<Icon icon="mdi:account" class="mr-2"/>
						Add User
					</a>
				</li>
				<li>
					<a class="{$page.route.id === "/dashboard/[id]/users-list" ? "bg-primary-active-token" : ""} {indb ? "" : "text-surface-400-500-token non-cliquable"}" href="/dashboard/{$page.params.id}/users-list">
						<Icon icon="material-symbols:content-paste" class="mr-2"/>
						List Users
					</a>
					</li>
			</ul>
		</nav>
		<!-- --- -->
	</svelte:fragment>
	<slot/>
</AppShell>

<style lang="postcss">
	.non-cliquable {
		pointer-events: none;
	}
</style>
