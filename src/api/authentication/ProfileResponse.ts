import {APIResponseFailure, APIResponseSuccess} from '../CommonsAPI';

/**
 * Status code for a profile response
 */
export enum ProfileResponseStatus {
    STATUS_NEEDS_AUTHENTICATION = 1,
    STATUS_REQUEST_ERROR,
}

/**
 * Format for a successful response to a profile request
 */
interface ProfileResponseSuccess extends APIResponseSuccess {
    id: number,
    username: string,
}

/**
 * Format for a response to a profile request
 */
export type ProfileResponse = ProfileResponseSuccess | APIResponseFailure<ProfileResponseStatus>;
