<script context="module">
	export async function load({ params, fetch }) {
		const url = `${import.meta.env.VITE_BASE_API_URL}/novels/${params?.novelSlug}`;
		const res = await fetch(url);
		const novel = await res.json();

		novel.chapters = [];

		return {
			props: {
				novel
			}
		};
	}
</script>

<script>
	import Title from '../../../components/Title.svelte';

	export let novel;

	fetch(`${import.meta.env.VITE_BASE_API_URL}/novels/${novel?.novel_slug}/chapters`)
		.then((res) => res.json())
		.then((data) => {
			novel.chapters = data?.chapters || [];
			novel.last_chapter = data?.chapters.at(0);
			novel.first_chapter = data?.chapters.at(-1);
		});
</script>

<svelte:head>
	<title>Rewayati - {novel?.title} رواية</title>
</svelte:head>

<div class="w-full h-full p-3 md:p-5">
	<div class="w-full h-full flex justify-between items-center flex-col md:items-start md:flex-row">
		<div class="w-60 h-80 ml-3">
			<img
				class="w-full h-full object-cover rounded border border-gray-300 shadow-md"
				loading="lazy"
				src={novel?.image}
				alt={novel?.title}
			/>
		</div>
		<div class="w-full">
			<h1 class="text-center md:text-right text-2xl font-bold my-3">{novel?.title}</h1>
			<div class="">
				<span class="text-sm font-bold ml-2"> المرتبة: </span>
				<span class="text-sm"> {novel?.rank} </span>
			</div>
			<div class="">
				<span class="text-sm font-bold ml-2"> اسم بديل: </span>
				<span class="text-sm"> {novel?.alternative} </span>
			</div>
			<div class="">
				<span class="text-sm font-bold ml-2"> المؤلف: </span>
				<span class="text-sm">
					{#each novel?.authors as author}
						<span class="">
							{author.text}
						</span>
					{/each}
				</span>
			</div>
			<div class="">
				<span class="text-sm font-bold ml-2"> التصنيف: </span>
				<span class="text-sm">
					{#each novel?.genres as genre}
						<a href={`/novels/genres/${genre?.slug}`}>
							<span class="text-sm hover:text-darkGreen font-semibold">
								{genre?.text}،
							</span>
						</a>
					{/each}
				</span>
			</div>

			<div class="my-4">
				<Title classes="text-base" title="القصة :" />
				<p class="mt-4 font-bold text-justify">
					{novel?.story}
				</p>
			</div>
		</div>
	</div>
	<!-- Last And First Chapter -->
	<div class="mt-5 w-full flex items-center justify-between">
		<a
			class="text-white bg-gradient-to-l from-darkBlue to-green-900 rounded font-bold px-4 py-1.5"
			href={novel?.first_chapter
				? `/novels/${novel?.novel_slug}/${novel?.first_chapter.slug}`
				: '#أول فصل'}
		>
			أول فصل
		</a>
		<a
			class="text-white bg-gradient-to-l from-darkBlue to-green-900 rounded font-bold px-4 py-1.5"
			href={novel?.last_chapter
				? `/novels/${novel?.novel_slug}/${novel?.last_chapter.slug}`
				: '#آخر فصل'}
		>
			آخر فصل
		</a>
	</div>
	<!-- Last And First Chapter -->

	<div class="my-5">
		<div class="flex justify-between">
			<Title classes="text-xl" title="اخر الفصول" />
			<div
				on:click={() => (novel.chapters = novel?.chapters.reverse())}
				class="p-2 text-lg hover:text-darkGreen cursor-pointer rotate-90"
			>
				<i class="fa-solid fa-right-left" />
			</div>
		</div>

		<div class="w-full h-60 overflow-y-auto">
			<ul class="w-full mt-4">
				{#each novel?.chapters as ch}
					<a href={`/novels/${novel?.novel_slug}/${ch?.slug}`}>
						<li
							class="w-full text-dark text-md font-bold px-2 py-4 border-b-2 border-b-gray-300 transition-all duration-150 ease-out hover:bg-gray-100 hover:text-green-800 hover:border-green-600"
						>
							{ch?.text}
						</li>
					</a>
				{:else}
					<div dir="ltr" class="w-full flex flex-col justify-center items-center">
						<h3 class="text-xl font-bold text-center mb-2">Loading...</h3>
						<div class="text-4xl animate-spin">
							<i class="fa-solid fa-spinner" />
						</div>
					</div>
				{/each}
			</ul>
		</div>
	</div>
</div>
