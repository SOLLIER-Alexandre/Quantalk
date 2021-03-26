import CommonPageLayout from '../../components/common_page/CommonPageLayout';
import React, {useEffect, useRef, useState} from 'react';
import ChannelAPI from '../../api/channel/ChannelAPI';
import LoggedInButton from '../../components/utils/LoggedInButton';
import {ChannelData} from '../../api/channel/ChannelData';
import {useHistory, useParams} from 'react-router-dom';
import {LoggedInUserData, useLoggedInUser} from '../../api/authentication/AuthenticationManager';
import AddChannelInput from '../../components/chat/channel/AddChannelInput';
import ChannelList from '../../components/chat/channel/ChannelList';
import './ChatHome.scss';
import {WebSocketManager} from '../../api/websocket/WebSocketManager';
import {WebSocketMessage} from '../../api/websocket/WebSocketMessage';
import {MessageData} from '../../api/message/MessageData';
import MessageList from '../../components/chat/message/MessageList';

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
    // Page state and ref
    const [channels, setChannels] = useState<Array<ChannelData>>([]);
    const websocketManager = useRef<WebSocketManager | undefined>(undefined);

    // Get the logged in user data
    const loggedInUser: LoggedInUserData | undefined = useLoggedInUser();

    // Get route params and history hook
    const params = useParams<ChatHomeRouteParams>();
    const history = useHistory();

    // Select the channel ID that was clicked
    const onChannelClick = (idx: number, data: ChannelData) => {
        history.push(`/channel/${data.id}`);
    };

    // Add the channel when the user requires it
    const onChannelAddButtonClick = (channelName: string) => {
        if (loggedInUser !== undefined) {
            ChannelAPI.addChannel(loggedInUser.jwt, channelName);
        }
    };

    useEffect(() => {
        // Get the available channels and put them in the state
        if (loggedInUser !== undefined) {
            ChannelAPI.fetchChannels(loggedInUser.jwt)
                .then((res) => {
                    if (!res.error) {
                        setChannels(res.channels);
                    }
                });
        }
    }, [loggedInUser]);

    useEffect(() => {
        // Add the message listener
        const onWebSocketMessage = (msg: WebSocketMessage) => {
            if (msg.type === 'channelCreated') {
                // A channel has been created
                setChannels((prev) => {
                    return [...prev, {
                        id: msg.id,
                        owner: msg.owner,
                        ownerUsername: msg.ownerUsername,
                        title: msg.title,
                    }];
                });
            }
        };

        // Instantiate a new WebSocketManager
        websocketManager.current = new WebSocketManager();
        websocketManager.current.addOnMessageListener(onWebSocketMessage);

        return () => {
            websocketManager.current?.removeOnMessageListener(onWebSocketMessage);
            websocketManager.current?.disconnect();
        };
    }, []);

    const f: Array<MessageData> = [
        {
            id: 0,
            content: 'Bonjour',
            senderId: 0,
            senderUsername: 'Kurutwo',
        },
        {
            id: 1,
            content: 'Hallo',
            senderId: 0,
            senderUsername: 'Kurutwo',
        },
        {
            id: 2,
            content: 'yes',
            senderId: 11,
            senderUsername: 'Kuruyia',
        },
    ];

    return (
        <CommonPageLayout headerExtra={<LoggedInButton/>}>
            <div className={'chat-home'}>
                <div className={'sidebar'}>
                    <AddChannelInput onAddClick={onChannelAddButtonClick}/>
                    <ChannelList data={channels} selectedId={parseInt(params.channelId)}
                                 onItemClickListener={onChannelClick}/>
                </div>

                <div className={'active-chat'}>
                    <MessageList data={f} highlightedUserId={loggedInUser?.id}/>
                </div>
            </div>
        </CommonPageLayout>
    );
};

export default ChatHome;
