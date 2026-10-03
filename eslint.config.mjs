// eslint.config.mjs
import eslint from "@eslint/js";
import chaiFriendly from "eslint-plugin-chai-friendly";
import mocha from "eslint-plugin-mocha";
import n from "eslint-plugin-n";
import redos from "eslint-plugin-redos";
import regexp from "eslint-plugin-regexp";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

const specFiles = ["src/**/*.spec.ts"];

export default defineConfig(
  {
    ignores: [
      "**/*.d.ts",
      "build/",
      "coverage/",
      "dist/",
      "docs/",
      "node_modules/",
    ],
  },
  eslint.configs.recommended,
  tseslint.configs.strict,
  {
    files: ["src/**/*.ts"],
    extends: [
      tseslint.configs.recommendedTypeChecked,
      n.configs["flat/recommended-module"],
      regexp.configs["flat/recommended"],
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: globals.node,
    },
    settings: {
      n: {
        // Extensionless relative imports resolve to .ts sources:
        tryExtensions: [".ts", ".js", ".json", ".node"],
        // src/X.ts is published if dist/X.js is in package.json "files", so
        // n/no-unpublished-import reports shipped code importing devDependencies:
        convertPath: { "src/**/*.ts": ["^src/(.+)\\.ts$", "dist/$1.js"] },
      },
    },
    rules: {
      // Enable strict rules for main library code
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
      "n/prefer-node-protocol": "error",
    },
  },
  {
    // The library parses metadata from untrusted files. ReDoS analysis is the
    // slowest rule by far, so it only checks shipped code.
    files: ["src/**/*.ts"],
    ignores: [...specFiles, "src/update/**"],
    // eslint-plugin-redos 4.5.0 only ships an eslintrc-format config:
    plugins: { redos },
    rules: { "redos/no-vulnerable": "error" },
  },
  {
    files: specFiles,
    extends: [mocha.configs.recommended],
    rules: {
      // Mocha's `this` (for this.slow() and this.timeout()) only matters in
      // the few callbacks that use it:
      "mocha/no-mocha-arrows": "off",
    },
  },
  {
    files: [...specFiles, "src/update/**/*.ts"],
    rules: {
      // Relax rules for test files and build scripts
      "@typescript-eslint/no-explicit-any": "off",
      // These only report uses of `any` values, which the rule above allows:
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
    },
  },
  {
    // After the block above, so chai assertions like
    // `expect(x).to.be.true` are allowed but other unused expressions aren't:
    files: specFiles,
    extends: [chaiFriendly.configs.recommendedFlat],
  },
  {
    files: ["**/*.js", "**/*.mjs"],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
);
