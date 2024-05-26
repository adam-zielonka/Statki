import globals from "globals";
import js from "@eslint/js";

export default [
  {
    languageOptions: { 
      globals: globals.browser 
    }
  },
  js.configs.recommended,
  {
    rules: {
      "indent": ["warn", 2, { "SwitchCase": 1 }],
      "linebreak-style": ["warn", "unix"],
      "quotes": ["warn", "double"],
      "semi": ["warn", "always"],
      "max-len": ["warn", { "code": 120 }],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "keyword-spacing": ["warn", { "before": true, "after": true }],
    }
  }
];
