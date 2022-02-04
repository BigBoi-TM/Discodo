import { Button } from "@material-ui/core";
import React from "react";
import { auth, provider } from "./firebase";
import "./Login.css";
import useOnlinePresence from "./presence";

function Login() {
	const signIn = () => {
		//reeeeee
		auth.signInWithPopup(provider).catch((error) => alert(error.message));
	};
	return (
		<div className="login">
			<div className="login__logo">
				<img src="https://fontmeme.com/permalink/210418/8fdfb3e9d63267c33b3dfdeed44de384.png" />
				<img src="https://fontmeme.com/permalink/210418/794f468ce3bb16755ba8ca49b5a3faa6.png" />
			</div>
			<div>
				<button type="button" className="S_button" onClick={signIn} >
					Login with Google
				</button>
			</div>
		</div>
	);
}

export default Login;
