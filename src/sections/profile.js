import React from "react";
import { Avatar } from "@mui/material";
import Typography from "@mui/material/Typography";

import { useSelector } from "react-redux";
import { selectUser } from "../data/data_components/userSlice";

export default function ProfilePage() {
  const user = useSelector(selectUser);

  return (
    <>
      {user.displayName}

    </>
  );
}
