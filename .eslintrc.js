module.exports = {
    parser: "@typescript-eslint/parser", // Specifies the ESLint parser
    "plugins": ['@typescript-eslint'],
    "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: "module", // Allows for the use of imports
    },
    rules: {
        "@typescript-eslint/no-explicit-any": 0,
    },
    "env": {
        "node": true,
        "browser": true,
        "commonjs": true,
        "amd": true
    }
};
