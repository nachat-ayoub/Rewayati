<script>
	import '../app.css';

	import Nav from '../components/Nav.svelte';
</script>

<div dir="rtl" class="font-cairo">
	<Nav />
	<main class="p-2 md:p-8">
		<slot />
	</main>
</div>
