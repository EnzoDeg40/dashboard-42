<script lang="ts">
	import { Stepper, Step } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	export let data;

	$: locked2 = !data.indb;

	$: name = data.server.name
	if (data.server.name === undefined) {
		data.servers.forEach((element: { id: string; name: any; }) => {
			if ($page.params.id === element.id) {
				name = element.name;
			}
		});
	}

	function onCompleteHandler(e: Event): void { 
		toastStore.trigger({
			message: "You have completed the steps!",
			timeout: 5000,
			hideDismiss: true,
			background: 'variant-filled-success'
		});
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h2 class="h2">Welcome to  Marty Dahsboard for {name}.</h2>
		<div class="text-left w-full card p-4 text-token">
			<Stepper on:complete={onCompleteHandler}>
				<Step>
					<svelte:fragment slot="header"><p class="flex justify-content items-center">Invite the bot<Icon icon="bxs:bot" class="ml-2"/></p></svelte:fragment>
					<p>Before doing anything, you need to invite the bot on your Server</p>
					<aside class="place-holder alert variant-ghost-warning">
						<div class="alert-actions">
							<a
								class="btn btn-sm variant-filled-primary"
								href="https://discord.com/oauth2/authorize?client_id=1208567625337151488&permissions=85056&scope=bot+applications.commands"
								target="_blank"
								rel="noreferrer"
							>
								Invite
							</a>
						</div>
					</aside>
				</Step>
				<Step locked={locked2}>
					<svelte:fragment slot="header">bot initialization</svelte:fragment>
					you need to run the <code class="code">/init</code> command in your server to initialize the bot
					<aside class="place-holder alert variant-ghost-warning">
						<div class="alert-message">
							<p>This step is <u>{locked2 ? 'Locked' : 'Unlocked'}</u>{locked2 ? ' , You should run the command first' : ''}</p>
						</div>
					</aside>
				</Step>
				<Step>
					<svelte:fragment slot="header">Settings page</svelte:fragment>
					you can go to <a href="/dashboard/{$page.params.id}/settings" class="anchor">settings</a> page to configure the bot
				</Step>
				<Step>
					<svelte:fragment slot="header">Add User page</svelte:fragment>
					you can go to <a href="/dashboard/{$page.params.id}/users" class="anchor">add user</a> page to add some people
				</Step>
				<Step>
					<svelte:fragment slot="header">List Users page</svelte:fragment>
					you can go to <a href="/dashboard/{$page.params.id}/users-list" class="anchor">list users</a> page to look and manage the list of users
				</Step>
			</Stepper>
		</div>
	</div>
</div>
