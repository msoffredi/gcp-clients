import {
    ClientCreatedEventDataType,
    ClientDeletedEventDataType,
    publisher,
} from '@msoffredi/gcp-common';

export const clientPublisher = async (
    eventData: ClientCreatedEventDataType | ClientDeletedEventDataType
): Promise<void> => {
    const msgId = await publisher(process.env.TOPIC_NAME!, eventData);

    console.log(
        'Event published:',
        JSON.stringify({
            msgId,
            topicName: process.env.TOPIC_NAME!,
            eventData,
        })
    );
};
