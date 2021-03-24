import {APIResponseFailure, APIResponseSuccess} from '../CommonsAPI';

/**
 * Status code for a channels post response
 */
export enum ChannelsPostResponseStatus {
    STATUS_NEEDS_AUTHENTICATION = 1,
    STATUS_REQUEST_ERROR,
}

/**
 * Format for a successful response to a channels post request
 */
interface ChannelPostResponseSuccess extends APIResponseSuccess {
    channelId: number,
}

/**
 * Format for a response to a channels post request
 */
export type ChannelsPostResponse = ChannelPostResponseSuccess | APIResponseFailure<ChannelsPostResponseStatus>;
