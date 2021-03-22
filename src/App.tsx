import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {useLoggedInUser} from './api/authentication/AuthenticationManager';
import LoggedOutRoutes from './routes/LoggedOutRoutes';
import LoggedInRoutes from './routes/LoggedInRoutes';

const App = () => {
    // Use logged in user hook
    const loggedInUser = useLoggedInUser();

    if (loggedInUser !== undefined) {
        // User is logged in
        return (
            <Router>
                <LoggedInRoutes/>
            </Router>
        );
    } else {
        // User is logged out
        return (
            <Router>
                <LoggedOutRoutes/>
            </Router>
        );
    }
};

export default App;
