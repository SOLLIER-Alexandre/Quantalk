import authenticationManager from '../api/authentication/AuthenticationManager';
import CommonPageLayout from '../components/utils/CommonPageLayout';
import {useEffect} from 'react';
import {ChannelAPI} from '../api/channel/ChannelAPI';

/**
 * The home page of the app
 * @constructor
 */
const Home = () => {
    useEffect(() => {
        // Test the channels API
        ChannelAPI.fetchChannels()
            .then((res) => {
                console.log(res);
            });
    }, []);

    return (
        <CommonPageLayout>
            <button onClick={() => {
                authenticationManager.logout();
            }}>logout
            </button>
        </CommonPageLayout>
    );
};

export default Home;
