import {useEffect, useState} from 'react';
import AuthenticationAPI from './AuthenticationAPI';
import {JWTData} from './JWTData';

/**
 * Interface describing the data about the logged in user
 */
export interface LoggedInUserData {
    jwt: string,
    id: number,
    username?: string,
}

/**
 * Manages everything related to user authentication
 */
class AuthenticationManager {
    /**
     * Data about the logged in user
     * @private
     */
    private loggedInUser?: LoggedInUserData;

    /**
     * Listeners for callbacks called when the logged in user changed
     * @private
     */
    private onLoggedInUserChangeListeners: Array<(loggedInUser?: LoggedInUserData) => void> = [];

    /**
     * Constructs a new AuthenticationManager
     */
    constructor() {
        // Get the JWT from the cookie
        const authCookie = AuthenticationManager.getAuthCookie();

        if (authCookie !== undefined) {
            // Get user ID from the token
            const userId = AuthenticationManager.getUserIdFromToken(authCookie);

            if (userId !== undefined) {
                // Set the logged in user without the username temporarily
                this.setLoggedInUser({
                    jwt: authCookie,
                    id: userId,
                });

                AuthenticationAPI.fetchProfile('Bearer ' + authCookie)
                    .then((response) => {
                        if (!response.error) {
                            // Set the logged in user
                            this.setLoggedInUser({
                                jwt: authCookie,
                                id: response.id,
                                username: response.username,
                            });
                        }
                    });
            }
        }
    }

    /**
     * Handles a received authentication JWT, saving it in a cookie and in the logged in user data
     *
     * @param jwt JWT to handle
     * @private
     */
    public handleJWT(jwt: string): Promise<boolean> {
        // Get the profile
        return AuthenticationAPI.fetchProfile('Bearer ' + jwt)
            .then((response) => {
                if (!response.error) {
                    // Set the JWT to the cookie
                    AuthenticationManager.setAuthCookie(jwt);

                    // Set the logged in user
                    this.setLoggedInUser({
                        jwt: jwt,
                        id: response.id,
                        username: response.username,
                    });
                }

                return !response.error;
            });
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
    public static getAuthCookie(): string | undefined {
        return document.cookie
            .split('; ')
            .find(row => row.startsWith('AUTH_JWT='))
            ?.split('=')[1];
    }

    /**
     * Refreshes the expiration date on the auth cookie
     */
    public static refreshCookie(): void {
        // Refresh the current cookie if there is one set
        const currentCookie: string | undefined = this.getAuthCookie();

        if (currentCookie !== undefined) {
            AuthenticationManager.setAuthCookie(currentCookie);
        }
    }

    /**
     * Logs out the user
     */
    public logout(): void {
        // Unset the auth cookie
        document.cookie = 'AUTH_JWT=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict';

        // Unset the logged in user
        this.setLoggedInUser(undefined);
    }

    /**
     * Sets the currently logged in user
     *
     * @param loggedInUser New currently logged in user
     */
    public setLoggedInUser(loggedInUser?: LoggedInUserData): void {
        this.loggedInUser = loggedInUser;

        // Tell the listeners we got a new JWT
        for (const listener of this.onLoggedInUserChangeListeners) {
            listener(this.loggedInUser);
        }
    }

    /**
     * Gets the currently logged in user
     *
     * @return The currently logged in user
     */
    public getLoggedInUser(): LoggedInUserData | undefined {
        return this.loggedInUser;
    }

    /**
     * Gets the User ID from a JWT
     *
     * @param jwt JWT to parse
     * @private
     */
    private static getUserIdFromToken(jwt: string): number | undefined {
        // Parse the JWT
        const jwtParts = jwt.split('.');

        if (jwtParts.length === 3) {
            // Get data from the JWT
            const data: JWTData = JSON.parse(atob(jwtParts[1]));

            return data.id;
        }
    }

    /**
     * Adds a new callback called when the logged in user changes to the listeners
     *
     * @param listener Listener to add
     */
    public addOnLoggedInUserChangeListener(listener: (loggedInUser?: LoggedInUserData) => void): void {
        this.onLoggedInUserChangeListeners.push(listener);
    }

    /**
     * Removes a callback called when the logged in user changes from the listeners
     *
     * @param listener Listener to remove
     */
    public removeOnLoggedInUserChangeListener(listener: (loggedInUser?: LoggedInUserData) => void): void {
        this.onLoggedInUserChangeListeners = this.onLoggedInUserChangeListeners.filter((item) => item !== listener);
    }
}

/**
 * The single instance of the AuthenticationManager
 */
const authenticationManager: AuthenticationManager = new AuthenticationManager();
export default authenticationManager;

/**
 * Hook returning the currently logged in user data, if any
 */
export const useLoggedInUser = (): LoggedInUserData | undefined => {
    const [loggedInUser, setLoggedInUser] = useState<LoggedInUserData | undefined>(authenticationManager.getLoggedInUser());

    useEffect(() => {
        const loggedInUserChangeListener = (loggedInUser?: LoggedInUserData): void => {
            setLoggedInUser(loggedInUser);
        };

        authenticationManager.addOnLoggedInUserChangeListener(loggedInUserChangeListener);
        return () => {
            authenticationManager.removeOnLoggedInUserChangeListener(loggedInUserChangeListener);
        };
    });

    return loggedInUser;
};
