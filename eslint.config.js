// @ts-check
const js = require("@eslint/js");
const tseslint = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const angular = require("@angular-eslint/eslint-plugin");
const angularTemplate = require("@angular-eslint/eslint-plugin-template");
const prettierPlugin = require("eslint-plugin-prettier");

module.exports = [

    {
        ignores: [
            // Build and output directories
            "node_modules/",
            "dist/",
            "coverage/",
            "tmp/",
            "out-tsc/",

            // Compiled and generated files
            "*.min.js",
            "*.map",
            "*.d.ts",

            // Configuration and environment files
            ".angular/",
            ".eslintcache",
            ".env",
            ".DS_Store",

            // Ignore test snapshots
            "__snapshots__/"
        ],
    },

    {
        files: ["**/*.ts"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: "./tsconfig.json",
                sourceType: "module"
            }
        },
        plugins: {
            "@angular-eslint": angular,
            "@typescript-eslint": tseslint,
            prettier: prettierPlugin
        },
        rules: {
            ...js.configs.recommended.rules,
            ...tseslint.configs.recommended.rules,
            ...tseslint.configs.stylistic.rules,
            ...angular.configs.recommended.rules,

            "prettier/prettier": "error",
            "no-undef": "off",

            "@angular-eslint/directive-selector": [
                "error",
                {
                    type: "attribute",
                    prefix: "app",
                    style: "camelCase"
                }
            ],
            "@angular-eslint/component-selector": [
                "error",
                {
                    type: "element",
                    prefix: "app",
                    style: "kebab-case"
                }
            ]
        }
    },

    {
        files: ["**/*.html"],
        languageOptions: {
            parser: require("@angular-eslint/template-parser")
        },
        plugins: {
            "@angular-eslint/template": angularTemplate
        },
        rules: {
            ...angularTemplate.configs.recommended.rules
        }
    }
];
