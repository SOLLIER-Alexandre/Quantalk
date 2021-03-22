import authenticationManager from '../api/authentication/AuthenticationManager';
import CommonPageLayout from '../components/utils/CommonPageLayout';

/**
 * The home page of the app
 * @constructor
 */
const Home = () => {
    return (
        <CommonPageLayout>
            <p className={'title-text'}>Home</p>

            <button onClick={() => {
                authenticationManager.logout();
            }}>logout
            </button>
        </CommonPageLayout>
    );
};

export default Home;
