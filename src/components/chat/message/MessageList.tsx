import React, {useEffect, useRef} from 'react';
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
    // Component refs
    let divRef = useRef<HTMLDivElement | null>(null);
    let autoScroll = useRef<boolean>(true);

    // Set autoscroll depending on if the list is scrolled all the way down
    const onMessageListScroll = (e: React.UIEvent<HTMLDivElement>) => {
        if (divRef.current !== null) {
            autoScroll.current = (divRef.current?.scrollTop + divRef.current?.clientHeight + 16 >=
                divRef.current?.scrollHeight);
        }
    };

    // Scrolls to the bottom of the message list
    const scrollToBottom = () => {
        if (divRef.current !== null) {
            divRef.current?.scroll({
                top: divRef.current?.scrollHeight,
                behavior: 'auto',
            });
        }
    };

    // Scroll to the bottom when data changed and autoscroll is enabled
    useEffect(() => {
        if (autoScroll.current) {
            scrollToBottom();
        }
    }, [props.data]);

    // Scroll to the bottom when window size changed and autoscroll is enabled
    useEffect(() => {
        const onWindowResize = (e: UIEvent) => {
            if (autoScroll.current) {
                scrollToBottom();
            }
        };

        window.addEventListener('resize', onWindowResize);

        return () => {
            window.removeEventListener('resize', onWindowResize);
        };
    }, []);

    return (
        <div className={'message-list'} ref={(ref) => divRef.current = ref}
             onScroll={onMessageListScroll}>
            {props.data.map((elem, idx, array) => {
                // If this is the first message or not the same sender as the previous message,
                // show the username and send date
                const showMetadata: boolean = idx === 0 || array[idx - 1].sender !== elem.sender;

                if (showMetadata) {
                    // Align the text to the end if the message is sent by the highlighted user
                    const userSentClass: string = elem.sender === props.highlightedUserId ? ' user-sent' : '';

                    return <React.Fragment key={elem.id}>
                        <div className={'metadata-container' + userSentClass}>
                            <p className={'username'}>@{elem.senderUsername}</p>
                            <p className={'date'}>{formatDate(elem.sendDate)}</p>
                        </div>

                        <MessageItem data={elem} userSent={props.highlightedUserId === elem.sender}/>
                    </React.Fragment>;
                }

                return <MessageItem data={elem} userSent={props.highlightedUserId === elem.sender} key={elem.id}/>;
            })}
        </div>
    );
};

export default MessageList;
