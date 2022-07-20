module.exports = {
  env: {
    browser: true,
    es6: true,
    "jest/globals": true,
    "cypress/globals": true,
  },
  extends: ["airbnb", "prettier"],
  plugins: ["prettier", "react", "jest", "cypress"],
  rules: {
    "no-console": 0,
  },
};
