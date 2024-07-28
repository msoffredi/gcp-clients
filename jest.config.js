// eslint-disable-next-line no-undef
module.exports = {
    modulePathIgnorePatterns: [
        '<rootDir>/__tests__/utils',
        '<rootDir>/__tests__/events',
        '<rootDir>/__tests__/postman',
    ],
    clearMocks: true,
    setupFilesAfterEnv: ['./__tests__/utils/setup.ts'],
    collectCoverageFrom: ['src/**/*.{ts,js}'],
    transform: {
        '^.+\\.tsx?$': ['ts-jest'],
    },
};
