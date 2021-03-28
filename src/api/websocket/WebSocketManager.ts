import {WS_URL} from '../CommonsAPI';
import {WebSocketIncomingMessage} from './WebSocketIncomingMessage';
import {WebSocketOutgoingMessage} from './WebSocketOutgoingMessage';
import Listenable from '../../utils/Listenable';

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
     * Listenable for the onopen event on the websocket
     * @private
     */
    private readonly onOpenListenable: Listenable<() => void>;

    /**
     * Listeners for when a message arrives from the websocket
     * @private
     */
    private readonly onMessageListenable: Listenable<(message: WebSocketIncomingMessage) => void>;

    /**
     * Constructs a new WebSocketManager
     */
    constructor() {
        this.onOpenListenable = new Listenable<() => void>();
        this.onMessageListenable = new Listenable<(message: WebSocketIncomingMessage) => void>();
        this.websocket = new WebSocket(WS_URL);

        this.websocket.onopen = () => {
            // Notify the listenable
            this.onOpenListenable.notify();
        };

        this.websocket.onmessage = (event) => {
            // Notify the listenable
            this.onMessageListenable.notify(JSON.parse(event.data));
        };
    }

    /**
     * Sends a message to the server
     */
    public send(message: WebSocketOutgoingMessage): void {
        this.websocket.send(JSON.stringify(message));
    }

    /**
     * Gets the ready state of the websocket
     */
    public getReadyState(): number {
        return this.websocket.readyState;
    }

    /**
     * Returns the listenable for the websocket onopen event
     */
    public getOnOpenListenable(): Listenable<() => void> {
        return this.onOpenListenable;
    }

    /**
     * Returns the listenable for the websocket onmessage event
     */
    public getOnMessageListenable(): Listenable<(message: WebSocketIncomingMessage) => void> {
        return this.onMessageListenable;
    }
}
