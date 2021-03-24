import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {LoggedInUserData, useLoggedInUser} from './api/authentication/AuthenticationManager';
import LoggedOutRoutes from './routes/LoggedOutRoutes';
import LoggedInRoutes from './routes/LoggedInRoutes';

const App = () => {
    // Use logged in user hook
    const loggedInUser: LoggedInUserData | undefined = useLoggedInUser();

    if (loggedInUser !== undefined) {
        // User is logged in
        return (
            <BrowserRouter>
                <LoggedInRoutes/>
            </BrowserRouter>
        );
    } else {
        // User is logged out
        return (
            <BrowserRouter>
                <LoggedOutRoutes/>
            </BrowserRouter>
        );
    }
};

export default App;
