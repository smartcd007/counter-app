module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  collectCoverageFrom: [
    'script.js'
  ],
  testMatch: [
    '**/__tests__/**/*.test.js'
  ]
};
