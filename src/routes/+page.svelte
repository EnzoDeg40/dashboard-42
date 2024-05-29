<script lang="ts">
	import { Avatar } from "@skeletonlabs/skeleton";
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
</script>
<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-x-20 text-center flex items-center">
		<div class="flex flex-col items-center space-y-10">
			<div class="flex flex-col w-full space-y-0">
			  <h2 class="h2">Welcome to <span class="gradient-heading">Marty</span></h2>
			  <h2 class="h2">Dashboard.</h2>
			</div>
			<p class="text-lg text-center w-3/4 my-2">Never Miss a Project Milestone Again with Marty!</p>
			<a
			  class="btn variant-filled"
			  href="/dashboard"
			  rel="noreferrer"
			>
			  go to dashboard
			</a>
		  </div>
		<Avatar
			src="favicon.png"
			alt="Marty Logo"
			class="w-64 h-64 md:w-80 md:h-80"
			rounded="rounded-3xl"
		/>
	</div>
</div>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-x-20 w-1/2 flex items-center">
		<Accordion autocollapse class="card p-4 text-token">
			<AccordionItem open>
				<svelte:fragment slot="summary"><p class="font-bold">What is Marty?</p></svelte:fragment>
				<svelte:fragment slot="content">
					Marty is a project management tool that helps you keep track of your project milestones and deadlines. It is designed to help you stay on top of your project and never miss a deadline again.
				</svelte:fragment>
			</AccordionItem>
			<AccordionItem>
				<svelte:fragment slot="summary"><p class="font-bold">How does Marty work?</p></svelte:fragment>
				<svelte:fragment slot="content">
					Marty works by allowing you to create a project and set milestones and deadlines for each project. You can then track the progress of your project and receive notifications when a milestone is approaching or overdue.
				</svelte:fragment>
			</AccordionItem>
			<AccordionItem>
				<svelte:fragment slot="summary"><p class="font-bold">Why use Marty?</p></svelte:fragment>
				<svelte:fragment slot="content">
					Marty is designed to help you stay organized and on top of your project deadlines. It is a simple and easy-to-use tool that can help you manage your projects more effectively.
				</svelte:fragment>
			</AccordionItem>
		</Accordion>
	</div>
</div>


<style type="postcss">
	.gradient-heading {
		animation: gradient 3s ease infinite;
		@apply bg-clip-text text-transparent box-decoration-clone;
		@apply bg-gradient-to-br;
		@apply from-primary-500 via-tertiary-500 to-secondary-500;
	}
</style>
