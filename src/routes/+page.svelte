<script lang="ts">
	import { browser } from '$app/environment';
	import { MainInteractiveLogo } from '$lib/components/main-interactive-logo';
	import { MainMessage } from '$lib/components/main-message';
	import { MainTitle } from '$lib/components/title';

	if (browser) console.log(window.location.search);
</script>

<main>
	<div class="wrapper">
		<div class="text-side">
			<MainTitle />
			<MainMessage />
		</div>
		<div class="logo-side">
			<MainInteractiveLogo />
		</div>
	</div>
</main>

<style>
	main {
		position: relative;

		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: flex-start;

		padding: 3rem 5rem;

		min-height: 100vh;
	}

	div.wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 5ch;
	}

	div.text-side {
	}

	div.logo-side {
		display: flex;
		flex-direction: columns;
		justify-content: center;
		align-items: center;
		align-self: center;
	}

	@media screen and (max-width: 1024px) {
		main,
		div.wrapper {
			flex-direction: column-reverse;
		}
	}

	@media screen and (max-width: 1200px) {
		main,
		div.wrapper {
			gap: 2ch;
		}
	}

	@media screen and (min-width: 1440px) {
		div.text-side {
			max-width: 50%;
		}
	}
</style>
