import React, { useState } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";

import ToggleButton from "@mui/material/ToggleButton";
import "./Snackbars.css";

export default function Loggedout() {
  const [snack, setSnack] = useState(false);

  const handleClick = () => {
    setSnack(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnack(false);
  };

  const action = (
    <div>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </div>
  );

  return (
    <div>
      <div className="loggeedout_display" onClick={handleClick}>
        <LogoutIcon />
        LogOut
      </div>
      <Snackbar
        open={snack}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Logged out"
        action={action}
      />
    </div>
  );
}
