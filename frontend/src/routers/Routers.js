import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Register from "../container/Register/Register";
import GalleryPage from "../container/GalleryPage/GalleryPage";

const Routers = ({user}) => {
    const ProtectedRoute = ({isAllowed, ...props}) => (
        isAllowed ? <Route {...props} /> : <Redirect to='/login'/>
    );

    return (
        <>
            <Switch>
                <Route exact path={'/login'} component={Register}/>
                <Route exact path={'/register'} component={Register}/>
                <ProtectedRoute isAllowed={user} exact path='/' component={GalleryPage}/>
                <ProtectedRoute isAllowed={user} exact path='/profile' component={GalleryPage}/>
                <ProtectedRoute isAllowed={user} exact path='/category/:id' component={GalleryPage}/>
                <ProtectedRoute isAllowed={user} exact path='/categories/:id' component={GalleryPage}/>
                <ProtectedRoute isAllowed={user} exact path='/images/:id' component={GalleryPage}/>
            </Switch>
        </>
    );
};

export default Routers;