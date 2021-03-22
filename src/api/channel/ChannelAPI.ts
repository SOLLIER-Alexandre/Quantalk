import {BASE_API_URL} from '../CommonsAPI';
import {ChannelGetResponse} from './ChannelGetResponse';

/**
 * Interacts with the server chat channels API
 */
export default abstract class ChannelAPI {
    /**
     * Fetches the chat channels stored on the server
     */
    public static fetchChannels(): Promise<ChannelGetResponse> {
        return fetch(BASE_API_URL + '/channels')
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                return json;
            });
    }
}
