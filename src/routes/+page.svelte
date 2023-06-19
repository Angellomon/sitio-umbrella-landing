<script lang="ts">
	import { browser } from '$app/environment';
	import { MainInteractiveLogo } from '$lib/components/main-interactive-logo';
	import { MainMessage } from '$lib/components/main-message';
	import { MainTitle } from '$lib/components/title';

	if (browser) console.log(window.location.search);
</script>

<main>
	<div class="text-side">
		<MainTitle />
		<MainMessage />
	</div>
	<div class="logo-side">
		<MainInteractiveLogo />
	</div>
</main>

<style>
	main {
		position: relative;

		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;

		margin: 3ch 30ch;
	}

	div.text-side {
	}

	div.logo-side {
	}

	@media screen and (max-width: 1024px) {
		main {
			flex-direction: column-reverse;
		}
	}
</style>
