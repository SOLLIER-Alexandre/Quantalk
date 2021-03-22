import {Route, Switch} from 'react-router-dom';
import React from 'react';
import Home from '../pages/Home';

/**
 * Routes available for when the user logged in
 * @constructor
 */
const LoggedInRoutes = () => {
    return (
        <Switch>
            <Route path={'/'}>
                <Home/>
            </Route>
        </Switch>
    );
};

export default LoggedInRoutes;
