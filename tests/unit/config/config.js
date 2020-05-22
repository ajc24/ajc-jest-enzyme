import {
  configureSnapshotTests,
  configureUnitTests
} from '../../../src';

describe('Jest Configuration Files', () => {
  const expectedCoverageDirectoryLocation = '<rootDir>/tests/unit/coverage';
  const expectedCssMockFileLocation = '<rootDir>/tests/jest-config/mocks/cssMock.js';
  const expectedDefaultRootDirectoryLocation = '../../';
  const expectedImageMockFileLocation = '<rootDir>/tests/jest-config/mocks/imageMock.js';
  const expectedSetupFilesFileLocation = '<rootDir>/tests/jest-config/enzyme.config.js';
  const expectedTestURL = 'http://localhost/';

  describe('configureUnitTests() method behaviour - Default root directory', () => {
    let jestConfig;

    beforeAll(() => {
      jestConfig = configureUnitTests();
    });

    it('verifies that the image mock file location property is set correctly', () => {
      const fileLocation = jestConfig.moduleNameMapper['\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$'];
      expect(fileLocation).toBe(expectedImageMockFileLocation);
    });

    it('verifies that the css mock file location property is set correctly', () => {
      const fileLocation = jestConfig.moduleNameMapper['\\.(css|less)$'];
      expect(fileLocation).toBe(expectedCssMockFileLocation);
    });

    it('verifies that the root directory location property is set correctly', () => {
      expect(jestConfig.rootDir).toBe(expectedDefaultRootDirectoryLocation);
    });

    it('verifies that the list of setup files after environment property is defined', () => {
      expect(jestConfig.setupFilesAfterEnv).toBeDefined();
    });

    it('verifies that the list of setup files after environment property is initialised with a single file location', () => {
      expect(jestConfig.setupFilesAfterEnv.length).toBe(1);
    });

    it('verifies that the setup files after environment file location property is set correctly', () => {
      expect(jestConfig.setupFilesAfterEnv[0]).toBe(expectedSetupFilesFileLocation);
    });

    it('verifies that the test URL property is set correctly', () => {
      expect(jestConfig.testURL).toBe(expectedTestURL);
    });

    it('verifies that the verbose property is set correctly', () => {
      expect(jestConfig.verbose).toBeTruthy();
    });

    it('verifies that the coverage directory property is set correctly', () => {
      expect(jestConfig.coverageDirectory).toBe(expectedCoverageDirectoryLocation);
    });

    it('verifies that the list of coverage path ignore patterns property is defined', () => {
      expect(jestConfig.coveragePathIgnorePatterns).toBeDefined();
    });

    it('verifies that the list of coverage path ignore patterns property is initialised with multiple locations', () => {
      expect(jestConfig.coveragePathIgnorePatterns.length).toBe(3);
    });

    it('verifies that the project node modules folder is ignored in the coverage collection statistics', () => {
      expect(jestConfig.coveragePathIgnorePatterns[0]).toBe('<rootDir>/node_modules');
    });

    it('verifies that the jest test configuration folder is ignored in the coverage collection statistics', () => {
      expect(jestConfig.coveragePathIgnorePatterns[1]).toBe('<rootDir>/tests/jest-config');
    });

    it('verifies that the jest test coverage folder is ignored in the coverage collection statistics', () => {
      expect(jestConfig.coveragePathIgnorePatterns[2]).toBe(expectedCoverageDirectoryLocation);
    });

    it('verifies that the test match property is defined', () => {
      expect(jestConfig.testMatch).toBeDefined();
    });

    it('verifies that the test match property is initialised with a single file location', () => {
      expect(jestConfig.testMatch.length).toBe(1);
    });

    it('verifies that the test match file location property is set correctly', () => {
      expect(jestConfig.testMatch[0]).toBe('<rootDir>/tests/unit/**/*.js');
    });

    it('verifies that the list of test path ignore patterns is defined', () => {
      expect(jestConfig.testPathIgnorePatterns).toBeDefined();
    });

    it('verifies that the list of test path ignore patterns is initialised with a single file location', () => {
      expect(jestConfig.testPathIgnorePatterns.length).toBe(1);
    });

    it('verifies that the test path ignore patterns property is set correctly', () => {
      expect(jestConfig.testPathIgnorePatterns[0]).toBe(expectedCoverageDirectoryLocation);
    });
  });

  describe('configureUnitTests() method behaviour - Custom root directory specified', () => {
    let jestConfig;

    beforeAll(() => {
      jestConfig = configureUnitTests('my/project/root/directory');
    });

    it('verifies that the root directory location property is set correctly', () => {
      expect(jestConfig.rootDir).toBe('my/project/root/directory');
    });
  });

  describe('configureSnapshotTests() method behaviour - Default root directory', () => {
    let jestConfig;

    beforeAll(() => {
      jestConfig = configureSnapshotTests();
    });

    it('verifies that the image mock file location property is set correctly', () => {
      const fileLocation = jestConfig.moduleNameMapper['\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$'];
      expect(fileLocation).toBe(expectedImageMockFileLocation);
    });

    it('verifies that the css mock file location property is set correctly', () => {
      const fileLocation = jestConfig.moduleNameMapper['\\.(css|less)$'];
      expect(fileLocation).toBe(expectedCssMockFileLocation);
    });

    it('verifies that the root directory location property is set correctly', () => {
      expect(jestConfig.rootDir).toBe(expectedDefaultRootDirectoryLocation);
    });

    it('verifies that the list of setup files after environment property is defined', () => {
      expect(jestConfig.setupFilesAfterEnv).toBeDefined();
    });

    it('verifies that the list of setup files after environment property is initialised with a single file location', () => {
      expect(jestConfig.setupFilesAfterEnv.length).toBe(1);
    });

    it('verifies that the setup files after environment file location property is set correctly', () => {
      expect(jestConfig.setupFilesAfterEnv[0]).toBe(expectedSetupFilesFileLocation);
    });

    it('verifies that the test URL property is set correctly', () => {
      expect(jestConfig.testURL).toBe(expectedTestURL);
    });

    it('verifies that the verbose property is set correctly', () => {
      expect(jestConfig.verbose).toBeTruthy();
    });

    it('verifies that the coverage directory property is not defined', () => {
      expect(jestConfig.coverageDirectory).toBeUndefined();
    });

    it('verifies that the list of coverage path ignore patterns property is not defined', () => {
      expect(jestConfig.coveragePathIgnorePatterns).toBeUndefined();
    });

    it('verifies that the test match property is defined', () => {
      expect(jestConfig.testMatch).toBeDefined();
    });

    it('verifies that the test match property is initialised with a single file location', () => {
      expect(jestConfig.testMatch.length).toBe(1);
    });

    it('verifies that the test match file location property is set correctly', () => {
      expect(jestConfig.testMatch[0]).toBe('<rootDir>/tests/snapshots/**/*.js');
    });

    it('verifies that the test path ignore patterns property is not defined', () => {
      expect(jestConfig.testPathIgnorePatterns).toBeUndefined();
    });
  });

  describe('configureSnapshotTests() method behaviour - Custom root directory specified', () => {
    let jestConfig;

    beforeAll(() => {
      jestConfig = configureSnapshotTests('my/project/root/directory');
    });

    it('verifies that the root directory location property is set correctly', () => {
      expect(jestConfig.rootDir).toBe('my/project/root/directory');
    });
  });
});
