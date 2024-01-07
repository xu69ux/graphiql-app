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
      "^@appTypes/(.*)$": "<rootDir>/src/types/$1",
      "^@assets/(.*)$": "<rootDir>/src/assets/$1",
      "^@components/(.*)$": "<rootDir>/src/components/$1",
      "^@constants/(.*)$": "<rootDir>/src/constants/$1",
      "^@contexts/(.*)$": "<rootDir>/src/contexts/$1",
      "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
      "^@pages/(.*)$": "<rootDir>/src/pages/$1",
      "^@services/(.*)$": "<rootDir>/src/services/$1",
      "^@styles/(.*)$": "<rootDir>/src/styles/$1",
      "^@utils/(.*)$": "<rootDir>/src/utils/$1",
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
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  coveragePathIgnorePatterns: [
    "<rootDir>/src/utils/usefulFunction.ts",
    "<rootDir>/src/main.tsx",
    "<rootDir>/src/vite-env.d.ts",
    "<rootDir>/src/hooks/*",
  ],
  setupFilesAfterEnv: ["<rootDir>/src/__test__/setupTests.ts"],
};