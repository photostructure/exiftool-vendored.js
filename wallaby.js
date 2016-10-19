module.exports = function() {
  return {
    files: [
      '!src/**/*.spec.ts',
      'src/**/*.ts'
    ],
    tests: [
      'src/**/*.spec.ts'
    ],
    debug: true,
    testFramework: 'mocha',
    env: {
      type: 'node'
    }
  };
};
