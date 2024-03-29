module.exports = {
	"env": {
		"browser": true,
		"commonjs": true,
		"es2021": true,
		"node": true,
		"jest": true
	},
	"extends": "eslint:recommended",
	"overrides": [
	],
	"parserOptions": {
		"ecmaVersion": "latest"
	},
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"windows"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		],
		"eqeqeq": [
			"error", 
			"always"
		]
	}
};
