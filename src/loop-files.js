const fg = require('fast-glob');

function loopFiles(entryItems) {
	return fg.sync(entryItems);
}

module.exports = loopFiles;