const walk = require('walkdir')

const testFilePattern = /__tests__[\/\\]+.+\.test\.js$/i

walk.sync('src', function (path, stat) {
  if (testFilePattern.test(path)) {
    require(path)
  }
})
