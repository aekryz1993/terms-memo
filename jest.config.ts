export default {
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!app/__mocks__/**",
  ],
  moduleNameMapper: {
    // Handle absolute imports in Remix
    "~/(.*)": "<rootDir>/app/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.cache/",
    "<rootDir>/build/",
  ],
  testEnvironment: "jsdom",
  transform: {
    // Use @swc/jest to transpile tests
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    "^.+\\.(js|jsx|ts|tsx)$": "@swc/jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(@remix-run/web-fetch|@remix-run/web-blob|@remix-run/web-stream|@remix-run/web-form-data|@remix-run/web-file|@web3-storage/multipart-parser)/)",
  ],
  resetMocks: true,
  bail: 1,
  verbose: true,
};
