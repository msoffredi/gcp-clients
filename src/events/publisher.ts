import { PubSub } from '@google-cloud/pubsub';
import { BaseEventDataType } from './event-data-types-all';

export const publisher = async (
    topicName: string,
    eventData: BaseEventDataType,
    pubSubClient?: PubSub
): Promise<void> => {
    const myPubSubClient = pubSubClient || new PubSub();
    const dataBuffer = Buffer.from(JSON.stringify(eventData.data));

    const msgId = await myPubSubClient.topic(topicName).publishMessage({
        data: dataBuffer,
        attributes: { type: eventData.type },
    });

    console.log('Event published:', {
        msgId,
        topicName,
        eventData,
    });
};
