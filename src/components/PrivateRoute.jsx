import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ comp: Component, ...rest }) => (
    <Route {...rest} render={props => !localStorage.getItem('user') ? (<Redirect to="/login" />) : (<Component {...props} />)} />
)

export default PrivateRoute;
