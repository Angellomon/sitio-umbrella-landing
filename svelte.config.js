import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({}),
		embedded: true,
		prerender: {
			handleMissingId: 'ignore'
		}
	}
};

if (process.env.NODE_ENV === 'production') {
	const hostname = JSON.parse(process.env.HOSTNAME);
	const basePath = JSON.parse(process.env.BASE_PATH);
	const assetsPath = JSON.parse(process.env.ASSETS_PATH);

	config.kit.paths = {
		base: basePath,
		assets: hostname + assetsPath,
		relative: true
	};
}

export default config;
