/**
 * The home page of the app
 * @constructor
 */
import {AuthenticationManager} from '../api/authentication/AuthenticationManager';

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <button onClick={() => {
                AuthenticationManager.getInstance().logout();
            }}>logout
            </button>
        </div>
    );
};

export default Home;
