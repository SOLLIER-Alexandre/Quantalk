import React, {useEffect, useState} from 'react';
import MessageList from './MessageList';
import {LoggedInUserData, useLoggedInUser} from '../../../api/authentication/AuthenticationManager';
import {MessageData} from '../../../api/message/MessageData';
import MessageAPI from '../../../api/message/MessageAPI';

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
    // Messages state
    const [messages, setMessages] = useState<Array<MessageData>>([]);

    // Get the logged in user data
    const loggedInUser: LoggedInUserData | undefined = useLoggedInUser();

    useEffect(() => {
        // Fetch the messages from the selected channel and put them in the state
        if (loggedInUser !== undefined && props.channelId !== undefined && !isNaN(props.channelId)) {
            MessageAPI.fetchMessages(loggedInUser.jwt, props.channelId)
                .then((res) => {
                    // TODO: Handle errors
                    if (!res.error) {
                        setMessages(res.messages);
                    }
                });
        }
    }, [loggedInUser, props.channelId]);

    return (
        <MessageList data={messages} highlightedUserId={loggedInUser?.id}/>
    );
};

export default ManagedMessageList;
