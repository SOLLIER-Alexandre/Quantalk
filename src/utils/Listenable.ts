export default class Listenable<T extends Function> {
    /**
     * Listeners registered to this listenable object
     * @private
     */
    private readonly listeners: Array<T>;

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
        // Find the listener in the array
        let index: number = this.listeners.indexOf(listener);

        if (index !== -1) {
            // Remove the listener
            this.listeners.splice(0);
        }
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
