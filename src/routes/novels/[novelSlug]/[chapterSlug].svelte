<script context="module">
	export async function load({ params, fetch }) {
		const url = `${process.env.BASE_API_URL}/novels/${params?.novelSlug}/${params?.chapterSlug}`;
		const res = await fetch(url);
		const data = await res.json();
		data.chapters = [];

		return {
			props: {
				data
			}
		};
	}
</script>

<script>
	import { onMount } from 'svelte';

	export let data;
	let chapterLoading = false;

	function fetchAllChapters() {
		fetch(`${process.env.BASE_API_URL}/novels/${data?.novel_slug}/chapters`)
			.then((res) => res.json())
			.then((json) => (data.chapters = json?.chapters || []));
	}

	onMount(() => fetchAllChapters());

	async function getChapterContent(ch_slug) {
		if (!ch_slug || ch_slug === '#') return;
		const url = `${process.env.BASE_API_URL}/novels/${data?.novel_slug}/${ch_slug}`;

		chapterLoading = true;
		const res = await fetch(url);
		const ch_data = await res.json();
		ch_data.chapters = data.chapters || [];
		data = ch_data;

		chapterLoading = false;

		let updatedUrl = window.location.href
			.split('/')
			.filter((el) => el)
			.splice(2, 2);

		updatedUrl.push(ch_slug);
		updatedUrl = '/' + updatedUrl.join('/');

		window.history.replaceState({}, '', updatedUrl);
		fetchAllChapters();
	}

	const onChapterChange = async (e) => {
		try {
			const ch_slug = e.target.value || null;
			await getChapterContent(ch_slug);
		} catch (error) {
			console.log(error);
		}
	};

	import LoadingPopup from '../../../components/LoadingPopup.svelte';
	//
	//
	//
	import FontSize from '../../../stores/FontSize';

	let readFontSize = 16;

	$: readFontSize = $FontSize + 'px';

	let minFontSize = 14;
	let maxFontSize = 30;
</script>

