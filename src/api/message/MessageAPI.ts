import {MessagesFetchResponse} from './MessageFetchResponse';
import {BASE_API_URL} from '../CommonsAPI';

/**
 * Interacts with the server chat messages API
 */
export default abstract class MessageAPI {
    /**
     * Fetches messages of a chat channel from the server
     *
     * @param authToken Authentication token to perform the request with
     * @param channelId ID of the channel to fetch messages from
     */
    public static fetchMessages(authToken: string, channelId: number): Promise<MessagesFetchResponse> {
        return fetch(BASE_API_URL + '/messages/' + channelId, {
            headers: {
                'Authorization': 'Bearer ' + authToken,
            },
        })
            .then((res) => {
                return res.text();
            })
            .then((text) => {
                return JSON.parse(text, (key, value) => {
                    // Convert the send date to a JS Date object
                    if (key === 'sendDate') {
                        return new Date(value);
                    }

                    return value;
                });
            });
    }
}
