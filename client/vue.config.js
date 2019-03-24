const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, '../server/public'),
  devServer: {
    proxy: {
      '/diaper': {
        target: 'http://127.0.0.1:5000'
      }
    }
  }
}