import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";
import pluginTailwindcss from "eslint-plugin-tailwindcss";
import pluginUnusedImports from "eslint-plugin-unused-imports";
import pluginImport from "eslint-plugin-import";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: { globals: globals.browser },
    plugins: {
      react: pluginReact,
      "unused-imports": pluginUnusedImports,
      import: pluginImport,
      prettier: pluginPrettier,
      tailwindcss: pluginTailwindcss,
    },
    rules: {
      "newline-before-return": "error",
      "tailwindcss/no-custom-classname": "off",
      "padded-blocks": ["error", { blocks: "never" }],
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
      "react/jsx-indent": ["error", 2],
      "react/jsx-no-useless-fragment": "error",
      "react/jsx-newline": ["error", { prevent: true }],
      "unused-imports/no-unused-imports": "error",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
        },
      ],
      "import/no-duplicates": "error",
      "import/newline-after-import": ["error", { count: 1 }],
      "import/no-useless-path-segments": "error",
      "import/no-unresolved": "error",
      "import/first": "error",
      "import/no-named-as-default": "error",
      "import/no-cycle": ["error", { maxDepth: 1 }],
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginPrettier.configs.recommended,
  pluginTailwindcss.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    rules: {
      "prettier/prettier": "error",
    },
  },
];
