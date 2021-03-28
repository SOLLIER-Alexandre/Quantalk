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
 * Message formats received from the WebSocket
 */
export type WebSocketIncomingMessage = ChannelCreatedWebSocketIncomingMessage;
