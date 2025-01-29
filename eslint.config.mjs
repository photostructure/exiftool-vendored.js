// eslint.config.mjs
import tsPlugin from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"

export default [
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      // Add or override rules as needed
      // 'semi': ['error', 'always'],
    },
  },
  {
    ignores: [
      "**/*js",
      "**/*.spec.ts",
      "**/update/*.ts",
      "**/*.d.ts",
      "**/node_modules/**",
    ],
  },
]
