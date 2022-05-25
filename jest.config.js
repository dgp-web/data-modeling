module.exports = {
    testEnvironment: 'node',
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/__tests__/fixtures/',
    ],
    preset: 'ts-jest',
    reporters: ["default"],
    setupFiles: [

    ],
    testMatch: ["**/?(*.)+(spec).[jt]s?(x)"],
    verbose: true
};
