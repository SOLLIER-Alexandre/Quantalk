import {APIResponseFailure, APIResponseSuccess} from '../CommonsAPI';
import User from '../../models/User';

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
type ProfileResponseSuccess = APIResponseSuccess & User;

/**
 * Format for a response to a profile request
 */
export type ProfileResponse = ProfileResponseSuccess | APIResponseFailure<ProfileResponseStatus>;
