const webpackConfig = require('./webpack.config');

module.exports = (config) => {
  config.set({
    frameworks: ['source-map-support', 'mocha', 'chai'],
    files: [
      'test/index.ts'
    ],
    reporters: ['spec', 'coverage-istanbul'],
    preprocessors: {
      'test/index.ts': ['webpack']
    },
    colors: true,
    browsers: ['Chrome'],
    autoWatch: false,
    concurrency: Infinity,
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: 'errors-only'
    },
    mime: {
      'text/x-typescript': ['ts']
    },
    coverageIstanbulReporter: {
      reports: [
        'html',
        'text',
        'text-summary'
      ],
      dir: './coverage',
      fixWebpackSourcePaths: true
    },
    plugins: [
      'karma-chrome-launcher',
      'karma-coverage-istanbul-reporter',
      'karma-mocha',
      'karma-chai',
      'karma-source-map-support',
      'karma-spec-reporter',
      'karma-webpack'
    ]
  });
}