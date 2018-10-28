# require-code-gen-watcher

根据文件生成指定内容.

## 思路
参考以下目录结构:
```txt
index.js
login.js
user.js
route.js
subject.js
```
针对大项目开发, 我们往往需要将仅暴露 `index.js` 作为唯一输出文件, 其余文件仅仅只是`私有`存在.
所以我们在 `index.js` `手动`完成一下代码.

```
// index.js
const models = [
	require('./../login.js'),
	require('./../route.js'),
	require('./../subject.js'),
	require('./../user.js'),
];
module.exports = models;
module.exports.default = models;
```

这时候问题来了, 针对大项目我们需要不断拓展该文件夹, 我们可能会有更多的如
`a.js`, `b.js`, `c.js` 甚至更多. 这样我们总是需要反复的去维护 index.js.

为了简化这类型工作, 简单花费一点小时间完成该工具的 `demo 版本` (<strong>请不要用于生产环境</strong>).

## 安装

```bash
npm install require-code-gen-watcher -D
```

## 使用
可以通过 clone 当前项目安装后运行 npm test 进行测试理解, 或:

```js
const watcher = require('require-code-gen-watcher');
const path = require('path');

watcher(
	path.resolve(__dirname, '../tmp/*.js'),
	{
		exportName: 'models',
		loopFiles: path.resolve(__dirname, '../tmp/*.js'),
		relativePath: path.resolve(__dirname, '../tmp'),
		excludeCondition: (filename) => /index\.js/g.test(filename),
		writePath: path.resolve(__dirname, '../tmp/index.js')
	},
);
```

## 作者
She Ailun