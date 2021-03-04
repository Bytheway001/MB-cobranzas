import React from "react";
import GoogleLogin from "react-google-login";
import { Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import Axios from "axios";
import { API } from "../../utils/utils";
import { useUser } from "../../context/User";
const HomeScreen = ({ loading }) => {
	const { user, isAuthenticated, userActions } = useUser();
	const responseGoogle = (response) => {
		let profile = response.profileObj;
		Axios.get(API + "/auth?id=" + profile.email).then((res) => {
			let u = res.data.data.id;
			let role = res.data.data.role;
			userActions.loginUser(JSON.stringify({ ...profile, id: u, account: res.data.data.account, role: role }));
		});
	};
	const responseGoogleFail = (response) => {
		console.log(response);
		alert(response);
	};
	if (!user) {
		return (
			<div className={loading ? "login d-none" : "login"}>
				<div className="login-form">
					<h2>PS Cobranzas</h2>
					<div className="text-center">
						<p>Usa tu cuenta megabadvisors para ingresar</p>
						<GoogleLogin
							clientId="346512427285-0gs9tg2cvhd0v4b3r5h7dvjitm8fkcal.apps.googleusercontent.com"
							buttonText="Login"
							onSuccess={responseGoogle}
							onFailure={responseGoogleFail}
							cookiePolicy={"single_host_origin"}
							isSignedIn={isAuthenticated}
							render={(renderProps) => {
								return (
									<Button size="lg" className="text-left" onClick={renderProps.onClick} disabled={renderProps.disabled}>
										<FontAwesomeIcon icon={faGoogle} color="white" size="lg" className="mr-3" />
										Ingresar
									</Button>
								);
							}}
						/>
					</div>
				</div>
			</div>
		);
	} else {
		return <Redirect to="/" />;
	}
};

export default HomeScreen;
