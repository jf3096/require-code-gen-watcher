const path = require('path');

const resolve = (pathname, workingDirectory = process.cwd()) => {
	if (path.isAbsolute(pathname)) {
		return pathname;
	}
	return path.resolve(workingDirectory, pathname);
};

module.exports = resolve;
