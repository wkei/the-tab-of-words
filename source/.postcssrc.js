// https://github.com/michael-ciniawsky/postcss-load-config

const variables = require('./src/styles/variables')

module.exports = {
  plugins: {
    // to edit target browsers: use 'browserslist' field in package.json
    'autoprefixer': {},
    'postcss-import': {},
    'postcss-nested': {},
    'postcss-custom-properties': {
      variables
    }
  }
}
