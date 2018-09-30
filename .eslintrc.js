module.exports = {
	root: true,
	parserOptions: {
		parser: 'babel-eslint'
	},
	env: {
		browser: true,
		es6: true
	},
	extends: [
		'plugin:vue/essential',
		'plugin:prettier/recommended'
	],
	plugins: ['vue','prettier'],
	// add your custom rules here
	rules: {
		'prettier/prettier': 'error',
		'generator-star-spacing': 'off',
		'no-debugger': process.env.BUILD_MODE === 'prod' ? 2 : 0,
		'no-unused-vars': 0,
		// 'no-console': process.env.BUILD_MODE === 'prod' ? 2 : 0,
		// 'no-alert': process.env.BUILD_MODE === 'prod' ? 2 : 0,
	}
}
