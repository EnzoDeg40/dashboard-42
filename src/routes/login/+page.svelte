<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import { PUBLIC_BASE_URL,PUBLIC_DEV_URL } from "$env/static/public";
	export let data;

	$: user = data.user;
	$: connexion = data.connexion;
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		{#if !connexion}
			<h2 class="h2">Before start using the dashboard you should login to discord.</h2>
			<div class="flex justify-center space-x-2">
				<a
					class="btn variant-filled"
					href="https://discord.com/oauth2/authorize?client_id=1208567625337151488&response_type=code&redirect_uri={PUBLIC_BASE_URL}/login&scope=identify+guilds.members.read+guilds"
					rel="noreferrer"
				>
					Login
				</a>
			</div>
		{:else}
			<Avatar
				src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=1024`}
				alt="User avatar"
				class="w-64 h-64 md:w-80 md:h-80"
			/>
			<h2 class="h2">Welcome {user.username}</h2>
			<h2 class="h2">You can use the dashboard</h2>
			<div class="flex justify-center space-x-2">
				<a
					class="btn variant-filled"
					href="/dashboard"
					rel="noreferrer"
				>
					Go to dashboard
				</a>
			</div>
		{/if}

	</div>
</div>
