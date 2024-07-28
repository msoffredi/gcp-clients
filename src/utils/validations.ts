import { exit } from 'process';

export const validateEnvVars = (): void => {
    // Validating environment variables
    if (!process.env.DB_NAME) {
        console.error('No database name env var defined');
        exit(1);
    }

    if (!process.env.DB_USER) {
        console.error('DB username env var defined');
        exit(1);
    }

    if (!process.env.DB_PASSWORD) {
        console.error('DB password env var defined');
        exit(1);
    }

    if (!process.env.DB_HOST) {
        console.error('DB host env var defined');
        exit(1);
    }
};
