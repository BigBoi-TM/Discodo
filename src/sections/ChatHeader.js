import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import "./ChatHeader.css";

import NotificationsIcon from "@mui/icons-material/Notifications";
import EditLocationIcon from "@mui/icons-material/EditLocation";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import HelpIcon from "@mui/icons-material/Help";
import Users_Online from "./Users-Online";
import HelpModal from "./Help";

function ChatHeader({ channelName }) {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="chatHeader">
      <div className="chatHeader__left">
        <h3>
          <span className="chatHeader__hash">#</span>
          {channelName}
        </h3>
      </div>
      <div className="chatHeader__right">
        <NotificationsIcon className="NotificationsIcon" />
        <EditLocationIcon className="EditLocationIcon" />
        <PeopleAltIcon
          data-tip="Users Online"
          data-type="info"
          data-delay-show="1000"
          data-place="bottom"
          onClick={() => setShow(true)}
        />
        <Users_Online onClose={() => setShow(false)} show={show} />
        <ReactTooltip globalEventOff="click" />
        <div className="chatHeader__search">
          <input placeholder="Search..." />
          <SearchIcon className="SearchIcon" />
        </div>
        <SendIcon className="SendIcon" />
        
        <HelpModal />
        <ReactTooltip globalEventOff="click" />
      </div>
    </div>
  );
}

export default ChatHeader;
