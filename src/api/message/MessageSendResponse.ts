import {APIResponseFailure, APIResponseSuccess} from '../CommonsAPI';

/**
 * Status code for a message send response
 */
export enum MessageSendResponseStatus {
    STATUS_NEEDS_AUTHENTICATION = 1,
    STATUS_REQUEST_ERROR,
    CREATION_ERROR,
}

/**
 * Format for a successful response to a message send request
 */
interface MessageSendResponseSuccess extends APIResponseSuccess {
    messageId: number,
}

/**
 * Format for a response to a message send request
 */
export type MessageSendResponse = MessageSendResponseSuccess | APIResponseFailure<MessageSendResponseStatus>;
