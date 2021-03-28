export default class Listenable<T extends Function> {
    /**
     * Listeners registered to this listenable object
     * @private
     */
    private listeners: Array<T>;

    /**
     * Instantiate a new Listenable
     */
    constructor() {
        this.listeners = new Array<T>();
    }

    /**
     * Adds a listener to this listenable
     *
     * @param listener Listener to add
     */
    public addListener(listener: T): void {
        this.listeners.push(listener);
    }

    /**
     * Removes a listener from this listenable
     *
     * @param listener Listener to remove
     */
    public removeListener(listener: T): void {
        // Remove the listener
        this.listeners = this.listeners.filter((elem) => elem !== listener);
    }

    /**
     * Notifies the listener
     */
    public notify(...args: any[]): void {
        for (const listener of this.listeners) {
            listener(...args);
        }
    }
}
