import { ObjectType } from '../types';

export interface ErrorEntry extends ObjectType {
    message: string;
    field?: string;
}
