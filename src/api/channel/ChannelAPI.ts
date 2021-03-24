import {BASE_API_URL} from '../CommonsAPI';
import {ChannelsFetchResponse} from './ChannelsFetchResponse';

/**
 * Interacts with the server chat channels API
 */
export default abstract class ChannelAPI {
    /**
     * Fetches the chat channels stored on the server
     */
    public static fetchChannels(): Promise<ChannelsFetchResponse> {
        return fetch(BASE_API_URL + '/channels')
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
     * @param title Title of the channel to add
     */
    public static addChannel(title: string): Promise<void> {
        return fetch(BASE_API_URL + '/channels', {
            method: 'POST',
            body: JSON.stringify({}),
        })
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                return json;
            });
    }
}
