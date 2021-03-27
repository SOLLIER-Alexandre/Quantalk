import {MessagesFetchResponse} from './MessageFetchResponse';
import {BASE_API_URL} from '../CommonsAPI';
import {MessageSendResponse} from './MessageSendResponse';

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

    /**
     * Sends a message to the specified chat channel to the server
     *
     * @param authToken Authentication token to perform the request with
     * @param channelId ID of the channel to send the message to
     * @param content Content of the message
     */
    public static sendMessage(authToken: string, channelId: number, content: string): Promise<MessageSendResponse> {
        return fetch(BASE_API_URL + '/messages/' + channelId, {
            method: 'POST',
            body: JSON.stringify({
                content: content,
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
