/**
 * Data about a chat message
 */
export interface ChatMessage {
    id: number,
    content: string,
    sender: number,
    senderUsername: string,
    sendDate: Date,
}
