module.exports = {
    "env": {
        "browser": true,
        "es6": true,
		"jquery": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2016
    },
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
		"no-unused-vars": [
			"error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }
		]
    }
};