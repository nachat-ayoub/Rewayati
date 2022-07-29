<script>
	import { goto } from '$app/navigation';

	import SearchContainer from './SearchContainer.svelte';

	import SideNav from './SideNav.svelte';

	// Toggle Side Nav :
	let sideNavHidden = true;
	function ToggleSideNav() {
		sideNavHidden = !sideNavHidden;
	}

	let search_keyword = '';
	let searched_data = { isDone: false, results: [] };

	async function searchForNovels() {
		search_keyword.trim();
		if (search_keyword === '') return;
		const res = await fetch(
			`http://localhost:5000/api/novels/search/?s=${search_keyword.split(' ').join('+')}`
		);
		searched_data = res.json();
		searched_data.isDone = true;
	}

	// $: searchForNovels(search_keyword);
</script>

<nav
	class="bg-darkBlue bg-gradient-to-l from-darkBlue to-green-900 text-white px-3 py-2 mb-2 w-full flex justify-between items-center relative"
>
	<!-- start: SideNav -->
	<SideNav {sideNavHidden} {ToggleSideNav} />
	<!-- end: SideNav -->

	<div class="w-1/5 flex justify-start">
		<span on:click={ToggleSideNav} id="bars" class="mx-2.5 cursor-pointer">
			<i class="fa-solid fa-bars" />
		</span>
		<span id="appMode" class="mx-2.5 cursor-pointer">
			<i class="fa-solid fa-sun" />
		</span>
	</div>

	<form
		on:submit|preventDefault={() => {
			search_keyword.trim();
			if (search_keyword) goto('/novels/search/?s=' + search_keyword.split(' ').join('+'));
		}}
		class="w-3/5 relative"
	>
		<input
			class="w-full text-dark placeholder:text-gray-700 font-bold text-sm px-2 py-2 pr-8 rounded"
			type="text"
			placeholder="البحث"
			bind:value={search_keyword}
			on:blur={() => (searched_data.isDone = false)}
		/>
		<span
			class={`cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 ${
				search_keyword != '' ? 'text-dark' : 'text-gray-700'
			}`}
		>
			<i class="fa-solid fa-search" />
		</span>
		<!-- {#if search_keyword.trim() != '' && searched_data.isDone} -->
		<!-- start: SearchContainer -->
		<!-- <SearchContainer data={searched_data?.results} /> -->
		<!-- end: SearchContainer -->
		<!-- {/if} -->
	</form>

	<!-- Logo -->
	<span class="w-1/5 cursor-pointer flex items-center justify-end">
		<a href="/">
			<span class="font-semibold capitalize hidden sm:inline"> Rewayati </span>
			<span class="mr-2"> <i class="fa-solid fa-book-bookmark" /></span>
		</a>
	</span>
</nav>
