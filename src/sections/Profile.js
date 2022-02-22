import React, { useEffect, useState } from "react";
import "./Profile.css";
import firebase from "firebase";
import { CSSTransition } from "react-transition-group";
import ReactDOM from "react-dom";
import { selectUser } from "../data/data_components/userSlice";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { Avatar } from "@mui/material";

const Profile = (props2) => {
  const user = useSelector(selectUser);

  const closeOnEscapeDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      props2.onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeDown);
    };
  }, []);

  return ReactDOM.createPortal(
    <CSSTransition
      in={props2.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div
        className={`modal2 ${props2.show ? "show" : ""} `}
        onClick={props2.onClose}
      >
        <div className="modal-content2" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header2">
            <h4 className="modal-title2">Profile:</h4>
            <CloseIcon onClick={props2.onClose} className="button2" />
          </div>
          <div className="modal-body2">
            <Avatar className="Avatar2" src={user.photo} />
            <div className="user__info2">
              Name: {user.displayName}
              <p>ID: #{user.uid.substring(0, 4)}</p>
              Email: {user.email}
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default Profile;
