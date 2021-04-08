import React from 'react';
import {ChatChannel} from '../../../models/ChatChannel';
import ChannelItem from './ChannelItem';
import './ChannelList.scss';

/**
 * Props for the ChannelList component
 */
interface ChannelListProps {
    /**
     * Dataset to show in the list
     */
    data: Array<ChatChannel>,

    /**
     * The ID of the selected item
     */
    selectedId?: ChatChannel['id'],

    /**
     * Callback called when one of the item is clicked
     *
     * @param idx Index of the item in the dataset
     * @param data Data associated with the item
     */
    onItemClickListener?: (idx: number, data: ChatChannel) => void,
}

/**
 * Shows a list of chat channel the user can join
 * @constructor
 */
const ChannelList: React.FunctionComponent<ChannelListProps> = (props: ChannelListProps) => {
    return (
        <div className={'channel-list'}>
            {props.data.map((elem, idx) => {
                return <ChannelItem data={elem} selected={props.selectedId === elem.id} key={elem.id}
                                    onClickListener={(data) => {
                                        props.onItemClickListener?.(idx, data);
                                    }}/>;
            })}
        </div>
    );
};

export default ChannelList;
