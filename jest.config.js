// jest.config.js
module.exports = {
    verbose: true,
    testPathIgnorePatterns:["<rootDir>/.*node_modules.*"],
    testMatch:[ "**/api/**/*.test.js?(x)" ]
  };