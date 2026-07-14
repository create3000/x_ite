import js               from "@eslint/js";
import globals          from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig ([
  {
    files: ["src/**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions:
    {
      globals: {
        ... globals .browser,
        ... globals .jquery,
        SuperGif: "readonly",
        APNG: "readonly",
      },
    },
    rules: {
      "no-async-promise-executor": "off",
    },
  },
  {
    files: ["build/**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions:
    {
      globals: globals .node,
    },
  },
]);
