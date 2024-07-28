import mongoose from 'mongoose';

export class MongoDBHelper {
    public static startDb = async (): Promise<void> => {
        if (!mongoose.connection.readyState) {
            await mongoose.connect(String(process.env.DB_HOST), {
                user: String(process.env.DB_USER),
                pass: String(process.env.DB_PASSWORD),
                dbName: String(process.env.DB_NAME),
            });
        }
    };

    public static stopDb = async (): Promise<void> => {
        await mongoose.connection.close();
    };
}
