import {Route, Switch} from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import React from 'react';

/**
 * Routes available for when the user is logged out
 * @constructor
 */
const LoggedOutRoutes = () => {
    return (
        <Switch>
            <Route path={'/register'}>
                <Register/>
            </Route>
            <Route path={'/'}>
                <Login/>
            </Route>
        </Switch>
    );
};

export default LoggedOutRoutes;
