import React, { useEffect } from "react";
import db, { database, auth } from "./firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../data/data_components/userSlice";

const Presence = () => {
  const user = useSelector(selectUser);
  const User = auth.currentUser;
  const userId = auth.currentUser.uid;
  const reference = database.ref(`/online/${userId}`);
  const dbReference = db.collection("Users").doc(`${userId}`);
  const info = {
    uid: User.uid,
    photo: User.photoURL,
    displayName: User.displayName,
    online: true
  };

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // Set the /users/:userId value to true
        reference.set(true).then(() => console.log("Online presence set"));
      } else {
        // Remove the node whenever the client disconnects
        reference
          .remove()
          .then(() => console.log("On disconnect function configured."));
      }
    });
  }, [reference, userId]);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // Set the /users/:userId value to true
        dbReference
          .set(info)
          .then(() => console.log("Firebase presence set"))
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      } else {
        dbReference.delete();
      }
    });
  }, [dbReference, info]);
};
