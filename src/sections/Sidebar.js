import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import "./Sidebar.css";
import SidebarChannel from "./SidebarChannel.js";
import SidebarVoiceChannel from "./SidebarVoiceChannel.js";
import { getToken, createMeeting } from "./api";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
import { Avatar } from "@mui/material";

import { useSelector } from "react-redux";
import { selectUser } from "../data/data_components/userSlice";
import {
  selectMeetingId,
  selectVoiceChannel,
  selectChannelType
} from "../data/data_components/appSlice";
import db, { auth, database } from "./firebase";
import Profile from "./Profile";

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
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);
  const [typeChannel, setTypeChannel] = useState("Text Channel");
  const [input, setInput] = useState("");
  const [Voicechannels, setVoiceChannels] = useState([]);
  const vcmeetingId = useSelector(selectMeetingId);
  const channelType = useSelector(selectChannelType);
  const [token, setToken] = useState(null);
  const [meetingId, setMeetingId] = useState(null);
  const userId = auth.currentUser.uid;
  const reference = database.ref(`/online/${userId}`);
  const dbReference = db.collection("Users").doc(`${userId}`);
  const isReadonly = () => {
    if (typeChannel === "Rules Channel" || "Announcment Channel") {
      return true;
    } else {
      return false;
    }
  };
  const handleTypeChannel = (event, newTypeChannel) => {
    if (newTypeChannel !== null) {
      setTypeChannel(newTypeChannel);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: 400,
    width: 300,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
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

  const handleAddChannel = () => {
    db.collection("channels").add({
      channelName: input,
      channelType: typeChannel,
      readOnly: isReadonly
    });

    setInput("");
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create Channel
            </Typography>
            <ToggleButtonGroup
              value={typeChannel}
              orientation="vertical"
              exclusive
              onChange={handleTypeChannel}
              aria-label="text alignment"
            >
              <ToggleButton value="Text Channel" aria-label="left aligned">
                <TagIcon />
                Text Channel
              </ToggleButton>
              <ToggleButton value="Rules Channel" aria-label="centered">
                <LibraryBooksIcon />
                Rules Channel
              </ToggleButton>
              <ToggleButton
                value="Announcement Channel"
                aria-label="right aligned"
              >
                <CampaignIcon />
                Announcement Channel
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
          <Input
            placeholder="new-channel"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <ButtonGroup>
            <Button onClick={handleClose}>Cancel</Button>
            <Button disabled={!input} type="submit" onClick={handleAddChannel}>
              Create Channel
            </Button>
          </ButtonGroup>
        </Box>
      </Modal>
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
          <Avatar src={user.photo} onClick={() => setShow(true)} />
          <div className="sidebar__profileInfo">
            <h3>{user.displayName}</h3>
            <p>#{user.uid.substring(0, 4)}</p>
          </div>
          <Profile onClose={() => setShow(false)} show={show} />
          <div className="sidebar__profileIcons">
            <MicIcon className="MicIcon" />
            <HeadsetIcon className="HeadsetIcon" />
            <ExitToAppIcon
              data-tip="Click to logout"
              data-type="dark"
              data-delay-show="10"
              data-effect="solid"
              data-place="top"
              data-effect="solid"
              onClick={handleLogOut}
              className="ExitToAppIcon"
            />
            <ReactTooltip globalEventOff="click" />
          </div>
        </div>
      </div>
    </>
  );
}
export default Sidebar;
