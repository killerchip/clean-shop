// noinspection JSUnusedGlobalSymbols

import type { Config } from "jest";

const config: Config = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.js"],
};

export default config;
