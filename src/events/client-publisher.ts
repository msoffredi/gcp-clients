import {
    ClientCreatedEventDataType,
    ClientDeletedEventDataType,
    ClientUpdatedEventDataType,
} from './event-data-types-all';
import { publisher } from './publisher';

export const clientPublisher = async (
    eventData:
        | ClientCreatedEventDataType
        | ClientUpdatedEventDataType
        | ClientDeletedEventDataType
): Promise<void> => {
    await publisher(process.env.TOPIC_NAME!, eventData);
};
