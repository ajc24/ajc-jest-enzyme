const { configureUnitTests } = require('../../build');

const jestConfig = configureUnitTests();
jestConfig.coveragePathIgnorePatterns.push('<rootDir>/src/index.js');

module.exports = jestConfig;
