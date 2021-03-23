import {Redirect, Route, Switch} from 'react-router-dom';
import Login from '../pages/logged_out/Login';
import Register from '../pages/logged_out/Register';
import React from 'react';

/**
 * Routes available for when the user is logged out
 * @constructor
 */
const LoggedOutRoutes = () => {
    return (
        <Switch>
            <Route exact path={'/'}>
                <Login/>
            </Route>
            <Route path={'/register'}>
                <Register/>
            </Route>
            <Route path={'*'}>
                <Redirect to={'/'}/>
            </Route>
        </Switch>
    );
};

export default LoggedOutRoutes;
