import React from 'react';
import './LoggedInButton.scss';
import authenticationManager, {useLoggedInUserProfile} from '../../api/authentication/AuthenticationManager';
import User from '../../models/User';

/**
 * Component containing the username of the logged in user and a logout button
 * @constructor
 */
const LoggedInButton: React.FunctionComponent = () => {
    // Use logged in user profile hook
    const loggedInUserProfile: User | undefined = useLoggedInUserProfile();

    // Logout the user when the logout button is clicked
    const onLogoutButtonClickListener = () => {
        authenticationManager.logout();
    };

    return (
        <div className={'logged-in-button'}>
            {loggedInUserProfile !== undefined && loggedInUserProfile.username !== undefined ?
                <>
                    <span className={'material-icons m-right unselectable'}>account_circle</span>
                    <p className={'username-text m-right'}>{loggedInUserProfile.username}</p>
                </> :
                null}

            <span className={'material-icons button-like'} role={'button'}
                  onClick={onLogoutButtonClickListener}>logout</span>
        </div>
    );
};

export default LoggedInButton;
