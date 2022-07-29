<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export const load = async ({ url: Url, fetch }) => {
		const query = Url.searchParams.get('s');
		if (query) {
			const url = `${import.meta.env.VITE_BASE_API_URL}/novels/search/?s=${query}`;
			const res = await fetch(url);
			const data = await res.json();

			if (res.ok) {
				return {
					props: {
						data: { query: data?.query, results: data?.results, error: null }
					}
				};
			}
		}

		return {
			props: {
				data: { query: query?.split('+').join(' '), results: [], error: 'Novel Not Found' }
			}
		};
	};
</script>

<script>
	import NovelRow from '../../components/NovelRow.svelte';
	import Title from '../../components/Title.svelte';

	export let data;
</script>

<svelte:head>
	<title>Rewayati - ”{data?.query}” نتائج لـ</title>
</svelte:head>

<div class="">
	<!--  -->
	<div class="mt-4">
		{#if data?.results.length > 0}
			<NovelRow title={`نتائج لـ ”${data?.query}”`} novels={data?.results} />
		{:else}
			<div class="w-full">
				<Title title={`نتائج لـ ”${data?.query}”`} />
				<div class="w-full flex justify-center items-center py-5 px-4">
					<img class="w-full md:w-1/3 object-contain" src="/404_Novel.png" alt="404 Novel" />
				</div>
			</div>
		{/if}
	</div>
</div>
