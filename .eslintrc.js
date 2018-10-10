module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
	extends: [
		"eslint:recommended",
		"plugin:react/recommended"
	],
	settings: {
		react: {
			version: "16.5"
		}
	},
  env: {
    browser: true,
    node: true
  },
  rules: {},
	globals: { process: true }
};
