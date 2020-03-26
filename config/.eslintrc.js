module.exports = {
  "extends": ["standard", "standard-react"],
  "parser": "babel-eslint",
  "plugins": [
    "react"
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
    "expect": true
  },
  "settings": {
    "react": {
      "version": "16.0"
    }
  },
  "rules": {
    "block-spacing": 0,
    "brace-style": ["error", "stroustrup", { "allowSingleLine": true }],
    "comma-dangle": ["error", "only-multiline"],
    "indent": ["error", 2, { "MemberExpression": 0, "SwitchCase": 1 }],
    "jsx-quotes": ["error", "prefer-double"],
    "keyword-spacing": 0,
    "no-mixed-operators": 0,
    "no-multiple-empty-lines": ["error", {"max": 3}],
    "no-multi-spaces": 0,
    "no-new": [0],
    "no-trailing-spaces": ["error", { "skipBlankLines": true }],
    "no-unneeded-ternary": 0,
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
