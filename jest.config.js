module.exports = {
  setupTestFrameworkScriptFile: '<rootDir>src/support/setupTests.js',
  collectCoverage: true,
  coverageReporters: ['lcov'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>src/support/__mocks__/fileMock.js',
    '\\.(css|scss)$': '<rootDir>src/support/__mocks__/styleMock.js',
  },
};
