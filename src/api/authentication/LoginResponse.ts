/**
 * Status code for a lgoin response
 */
export enum LoginResponseStatus {
    STATUS_REQUEST_ERROR = 1,
    STATUS_INVALID_CREDENTIALS,
}

/**
 * Format for a successful response to a login request
 */
interface LoginResponseSuccess {
    error: false,
    token: string,
}

/**
 * Format for a failed response to a login request
 */
interface LoginResponseFailure {
    error: true,
    status: LoginResponseStatus,
    message: string,
}

/**
 * Format for a response to a login request
 */
export type LoginResponse = LoginResponseSuccess | LoginResponseFailure;
