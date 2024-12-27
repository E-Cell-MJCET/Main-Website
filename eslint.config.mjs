import path from "node:path";
import { fileURLToPath } from "node:url";

import react from "eslint-plugin-react";
import unusedImports from "eslint-plugin-unused-imports";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "prettier",
    "plugin:tailwindcss/recommended"
  ),
  {
    plugins: {
      react,
      "unused-imports": unusedImports,
    },

    rules: {
      "newline-before-return": "error",
      "tailwindcss/no-custom-classname": "off",

      "padded-blocks": [
        "error",
        {
          blocks: "never",
        },
      ],

      "no-multiple-empty-lines": [
        "error",
        {
          max: 1,
          maxEOF: 0,
        },
      ],

      "react/jsx-indent": ["error", 2],
      "react/jsx-no-useless-fragment": "error",

      "react/jsx-newline": [
        "error",
        {
          prevent: true,
        },
      ],

      "unused-imports/no-unused-imports": "error",

      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
        },
      ],

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

      "import/newline-after-import": [
        "error",
        {
          count: 1,
        },
      ],
      "import/no-useless-path-segments": "error",
      "import/no-unresolved": "error",
      "import/first": "error",
      "import/no-named-as-default": "error",

      "import/no-cycle": [
        "error",
        {
          maxDepth: 1,
        },
      ],
    },
  },
];

export default eslintConfig;
