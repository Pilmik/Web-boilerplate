module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "always",
        "json": "always"
      }
    ]
  },
};
