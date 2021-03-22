/**
 * Format for a successful response to a channel get request
 */
interface ChannelGetResponseSuccess {
    error: false,
    channels: Array<ChannelGetResponseDataEntry>,
}

/**
 * Format for a failed response to a channel get request
 */
interface ChannelGetResponseFailure {
    error: true,
    status: number,
    message: string,
}

/**
 * Format for a response to a channel get request
 */
export type ChannelGetResponse = ChannelGetResponseSuccess | ChannelGetResponseFailure;

/**
 * An entry in the channel get response data array
 */
export interface ChannelGetResponseDataEntry {
    id: number,
    owner: number,
    ownerUsername: string,
    title: string,
}
