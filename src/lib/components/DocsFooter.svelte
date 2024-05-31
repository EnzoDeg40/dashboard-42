<script lang="ts">
	import Icon from '@iconify/svelte';
import { Avatar } from '@skeletonlabs/skeleton';

	// Base Classes
	const cBase = 'bg-surface-50 dark:bg-surface-900 border-t border-surface-500/10 text-xs md:text-base';
	const cRowOne = 'flex flex-col md:flex-row justify-between items-center md:items-start space-y-5 md:space-y-0';
	const cRowTwo = 'flex flex-col md:flex-row justify-between items-center md:items-start space-y-4 md:space-y-0';

	// Social Icons
	const socialLinks = [
		{ title: 'GitHub', href: 'https://github.com/cdurdetrouver', icon: 'fa:github' },
		{ title: 'Discord', href: 'https://discord.com/invite/jmtk2qqHq2', icon: 'ic:baseline-discord' }
	];
</script>

<div class="page-footer {cBase}">
	<div class="w-full max-w-7xl mx-auto p-4 py-16 md:py-24 space-y-10">
		<!-- Row 1 -->
		<section class={cRowOne}>
			<div class="grid grid-cols-1 gap-2 place-content-center place-items-center md:place-items-start">
				<Avatar
					src="Final-02.jpg"
					width="w-16"
				/>
				<p class="!text-sm opacity-80">Dashboard for Marty</p>
				<!-- Current Version -->
				<span class="badge variant-soft">1.0</span>
			</div>
			<div class="hidden md:grid grid-cols-3 gap-8">
				<div class="space-y-6">
					<h6 class="h6">Explore</h6>
					<ul class="space-y-3">
						<li><a class="anchor" href="/#usage">Introduction</a></li>
						<li><a class="anchor" href="/#notice">Get Started</a></li>
					</ul>
				</div>
				<div class="space-y-6">
					<h6 class="h6">Features</h6>
					<ul class="space-y-3">
						<li><a class="anchor" href="https://www.skeleton.dev/">Skeleton</a></li>
						<li><a class="anchor" href="https://tailwindcss.com/">Tailwind</a></li>
						<li><a class="anchor" href="https://svelte.dev/">Svelte</a></li>
					</ul>
				</div>
				<div class="space-y-6">
					<h6 class="h6">Repository</h6>
					<ul class="space-y-3">
						<li>
							<a class="anchor" href="https://github.com/cdurdetrouver/dashboard-42" target="_blank" rel="noreferrer">Github Dahsboard</a>
						</li>
						<li>
							<a class="anchor" href="https://github.com/cdurdetrouver/bot-42" target="_blank" rel="noreferrer">Github Bot</a>
						</li>
					</ul>
				</div>
			</div>
		</section>

		<hr class="opacity-20" />

		<!-- Row 2 -->
		<section class={cRowTwo}>
			<p>
				<a class="anchor" href="https://github.com/cdurdetrouver/dashboard-42/LICENSE" target="_blank" rel="noreferrer">
					License
				</a>
				<span class="opacity-10 mx-2">|</span>
				<a class="anchor" href="https://github.com/cdurdetrouver" target="_blank" rel="noreferrer">Creator</a>
			</p>
			<div class="flex gap-6">
				{#each socialLinks as sl}
					<a class="opacity-75 hover:opacity-100" href={sl.href} target="_blank" rel="noreferrer" title={sl.title}>
						<Icon icon={sl.icon} class="text-xl" />
					</a>
				{/each}
			</div>
		</section>
	</div>
</div>
