import React, { useState } from "react";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import GoogleIcon from "@mui/icons-material/Google";
import { auth, provider } from "./firebase";
import "./Login.css";
import useOnlinePresence from "./presence";

function Login() {
  const [loading, setLoading] = useState(false);
  const signIn = () => {
    setLoading(true);
    auth.signInWithPopup(provider).catch((error) => {
      alert(error.message);
      setLoading(false);
    });
  };
  return (
    <div className="login">
      <div className="login__logo">
        <img src="https://fontmeme.com/permalink/210418/8fdfb3e9d63267c33b3dfdeed44de384.png" />
        <img src="https://fontmeme.com/permalink/210418/794f468ce3bb16755ba8ca49b5a3faa6.png" />
      </div>
      <div>
        <LoadingButton
          variant="contained"
          className="S_button"
          onClick={signIn}
          loading={loading}
          loadingPosition="start"
          startIcon={<GoogleIcon />}
        >
          Login with Google
        </LoadingButton>
      </div>
    </div>
  );
}

export default Login;
