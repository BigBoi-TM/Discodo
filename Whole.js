import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { selectUser } from "./data/data_components/userSlice";
import { auth, database } from "./sections/firebase";
import Login from "./sections/Login";
import Room from "./Room";
import { login, logout } from "./data/data_components/userSlice";


function Whole() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user logged in
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName
          })
        );
      } else {
        //user is logged out
        dispatch(logout());
      }
    });
    return () => {};
  }, [dispatch]);

  return (
    <div className="Loader">
      <div className="app">
        {user ? (
          <>
            <Room />
          </>
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
}

export default Whole