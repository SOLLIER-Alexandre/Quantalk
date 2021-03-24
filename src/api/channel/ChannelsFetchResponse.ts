import {APIResponseFailure, APIResponseSuccess} from '../CommonsAPI';
import {ChannelData} from './ChannelData';

/**
 * Status code for a channels fetch response
 */
export enum ChannelsFetchResponseStatus {
    STATUS_NEEDS_AUTHENTICATION = 1,
    STATUS_REQUEST_ERROR,
}

/**
 * Format for a successful response to a channels fetch request
 */
interface ChannelsFetchResponseSuccess extends APIResponseSuccess {
    channels: Array<ChannelData>,
}

/**
 * Format for a response to a channels fetch request
 */
export type ChannelsFetchResponse = ChannelsFetchResponseSuccess | APIResponseFailure<ChannelsFetchResponseStatus>;
