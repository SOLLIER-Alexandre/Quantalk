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
 * Message sent to the WebSocket to subscribe to a channel
 */
export interface SubscribeWebSocketOutgoingMessage extends CommonWebSocketMessage<'subscribe'> {
    /**
     * ID of the channel to subscribe to
     */
    channelId: number,
}

/**
 * Messages format that can be sent to the WebSocket
 */
export type WebSocketOutgoingMessage = AuthenticationWebSocketOutgoingMessage | SubscribeWebSocketOutgoingMessage;
