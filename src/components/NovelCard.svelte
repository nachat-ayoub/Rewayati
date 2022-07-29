<script>
	export let novel;
	export let small;
</script>

<a href={`/novels/${novel.novel_slug}`}>
	<div class="group w-full flex justify-center items-center flex-col">
		<div
			class={`w-full ${
				small ? 'h-36' : 'h-72'
			} max-w-[200px] rounded shadow-lg border overflow-hidden`}
		>
			<img
				loading="lazy"
				class="object-cover w-full h-full border-gray-300 hover:scale-[1.2] hover:rotate-3 transition-all duration-300 ease-out "
				src={novel.image}
				alt={novel.title}
			/>
		</div>
		<h4
			dir="ltr"
			class="capitalize text-dark font-bold text-sm text-center px-2 mt-2 overflow-hidden text-ellipsis w-full whitespace-nowrap group-hover:text-darkGreen"
		>
			{novel.title}
		</h4>
	</div>
</a>
