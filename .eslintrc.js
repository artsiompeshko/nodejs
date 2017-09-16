module.exports = {
  parserOptions: {
    ecmaVersion: 7,
    ecmaFeatures: {
      impliedStrict: true,
      experimentalObjectRestSpread: true
    },
    sourceType: 'module'
  },
  parser: 'babel-eslint',
  extends: 'airbnb-base',
  env: {},
  settings: {},
  globals: {},
  rules: {},
  plugins: [
      'standard',
      'promise',
    ]
};
