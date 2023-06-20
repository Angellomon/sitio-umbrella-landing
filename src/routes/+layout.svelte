<script lang="ts">
	import '../app.css';
	import InteractiveCursor from '../lib/components/interactive-cursor/interactive-cursor.svelte';
	import { coords, size } from '$lib/store';

	const handleMouseDown = () => {
		$size = 20;
	};

	const handleMouseUp = () => {
		$size = 10;
	};

	const handleMouseMove = (e: MouseEvent) => {
		$coords = { x: e.clientX, y: e.clientY };
	};
</script>

<main on:mousemove={handleMouseMove} on:mousedown={handleMouseDown} on:mouseup={handleMouseUp}>
	<InteractiveCursor />
	<slot />
</main>

<style>
	main {
		position: relative;
	}
</style>
