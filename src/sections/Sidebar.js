import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import "./Sidebar.css";
import SidebarChannel from "./SidebarChannel.js";
import SidebarVoiceChannel from "./SidebarVoiceChannel.js";
import Settings from "./settings";
import { getToken, createMeeting } from "./api";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Draggable } from "react-drag-reorder";

import { styled } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
//import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Avatar } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import CallIcon from "@mui/icons-material/Call";
import MicIcon from "@mui/icons-material/Mic";
import HeadsetIcon from "@mui/icons-material/Headset";
import TagIcon from "@mui/icons-material/Tag";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CampaignIcon from "@mui/icons-material/Campaign";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { useSelector } from "react-redux";
import { selectUser } from "../data/data_components/userSlice";
import {
  selectMeetingId,
  selectVoiceChannel,
  selectChannelType
} from "../data/data_components/appSlice";
import db, { auth, database } from "./firebase";

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ChevronRightIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)"
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1)
  }
}));

function Sidebar() {
  const [open, setOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSettingsOpen = () => setShowSettings(true);
  const handleSettingsClose = () => setShowSettings(false);
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);
  const [typeChannel, setTypeChannel] = useState("Text Channel");
  const [input, setInput] = useState("");
  const [Voicechannels, setVoiceChannels] = useState([]);
  const vcmeetingId = useSelector(selectMeetingId);
  const channelType = useSelector(selectChannelType);
  const [token, setToken] = useState(null);
  const [meetingId, setMeetingId] = useState(null);
  const userId = user.uid;
  const reference = database.ref(`/online/${userId}`);
  const dbReference = db.collection("Users").doc(`${userId}`);
  const isReadonly = () => {
    if (typeChannel === "Rules Channel" || "Announcment Channel") {
      return true;
    } else {
      return false;
    }
  };
  const handleTypeChannel = (event) => {
    setTypeChannel(event.target.value);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: 400,
    width: 300,
    color: "white",
    bgcolor: "#353434",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
  };
  const stackStyle = {
    color: "white",
    align: "left"
  };
  useEffect(() => {
    db.collection("channels")
      .orderBy("channelName", "asc")
      .onSnapshot((snapshot) =>
        setChannels(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            channel: doc.data()
          }))
        )
      );
  }, []);

  useEffect(() => {
    db.collection("Voicechannels")
      .orderBy("channelName", "asc")
      .onSnapshot((snapshot) =>
        setVoiceChannels(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            Voicechannel: doc.data()
          }))
        )
      );
  }, []);

  const handleLogOut = () => {
    reference
      .remove()
      .then(() => console.log("On disconnect function configured."));
    dbReference.delete();
    auth.signOut();
  };
  const getChangedPos = (currentPos, newPos) => {
    console.log(currentPos, newPos);
  };
  const handleAddChannel = () => {
    const result = isReadonly();
    db.collection("channels").add({
      channelName: input,
      channelType: typeChannel,
      readOnly: result
    });

    setInput("");
    setTypeChannel("Text Channel");
    setOpen(false);
  };

  const handleVoiceAddChannel = () => {
    const getMeetingAndToken = async () => {
      const token = await getToken();
      const meetingId = await createMeeting({ token });

      setToken(token);
      setMeetingId(meetingId);
    };
    const VoicechannelName = prompt("Enter the channel name!");

    if (VoicechannelName) {
      db.collection("Voicechannels").add({
        channelName: VoicechannelName,
        meetingId: meetingId
      });
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle sx={{ color: "lightgrey" }}>Create Channel</DialogTitle>
        <DialogContent>
          <ToggleButtonGroup
            value={typeChannel}
            orientation="vertical"
            exclusive
            onChange={handleTypeChannel}
          >
            <ToggleButton
              className="modal-button"
              sx={{ color: "rgb(116, 116, 116)", textAlign: "left" }}
              value="Text Channel"
            >
              <TagIcon />
              Text Channel
            </ToggleButton>

            <ToggleButton
              className="modal-button"
              sx={{ color: "rgb(116, 116, 116)" }}
              value="Rules Channel"
            >
              <LibraryBooksIcon />
              Rules Channel
            </ToggleButton>
            <ToggleButton
              className="modal-button"
              sx={{ color: "rgb(116, 116, 116)" }}
              value="Announcement Channel"
            >
              <CampaignIcon />
              Announcement Channel
            </ToggleButton>
          </ToggleButtonGroup>
        </DialogContent>
        <Input
          placeholder="new-channel"
          value={input}
          onChange={(e) =>
            setInput(e.target.value.toLowerCase().replace(/ /g, "-"))
          }
        />
        <DialogActions>
          <ButtonGroup>
            <Button onClick={handleClose}>Cancel</Button>
            <Button disabled={!input} type="submit" onClick={handleAddChannel}>
              Create Channel
            </Button>
          </ButtonGroup>
        </DialogActions>
      </Dialog>
      <div className="sidebar">
        <div className="sidebar__top">
          <h3>Discodo</h3>
          <ExpandMoreIcon />
        </div>
        <div className="sidebar__channels">
          <Accordion>
            <div className="sidebar__channelsHeader">
              <div className="sidebar__header">
                <AccordionSummary
                  expandIcon={<ChevronRightIcon className="channel-button" />}
                  aria-controls="panel1a-content"
                  id="channel-dropdown"
                  className="channel-dropdown"
                >
                  <Typography>Text Channels</Typography>

                  <ReactTooltip globalEventOff="click" />
                </AccordionSummary>
                <AddIcon
                  data-tip="Click to add a channel"
                  data-type="dark"
                  data-delay-show="10"
                  data-effect="solid"
                  data-place="right"
                  onClick={handleOpen}
                  className="sidebar__addChannel"
                />

                <ReactTooltip globalEventOff="click" />
              </div>
            </div>
            <div className="sidebar__channelsList">
              <AccordionDetails className="accordianebar__channelsList">
                {channels.map(({ id, channel }) => (
                  <SidebarChannel
                    key={id}
                    id={id}
                    icon={channel.icon}
                    channelName={channel.channelName}
                    channelType={channel.channelType}
                    readOnly={channel.readOnly}
                  />
                ))}
              </AccordionDetails>
            </div>
          </Accordion>
          <Accordion
            disabled
            data-tip="Coming soon!"
            data-type="dark"
            data-delay-show="10"
            data-effect="solid"
            data-place="right"
          >
            <div className="sidebar__channelsHeader">
              <div className="sidebar__header">
                <AccordionSummary
                  expandIcon={
                    <ChevronRightIcon className="vchannel-dropdown" />
                  }
                  aria-controls="panel1a-content"
                  id="channel-dropdown"
                  className="vchannel-dropdown"
                >
                  <Typography>Voice Channels</Typography>
                  <AddIcon
                    data-tip="Click to add a channel"
                    data-type="dark"
                    data-delay-show="10"
                    data-effect="solid"
                    data-place="right"
                    onClick={handleVoiceAddChannel}
                    className="sidebar__addChannel"
                  />

                  <ReactTooltip globalEventOff="click" />
                </AccordionSummary>
              </div>
            </div>
            <div className="sidebar__channelsList">
              <AccordionDetails className="accordianebar__channelsList">
                {Voicechannels.map(({ id, Voicechannel, meetingId }) => (
                  <SidebarVoiceChannel
                    key={id}
                    id={id}
                    channelName={Voicechannel.channelName}
                    meetingId={Voicechannel.meetingId}
                  />
                ))}
              </AccordionDetails>
            </div>
          </Accordion>
        </div>
        <div className="sidebar__voice">
          <SignalCellularAltIcon
            className="sidebar__voiceIcon"
            fontSize="Large"
          />
          <div className="sidebar__voiceInfo">
            <h3>Voice Connected</h3>
          </div>

          <div className="sidebar__voiceIcons">
            <CallIcon />
          </div>
        </div>
        <div className="sidebar__profile">
          <Avatar src={user.photo} />
          <div className="sidebar__profileInfo">
            <h3>{user.displayName}</h3>
            <p>#{user.uid.substring(0, 4)}</p>
          </div>
          <div className="sidebar__profileIcons">
            <MicIcon className="MicIcon" />
            <HeadsetIcon className="HeadsetIcon" />
            <Settings />
            <ReactTooltip globalEventOff="click" />
          </div>
        </div>
      </div>
    </>
  );
}
export default Sidebar;
