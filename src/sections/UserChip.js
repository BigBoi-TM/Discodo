import React from "react";
import "./UserChip.css";

import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../data/data_components/userSlice";

function UserChip({ photo, displayName }) {
  const user = useSelector(selectUser);

  return (
    <div className="user__chip">
      <Avatar className="Avatar1" src={photo} />
      <div class="user__info">
        <h4>{displayName}</h4>
      </div>
    </div>
  );
}

export default UserChip;
