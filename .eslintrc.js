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
  env: {
    browser: true,
    node: true
  },
  rules: {
  }
};
