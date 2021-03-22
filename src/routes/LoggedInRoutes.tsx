import {Redirect, Route, Switch} from 'react-router-dom';
import React from 'react';
import Chat from '../pages/Chat';

/**
 * Routes available for when the user logged in
 * @constructor
 */
const LoggedInRoutes = () => {
    return (
        <Switch>
            <Route exact path={'/'}>
                <Chat/>
            </Route>
            <Route path={'*'}>
                <Redirect to={'/'}/>
            </Route>
        </Switch>
    );
};

export default LoggedInRoutes;
