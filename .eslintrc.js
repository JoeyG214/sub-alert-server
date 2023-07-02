module.exports = {
  'env': {
		'commonjs': true,
		'es2021': true,
		'node': true,
		'jest': true,
	},
	'extends': 'eslint:recommended',
	'overrides': [
	],
	'parserOptions': {
		'ecmaVersion': 'latest'
	},
	'rules': {
		'indent': ['error', 2],
		'linebreak-style': ['error', 'unix'],
		'quotes': ['error', 'single'],
		'semi': ['error', 'never'],
		'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': ['error', { 'before': true, 'after': true }],
    'no-console': 'warn',
		'no-unused-vars': ['warn'],
		'camelcase': 'error',
		'curly': 'error',
		'prefer-const': 'error',
		'comma-dangle': ['error', 'always-multiline'],
		'no-mixed-spaces-and-tabs': 'error',
		'no-multiple-empty-lines': ['error', { 'max': 2, 'maxEOF': 1 }],
		'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
		'array-bracket-spacing': ['error', 'never'],
		'func-call-spacing': ['error', 'never'],
		'keyword-spacing': ['error', { 'before': true, 'after': true }],
		'space-infix-ops': 'error',
	}
}
