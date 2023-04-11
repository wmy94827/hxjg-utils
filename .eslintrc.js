module.exports = {
  extends: require.resolve('@umijs/lint/dist/config/eslint'),
  rules: {
    'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
  },
};
