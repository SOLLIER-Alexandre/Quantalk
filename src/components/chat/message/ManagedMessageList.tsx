import React, {useEffect, useState} from 'react';
import MessageList from './MessageList';
import {LoggedInUserData, useLoggedInUserData} from '../../../api/authentication/AuthenticationManager';
import {MessageData} from '../../../api/message/MessageData';
import MessageAPI from '../../../api/message/MessageAPI';
import './ManagedMessageList.scss';
import IconMessage from '../../utils/IconMessage';
import {WebSocketManager} from '../../../api/websocket/WebSocketManager';
import {WebSocketIncomingMessage} from '../../../api/websocket/WebSocketIncomingMessage';

/**
 * Props for the ManagedMessageList component
 */
interface ManagedMessageListProps {
    /**
     * WebSocket connection to where get message sent events from
     */
    websocket?: WebSocketManager,

    /**
     *  ID of the channel to get messages from
     */
    channelId: number,
}

/**
 * Manages a MessageList with data provided from the server
 *
 * @param props Component props
 * @constructor
 */
const ManagedMessageList: React.FunctionComponent<ManagedMessageListProps> = (props: ManagedMessageListProps) => {
    // Component state
    const [messages, setMessages] = useState<Array<MessageData>>([]);
    const [fetchError, setFetchError] = useState<boolean>(false);

    // Get the logged in user data
    const loggedInUser: LoggedInUserData | undefined = useLoggedInUserData();

    useEffect(() => {
        // Fetch the messages from the selected channel and put them in the state
        if (loggedInUser !== undefined && props.channelId !== undefined && !isNaN(props.channelId)) {
            MessageAPI.fetchMessages(loggedInUser.jwt, props.channelId)
                .then((res) => {
                    if (!res.error) {
                        setMessages(res.messages);
                    }

                    setFetchError(res.error);
                });
        }
    }, [loggedInUser, props.channelId]);

    useEffect(() => {
        if (props.websocket !== undefined) {
            // Listen for message sent events on the websocket
            const onWebSocketMessage = (msg: WebSocketIncomingMessage) => {
                if (msg.type === 'messageSent' && msg.channel === props.channelId) {
                    // A message has been sent
                    setMessages((prev) => {
                        return [...prev, {
                            id: msg.id,
                            content: msg.content,
                            sender: msg.sender,
                            senderUsername: msg.senderUsername,
                            sendDate: new Date(msg.sendDate),
                        }];
                    });
                }
            };

            props.websocket.getOnMessageListenable().addListener(onWebSocketMessage);

            return () => {
                // Remove the listener when we're finished
                props.websocket?.getOnMessageListenable().removeListener(onWebSocketMessage);
            };
        }
    }, [props.websocket, props.channelId]);

    if (fetchError) {
        // Show an error message if an error occurred while fetching messages
        return (
            <div className={'managed-message-list-error'}>
                <IconMessage iconName={'warning'} message={'Les messages n\'ont pas pu être récupérés'}/>
            </div>
        );
    }

    return (
        <MessageList data={messages} highlightedUserId={loggedInUser?.id}/>
    );
};

export default ManagedMessageList;
