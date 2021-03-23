import CommonPageLayout from '../components/common_page/CommonPageLayout';
import React, {useEffect, useState} from 'react';
import ChannelAPI from '../api/channel/ChannelAPI';
import LoggedInButton from '../components/utils/LoggedInButton';
import {ChannelGetResponseDataEntry} from '../api/channel/ChannelGetResponse';
import ChannelList from '../components/chat/channel/ChannelList';
import './Chat.scss';

/**
 * The home page of the app
 * @constructor
 */
const Chat: React.FunctionComponent = () => {
    // Channels state
    const [channels, setChannels] = useState<Array<ChannelGetResponseDataEntry>>([]);
    const [selectedChannel, setSelectedChannel] = useState<number | undefined>(undefined);

    // On channel item click listener
    const onChannelClickListener = (idx: number, data: ChannelGetResponseDataEntry) => {
        setSelectedChannel(idx);
    };

    useEffect(() => {
        // Test the channels API
        ChannelAPI.fetchChannels()
            .then((res) => {
                if (!res.error) {
                    setChannels(res.channels);
                }
            });
    }, []);

    return (
        <CommonPageLayout headerExtra={<LoggedInButton/>}>
            <div className={'sidebar'}>
                <ChannelList data={channels} selectedIndex={selectedChannel}
                             onItemClickListener={onChannelClickListener}/>
            </div>

            <div className={'active-chat'}>

            </div>
        </CommonPageLayout>
    );
};

export default Chat;
