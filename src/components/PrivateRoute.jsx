import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useUser } from "../context/User";

const PrivateRoute = ({ comp: Component, ...rest }) => {
	const { user } = useUser();
	return <Route {...rest} render={(props) => (!user ? <Redirect to="/login" /> : <Component {...props} />)} />;
};

export default PrivateRoute;
