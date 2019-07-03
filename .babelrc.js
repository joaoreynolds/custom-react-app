module.exports = api => {
  const isTest = api.env('test')
  return {
    "presets": [
      "@babel/preset-react",
      [
        "@babel/preset-env",
        isTest ? { // babel needs to target node for jest tests instead of what's in the browserslist in package.json
          "useBuiltIns": "entry",
          "corejs": "2",
          "targets": {
            "node": "current"
          }
        } : {
          "useBuiltIns": "entry",
          "corejs": "2"
        }
      ]
    ],
    "plugins": [
      "@babel/plugin-proposal-class-properties"
    ]
  }
}
