import {useEffect, useState} from 'react';
import {JWTData} from './JWTData';

/**
 * Manages everything related to user authentication
 */
class AuthenticationManager {
    /**
     * Listeners for callbacks called when the logged in user changed
     * @private
     */
    private onLoggedInUserChangeListeners: Array<(userId?: number) => void> = [];

    /**
     * Stores a received authentication JWT
     *
     * @param jwt JWT to store
     * @private
     */
    public storeJWT(jwt: string): void {
        // Parse the JWT
        const userId = AuthenticationManager.getUserIdFromJWT(jwt);

        // Tell the listeners we got a new JWT
        for (const listener of this.onLoggedInUserChangeListeners) {
            listener(userId);
        }

        // Set the JWT to the cookie
        AuthenticationManager.setAuthCookie(jwt);
    }

    /**
     * Sets the authentication cookie
     *
     * @param jwt JSON Web Token to remember
     * @private
     */
    private static setAuthCookie(jwt: string): void {
        // Compute expire date
        const date: Date = new Date();
        date.setDate(date.getDate() + 30);

        // Set the cookie
        document.cookie = `AUTH_JWT=${jwt}; Secure; SameSite=Strict; Expires=${date.toString()}`;
    }

    /**
     * Gets the authentication token from the cookie
     */
    public getAuthCookie(): string | undefined {
        return document.cookie
            .split('; ')
            .find(row => row.startsWith('AUTH_JWT='))
            ?.split('=')[1];
    }

    /**
     * Refreshes the expiration date on the auth cookie
     */
    public refreshCookie(): void {
        // Refresh the current cookie if there is one set
        const currentCookie: string | undefined = this.getAuthCookie();

        if (currentCookie !== undefined) {
            AuthenticationManager.setAuthCookie(currentCookie);
        }
    }

    /**
     * Gets the User ID from the JWT stored in the cookie
     */
    public getUserIdFromCookie(): number | undefined {
        const authToken = this.getAuthCookie();

        if (authToken !== undefined) {
            // Parse the user ID from the token
            return AuthenticationManager.getUserIdFromJWT(authToken);
        }
    }

    /**
     * Gets the User ID from a JWT
     *
     * @param jwt JWT to parse
     * @private
     */
    private static getUserIdFromJWT(jwt: string): number | undefined {
        // Parse the JWT
        const jwtParts = jwt.split('.');

        if (jwtParts.length === 3) {
            // Get data from the JWT
            const data: JWTData = JSON.parse(atob(jwtParts[1]));

            return data.id;
        }
    }

    /**
     * Logs out the user
     */
    public logout(): void {
        // Unset the auth cookie
        document.cookie = 'AUTH_JWT=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict';

        // Inform the listeners
        for (const listener of this.onLoggedInUserChangeListeners) {
            listener(undefined);
        }
    }

    /**
     * Adds a new callback called when the logged in user changes to the listeners
     *
     * @param listener Listener to add
     */
    public addOnLoggedInUserChangeListener(listener: (userId?: number) => void): void {
        this.onLoggedInUserChangeListeners.push(listener);
    }

    /**
     * Removes a callback called when the logged in user changes from the listeners
     *
     * @param listener Listener to remove
     */
    public removeOnLoggedInUserChangeListener(listener: (userId?: number) => void): void {
        this.onLoggedInUserChangeListeners = this.onLoggedInUserChangeListeners.filter((item) => {
            return item !== listener;
        });
    }
}

/**
 * The single instance of the AuthenticationManager
 */
const authenticationManager: AuthenticationManager = new AuthenticationManager();
export default authenticationManager;

/**
 * Hook returning the currently logged in user ID, if any
 */
export const useLoggedInUser = (): number | undefined => {
    const [userId, setUserId] = useState<number | undefined>(authenticationManager.getUserIdFromCookie());

    useEffect(() => {
        const loggedInUserChangeListener = (userId?: number): void => {
            setUserId(userId);
        };

        authenticationManager.addOnLoggedInUserChangeListener(loggedInUserChangeListener);
        return () => {
            authenticationManager.removeOnLoggedInUserChangeListener(loggedInUserChangeListener);
        };
    });

    return userId;
};
