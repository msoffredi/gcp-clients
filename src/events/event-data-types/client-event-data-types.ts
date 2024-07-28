import { BaseCRUDDataType, BaseEventDataType } from '../event-data-types-all';
import { EventTypes } from '../types';

export interface BaseCRUDClientDataType extends BaseCRUDDataType {
    name: string;
}

export interface ClientCreatedEventDataType extends BaseEventDataType {
    type: EventTypes.ClientCreated;
    data: BaseCRUDClientDataType;
}

export interface ClientUpdatedEventDataType extends BaseEventDataType {
    type: EventTypes.ClientUpdated;
    data: BaseCRUDClientDataType;
}

export interface ClientDeletedEventDataType extends BaseEventDataType {
    type: EventTypes.ClientDeleted;
    data: BaseCRUDClientDataType;
}
