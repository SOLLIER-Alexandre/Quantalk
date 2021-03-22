import {RegisterResponse} from './RegisterResponse';
import {BASE_API_URL} from '../CommonsAPI';
import {LoginResponse} from './LoginResponse';
import {ProfileResponse} from './ProfileResponse';

/**
 * Interacts with the server authentication API
 */
export default abstract class AuthenticationAPI {
    /**
     * Tries to register a new user against the server using the specified credentials
     *
     * @param username Username of the new user
     * @param password Password of the new user
     */
    public static register(username: string, password: string): Promise<RegisterResponse> {
        return AuthenticationAPI.loginOrRegister<RegisterResponse>(BASE_API_URL + '/register', username, password);
    }

    /**
     * Tries to login the user against the server using the specified credentials
     *
     * @param username Username of the user
     * @param password Password of the user
     */
    public static login(username: string, password: string): Promise<LoginResponse> {
        return AuthenticationAPI.loginOrRegister<LoginResponse>(BASE_API_URL + '/login', username, password);
    }

    /**
     * Tries to login or register the user against the server
     * (We can use the same code for both because they're very similar)
     *
     * @param url URL of the API endpoint to call
     * @param username Username of the user to login/register
     * @param password Password of the user to login/register
     * @private
     */
    private static loginOrRegister<T>(url: string, username: string, password: string): Promise<T> {
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
            })
            .then((json) => {
                return json;
            });
    }

    public static fetchProfile(authorization: string): Promise<ProfileResponse> {
        return fetch(BASE_API_URL + '/profile', {
            headers: {
                'Authorization': authorization,
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                return json;
            });
    }
}
