const tsconfig = require('../tsconfig.json');
const merge = require('lodash/merge');
const register = require('ts-node').register;

const mochaTsConfig = merge({}, tsconfig, {
  compilerOptions: {
    module: 'commonjs'
  }
})

register(mochaTsConfig);
