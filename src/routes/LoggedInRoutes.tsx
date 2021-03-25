import {Route, Switch} from 'react-router-dom';
import React from 'react';
import ChatHome from '../pages/logged_in/ChatHome';

/**
 * Routes available for when the user logged in
 * @constructor
 */
const LoggedInRoutes = () => {
    return (
        <Switch>
            <Route path={['/channel/:channelId', '/']}>
                <ChatHome/>
            </Route>
        </Switch>
    );
};

export default LoggedInRoutes;
