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
interface RegisterResponseSuccess {
    error: false,
    token: string,
}

/**
 * Format for a failed response to a register request
 */
interface RegisterResponseFailure {
    error: true,
    status: RegisterResponseStatus,
    message: string,
}

/**
 * Format for a response to a register request
 */
export type RegisterResponse = RegisterResponseSuccess | RegisterResponseFailure;
