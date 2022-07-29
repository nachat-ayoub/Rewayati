<script>
	export let title;
	export let classes = '';
</script>

<h2 class={'text-dark text-2xl font-bold mb-2 ' + classes}>
	<span class="relative">
		<span
			class="absolute right-0 bottom-0.5 bg-gradient-to-l from-green-800 to-green-500 w-full h-3/5"
		>
			<span
				class="w-0 h-0 border-t-8 border-b-8 border-t-transparent border-b-transparent border-r-[10px] border-r-green-500 absolute right-full top-1/2 -translate-y-1/2"
			/>
		</span>
		<span class="px-2 absolute right-0 whitespace-nowrap">
			{title}
		</span>
		<span class="px-2 opacity-0">{title}</span>
	</span>
</h2>
