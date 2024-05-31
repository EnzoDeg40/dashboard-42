<script lang="ts">
	import { Step, Stepper } from "@skeletonlabs/skeleton";
	import { goto } from '$app/navigation';

	function onCompleteHandler(e: any): void {
		goto('/dashboard');
	}
</script>

<div class="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-10">
	<div class="col-span-1"></div>
	<div class="col-span-2">
		<h2 class="h2">How It Works</h2>
		<div class="text-left w-full card p-4 text-token">
			<Stepper on:complete={onCompleteHandler}>
				<Step>
					<svelte:fragment slot="header">Invite the Bot</svelte:fragment>
					Invite Marty to your Discord server. Click on the invitation link and follow the instructions to add the bot to your server.
				</Step>
				<Step>
					<svelte:fragment slot="header">Connect to Discord</svelte:fragment>
					Log in to your Discord account through our website. This allows Marty to post notifications on your server.
				</Step>
				<Step>
					<svelte:fragment slot="header">Connect to Intra 42</svelte:fragment>
					Log in to your Intra 42 account from the Marty dashboard. This enables the bot to track your friends' achievements and notify you automatically.
				</Step>
				<Step>
					<svelte:fragment slot="header">Configure the Bot</svelte:fragment>
					Go to the dashboard to customize the bot settings to your preferences. Personalize how and when you receive notifications, and enjoy celebrating your friends' successes! 🎉
				</Step>
			</Stepper>
		</div>
	</div>
</div>
