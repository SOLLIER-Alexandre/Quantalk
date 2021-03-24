import React from 'react';
import ChannelList from '../../components/chat/channel/ChannelList';
import {ChannelData} from '../../api/channel/ChannelData';
import {useHistory, useParams} from 'react-router-dom';
import ChatChannelFragment from './ChatChannelFragment';
import './ChatHomeContent.scss';
import AddChannelInput from '../../components/chat/channel/AddChannelInput';

/**
 * Props passed to the ChatHomeContent component
 */
interface ChatHomeContentProps {
    channels: Array<ChannelData>,
}

/**
 * Route parameters for this fragment
 */
export interface ChatChannelFragmentRouteParams {
    /**
     * ID of the chat channel to show
     */
    channelId: string,
}

/**
 * Content of the chat home page
 * @constructor
 */
const ChatHomeContent: React.FunctionComponent<ChatHomeContentProps> = (props: ChatHomeContentProps) => {
    // Get route params and history hook
    const params = useParams<ChatChannelFragmentRouteParams>();
    const history = useHistory();

    // Select the channel ID that was clicked
    const onChannelClick = (idx: number, data: ChannelData) => {
        history.push(`/channel/${data.id}`);
    };

    // Add the channel when the user requires it
    const onChannelAddButtonClick = (channelName: string) => {
        // TODO: Add the channel
        console.log(channelName);
    };

    return (
        <div className={'chat-home-content'}>
            <div className={'sidebar'}>
                <AddChannelInput onAddClick={onChannelAddButtonClick}/>
                <ChannelList data={props.channels} selectedId={parseInt(params.channelId)}
                             onItemClickListener={onChannelClick}/>
            </div>

            <div className={'active-chat'}>
                <ChatChannelFragment/>
            </div>
        </div>
    );
};

export default ChatHomeContent;
