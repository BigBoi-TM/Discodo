import React from "react";
import { useDispatch } from "react-redux";
import { setChannelInfo } from "../data/data_components/appSlice";
import "./SidebarChannel.css";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import TagIcon from "@mui/icons-material/Tag";
import MessageIcon from "@mui/icons-material/Message";
import VideoChat from "./VC";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function SidebarVoiceChannel({ id, channelName, meetingId }) {
  const dispatch = useDispatch();

  return (
    <div
      className="sidebarChannel"
      onClick={() =>
        dispatch(
          setChannelInfo({
            channelId: id,
            channelName: channelName,
            meetingId: meetingId,
            voiceChannel: true
          })
        )
      }
    >
      <Router>
        <Link className="vcLink" to={`/voice-channels/${channelName}`}>
          <h4>
            <Grid container direction="row">
              <Grid item xs={2}>
                <span className="sidebarChannel__hash">
                  <VolumeUpIcon fontsize="small" />
                </span>
              </Grid>
              <Grid item xs={10}>
                <p className="channelText">{channelName}</p>
              </Grid>
            </Grid>
          </h4>
          <Divider
            className="divider"
            light="true"
            sx={{ color: "white" }}
            variant="middle"
          />
        </Link>
      </Router>
    </div>
  );
}

export default SidebarVoiceChannel;
