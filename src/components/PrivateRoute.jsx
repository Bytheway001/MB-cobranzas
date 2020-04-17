import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({  Component, ...rest }) {
    if (localStorage.getItem("user")) {
        return <Route {...rest} render={props => <Component {...props} />} />;
    } else {
        return <Redirect to="/login" />;
    }
}

export default PrivateRoute;
