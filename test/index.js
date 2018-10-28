const watcher = require('../src/watcher');
const path = require('path');

watcher(
	path.resolve(__dirname, '../tmp/*.js'),
	{
		exportName: 'models',
		loopFiles: path.resolve(__dirname, '../tmp/*.js'),
		relativePath: path.resolve(__dirname, '../tmp/index.js'),
		excludeCondition: (filename) => /index\.js/g.test(filename),
		writePath: path.resolve(__dirname, '../tmp/index.js'),
	},
);