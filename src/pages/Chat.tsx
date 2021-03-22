import CommonPageLayout from '../components/common_page/CommonPageLayout';
import React, {useEffect} from 'react';
import ChannelAPI from '../api/channel/ChannelAPI';
import LoggedInButton from '../components/utils/LoggedInButton';

/**
 * The home page of the app
 * @constructor
 */
const Chat: React.FunctionComponent = () => {
    useEffect(() => {
        // Test the channels API
        ChannelAPI.fetchChannels()
            .then((res) => {
                console.log(res);
            });
    }, []);

    return (
        <CommonPageLayout headerExtra={<LoggedInButton/>}>
            <p className={'title-text'}>Chat</p>
        </CommonPageLayout>
    );
};

export default Chat;
