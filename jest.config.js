module.exports = {
  "testRegex": "test/.*.test.tsx?$",
  "transform": {
    // "^.+\\.js": "<rootDir>/node_modules/babel-jest",
    "^.+\\.tsx?$": "ts-jest"
  },
  transformIgnorePatterns: [
    // these are the modules which were published with es6 features
    "node_modules/(?!(@babylonjs/core)/)"
  ]
};
