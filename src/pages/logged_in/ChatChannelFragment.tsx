import {useParams} from 'react-router-dom';
import React from 'react';
import {ChatHomeRouteParams} from './ChatHome';

/**
 * Fragment of the chat home page containing the currently selected chat channel
 * @constructor
 */
const ChatChannelFragment: React.FunctionComponent = () => {
    // Get the route params
    const params = useParams<ChatHomeRouteParams>();

    return (
        <div>
            <p>Channel #{params.channelId}</p>
        </div>
    );
};

export default ChatChannelFragment;
