const webpackConfig = require('./webpack.config');

module.exports = (config) => {
  config.set({
    frameworks: ['mocha', 'should'],
    files: [
      'test/index.ts'
    ],
    reporters: ['spec', 'coverage'],
    preprocessors: {
      'test/index.ts': ['webpack', 'coverage']
    },
    colors: true,
    browsers: ['ChromeHeadless'],
    autoWatch: false,
    concurrency: Infinity,
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: 'errors-only'
    },
    mime: {
      'text/x-typescript': ['ts']
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    },
    plugins: [
      'karma-chrome-launcher',
      'karma-coverage',
      'karma-mocha',
      'karma-should',
      'karma-sourcemap-loader',
      'karma-spec-reporter',
      'karma-webpack'
    ]
  });
}