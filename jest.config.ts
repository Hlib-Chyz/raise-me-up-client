import type { Config } from 'jest';

const config: Config = {
    transform: {
        '^.+\\.(t|j)sx?$': '@swc/jest',
    },
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
        '\\.(gif|png|jpg|jpeg|svg)$': '<rootDir>/__mocks__/fileMock.js',
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    preset: 'ts-jest',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testMatch: ['**/?(*.)+(spec|test).(ts|tsx)'],
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
};

export default config;
