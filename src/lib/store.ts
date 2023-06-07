import { spring } from 'svelte/motion';
import { derived } from 'svelte/store';

const offsets = {
	x: -5,
	y: 10
};

export const coords = spring({
	x: 0,
	y: 0
});

export const cursorPosition = derived(coords, (c) => ({
	x: c.x - offsets.x,
	y: c.y - offsets.y
}));

export const size = spring(10);
