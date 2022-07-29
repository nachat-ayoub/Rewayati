<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export const load = async ({ url: Url, fetch }) => {
		const query = Url.searchParams.get('s');
		if (query) {
			const url = `${process.env.BASE_API_URL}/novels/search/?s=${query}`;
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

	export let data;
</script>

<div class="">
	<!--  -->
	<div class="mt-4">
		{#if !data?.error}
			<NovelRow title={`نتائج لـ ”${data?.query}”`} novels={data?.results} />
		{:else}
			<h2 class="">{data?.error}</h2>
		{/if}
	</div>
</div>
