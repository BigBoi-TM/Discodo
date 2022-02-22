import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setChannelInfo,
  selectChannelType,
  selectReadOnly
} from "../data/data_components/appSlice";
import "./SidebarChannel.css";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import TagIcon from "@mui/icons-material/Tag";
import MessageIcon from "@mui/icons-material/Message";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CampaignIcon from "@mui/icons-material/Campaign";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function SidebarChannel({ id, channelName, channelType, readOnly }) {
  const dispatch = useDispatch();
  const typechannel = useSelector(selectChannelType);
  const readonly = useSelector(selectReadOnly);
  const icon = () => {
    if (channelType === "Rules Channel") {
      return <LibraryBooksIcon fontsize="small" />;
    } else if (channelType === "Announcement Channel") {
      return <CampaignIcon fontsize="small" />;
    } else if (channelType === "Text Channel") {
      return <TagIcon fontsize="small" />;
    }
  };
  return (
    <div
      className="sidebarChannel"
      onClick={() =>
        dispatch(
          setChannelInfo({
            channelId: id,
            channelName: channelName,
            voiceChannel: false,
            channelType: channelType,
            readOnly: readOnly
          })
        )
      }
    >
      <Router>
        <Link to={`/text-channels/${channelName}`} className="tcLink">
          <h4>
            <Grid container direction="row">
              <Grid item xs={2}>
                <span className="sidebarChannel__hash">{icon()}</span>
              </Grid>
              <Grid item xs={10}>
                <p className="channelText">{channelName}</p>
              </Grid>
            </Grid>
          </h4>
          <Divider
            className="divider"
            sx={{ color: "white" }}
            variant="middle"
          />
        </Link>
      </Router>
    </div>
  );
}

export default SidebarChannel;
