import React, {useEffect, useState} from 'react';
import MessageList from './MessageList';
import {LoggedInUserData, useLoggedInUser} from '../../../api/authentication/AuthenticationManager';
import {MessageData} from '../../../api/message/MessageData';
import MessageAPI from '../../../api/message/MessageAPI';
import './ManagedMessageList.scss';
import IconMessage from '../../utils/IconMessage';

/**
 * Props for the ManagedMessageList component
 */
interface ManagedMessageListProps {
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
    // TODO: Support message reception with websocket

    // Component state
    const [messages, setMessages] = useState<Array<MessageData>>([]);
    const [fetchError, setFetchError] = useState<boolean>(false);

    // Get the logged in user data
    const loggedInUser: LoggedInUserData | undefined = useLoggedInUser();

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
