module.exports = {
  env: {
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:eslint-plugin-import/recommended",
    "plugin:node/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module"
  },
  plugins: ["@typescript-eslint", "eslint-plugin-import", "eslint-plugin-node"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/member-delimiter-style": [ "warn", { multiline: { delimiter: "none" } } ],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": "off",
    "eqeqeq": ["warn", "always", {"null": "ignore"}],
    "import/no-cycle": "warn",
    "import/no-unresolved": "off",
    "import/named": "off",
    "no-redeclare": "warn",
    "no-undef-init": "warn",
    "no-unused-expressions": "warn",
    "node/no-missing-import": "off",
    "node/no-unsupported-features/es-syntax": "off",
  }
}
