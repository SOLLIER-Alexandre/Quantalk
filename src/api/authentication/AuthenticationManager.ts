import {RegisterResponse} from './RegisterResponse';
import {LoginResponse} from './LoginResponse';
import {useEffect, useState} from 'react';
import {JWTData} from './JWTData';

/**
 * Manages everything related to user authentication
 */
export class AuthenticationManager {
    /**
     * Base URL of the API
     * @private
     */
    private static readonly BASE_URL: string = 'https://jsiutinfo.alwaysdata.net/api';

    /**
     * The instance of the AuthenticationManager singleton
     * @private
     */
    private static readonly INSTANCE: AuthenticationManager = new AuthenticationManager();

    /**
     * Listeners for callbacks called when the logged in user changed
     * @private
     */
    private onLoggedInUserChangeListeners: Array<(userId?: number) => void> = [];

    /**
     * Gets the instance of the AuthenticationManager singleton
     */
    public static getInstance(): AuthenticationManager {
        return AuthenticationManager.INSTANCE;
    }

    /**
     * Tries to login or register the user against the server
     *
     * @param url URL of the API endpoint to call
     * @param username Username of the user to login/register
     * @param password Password of the user to login/register
     * @private
     */
    private static loginOrRegister(url: string, username: string, password: string): Promise<any> {
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json();
            });
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
     * Tries to register a new user against the server using the specified credentials
     *
     * @param username Username of the new user
     * @param password Password of the new user
     */
    public register(username: string, password: string): Promise<RegisterResponse> {
        return AuthenticationManager.loginOrRegister(AuthenticationManager.BASE_URL + '/register', username, password)
            .then((json) => {
                const response: RegisterResponse = json;
                if (!response.error) {
                    // Handle the token
                    this.storeJWT(response.token);
                }

                return response;
            });
    }

    /**
     * Tries to login the user against the server using the specified credentials
     *
     * @param username Username of the user
     * @param password Password of the user
     */
    public login(username: string, password: string): Promise<LoginResponse> {
        return AuthenticationManager.loginOrRegister(AuthenticationManager.BASE_URL + '/login', username, password)
            .then((json) => {
                const response: LoginResponse = json;
                if (!response.error) {
                    // Handle the token
                    this.storeJWT(response.token);
                }

                return response;
            });
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
     * Gets the authentication token from the cookie
     */
    public getAuthToken(): string | undefined {
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
        const currentCookie: string | undefined = this.getAuthToken();

        if (currentCookie !== undefined) {
            AuthenticationManager.setAuthCookie(currentCookie);
        }
    }

    /**
     * Gets the User ID from the JWT stored in the cookie
     */
    public getUserIdFromCookie(): number | undefined {
        const authToken = this.getAuthToken();

        if (authToken !== undefined) {
            // Parse the user ID from the token
            return AuthenticationManager.getUserIdFromToken(authToken);
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

    /**
     * Stores a received authentication JWT
     *
     * @param jwt JWT to store
     * @private
     */
    private storeJWT(jwt: string): void {
        // Parse the JWT
        const userId = AuthenticationManager.getUserIdFromToken(jwt);

        for (const listener of this.onLoggedInUserChangeListeners) {
            listener(userId);
        }

        // Set the JWT to the cookie
        AuthenticationManager.setAuthCookie(jwt);
    }
}

/**
 * Hook returning the currently logged in user ID, if any
 */
export const useLoggedInUser = (): number | undefined => {
    const [userId, setUserId] = useState<number | undefined>(AuthenticationManager.getInstance().getUserIdFromCookie());

    useEffect(() => {
        const loggedInUserChangeListener = (userId?: number): void => {
            setUserId(userId);
        };

        AuthenticationManager.getInstance().addOnLoggedInUserChangeListener(loggedInUserChangeListener);
        return () => {
            AuthenticationManager.getInstance().removeOnLoggedInUserChangeListener(loggedInUserChangeListener);
        };
    });

    return userId;
};
