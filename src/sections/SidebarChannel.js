import React from "react";
import { useDispatch } from "react-redux";
import { setChannelInfo } from "../data/data_components/appSlice";
import "./SidebarChannel.css";
import MessageIcon from "@material-ui/icons/Message";

function SidebarChannel({ id, channelName }) {
  const dispatch = useDispatch();

  return (
    <div
      className="sidebarChannel"
      onClick={() =>
        dispatch(
          setChannelInfo({
            channelId: id,
            channelName: channelName,
            voiceChannel: false
          })
        )
      }
    >
      <h4>
        <span className="sidebarChannel__hash">#</span>
        {channelName}
      </h4>
    </div>
  );
}

export default SidebarChannel;
