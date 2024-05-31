<script lang="ts">
	import { Avatar } from "@skeletonlabs/skeleton";
</script>

<div class="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-10 items-center justify-center">
	<div class="flex flex-col items-center xl:items-start text-center xl:text-left space-y-4 mt-40">
		<h1 class="h1 !text-5xl md:!text-6xl max-w-[600px]">Welcome to <span class="gradient-heading">Marty</span> Dashboard.</h1>
		<p class="!text-xl max-w-[475px]">
			Are you a student at 42 school looking to celebrate your friends' successes? Our app simplifies managing and automating Discord notifications for each project your friends complete.
		</p>
		<div class="flex gap-4">
			<a
				class="btn variant-filled"
				href="/dashboard"
				rel="noreferrer"
			>
				Go to dashboard
			</a>
		</div>
	</div>
	<div class="hidden md:inline-block w-full max-w-[650px] mx-auto mt-20">
		<div class="aspect-video relative">
			<div class="anim-float-avatar absolute z-[1] left-[23%]">
				<Avatar
					src="favicon.png"
					alt="Marty Logo"
					rounded="rounded-3xl"
					width="w-[28vw]"
					shadow="shadow-xl"
				/>
			</div>
		</div>
	</div>
</div>

<style type="postcss">
	.gradient-heading {
		animation: gradient 3s ease infinite;
		@apply bg-clip-text text-transparent box-decoration-clone;
		@apply bg-gradient-to-br;
		@apply from-primary-500 via-tertiary-500 to-secondary-500;
	}

	.anim-float-avatar {
		animation: float-up 13s ease-in-out infinite;
	}

	@keyframes float-up {
		0% { transform: translateY(0px); }
		50% { transform: translateY(-20px); }
		100% { transform: translateY(0px); }
	}

	@keyframes float-down {
		0% { transform: translateY(0px); }
		50% { transform: translateY(20px); }
		100% { transform: translateY(0px); }
	}
</style>
