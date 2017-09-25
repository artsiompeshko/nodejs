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
  rules: {
    'class-methods-use-this': 'off'
  },
  plugins: [
      'standard',
      'promise',
    ]
};
