/**
 * Common fields in a message from the WebSocket
 */
export interface CommonWebSocketMessage<MessageType extends string> {
    type: MessageType,
}