<div class="w-full h-full md:p-5">
	<div class="w-full h-full flex justify-between items-center flex-col">
		<h1 dir="ltr" class="text-center text-2xl font-bold">
			{data?.title} - {data?.chapter?.title}
		</h1>
		<div class="my-4 text-center text-xs font-semibold">
			<a class="hover:text-green-800" href={`/`}> الرئيسية </a>
			/
			<a class="hover:text-green-800" href={`/novels/${data?.novel_slug}`}>
				{data?.title}
			</a>
			/
			<a class="hover:text-green-800" href={`/novels/${data?.novel_slug}/${data?.chapter_slug}/#`}>
				{data?.chapter?.title}
			</a>
		</div>

		<div class="w-full flex justify-between items-center my-3">
			<select
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-1.5 px-2.5"
				on:change={onChapterChange}
			>
				<option> الفصول </option>
				{#each data?.chapters as ch}
					{#if decodeURI(ch?.slug) == data?.chapter_slug}
						<option selected value={ch?.slug}>
							{ch?.text}
						</option>
					{:else}
						<option value={ch?.slug}>{ch?.text}</option>
					{/if}
				{/each}
			</select>
		</div>

		<div class="w-full flex justify-between items-center">
			<a
				sveltekit:prefetch
				href={`/novels/${data?.novel_slug}/${
					data?.next?.disabled ? data?.chapter_slug + '#' : data?.next?.slug
				}`}
				on:click={async () => await getChapterContent(data?.next?.slug)}
				class={`text-xl cursor-pointer transition-all duration-150 ease-out bg-darkBlue hover:bg-darkGreen text-white w-10 h-10 rounded-sm flex justify-center items-center ${
					data?.next?.disabled && ' bg-opacity-80 hover:bg-darkBlue hover:bg-opacity-80'
				}`}
			>
				<i class="fa-solid fa-chevron-right" />
			</a>
			<div class="flex justify-center items-center">
				<span
					class="cursor-pointer mx-4 bg-darkBlue rounded-full w-9 h-9 flex justify-center items-center text-white"
					on:click={() => {
						if (parseInt($FontSize) < maxFontSize) {
							FontSize.update(() => parseInt($FontSize) + 1);
						}
					}}
				>
					<i class="fa-solid fa-plus" />
				</span>
				<span class="text-dark font-bold"> حجم الخط </span>
				<span
					class="cursor-pointer mx-4 bg-darkBlue rounded-full w-9 h-9 flex justify-center items-center text-white"
					on:click={() => {
						if (parseInt($FontSize) > minFontSize) {
							FontSize.update(() => parseInt($FontSize) - 1);
						}
					}}
				>
					<i class="fa-solid fa-minus" />
				</span>
			</div>
			<a
				sveltekit:prefetch
				href={`/novels/${data?.novel_slug}/${
					data?.prev?.disabled ? data?.chapter_slug + '#' : data?.prev?.slug
				}`}
				on:click={async () => await getChapterContent(data?.prev?.slug)}
				class={`text-xl cursor-pointer transition-all duration-150 ease-out bg-darkBlue hover:bg-darkGreen text-white w-10 h-10 rounded-sm flex justify-center items-center ${
					data?.prev?.disabled && ' bg-opacity-80 hover:bg-darkBlue hover:bg-opacity-80'
				}`}
			>
				<i class="fa-solid fa-chevron-left" />
			</a>
		</div>
		<!--  -->
		{#if chapterLoading}
			<LoadingPopup />
		{/if}

		<!-- Start: Chapter Content -->
		<div class="pb-4 md:px-16 font-bold text-justify text-dark" style:font-size={readFontSize}>
			{#each data?.chapter?.content as text}
				<p class="py-4 whitespace-pre-line">{text}</p>
			{:else}
				<p class="py-4">No Content Found</p>
			{/each}
		</div>
		<!-- End: Chapter Content -->

		{#if chapterLoading}
			<LoadingPopup />
		{/if}

		<!-- Start: Navigation -->
		<div class="w-full flex justify-between items-center">
			<a
				sveltekit:prefetch
				href={`/novels/${data?.novel_slug}/${
					data?.next?.disabled ? data?.chapter_slug + '#' : data?.next?.slug
				}`}
				on:click={async () => await getChapterContent(data?.next?.slug)}
				class={`text-xl cursor-pointer transition-all duration-150 ease-out bg-darkBlue hover:bg-darkGreen text-white w-10 h-10 rounded-sm flex justify-center items-center ${
					data?.next?.disabled && ' bg-opacity-80 hover:bg-darkBlue hover:bg-opacity-80'
				}`}
			>
				<i class="fa-solid fa-chevron-right" />
			</a>

			<!-- Start: Back button -->
			<div dir="ltr" class="w-1/2 max-w-fit text-center flex justify-center items-center flex-col">
				<a
					sveltekit:prefetch
					href={`/novels/${data?.novel_slug}/`}
					class="w-full text-lg font-bold text-white px-4 py-2 rounded-sm bg-darkBlue overflow-hidden text-ellipsis whitespace-nowrap hover:bg-darkGreen"
				>
					{data?.title}
				</a>
			</div>
			<!-- End: Back button -->

			<a
				sveltekit:prefetch
				href={`/novels/${data?.novel_slug}/${
					data?.prev?.disabled ? data?.chapter_slug + '#' : data?.prev?.slug
				}`}
				on:click={async () => await getChapterContent(data?.prev?.slug)}
				class={`text-xl cursor-pointer transition-all duration-150 ease-out bg-darkBlue hover:bg-darkGreen text-white w-10 h-10 rounded-sm flex justify-center items-center ${
					data?.prev?.disabled && ' bg-opacity-80 hover:bg-darkBlue hover:bg-opacity-80'
				}`}
			>
				<i class="fa-solid fa-chevron-left" />
			</a>
		</div>
		<!-- End: Navigation -->
		<div class="text-sm font-bold mt-2">العودة إلى الرواية</div>

		<!--  -->
	</div>
</div>
