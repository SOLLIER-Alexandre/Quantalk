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
import ManagedChannelList from '../../components/chat/channel/ManagedChannelList';
import ManagedMessageList from '../../components/chat/message/ManagedMessageList';

/**
 * Route parameters for this page
 */
export interface ChatHomeRouteParams {
    /**
     * ID of the chat channel to show
     */
    channelId?: string,
}

/**
 * The home page of the app
 * @constructor
 */
const ChatHome: React.FunctionComponent = () => {
    // Page state and ref
    const websocketManager = useRef<WebSocketManager | undefined>(undefined);
    const [channelCreationError, setChannelCreationError] = useState<boolean>(false);

    // Get the logged in user data
    const loggedInUser: LoggedInUserData | undefined = useLoggedInUser();

    // Get route params and history hook
    const params = useParams<ChatHomeRouteParams>();
    const history = useHistory();

    // Add the channel when the user requires it
    const onChannelAddButtonClick = (channelName: string) => {
        if (loggedInUser !== undefined) {
            ChannelAPI.addChannel(loggedInUser.jwt, channelName)
                .then((res) => {
                    setChannelCreationError(res.error);
                });
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

    // Get the selected channel ID
    let selectedChannelId: number | undefined = undefined;

    if (params.channelId !== undefined) {
        selectedChannelId = parseInt(params.channelId);
    }

    // TODO: Show placeholder in active-chat when no channel is selected
    return (
        <CommonPageLayout headerExtra={<LoggedInButton/>}>
            <div className={'sidebar'}>
                <AddChannelInput onAddClick={onChannelAddButtonClick} error={channelCreationError}/>
                <ManagedChannelList websocket={websocketManager.current} onChannelClickListener={onChannelClick}
                                    selectedChannelId={selectedChannelId}/>
            </div>

            <div className={'active-chat'}>
                {params.channelId !== undefined ?
                    <ManagedMessageList channelId={parseInt(params.channelId)}/> :
                    <p>oui</p>}
            </div>
        </CommonPageLayout>
    );
};

export default ChatHome;
