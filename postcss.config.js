module.exports = {
  ident: 'postcss',
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      stage: 3,
      browsers: ['last 2 versions', '> 5%'],
      features: {
        'nesting-rules': true
      }
    },
    'postcss-calc': {},
    'postcss-color-function': {}
  },
};
