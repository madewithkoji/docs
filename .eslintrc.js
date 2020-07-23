module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'max-len': [2, 140],
    'no-confusing-arrow': 0,
    'object-curly-newline': 0,
    'operator-linebreak': 0,
    'react/jsx-filename-extension': 0,
    'react/destructuring-assignment': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-curly-brace-presence': 0,
  },
};
