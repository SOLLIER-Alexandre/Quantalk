import CommonPageLayout from '../../components/common_page/CommonPageLayout';
import React, {useEffect, useRef, useState} from 'react';
import ChannelAPI from '../../api/channel/ChannelAPI';
import LoggedInButton from '../../components/utils/LoggedInButton';
import {ChannelData} from '../../api/channel/ChannelData';
import {useHistory, useParams} from 'react-router-dom';
import {LoggedInUserData, useLoggedInUser} from '../../api/authentication/AuthenticationManager';
import AddChannelInput from '../../components/chat/channel/AddChannelInput';
import './ChatHome.scss';
import {WebSocketManager} from '../../api/websocket/WebSocketManager';
import {MessageData} from '../../api/message/MessageData';
import MessageList from '../../components/chat/message/MessageList';
import MessageAPI from '../../api/message/MessageAPI';
import ManagedChannelList from '../../components/chat/channel/ManagedChannelList';

/**
 * Route parameters for this page
 */
export interface ChatHomeRouteParams {
    /**
     * ID of the chat channel to show
     */
    channelId: string,
}

/**
 * The home page of the app
 * @constructor
 */
const ChatHome: React.FunctionComponent = () => {
    // TODO: Cleanup this, put content fetcher into their own components

    // Page state and ref
    const websocketManager = useRef<WebSocketManager | undefined>(undefined);
    const [messages, setMessages] = useState<Array<MessageData>>([]);

    // Get the logged in user data
    const loggedInUser: LoggedInUserData | undefined = useLoggedInUser();

    // Get route params and history hook
    const params = useParams<ChatHomeRouteParams>();
    const history = useHistory();

    // Add the channel when the user requires it
    const onChannelAddButtonClick = (channelName: string) => {
        if (loggedInUser !== undefined) {
            // TODO: Handle errors
            ChannelAPI.addChannel(loggedInUser.jwt, channelName);
        }
    };

    // Select the channel ID that was clicked
    const onChannelClick = (data: ChannelData) => {
        history.push(`/channel/${data.id}`);
    };

    useEffect(() => {
        // Instantiate a new WebSocketManager
        websocketManager.current = new WebSocketManager();

        return () => {
            websocketManager.current?.disconnect();
        };
    }, []);

    useEffect(() => {
        // Fetch the messages from the selected channel and put them in the state
        if (loggedInUser !== undefined && params.channelId !== undefined) {
            const channelId: number = parseInt(params.channelId);

            if (!isNaN(channelId)) {
                MessageAPI.fetchMessages(loggedInUser.jwt, channelId)
                    .then((res) => {
                        // TODO: Handle errors
                        if (!res.error) {
                            setMessages(res.messages);
                        }
                    });
            }
        }
    }, [loggedInUser, params.channelId]);

    // TODO: Show placeholder in active-chat when no channel is selected
    return (
        <CommonPageLayout headerExtra={<LoggedInButton/>}>
            <div className={'chat-home'}>
                <div className={'sidebar'}>
                    <AddChannelInput onAddClick={onChannelAddButtonClick}/>
                    <ManagedChannelList websocket={websocketManager.current} onChannelClickListener={onChannelClick}/>
                </div>

                <div className={'active-chat'}>
                    <MessageList data={messages} highlightedUserId={loggedInUser?.id}/>
                </div>
            </div>
        </CommonPageLayout>
    );
};

export default ChatHome;
