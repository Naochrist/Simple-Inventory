"use strict";
/* eslint-disable max-len */
/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    coverageReporters: [
        "json",
        "text",
        "lcov",
    ],
    modulePathIgnorePatterns: ['<rootDir>/dist'],
    roots: [
        "<rootDir>/src"
    ],
    testEnvironment: "jest-environment-node",
    testMatch: [
        "**/__tests__/**/*.ts",
      "**/?(*.)+(spec|test).ts",
      "**/__tests__/**/*.js",
        "**/?(*.)+(spec|test).js"

    ],
    testPathIgnorePatterns: [
        "/node_modules/", "/dist/"
    ],
    transformIgnorePatterns: [],
    preset: 'ts-jest/presets/js-with-babel',
};
