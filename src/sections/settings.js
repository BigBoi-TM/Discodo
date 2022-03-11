import React, { forwardRef, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";

import Drawer from "@mui/material/Drawer";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import CssBaseline from "@mui/material/CssBaseline";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import SettingsIcon from "@mui/icons-material/Settings";
import ReactTooltip from "react-tooltip";

import db, { auth, database } from "./firebase";

import Loggedout from "./Snackbars/Loggedout";
import ProfilePage from "./Setting-Pages/profile";
import "./Sidebar.css";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Settings() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(<ProfilePage />);

  const drawerWidth = 190;

  const handlePage = (event, newPage) => {
    if (newPage !== null) {
      setPage(newPage);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleStopLoad = () => {
    setLoading(false);
  };
  const handleToggle = () => {
    setLoading(!loading);
  };

  const handleLogOut = () => {
    setOpen(false);
    handleToggle();
    auth.signOut();
    handleToggle();
  };

  return (
    <div>
      <SettingsIcon
        onClick={handleClickOpen}
        data-tip="Settings"
        data-type="dark"
        data-delay-show="10"
        data-effect="solid"
        data-place="top"
        className="ExitToAppIcon"
      />
      <ReactTooltip globalEventOff="click" />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <CssBaseline />
        <AppBar
          sx={{
            position: "fixed",
            zIndex: (theme) => theme.zIndex.drawer + 1,
            bgcolor: "#2f3135"
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Settings
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className="Drawer">
          <Drawer
            /*sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box"
              }
            }}*/
            variant="permanent"
          >
            <Toolbar />
            <Box>
              <ToggleButtonGroup
                value={page}
                orientation="vertical"
                exclusive
                onChange={handlePage}
                aria-label="text alignment"
                //edge="start"
                sx={{ display: "flex" }}
              >
                <ToggleButton
                  //className="modal-button"
                  sx={{ color: "rgb(116, 116, 116)" }}
                  value={<ProfilePage />}
                  aria-label="centered"
                >
                  <AccountBoxIcon />
                  Account
                </ToggleButton>
                <ToggleButton
                  //className="modal-button"
                  sx={{ color: "rgb(116, 116, 116)" }}
                  aria-label="centered"
                  onClick={handleLogOut}
                >
                  <Loggedout />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Drawer>
        </div>
        <div className="Page">{page}</div>
      </Dialog>
    </div>
  );
}
