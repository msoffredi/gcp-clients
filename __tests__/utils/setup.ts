import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

// Environment variables
process.env.DB_USER = 'user';
process.env.DB_PASSWORD = 'password';
process.env.DB_HOST = 'host';
process.env.DB_NAME = 'database_name';
process.env.TOPIC_NAME = 'topic_name';

if (!process.env.DEBUG) {
    global.console.log = jest.fn();
    global.console.error = jest.fn();
}

let mongo: MongoMemoryServer;

beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {});
});

afterAll(async () => {
    if (mongo) {
        await mongo.stop();
    }
    await mongoose.connection.close();
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});
