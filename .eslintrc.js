module.exports = {
  extends: [
    'eslint-config-semistandard',
    'plugin:jest/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:security/recommended'
  ],
  plugins: ['jsx-a11y', 'security'],
  overrides: [
    {
      files: ['__tests__/**/*.js'],
      rules: {
        'react/display-name': 'off',
        'react/prop-types': 'off'
      }
    },
    {
      files: ['cucumber/**/*.js'],
      rules: {
        'jest/valid-expect': 'off',
        'security/detect-non-literal-fs-filename': 'off',
        'security/detect-object-injection': 'off'
      }
    },
    {
      files: ['acceptance/**/*.js'],
      rules: {
        'jest/valid-expect': 'off',
        'security/detect-object-injection': 'off'
      }
    }
  ],
  rules: {
    'guard-for-in': 'error',
    'no-var': 'error'
  }
};
