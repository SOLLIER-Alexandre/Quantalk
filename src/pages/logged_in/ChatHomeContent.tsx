import React from 'react';
import ChannelList from '../../components/chat/channel/ChannelList';
import {ChannelGetResponseDataEntry} from '../../api/channel/ChannelGetResponse';
import {useHistory, useParams} from 'react-router-dom';
import ChatChannelFragment from './ChatChannelFragment';
import './ChatHomeContent.scss';

/**
 * Props passed to the ChatHomeContent component
 */
interface ChatHomeContentProps {
    channels: Array<ChannelGetResponseDataEntry>,
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
    const onChannelClickListener = (idx: number, data: ChannelGetResponseDataEntry) => {
        history.push(`/channel/${data.id}`);
    };

    return (
        <div className={'chat-home-content'}>
            <div className={'sidebar'}>
                <ChannelList data={props.channels} selectedId={parseInt(params.channelId)}
                             onItemClickListener={onChannelClickListener}/>
            </div>

            <div className={'active-chat'}>
                <ChatChannelFragment/>
            </div>
        </div>
    );
};

export default ChatHomeContent;
