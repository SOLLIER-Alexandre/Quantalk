import React from 'react';
import {MessageData} from '../../../api/message/MessageData';
import './MessageItem.scss';

/**
 * Props for the MessageItem component
 */
interface MessageItemProps {
    /**
     * The data to show in this component
     */
    data: MessageData,

    /**
     * Class name for the message item container
     */
    className?: string,

    /**
     * Sets the bubble background to blue
     */
    userSent?: boolean,
}

/**
 * Shows a single message
 *
 * @param props Component props
 * @constructor
 */
const MessageItem: React.FunctionComponent<MessageItemProps> = (props: MessageItemProps) => {
    // Get the class name
    let className = 'message-item';

    if (props.userSent) {
        className += ' user-sent';
    }

    if (props.className !== undefined) {
        className += ' ' + props.className;
    }

    return (
        <div className={className}>
            <p>{props.data.content}</p>
        </div>
    );
};

export default MessageItem;
