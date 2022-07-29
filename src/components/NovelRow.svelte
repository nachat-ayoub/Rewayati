<script>
	import NovelCard from './NovelCard.svelte';
	import Title from './Title.svelte';

	export let title;
	export let novels;
	export let small;
</script>

<div class="my-3">
	<Title {title} classes="text-lg" />
	{#if small}
		<div
			class="px-2 py-5 gap-2 sm:gap-4 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-8"
		>
			{#each novels as novel}
				<NovelCard small {novel} />
			{:else}
				<h4 class="text-lg font-bold text-dark">No Novels Exist Yet!</h4>
			{/each}
		</div>
	{:else}
		<div
			class="px-2 py-5 gap-2 sm:gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
		>
			{#each novels as novel}
				<NovelCard {novel} />
			{:else}
				<h4 class="text-lg font-bold text-dark">No Novels Exist Yet!</h4>
			{/each}
		</div>
	{/if}
</div>
