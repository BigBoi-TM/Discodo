/*eslint-disable*/
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./data/data_components/userSlice";
import db, { database, auth } from "./sections/firebase";
import Loader2 from "./sections/Loader2";

function App() {
  return (
    <div className="whole">
      <Loader2 />
    </div>
  );
}

export default App;
