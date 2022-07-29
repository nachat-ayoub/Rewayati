<script context="module">
	export async function load({ fetch }) {
		const url = `${process.env.BASE_API_URL}/novels`;
		const res = await fetch(url);
		const data = await res.json();

		if (res.ok) {
			return {
				props: {
					data
				}
			};
		}
		return {
			props: {
				data: []
			}
		};
	}
</script>

<script>
	// import { BASE_API_URL } from '../config';

	import NovelRow from '../components/NovelRow.svelte';

	export let data;
</script>

<div class="">
	<NovelRow title="اخر التحديثات" novels={data?.last_updates} />
	<NovelRow small title="الأكثر قراءة" novels={data?.popular_novels} />
</div>
