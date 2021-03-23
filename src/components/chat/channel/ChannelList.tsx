import React from 'react';
import {ChannelGetResponseDataEntry} from '../../../api/channel/ChannelGetResponse';
import ChannelItem from './ChannelItem';
import './ChannelList.scss';

/**
 * Props for the ChannelList component
 */
interface ChannelListProps {
    /**
     * Dataset to show in the list
     */
    data: Array<ChannelGetResponseDataEntry>,

    /**
     * The index of the selected item
     */
    selectedIndex?: number,
}

/**
 * Shows a list of chat channel the user can join
 * @constructor
 */
const ChannelList: React.FunctionComponent<ChannelListProps> = (props: ChannelListProps) => {
    return (
        <div className={'channel-list'}>
            {props.data.map((elem, idx) => {
                if (props.selectedIndex === idx) {
                    return <ChannelItem data={elem} selected/>;
                } else {
                    return <ChannelItem data={elem}/>;
                }
            })}
        </div>
    );
};

export default ChannelList;
