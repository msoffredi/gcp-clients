import {
    ClientCreatedEventDataType,
    ClientDeletedEventDataType,
    publisher,
} from '@msoffredi/gcp-common';

export const clientPublisher = async (
    eventData: ClientCreatedEventDataType | ClientDeletedEventDataType
): Promise<void> => {
    await publisher(process.env.TOPIC_NAME!, eventData);
};
