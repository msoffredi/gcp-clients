import {
    ClientCreatedEventDataType,
    ClientDeletedEventDataType,
} from './event-data-types-all';
import { publisher } from './publisher';

export const clientPublisher = async (
    eventData: ClientCreatedEventDataType | ClientDeletedEventDataType
): Promise<void> => {
    await publisher(process.env.TOPIC_NAME!, eventData);
};
