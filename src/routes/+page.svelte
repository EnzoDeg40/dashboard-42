<script lang="ts">
	import HomeHero from "$lib/components/HomeHero.svelte";
	import HomeLearnMore from "$lib/components/HomeLearnMore.svelte";
	import HomeUsage from "$lib/components/HomeUsage.svelte";
	import HomeNotice from "$lib/components/HomeNotice.svelte";
	import HomeFooter from "$lib/components/HomeFooter.svelte";
	import DocsFooter from "$lib/components/Footer.svelte";
</script>

<header id="hero" class="bg-surface-100-800-token hero-gradient">
	<div class="section-container"><HomeHero /></div>
</header>

<section id="playground" class="bg-surface-100-800-token">
	<div class="section-container"><HomeLearnMore /></div>
</section>

<section id="usage" class="bg-surface-100-800-token usage-gradient">
	<div class="section-container"><HomeUsage /></div>
</section>

<section id="notice" class="bg-surface-100-800-token notice-gradient">
	<div class="section-container"><HomeNotice /></div>
</section>

<section id="last" class="bg-surface-100-800-token last-gradient">
	<div class="section-container"><HomeFooter /></div>
</section>

<footer id="footer" class="bg-surface-100-800-toke">
	<DocsFooter />
</footer>

<style type="postcss">

	.section-container {
		@apply w-full max-w-7xl mx-auto p-4 py-16 md:py-24;
	}

	.hero-gradient {
		background-image:
			radial-gradient(at 0% 0%, rgba(var(--color-secondary-500) / 0.33) 0px, transparent 50%),
			radial-gradient(at 98% 1%, rgba(var(--color-error-500) / 0.33) 0px, transparent 50%);
	}

	.usage-gradient {
		background-image:
			radial-gradient(at 0% 100%, rgba(var(--color-secondary-500) / 0.50) 0px, transparent 50%);
	}

	.notice-gradient {
		background-image:
			radial-gradient(at 0% 0%, rgba(var(--color-secondary-500) / 0.50) 0px, transparent 50%),
			radial-gradient(at 100% 100%,  rgba(var(--color-primary-500) / 0.24) 0px, transparent 50%);
	}

	.last-gradient {
		background-image:
			radial-gradient(at 100% 0%,  rgba(var(--color-primary-500) / 0.24) 0px, transparent 50%),
			radial-gradient(at 30% 100%,  rgba(var(--color-error-500) / 0.1) 0px, transparent 50%);
	}
</style>
