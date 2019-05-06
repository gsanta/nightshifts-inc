
// module.exports = {
//   "roots": [
//     "<rootDir>/src"
//   ],
//   "transform": {
//     "^.+\\.tsx?$": "ts-jest",
//     "^.+\\.jsx?$": "babel-jest"
//   },
//   "transformIgnorePatterns": [
//     "node_modules/(?!(@babylonjs/core)/)"
//   ]
// }


module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(test).ts?(x)"]
};