module.exports = {
  "extends": ["standard", "standard-react", "plugin:jsx-a11y/recommended", "plugin:@typescript-eslint/recommended"],
  "ignorePatterns": ["config/*", "dev-scripts/*"],
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint",
    "react",
    "jsx-a11y",
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "browser": true,
    "jest": true
  },
  "globals": {
    "test": true,
    "it": true,
    "flushPromises": true,
    "expect": true,
    "NodeJS": true
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "rules": {
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-empty-interface": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-inferrable-types": 0,
    "@typescript-eslint/no-unused-vars": ["error"],
    "array-callback-return": 0,
    "block-spacing": 0,
    "brace-style": ["error", "stroustrup", { "allowSingleLine": true }],
    "comma-dangle": ["error", "only-multiline"],
    "indent": ["error", 2, { "MemberExpression": 0, "SwitchCase": 1 }],
    "jsx-quotes": ["error", "prefer-double"],
    "keyword-spacing": 0,
    "multiline-ternary": 0,
    "no-mixed-operators": 0,
    "no-multiple-empty-lines": ["error", {"max": 3}],
    "no-multi-spaces": 0,
    "no-new": [0],
    "no-trailing-spaces": ["error", { "skipBlankLines": true }],
    "no-unneeded-ternary": 0,
    "no-unused-vars": [1],
    "no-use-before-define": 0, // overridden by typescript-eslint
    "object-curly-spacing": 0,
    "one-var": 0,
    "padded-blocks": 0,
    "prefer-promise-reject-errors": 0,
    "quotes": ["error", "single", {"allowTemplateLiterals": true}],
    "react/no-unknown-property": 0,
    "react/no-unused-prop-types": 0,
    "react/prop-types": 0,
    "react/jsx-boolean-value": 0,
    "react/jsx-closing-bracket-location": [2, "line-aligned"],
    "react/jsx-closing-tag-location": 0, //as of 8/20/19 location options aren't enabled: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md
    "react/jsx-fragments": 0,
    "react/jsx-no-bind": [2, {"allowArrowFunctions": true}],
    "react/jsx-space-before-closing": 0,
    "react/jsx-tag-spacing": 0,
    "react/jsx-wrap-multilines": 0,
    "semi": [2, "never"],
    "space-before-blocks": [0],
    "space-before-function-paren": [0],
    "space-infix-ops": 0,
    "spaced-comment": 0,
    "standard/object-curly-even-spacing": 0,
    "template-curly-spacing": 0
  }
};
