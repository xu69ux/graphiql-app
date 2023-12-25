export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!@reduxjs/toolkit/query/react).+\\.js$",
  ],
  moduleNameMapper: {
    "\\.(css|less|scss|sss|styl)$":  "<rootDir>/src/__test__/__mocks__/styleMock.js",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/__test__/__mocks__/fileMock.js",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!<rootDir>/node_modules/",
    "!<rootDir>/path/to/dir/",
  ],
  coverageReporters: ["text", "lcov"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  coveragePathIgnorePatterns: [
    "<rootDir>/src/utils/usefulFunction.ts",
    "<rootDir>/src/main.tsx",
    "<rootDir>/src/vite-env.d.ts",
  ],
  setupFilesAfterEnv: ["<rootDir>/src/__test__/setupTests.ts"],
};