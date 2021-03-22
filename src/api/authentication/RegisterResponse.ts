import {APIResponseFailure, APIResponseSuccess} from '../CommonsAPI';

/**
 * Status code for a register response
 */
export enum RegisterResponseStatus {
    STATUS_REQUEST_ERROR = 1,
    STATUS_USER_ALREADY_EXISTS,
}

/**
 * Format for a successful response to a register request
 */
interface RegisterResponseSuccess extends APIResponseSuccess {
    token: string,
}

/**
 * Format for a response to a register request
 */
export type RegisterResponse = RegisterResponseSuccess | APIResponseFailure<RegisterResponseStatus>;
