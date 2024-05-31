<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import DocsPreview from './DocsPreview.svelte';
</script>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-10 items-start">
	<!-- Info -->
	<div class="space-y-4">
		<h2 class="h2">Designed to be simple</h2>
		<!-- prettier-ignore -->
		<p>
			Marty42 was designed to be simple to ensure that students at 42 school can effortlessly stay connected and celebrate each other's achievements without the hassle of complex setups
		</p>
	<!-- Preview -->
	</div>
	<div class="col-span-2">
		<DocsPreview label={"Why use Marty?"} regionPreview="min-h-[320px]">
			<svelte:fragment slot="preview">
				<Accordion autocollapse class="card p-4 text-token">
					<AccordionItem>
						<svelte:fragment slot="summary"><p class="font-bold">Automatic Notifications</p></svelte:fragment>
						<svelte:fragment slot="content">
							Receive instant notifications on your Discord server whenever one of your friends completes a project. Never miss an opportunity to congratulate your peers.
						</svelte:fragment>
					</AccordionItem>
					<AccordionItem>
						<svelte:fragment slot="summary"><p class="font-bold">Customizable Messages</p></svelte:fragment>
						<svelte:fragment slot="content">
							<div class="flex flex-col justify-between items-center space-y-5">
								<div class="text-left">
									<p>
										Create personalized messages for each success. Add congratulations, emojis, and inspiring messages to make each notification special.
									</p>
								</div>
								<img
									src="exemple.png"
									alt="exemple of a message"
									class="w-[20vw] min-w-[350px]"
								/>
							</div>
						</svelte:fragment>
					</AccordionItem>
					<AccordionItem>
						<svelte:fragment slot="summary"><p class="font-bold">Multi-Server Support</p></svelte:fragment>
						<svelte:fragment slot="content">
							Manage notifications across multiple Discord servers. Whether you're part of different friend groups or projects, Marty adapts to your needs.
						</svelte:fragment>
					</AccordionItem>
					<AccordionItem>
						<svelte:fragment slot="summary"><p class="font-bold">Intuitive Interface</p></svelte:fragment>
						<svelte:fragment slot="content">
							A clear and user-friendly dashboard for quick and effortless setup. Focus on what matters and let us handle the technical details.
						</svelte:fragment>
					</AccordionItem>
				</Accordion>
			</svelte:fragment>
		</DocsPreview>
	</div>
</div>
