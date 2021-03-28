import {CommonWebSocketMessage} from './WebSocketMessage';

/**
 * Message received from the WebSocket when a chat channel has been added
 */
export interface ChannelCreatedWebSocketIncomingMessage extends CommonWebSocketMessage<'channelCreated'> {
    /**
     * ID of the created channel
     */
    id: number,

    /**
     * ID of the channel owner
     */
    owner: number,

    /**
     * Username of the channel owner
     */
    ownerUsername: string,

    /**
     * Title of the channel
     */
    title: string,
}

/**
 * Message received from the WebSocket when a message has been sent
 */
export interface MessageSentWebSocketIncomingMessage extends CommonWebSocketMessage<'messageSent'> {
    /**
     * ID of the sent message
     */
    id: number,

    /**
     * ID of the message sender
     */
    sender: number,

    /**
     * Username of the message sender
     */
    senderUsername: string,

    /**
     * ID of the channel the message was sent in
     */
    channel: number,

    /**
     * Message contents
     */
    content: string,

    /**
     * Date when the message was sent
     */
    sendDate: number,
}

/**
 * Message formats received from the WebSocket
 */
export type WebSocketIncomingMessage = ChannelCreatedWebSocketIncomingMessage | MessageSentWebSocketIncomingMessage;
