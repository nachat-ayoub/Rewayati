<script>
	export let title;
	export let classes = '';
</script>

<h2 class={'text-white font-bold mb-2 ' + classes ?? 'text-xl'}>
	<span class="flex justify-start items-center">
		<span
			class=" bg-gradient-to-l from-darkBlue to-green-800 py-1 px-4 rounded-sm whitespace-nowrap tracking-wide capitalize"
		>
			{title}
		</span>
		<div
			class="w-0 h-0 border-t-8 border-b-8 border-t-transparent border-b-transparent border-r-[10px] border-r-green-800"
		/>
	</span>
</h2>
