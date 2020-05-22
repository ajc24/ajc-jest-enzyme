"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configureUnitTests = exports.configureSnapshotTests = void 0;

/**
 * Configures the most common settings for jest
 * @param {string} rootDirectory
 * @returns {JSON}
 */
const configureCommonJestSettings = function (rootDirectory) {
  return {
    moduleNameMapper: {
      '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/tests/jest-config/mocks/imageMock.js',
      '\\.(css|less)$': '<rootDir>/tests/jest-config/mocks/cssMock.js'
    },
    rootDir: rootDirectory || '../../',
    setupFilesAfterEnv: ['<rootDir>/tests/jest-config/enzyme.config.js'],
    testURL: 'http://localhost/',
    verbose: true
  };
};
/**
 * Sets the configuration for jest unit tests
 * @param {string} rootDirectory
 * @returns {JSON}
 */


const configureUnitTests = function (rootDirectory) {
  const jestConfig = configureCommonJestSettings(rootDirectory);
  /* Set the coverage directory for the project */

  jestConfig.coverageDirectory = '<rootDir>/tests/unit/coverage';
  /* Set the ignored folder(s) for the coverage process - ignore the node_modules and jest_config folders by default */

  jestConfig.coveragePathIgnorePatterns = [];
  jestConfig.coveragePathIgnorePatterns.push('<rootDir>/node_modules');
  jestConfig.coveragePathIgnorePatterns.push('<rootDir>/tests/jest-config');
  jestConfig.coveragePathIgnorePatterns.push('<rootDir>/tests/unit/coverage');
  /* Set the path to the tests to be executed as part of the unit test suite */

  jestConfig.testMatch = [];
  jestConfig.testMatch.push('<rootDir>/tests/unit/**/*.js');
  /* Set the path to the tests to be ignored as part of the unit test suite */

  jestConfig.testPathIgnorePatterns = [];
  jestConfig.testPathIgnorePatterns.push('<rootDir>/tests/unit/coverage');
  return jestConfig;
};
/**
 * Sets the configuration for jest snapshot tests
 * @param {string} rootDirectory
 * @returns {JSON}
 */


exports.configureUnitTests = configureUnitTests;

const configureSnapshotTests = function (rootDirectory) {
  const jestConfig = configureCommonJestSettings(rootDirectory);
  /* Set the path to the tests to be executed as part of the snapshots test suite */

  jestConfig.testMatch = [];
  jestConfig.testMatch.push('<rootDir>/tests/snapshots/**/*.js');
  return jestConfig;
};

exports.configureSnapshotTests = configureSnapshotTests;