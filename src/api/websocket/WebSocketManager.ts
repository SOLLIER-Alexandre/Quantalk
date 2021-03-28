import {WS_URL} from '../CommonsAPI';
import {WebSocketIncomingMessage} from './WebSocketIncomingMessage';

/**
 * Manages the WS connection to the server
 */
export class WebSocketManager {
    /**
     * The WebSocket connection handle
     * @private
     */
    private websocket: WebSocket;

    /**
     * Listeners for the onerror event on the websocket
     * @private
     */
    private readonly onErrorListeners: Array<() => void>;

    /**
     * Listeners for when a message arrives from the websocket
     * @private
     */
    private readonly onMessageListeners: Array<(message: WebSocketIncomingMessage) => void>;

    /**
     * Constructs a new WebSocketManager
     */
    constructor() {
        this.onErrorListeners = new Array<() => void>();
        this.onMessageListeners = new Array<() => void>();
        this.websocket = new WebSocket(WS_URL);

        this.websocket.onerror = () => {
            // Call every on error listeners
            for (const listener of this.onErrorListeners) {
                listener();
            }
        };

        this.websocket.onmessage = (event) => {
            // Call every on message listeners
            for (const listener of this.onMessageListeners) {
                listener(JSON.parse(event.data));
            }
        };
    }

    /**
     * Disconnects the websocket from the server
     */
    public disconnect(): void {
        this.websocket.close();
    }

    /**
     * Adds an event listener for when an error is fired on the websocket
     *
     * @param listener Listener to add
     */
    public addOnErrorListener(listener: () => void): void {
        this.onErrorListeners.push(listener);
    }

    /**
     * Removes an event listener for when an error is fired on the websocket
     *
     * @param listener Listener to remove
     */
    public removeOnErrorListener(listener: () => void): void {
        this.onErrorListeners.filter((elem) => elem !== listener);
    }

    /**
     * Adds an event listener for when a message is received on the websocket
     *
     * @param listener Listener to add
     */
    public addOnMessageListener(listener: (message: WebSocketIncomingMessage) => void): void {
        this.onMessageListeners.push(listener);
    }

    /**
     * Removes an event listener for when a message is received on the websocket
     *
     * @param listener Listener to remove
     */
    public removeOnMessageListener(listener: (message: WebSocketIncomingMessage) => void): void {
        this.onMessageListeners.filter((elem) => elem !== listener);
    }
}
