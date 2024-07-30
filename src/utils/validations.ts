import { ValidationHelper } from '@msoffredi/gcp-common';
import { exit } from 'process';

export const validateEnvVars = (): void => {
    // Validating environment variables
    if (
        !ValidationHelper.checkEnvVar('DB_NAME') ||
        !ValidationHelper.checkEnvVar('DB_USER') ||
        !ValidationHelper.checkEnvVar('DB_PASSWORD') ||
        !ValidationHelper.checkEnvVar('DB_HOST') ||
        !ValidationHelper.checkEnvVar('TOPIC_NAME')
    ) {
        exit(1);
    }
};
