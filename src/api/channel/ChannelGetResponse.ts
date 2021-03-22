import {APIResponseFailure, APIResponseSuccess} from '../CommonsAPI';

/**
 * Status code for a login response
 */
export enum ChannelGetResponseStatus {
    STATUS_NEEDS_AUTHENTICATION = 1,
    STATUS_REQUEST_ERROR,
}

/**
 * Format for a successful response to a channel get request
 */
interface ChannelGetResponseSuccess extends APIResponseSuccess {
    channels: Array<ChannelGetResponseDataEntry>,
}

/**
 * Format for a response to a channel get request
 */
export type ChannelGetResponse = ChannelGetResponseSuccess | APIResponseFailure<ChannelGetResponseStatus>;

/**
 * An entry in the channel get response data array
 */
export interface ChannelGetResponseDataEntry {
    id: number,
    owner: number,
    ownerUsername: string,
    title: string,
}
