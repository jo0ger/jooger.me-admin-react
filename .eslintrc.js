module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  // required to lint *.vue files
  plugins: [
    'react'
  ],
  // add your custom rules here
  rules: {
    camelcase: 0,
    'no-unuses-vars': 0
  },
  globals: {
    Velocity: true
  }
}
