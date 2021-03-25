/**
 * Common fields in a message from the WebSocket
 */
interface CommonWebSocketMessage<MessageType extends string> {
    type: MessageType,
}

/**
 * Message received from the WebSocket when a chat channel has been added
 */
export interface ChannelCreatedWebSocketMessage extends CommonWebSocketMessage<'channelCreated'> {
    id: number,
    owner: number,
    ownerUsername: string,
    title: string,
}

/**
 * Message formats received from the WebSocket
 */
export type WebSocketMessage = ChannelCreatedWebSocketMessage;
