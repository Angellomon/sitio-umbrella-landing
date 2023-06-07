import fs from 'fs';

const indexInfo = {
	pluginName: JSON.parse(process.env.PLUGIN_NAME),
	pluginUri: JSON.parse(process.env.PLUGIN_URI),
	pluginDescription: JSON.parse(process.env.PLUGIN_DESCRIPTION),
	pluginVersion: JSON.parse(process.env.PLUGIN_VERSION),
	pluginTextDomain: JSON.parse(process.env.PLUGIN_TEXT_DOMAIN),
	pluginAuthor: JSON.parse(process.env.PLUGIN_AUTHOR),
	pluginAuthorUri: JSON.parse(process.env.PLUGIN_AUTHOR_URI)
};

const REGISTER_STYLE_HEAD = `wp_register_style(`;
const REGISTER_STYLE_TAIL = `__FILE__), array(), "1.0", "all");`;

const REGISTER_SCRIPT_HEAD = `wp_register_script(`;
const REGISTER_SCRIPT_TAIL = `__FILE__), array(), "1.0", false);`;

const pluginPrefix = JSON.parse(process.env.PLUGIN_PREFIX);
const pluginShortcode = JSON.parse(process.env.PLUGIN_SHORTCODE);

export function filterFilesByExtension(dir = './', extensions = ['js', 'css']) {
	let results = [];
	let list = fs.readdirSync(dir);

	list.forEach(function (file) {
		file = dir + '/' + file;
		let stat = fs.statSync(file);

		if (stat && stat.isDirectory()) {
			/* Recurse into a subdirectory */
			results = results.concat(filterFilesByExtension(file));
		} else {
			let fileParts = file.split('.');
			let fileExtension = fileParts[fileParts.length - 1];

			if (extensions.includes(fileExtension)) results.push(file);
		}
	});

	return results;
}

function extractIdsFromFiles(files = []) {
	return files.map((file) => {
		let fileParts = file.split('/');
		let fileId = fileParts[fileParts.length - 1];

		return fileId;
	});
}

function buildResourcesFunction(registerCommands = []) {
	const prefix = pluginPrefix ? `${pluginPrefix}_resources_init` : '_function';

	const head = `function ${prefix}() {`;
	const tail = '}';

	let content = '';

	for (let command of registerCommands) {
		content += `\t${command}\n`;
	}

	return `${head}\n${content}\n${tail}`;
}

function registerResource(file = '') {
	let fileParts = file.split('.');
	let fileExtension = fileParts[fileParts.length - 1];
	let fileNameParts = file.split('/');
	let fileName = fileNameParts[fileNameParts.length - 1];
	let fileId = fileName.replaceAll('.', '_');

	let head, tail;

	if (fileExtension == 'css') {
		head = REGISTER_STYLE_HEAD;
		tail = REGISTER_STYLE_TAIL;
	} else if (fileExtension == 'js') {
		head = REGISTER_SCRIPT_HEAD;
		tail = REGISTER_SCRIPT_TAIL;
	}

	return `${head}"${fileId}", plugins_url("${file}", ${tail}`;
}

export function buildIndexStr(trimFromPath = 'build/') {
	let searchPath = JSON.parse(process.env.SEARCH_PATH);

	let files = filterFilesByExtension(searchPath);

	const resourceRegistrations = [];

	for (let file of files) {
		const resourceRegistration = registerResource(file.replace(trimFromPath, ''));

		resourceRegistrations.push(resourceRegistration);
	}

	const resourcesFunction = buildResourcesFunction(resourceRegistrations);

	const resourceIds = extractIdsFromFiles(files);

	const enqueueingFunction = buildEnqueueingFunction(resourceIds);

	const action = buildAction();

	const shortcode = buildShortcode();

	const indexStr = `<?php
/**
 * Plugin Name: ${indexInfo.pluginName}
 * Plugin URI: ${indexInfo.pluginUri}
 * Description: ${indexInfo.pluginDescription}
 * Version: ${indexInfo.pluginVersion}
 * Text Domain: ${indexInfo.pluginTextDomain}
 * Author: ${indexInfo.pluginAuthor}
 * Author URI: ${indexInfo.pluginAuthorUri}
 */

${resourcesFunction}

${action}

${enqueueingFunction}

${shortcode}

?>`;

	return indexStr;
}

function enqueueResource(resourceId = '') {
	if (resourceId.endsWith('js')) {
		return `wp_enqueue_script("${resourceId}", '1.0', true);`;
	} else if (resourceId.endsWith('css')) {
		return `wp_enqueue_style("${resourceId}");`;
	}

	return '';
}

function buildEnqueueingFunction(resourcesIds = []) {
	const enqueues = [];

	for (let resourceId of resourcesIds) {
		const enqueue = enqueueResource(resourceId);
		enqueues.push(enqueue);
	}

	let content = '';

	for (let enq of enqueues) {
		content += `\t${enq}\n`;
	}

	content += `\n\treturn file_get_contents("index.html", true);\n`;

	const prefix = pluginPrefix ? pluginPrefix : '_function';
	const head = `function ${prefix}() {`;
	const tail = '}';

	return `${head}\n${content}\n${tail}`;
}

function buildAction() {
	const prefix = pluginPrefix ? `${pluginPrefix}_resources_init` : '_function';

	return `add_action( 'init', '${prefix}' );`;
}

function buildShortcode() {
	const prefix = pluginPrefix ? pluginPrefix : '_function';

	return `add_shortcode('${pluginShortcode}', '${prefix}');`;
}

function writeToFile(content = '') {
	const buildPath = JSON.parse(process.env.BUILD_PATH);
	try {
		fs.writeFileSync(`${buildPath}/index.php`, content);
	} catch (err) {
		console.error(err);
	}
}

function main() {
	let result = buildIndexStr();

	writeToFile(result);
}

main();
