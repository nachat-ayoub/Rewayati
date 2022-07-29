<script>
	import { fly, fade } from 'svelte/transition';

	export let sideNavHidden;
	export let ToggleSideNav;
</script>

{#if !sideNavHidden}
	<div class="min-w-[100vw] min-h-[100vh] w-full h-full fixed top-0 right-0 z-50 flex">
		<div
			in:fly={{ x: 300, duration: 300 }}
			out:fly={{ x: 300, duration: 300 }}
			class:hidden={sideNavHidden}
			class="bg-white h-full w-3/5 max-w-xs flex justify-start items-center flex-col text-dark shadow-lg border-gray-200 border-l"
		>
			<div class="w-full p-3">
				<button
					class="bg-gradient-to-l from-darkBlue to-green-900 rounded font-bold text-gray-200 w-full p-4 hover:bg-gradient-to-r transition-all ease-out duration-300"
				>
					تسجيل الدخول
				</button>
			</div>
			<hr class="w-full mb-1 mx-auto border-gray-300 border" />
			<div class="w-full p-3">
				<ul class="w-full">
					<li class="hover:text-green-800 my-3 text-lg font-bold">
						<a href="/">
							<span class="ml-2">
								<i class="fa-solid fa-home" />
							</span>
							الرئيسية
						</a>
					</li>
					<li class="hover:text-green-800 my-3 text-lg font-bold">
						<a href="/">
							<span class="ml-2">
								<i class="fa-solid fa-book" />
							</span>
							المكتبة
						</a>
					</li>
					<li class="hover:text-green-800 my-3 text-lg font-bold">
						<a href="/">
							<span class="ml-2">
								<i class="fa-solid fa-shield-halved" />
							</span>
							سياسة الخصوصية
						</a>
					</li>
				</ul>
			</div>
		</div>

		<div
			class:hidden={sideNavHidden}
			in:fade={{ duration: 100, delay: 200 }}
			out:fade={{ duration: 10 }}
			on:click={ToggleSideNav}
			class="flex-1 h-full cursor-pointer bg-dark bg-opacity-60"
		/>
	</div>
{/if}
