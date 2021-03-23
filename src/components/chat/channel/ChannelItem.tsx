import React from 'react';
import './ChannelItem.scss';
import {ChannelGetResponseDataEntry} from '../../../api/channel/ChannelGetResponse';

/**
 * Props for the ChannelItem component
 */
interface ChannelItemProps {
    /**
     * The data to show in this component
     */
    data: ChannelGetResponseDataEntry,

    /**
     * This channel item is the active one
     */
    selected?: boolean,

    /**
     * Callback called when the item is clicked
     *
     * @param data Data associated with the item
     */
    onClickListener?: (data: ChannelGetResponseDataEntry) => void,
}

/**
 * Shows a single chat channel
 * @constructor
 */
const ChannelItem: React.FunctionComponent<ChannelItemProps> = (props: ChannelItemProps) => {
    // Get the class name
    let className: string = 'channel-item button-like';
    if (props.selected)
        className += ' selected';

    // Call the callback in the props with the data
    const onClickListener = () => {
        props.onClickListener?.(props.data);
    };

    return (
        <div className={className} onClick={onClickListener}>
            <p className={'channel-title'}>{props.data.title}</p>
            <p className={'channel-owned-by'}>@{props.data.ownerUsername}</p>
        </div>
    );
};

export default ChannelItem;
