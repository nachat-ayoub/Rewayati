<script context="module">
	export async function load({ fetch }) {
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
	import NovelRow from '../components/NovelRow.svelte';

	export let data;
</script>

<svelte:head>
	<title>Rewayati - طغاة المانها وصلوا لعالم الروايات</title>
</svelte:head>
<div class="">
	<NovelRow title="آخر التحديثات" novels={data?.last_updates} />
	<NovelRow small title="الأكثر قراءة" novels={data?.popular_novels} />
</div>
