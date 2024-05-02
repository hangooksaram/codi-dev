const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@pages/(.*)$": "<rootDir>/src/app/$1",
    "^@icons/(.*)$": "<rootDir>/public/icons/$1",
  },
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  unmockedModulePathPatterns: ["<rootDir>/node_modules", "<rootDir>/app/page"],
};

module.exports = createJestConfig(customJestConfig);
