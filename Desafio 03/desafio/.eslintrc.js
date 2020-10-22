module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
	},
	extends: ['airbnb-base', 'prettier'],
	plugins: ['prettier'],
	parserOptions: {
		ecmaVersion: 12,
	},
	rules: {
		'prettier/prettier': ['error'],
		'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
		'no-console': 0,
	},
};
