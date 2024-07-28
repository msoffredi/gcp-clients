import { EventTypes } from './types';

export interface BaseEventDataType {
    type: EventTypes;
    data: BaseDataType;
}

export interface BaseDataType {
    [key: string]:
        | string
        | number
        | BaseDataType
        | boolean
        | undefined
        | null
        | Date;
}

export interface BaseCRUDDataType extends BaseDataType {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}

export * from './event-data-types/client-event-data-types';
