import React from 'react';
import './LoggedInButton.scss';
import authenticationManager, {useLoggedInUser} from '../../api/authentication/AuthenticationManager';

/**
 * Component containing the username of the logged in user and a logout button
 * @constructor
 */
const LoggedInButton: React.FunctionComponent = () => {
    // Use logged in user hook
    const loggedInUser = useLoggedInUser();

    // On logout button click listener
    const onLogoutButtonClickListener = () => {
        authenticationManager.logout();
    };

    return (
        <div className={'logged-in-button'}>
            <span className={'material-icons m-right unselectable'}>account_circle</span>
            <p className={'username-text m-right'}>{loggedInUser?.username}</p>

            <span className={'material-icons button-like'} role={'button'}
                  onClick={onLogoutButtonClickListener}>logout</span>
        </div>
    );
};

export default LoggedInButton;
