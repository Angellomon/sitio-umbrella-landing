<script lang="ts">
	import { cursorPosition, size } from '$lib/store';
</script>

<svg>
	<circle cx={$cursorPosition.x} cy={$cursorPosition.y} r={$size} />
</svg>

<style>
	svg {
		width: 100%;
		height: 100%;
		margin: -8px;
		position: absolute;
		z-index: -100;
	}

	circle {
		position: absolute;
		fill: var(--color-1);
	}
</style>
