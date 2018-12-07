const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

module.exports = {
  root: appDirectory,
  dotenv: resolveApp('config/.env'),
  appIndexJs: resolveApp('src/index.js'),
  appBuild: resolveApp('build'),
  appSrc: resolveApp('src'),
  appNodeModules: resolveApp('node_modules'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  eslintConfig: resolveApp('config/.eslintrc.js'),
  // appPath: resolveApp('.'),
  // appIndexJs: resolveModule(resolveApp, 'src/index'),
  // appPackageJson: resolveApp('package.json'),
  // appTsConfig: resolveApp('tsconfig.json'),
  // yarnLockFile: resolveApp('yarn.lock'),
  // testsSetup: resolveModule(resolveApp, 'src/setupTests'),
  // proxySetup: resolveApp('src/setupProxy.js'),
  // publicUrl: getPublicUrl(resolveApp('package.json')),
  // servedPath: getServedPath(resolveApp('package.json')),
}
