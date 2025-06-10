import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      // 代码质量规则
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-console": "warn",
      "no-debugger": "error",
      "no-alert": "error",

      // 代码风格规则
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-template": "error",

      // React 特定规则
      "react/prop-types": "off", // Next.js 项目通常使用 TypeScript 进行类型检查
      "react/react-in-jsx-scope": "off", // Next.js 不需要导入 React
      "react/no-unescaped-entities": "warn",
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-no-undef": "error",

      // Next.js 特定规则
      "@next/next/no-img-element": "warn",
      "@next/next/no-html-link-for-pages": "error",

      // 可访问性规则
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-proptypes": "error",
      "jsx-a11y/aria-unsupported-elements": "error",
      "jsx-a11y/role-has-required-aria-props": "error",
      "jsx-a11y/role-supports-aria-props": "error",

      // 导入规则
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
          "newlines-between": "never",
        },
      ],
      "import/no-unused-modules": "warn",

      // 函数和变量命名
      camelcase: ["error", { properties: "never" }],

      // 其他最佳实践
      eqeqeq: ["error", "always"],
      "no-duplicate-imports": "error",
      "no-return-assign": "error",
      "no-throw-literal": "error",
    },
  },
  {
    // 忽略特定文件和目录
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "coverage/**",
      "*.config.js",
      "*.config.mjs",
    ],
  },
];

export default eslintConfig;
