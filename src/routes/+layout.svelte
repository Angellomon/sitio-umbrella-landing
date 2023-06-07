<script lang="ts">
	import '../app.css';
	import InteractiveCursor from '../lib/components/interactive-cursor/interactive-cursor.svelte';
	import { size, coords } from '$lib/store';

	const handleMouseMove = (e: MouseEvent) => {
		$coords = { x: e.clientX, y: e.clientY };
	};

	const handleMouseDown = () => {
		$size = 20;
	};

	const handleMouseUp = () => {
		$size = 10;
	};
</script>

<main on:mousemove={handleMouseMove} on:mousedown={handleMouseDown} on:mouseup={handleMouseUp}>
	<InteractiveCursor />
	<header>
		<nav>
			<ul on:mousemove={handleMouseMove}>
				<li><a href="#servicios">Servicios</a></li>
				<li><a href="#innovacion">Innovación</a></li>
				<li><a href="#marcas">Marcas</a></li>
				<li><a href="#equipo">Equipo</a></li>
				<li />
			</ul>
		</nav>
	</header>

	<slot />
</main>

<style>
	main {
		--color-1: #ff6b3d;
		--color-2: #e53645;
		--color-3: #ffbe57;
		--background-color: black;

		background-color: var(--background-color);

		position: relative;
	}

	ul {
		list-style-type: none;
	}

	ul a {
		text-decoration: none;
		background: transparent;
	}
</style>
