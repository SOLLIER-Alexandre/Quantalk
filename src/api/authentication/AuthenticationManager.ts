import {useEffect, useState} from 'react';
import AuthenticationAPI from './AuthenticationAPI';
import {JWTData} from './JWTData';
import Listenable from '../../utils/Listenable';
import User from '../../models/User';

/**
 * Interface describing the data about the logged in user
 */
export interface LoggedInUserData {
    jwt: string,
    id: number,
}

/**
 * Manages everything related to user authentication
 */
class AuthenticationManager {
    /**
     * Confidential data about the logged in user
     * @private
     */
    private loggedInUserData?: LoggedInUserData;

    /**
     * Logged in user profile data
     * @private
     */
    private loggedInUserProfile?: User;

    /**
     * Listeners for callbacks called when the logged in user data changed
     * @private
     */
    private readonly onLoggedInUserDataChangeListenable: Listenable<(loggedInUserData?: LoggedInUserData) => void>;

    /**
     * Listeners for callbacks called when the logged in user profile changed
     * @private
     */
    private readonly onLoggedInUserProfileChangeListenable: Listenable<(loggedInUserProfile?: User) => void>;

    /**
     * Constructs a new AuthenticationManager
     */
    constructor() {
        this.onLoggedInUserDataChangeListenable = new Listenable<(loggedInUser?: LoggedInUserData) => void>();
        this.onLoggedInUserProfileChangeListenable = new Listenable<(loggedInUserProfile?: User) => void>();

        // Get the JWT from the cookie
        const authCookie = AuthenticationManager.getAuthCookie();

        if (authCookie !== undefined) {
            // Get user ID from the token
            const userId = AuthenticationManager.getUserIdFromToken(authCookie);

            if (userId !== undefined) {
                // Set the logged in user data
                this.setLoggedInUserData({
                    jwt: authCookie,
                    id: userId,
                });

                AuthenticationAPI.fetchProfile('Bearer ' + authCookie)
                    .then((response) => {
                        if (!response.error) {
                            // Set the logged in user profile
                            this.setLoggedInUserProfile({
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

                    // Set the logged in user data and profile
                    this.setLoggedInUserData({
                        jwt: jwt,
                        id: response.id,
                    });

                    this.setLoggedInUserProfile({
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
        this.setLoggedInUserData(undefined);
        this.setLoggedInUserProfile(undefined);
    }

    /**
     * Sets the currently logged in user data
     *
     * @param loggedInUserData New currently logged in user data
     */
    public setLoggedInUserData(loggedInUserData?: LoggedInUserData): void {
        this.loggedInUserData = loggedInUserData;

        // Tell the listeners we got a new logged in user data
        this.onLoggedInUserDataChangeListenable.notify(this.loggedInUserData);
    }

    /**
     * Gets the currently logged in user data
     *
     * @return The currently logged in user data
     */
    public getLoggedInUserData(): LoggedInUserData | undefined {
        return this.loggedInUserData;
    }

    /**
     * Sets the currently logged in user profile
     *
     * @param loggedInUserProfile New currently logged in user profile
     */
    public setLoggedInUserProfile(loggedInUserProfile?: User): void {
        this.loggedInUserProfile = loggedInUserProfile;

        // Tell the listeners we got a new logged in user profile
        this.onLoggedInUserProfileChangeListenable.notify(this.loggedInUserProfile);
    }

    /**
     * Gets the currently logged in user profile
     *
     * @return The currently logged in user profile
     */
    public getLoggedInUserProfile(): User | undefined {
        return this.loggedInUserProfile;
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
     * Gets the listenable for when the logged in user data has changed
     */
    public getOnLoggedInUserDataChangeListenable(): Listenable<(loggedInUserData?: LoggedInUserData) => void> {
        return this.onLoggedInUserDataChangeListenable;
    }

    /**
     * Gets the listenable for when the logged in user profile has changed
     */
    public getOnLoggedInUserProfileChangeListenable(): Listenable<(loggedInUserProfile?: User) => void> {
        return this.onLoggedInUserProfileChangeListenable;
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
export const useLoggedInUserData = (): LoggedInUserData | undefined => {
    const [loggedInUserData, setLoggedInUserData] = useState<LoggedInUserData | undefined>(authenticationManager.getLoggedInUserData());

    useEffect(() => {
        const loggedInUserDataChangeListener = (newLoggedInUserData?: LoggedInUserData): void => {
            setLoggedInUserData(newLoggedInUserData);
        };

        // Add the listener to update the state when needed
        authenticationManager.getOnLoggedInUserDataChangeListenable().addListener(loggedInUserDataChangeListener);

        return () => {
            // Remove the listener, it's no longer needed
            authenticationManager.getOnLoggedInUserDataChangeListenable().removeListener(loggedInUserDataChangeListener);
        };
    });

    return loggedInUserData;
};

/**
 * Hook returning the currently logged in user profile, if any
 */
export const useLoggedInUserProfile = (): User | undefined => {
    const [loggedInUserProfile, setLoggedInUserProfile] = useState<User | undefined>(authenticationManager.getLoggedInUserProfile());

    useEffect(() => {
        const loggedInUserProfileChangeListener = (newLoggedInUserProfile?: User): void => {
            setLoggedInUserProfile(newLoggedInUserProfile);
        };

        // Because this is a network fetched resource, we need to check its value in the useEffect as well
        const currentLoggedInUserProfile: User | undefined = authenticationManager.getLoggedInUserProfile();

        if (loggedInUserProfile !== currentLoggedInUserProfile) {
            setLoggedInUserProfile(currentLoggedInUserProfile);
        }

        // Add the listener to update the state when needed
        authenticationManager.getOnLoggedInUserProfileChangeListenable().addListener(loggedInUserProfileChangeListener);

        return () => {
            // Remove the listener, it's no longer needed
            authenticationManager.getOnLoggedInUserProfileChangeListenable().removeListener(loggedInUserProfileChangeListener);
        };
    }, [loggedInUserProfile]);

    return loggedInUserProfile;
};
