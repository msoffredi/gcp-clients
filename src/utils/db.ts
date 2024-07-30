import { MongoDBHelper } from '@msoffredi/gcp-common';

export const startDb = async () => {
    await MongoDBHelper.startDb(
        String(process.env.DB_HOST),
        String(process.env.DB_USER),
        String(process.env.DB_PASSWORD),
        String(process.env.DB_NAME)
    );
};
