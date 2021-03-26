import {APIResponseFailure, APIResponseSuccess} from '../CommonsAPI';
import {MessageData} from './MessageData';

/**
 * Status code for a messages fetch response
 */
export enum MessagesFetchResponseStatus {
    STATUS_NEEDS_AUTHENTICATION = 1,
    STATUS_REQUEST_ERROR,
}

/**
 * Format for a successful response to a messages fetch request
 */
interface MessagesFetchResponseSuccess extends APIResponseSuccess {
    messages: Array<MessageData>,
}

/**
 * Format for a response to a messages fetch request
 */
export type MessagesFetchResponse = MessagesFetchResponseSuccess | APIResponseFailure<MessagesFetchResponseStatus>;
