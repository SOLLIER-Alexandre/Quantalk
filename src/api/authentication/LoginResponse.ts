import {APIResponseFailure, APIResponseSuccess} from '../CommonsAPI';

/**
 * Status code for a login response
 */
export enum LoginResponseStatus {
    STATUS_REQUEST_ERROR = 1,
    STATUS_INVALID_CREDENTIALS,
}

/**
 * Format for a successful response to a login request
 */
interface LoginResponseSuccess extends APIResponseSuccess {
    token: string,
}

/**
 * Format for a response to a login request
 */
export type LoginResponse = LoginResponseSuccess | APIResponseFailure<LoginResponseStatus>;
