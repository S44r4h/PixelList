import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    extends: ["js/recommended"],

    rules: {
      // 🔍 Virheiden ehkäisy
      "no-unused-vars": "warn",
      "no-undef": "error",
      "no-console": "off",
      // 🎯 Koodin tyyli ja selkeys
      semi: ["error", "always"],
      quotes: ["error", "double"],
      curly: "error",
      eqeqeq: ["error", "always"],
      "prefer-const": "error",
      "no-var": "error",
      indent: ["error", 2],
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { globals: globals.browser },
  },
]);
