<script lang="ts">
	const cBase = 'shadow-2xl shadow-surface-500/10 dark:shadow-black/10 rounded-container-token overflow-hidden';
	const cHeader = 'bg-surface-200-700-token p-4 flex justify-between items-center gap-4';
	const cViewport = 'p-4 md:p-10 space-y-4';
	const cContent = 'flex justify-center items-center mx-auto transition-[width] duration-200';

	export let label;

	$: resizableWidth = 'w-full';
	$: classesBase = `${cBase} ${$$props.class ?? ''}`;
	$: classesHeader = `${cHeader}`;
	$: classesViewport = `${cViewport} bg-gradient-to-br variant-gradient-primary-secondary`;
	$: classesPreview = `${cContent} ${resizableWidth}`;
</script>

<div class="previewer {classesBase}">
	<header class="previewer-header {classesHeader}">
			<span class="text-2xl font-bold capitalize">{label}</span>
	</header>
		<div class="previewer-viewport {classesViewport}">
			<div class="previewer-preview {classesPreview}"><slot name="preview">(preview)</slot></div>
		</div>
</div>
