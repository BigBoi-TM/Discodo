import React, { useEffect, useState } from "react";
import "./Users-Online.css";
import firebase from "firebase";
import { CSSTransition } from "react-transition-group";
import ReactDOM from "react-dom";

import CloseIcon from "@mui/icons-material/Close";
import UserChip from "./UserChip";
import db, { auth, database } from "./firebase";
import { selectUser, selectOnline } from "../data/data_components/userSlice";
import { useSelector } from "react-redux";

const Users_Online = (props) => {
  const user = useSelector(selectUser);
  const online = useSelector(selectOnline);
  const userId = user.uid;
  const [users, setUsers] = useState([]);
  useEffect(() => {
    db.collection("Users").onSnapshot((snapshot) =>
      setUsers(snapshot.docs.map((doc) => doc.data()))
    );
  }, []);

  const closeOnEscapeDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
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
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div
        className={`modal ${props.show ? "show" : ""} `}
        onClick={props.onClose}
      >
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h4 className="modal-title">Users Online:</h4>
            <CloseIcon onClick={props.onClose} className="button" />
          </div>
          <div className="modal-body">
            {user ? (
              <>
                {users.map((user) => (
                  <UserChip photo={user.photo} displayName={user.displayName} />
                ))}
              </>
            ) : (
              <p />
            )}
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default Users_Online;
