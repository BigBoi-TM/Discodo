import React from "react";
import { Avatar } from "@mui/material";
import Typography from "@mui/material/Typography";

import { useSelector } from "react-redux";
import { selectUser } from "../../data/data_components/userSlice";

import "../Profile.css";
export default function ProfilePage() {
  const user = useSelector(selectUser);

  return (
    <div className="Profile">
      <div className="modal-content2">
        <Avatar className="Avatar2" src={user.photo} />
        <div className="user__info2">
          Name: {user.displayName}
          <p>ID: #{user.uid.substring(0, 4)}</p>
          Email: {user.email}
        </div>
      </div>
    </div>
  );
}
