import React, { useState } from "react";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import GoogleIcon from "@mui/icons-material/Google";
import { auth, provider } from "./firebase";
import "./Login.css";
import useOnlinePresence from "./presence";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

function Login() {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const handleOpen = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setErr("");
  };

  const signIn = () => {
    setLoading(true);
    auth.signInWithPopup(provider).catch((error) => {
      handleOpen();
      setErr(error.toString());
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
        <Modal
          open={show}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Error!
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {err}
            </Typography>
          </Box>
        </Modal>
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
