import React from 'react';
import {MessageData} from '../../../api/message/MessageData';
import MessageItem from './MessageItem';
import './MessageList.scss';

/**
 * Formats a message date to something we can show
 * @param date
 */
const formatDate = (date: Date): string => {
    return date.getDate().toString().padStart(2, '0') + '/' +
        date.getMonth().toString().padStart(2, '0') + '/' +
        date.getFullYear() + ' ' +
        date.getHours().toString().padStart(2, '0') + ':' +
        date.getMinutes().toString().padStart(2, '0');
};

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
            {props.data.map((elem, idx, array) => {
                // If this is the first message or not the same sender as the previous message,
                // show the username and send date
                const showMetadata: boolean = idx === 0 || array[idx - 1].sender !== elem.sender;

                if (showMetadata) {
                    // Align the text to the end if the message is sent by the highlighted user
                    const userSentClass: string = elem.sender === props.highlightedUserId ? ' user-sent' : '';

                    return <React.Fragment>
                        <div className={'metadata-container' + userSentClass}>
                            <p className={'username'}>@{elem.senderUsername}</p>
                            <p className={'date'}>{formatDate(elem.sendDate)}</p>
                        </div>

                        <MessageItem data={elem} userSent={props.highlightedUserId === elem.sender} key={elem.id}/>
                    </React.Fragment>;
                }

                return <MessageItem data={elem} userSent={props.highlightedUserId === elem.sender} key={elem.id}/>;
            })}
        </div>
    );
};

export default MessageList;
