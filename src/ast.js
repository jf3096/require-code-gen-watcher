const astring = require('astring');

/**
 * 生成 ast 结构
 * @returns {{type: string, sourceType: string, body: *[]}}
 */
function generateAst(exportName, requireElements) {
	return {
		type: 'Program',
		sourceType: 'script',
		body: [
			{
				'type': 'VariableDeclaration',
				'declarations': [
					{
						'type': 'VariableDeclarator',
						'id': { 'type': 'Identifier', 'name': exportName },
						'init': {
							'type': 'ArrayExpression',
							'elements': requireElements,
						},
					},
				],
				'kind': 'const',
			},
			{
				'type': 'ExpressionStatement',
				'expression': {
					'type': 'AssignmentExpression',
					'operator': '=',
					'left': {
						'type': 'MemberExpression',
						'object': { 'type': 'Identifier', 'name': 'module' },
						'property': { 'type': 'Identifier', 'name': 'exports' },
					},
					'right': { 'type': 'Identifier', 'name': exportName },
				},
			},
			{
				'type': 'ExpressionStatement',
				'expression': {
					'type': 'AssignmentExpression',
					'operator': '=',
					'left': {
						'type': 'MemberExpression',
						'object': {
							'type': 'MemberExpression',
							'object': { 'type': 'Identifier', 'name': 'module' },
							'property': { 'type': 'Identifier', 'name': 'exports' },
						},
						'property': { 'type': 'Identifier', 'name': 'default' },
					},
					'right': { 'type': 'Identifier', 'name': exportName },
				},
			},
		],
	};
}

/**
 * 生成 require 模板
 * @param requireValue
 * @returns {{type: string, callee: {type: string, name: string}, arguments: {type: string, value: *}[]}}
 */
function getRequireAst(requireValue) {
	return {
		type: 'CallExpression',
		callee: { type: 'Identifier', name: 'require' },
		arguments: [{ type: 'Literal', value: requireValue }],
	};
}

module.exports = {
	generateAst: generateAst,
	getRequireAst: getRequireAst
};
