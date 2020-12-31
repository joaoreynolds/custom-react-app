const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

module.exports = {
  root: appDirectory,
  buildDotEnv: resolveApp('config/.env'),
  localDotEnv: resolveApp('config/.env-local'),
  testDotEnv: resolveApp('config/.env-test'),
  appIndexJs: resolveApp('src/index.tsx'),
  appBuild: resolveApp('build'),
  appSrc: resolveApp('src'),
  appNodeModules: resolveApp('node_modules'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  eslintConfig: resolveApp('config/.eslintrc.js'),
  babelConfig: resolveApp('.babelrc.js'),
}
