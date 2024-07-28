import mongoose from 'mongoose';

export interface ClientRecord {
    name: string;
}

interface ClientDoc extends mongoose.Document, ClientRecord {}

interface ClientModel extends mongoose.Model<ClientDoc> {
    build(newClient: ClientRecord): ClientDoc;
}

const clientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

clientSchema.set('toObject', {
    versionKey: false,
}).statics.build = (newClient: ClientRecord) => {
    return new Client(newClient);
};

const Client = mongoose.model<ClientDoc, ClientModel>('Client', clientSchema);

export { Client };
