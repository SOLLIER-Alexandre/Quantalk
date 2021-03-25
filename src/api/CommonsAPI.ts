/**
 * Base URL of the API
 * @private
 */
export const BASE_API_URL: string = 'https://jsiutinfo.alwaysdata.net/api';

/**
 * WebSocket URL
 */
export const WS_URL: string = 'wss://jsiutinfo.alwaysdata.net/api/ws';

/**
 * Common format for an API successful response
 */
export interface APIResponseSuccess {
    error: false,
}

/**
 * Common format for an API failed response
 */
export interface APIResponseFailure<T extends number> {
    error: true,
    status: T,
    message: string,
}
