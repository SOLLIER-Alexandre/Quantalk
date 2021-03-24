import CommonPageLayout from '../../components/common_page/CommonPageLayout';
import React, {useEffect, useState} from 'react';
import ChannelAPI from '../../api/channel/ChannelAPI';
import LoggedInButton from '../../components/utils/LoggedInButton';
import {ChannelGetResponseDataEntry} from '../../api/channel/ChannelGetResponse';
import {Route, Switch} from 'react-router-dom';
import ChatHomeContent from './ChatHomeContent';

/**
 * The home page of the app
 * @constructor
 */
const ChatHome: React.FunctionComponent = () => {
    // Channels state
    const [channels, setChannels] = useState<Array<ChannelGetResponseDataEntry>>([]);

    useEffect(() => {
        // Get the available channels and put them in the state
        ChannelAPI.fetchChannels()
            .then((res) => {
                if (!res.error) {
                    setChannels(res.channels);
                }
            });
    }, []);

    /*
     * We're returning a nested router because the channel list is shared between the route where no channel
     * is selected and the route where a channel is selected, because in both case we're showing the list
     * of channels in a sidebar.
     */
    return (
        <CommonPageLayout headerExtra={<LoggedInButton/>}>
            <Switch>
                <Route path={['/channel/:channelId', '/']}>
                    <ChatHomeContent channels={channels}/>
                </Route>
            </Switch>
        </CommonPageLayout>
    );
};

export default ChatHome;