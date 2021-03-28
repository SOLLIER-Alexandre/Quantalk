import {CommonWebSocketMessage} from './WebSocketMessage';

/**
 * Message sent to the WebSocket to authenticate the client
 */
export interface AuthenticationWebSocketOutgoingMessage extends CommonWebSocketMessage<'authentication'> {
    /**
     * Authentication token
     */
    token: string,
}

/**
 * Messages format that can be sent to the WebSocket
 */
export type WebSocketOutgoingMessage = AuthenticationWebSocketOutgoingMessage;
