import {BASE_API_URL} from '../CommonsAPI';
import {ChannelsFetchResponse} from './ChannelsFetchResponse';
import {ChannelsPostResponse} from './ChannelsPostResponse';

/**
 * Interacts with the server chat channels API
 */
export default abstract class ChannelAPI {
    /**
     * Fetches the chat channels stored on the server
     *
     * @param authToken Authentication token to perform the request with
     */
    public static fetchChannels(authToken: string): Promise<ChannelsFetchResponse> {
        return fetch(BASE_API_URL + '/channels', {
            headers: {
                'Authorization': 'Bearer ' + authToken,
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                return json;
            });
    }

    /**
     * Posts a new channel to the server
     *
     * @param authToken Authentication token to perform the request with
     * @param title Title of the channel to add
     */
    public static addChannel(authToken: string, title: string): Promise<ChannelsPostResponse> {
        return fetch(BASE_API_URL + '/channels', {
            method: 'POST',
            body: JSON.stringify({
                title: title,
            }),
            headers: {
                'Authorization': 'Bearer ' + authToken,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                return json;
            });
    }
}
