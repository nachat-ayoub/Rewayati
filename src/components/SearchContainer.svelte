<script>
	export let data;
</script>

<ul
	class="w-full absolute top-full mt-0.5 shadow border-gray-300 border right-0 bg-white px-2 py-1 rounded-b-sm overflow-y-auto h-fit max-h-40 divide-y divide-y-reverse"
>
	{#each data as novel}
		<a href={`/novels/${novel?.novel_slug}`}>
			<li class="p-2 text-sm text-ellipsis overflow-hidden whitespace-nowrap">
				{novel?.title}
			</li>
		</a>
	{:else}
		<p class=" text-center">No Novel Found</p>
	{/each}
</ul>
