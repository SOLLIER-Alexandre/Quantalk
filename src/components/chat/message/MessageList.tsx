import React from 'react';
import {MessageData} from '../../../api/message/MessageData';
import MessageItem from './MessageItem';
import './MessageList.scss';

/**
 * Props for the MessageList component
 */
interface MessageListProps {
    /**
     * Dataset to show in the list
     */
    data: Array<MessageData>,

    /**
     * ID of the user to highlight their messages
     */
    highlightedUserId?: number,
}

/**
 * Show a list of messages from a chat channel
 *
 * @param props Component props
 * @constructor
 */
const MessageList: React.FunctionComponent<MessageListProps> = (props: MessageListProps) => {
    return (
        <div className={'message-list'}>
            {props.data.map((elem) => {
                return <MessageItem data={elem} userSent={props.highlightedUserId === elem.senderId} key={elem.id}/>;
            })}
        </div>
    );
};

export default MessageList;
