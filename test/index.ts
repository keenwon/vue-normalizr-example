const testsContext = require.context('.', true, /\.spec\.ts$/);
testsContext.keys().forEach(testsContext);

// const srcContext = require.context('../src/store/v2/', true, /\.ts$/);
// srcContext.keys().forEach(srcContext);
