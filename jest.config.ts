module.exports = {
    testEnvironment: 'jsdom', // Use jsdom for testing browser-like environment
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'], // File extensions to test
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'], // Test file naming convention
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Use Babel to transform files
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'], // Setup Testing Library matchers
  };
  