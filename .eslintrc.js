module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
	"no-constant-condition": "warn",
	"no-useless-escape": "warn",
	"no-unused-vars": "warn",
	"no-empty": "warn",
	"no-undef": "warn"
    }
};
