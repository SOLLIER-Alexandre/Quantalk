import React from 'react';
import './IconMessage.scss';

/**
 * Props for the IconMessage component
 */
interface IconMessageProps {
    /**
     * Name of the material icon to show
     */
    iconName: string,

    /**
     * Message to put underneath the icon
     */
    message: string,
}

/**
 * Component showing a message with a material icon
 *
 * @param props Component props
 * @constructor
 */
const IconMessage: React.FunctionComponent<IconMessageProps> = (props: IconMessageProps) => {
    return (
        <div className={'icon-message'}>
            <span className={'material-icons'}>{props.iconName}</span>
            <p>{props.message}</p>
        </div>
    );
};

export default IconMessage;
