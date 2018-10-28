const loopFiles = require('./loop-files');
const { generateAst, getRequireAst } = require('./ast');
const astring = require('astring');
const path = require('path');
const slash = require('slash');
const fs = require('fs');
const chokidar = require('chokidar');
const resolve = require('./resolve');

async function generateRequire({ entryItems, relativePath, excludeCondition = f => f, exportName }) {
	const filenames = await loopFiles(entryItems);
	const requireAstElements = filenames.map((filename) => {
		if (excludeCondition(filename)) {
			return false;
		}
		const relative = slash(path.relative(relativePath, filename));
		return getRequireAst(`./${relative}`);
	}).filter(Boolean);
	return astring.generate(generateAst(exportName, requireAstElements));
}

async function writeFile({
	                         exportName,
	                         entryItems,
	                         relativePath,
	                         writePath,
	                         excludeCondition,
                         }) {
	const code = await generateRequire({
			exportName,
			entryItems,
			relativePath,
			excludeCondition,
		},
	);
	fs.writeFileSync(resolve(writePath/*'haha/_index.js'*/), code);
}

async function startWatcher(
	watchPath,
	{
		exportName,
		loopFiles,
		relativePath,
		excludeCondition,
		writePath,
	}) {
	const watcher = chokidar.watch(slash(resolve(watchPath)), { usePolling: true });
	watcher
		.on('add', path => {
			console.log(`File ${path} has been added`);
			// noinspection JSIgnoredPromiseFromCall
			writeFile({
				exportName,
				entryItems: loopFiles,
				relativePath,
				excludeCondition,
				writePath,
			});
		})
		.on('unlink', path => {
			console.log(`File ${path} has been removed`);
			// noinspection JSIgnoredPromiseFromCall
			writeFile({
				exportName,
				entryItems: loopFiles,
				relativePath,
				excludeCondition,
				writePath,
			});
		});
}

module.exports = startWatcher;