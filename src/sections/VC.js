import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant
} from "@videosdk.live/react-sdk";

import randomColor from "randomcolor";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import { Avatar } from "@mui/material";
import Box from "@mui/material/Box";
import Grow from "@mui/material/Grow";
import ReactTooltip from "react-tooltip";

import { Row, Col } from "react-simple-flex-grid";
import "react-simple-flex-grid/lib/main.css";
import { getToken, createMeeting } from "./api";
import firebase from "firebase";
import db from "./firebase";
import { selectUser } from "../data/data_components/userSlice";
import { selectChannelName } from "../data/data_components/appSlice";
import { selectVoiceChannel } from "../data/data_components/appSlice";
import { selectChannelId } from "../data/data_components/appSlice";
import { selectMeetingId } from "../data/data_components/appSlice";
import "./VC.css";

require("dotenv").config();


function ParticipantView(props) {
  const webcamRef = useRef(null);
  const micRef = useRef(null);
  const screenShareRef = useRef(null);

  const user = useSelector(selectUser);
  const channelName = useSelector(selectChannelName);

  const {
    displayName,
    webcamStream,
    micStream,
    screenShareStream,
    webcamOn,
    micOn,
    screenShareOn,
    isActiveSpeaker
  } = useParticipant(props.participantId);

  const color = randomColor();

  useEffect(() => {
    if (webcamRef.current) {
      if (webcamOn) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(webcamStream.track);

        webcamRef.current.srcObject = mediaStream;
        webcamRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        webcamRef.current.srcObject = null;
      }
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  useEffect(() => {
    if (screenShareRef.current) {
      if (screenShareOn) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(screenShareStream.track);

        screenShareRef.current.srcObject = mediaStream;
        screenShareRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        screenShareRef.current.srcObject = null;
      }
    }
  }, [screenShareStream, screenShareOn]);

  return (
    <div key={props.participantId}>
      {webcamOn ? (
        <div>
          <h2>{displayName}</h2>
          <video
            className="VideoFrame"
            height={"100%"}
            width={"100%"}
            border-width={"15px"}
            border-color={"black"}
            ref={webcamRef}
            muted="muted"
            autoPlay
          />
        </div>
      ) : (
        <div classNme="CamOffBox">
          <h2>{displayName}</h2>
          <Box
            sx={{
              width: 265,
              height: 200,
              backgroundColor: "text.primary",
              "&:hover": {
                backgroundColor: "text.secondary",
                opacity: [0.9, 0.8, 0.7],
                transition: "0.5s"
              }
            }}
          >
            <Avatar sx={{ bgcolor: {color} }} className="CamOffAvatar">
              {displayName.substring(0, 1)}
            </Avatar>
          </Box>
        </div>
      )}
      <audio ref={micRef} autoPlay />
      {screenShareOn ? (
        <div>
          <h2>Screen Shared</h2>
          <video
            className="screenShareFrame"
            height={"100%"}
            width={"100%"}
            ref={screenShareRef}
            autoPlay
          />
        </div>
      ) : null}
      <br />
      <span>
        Mic:{micOn ? "Yes" : "No"}, Camera: {webcamOn ? "Yes" : "No"}, Screen
        Share: {screenShareOn ? "Yes" : "No"}
      </span>
    </div>
  );
}

function JoinScreen() {
  const channelName = useSelector(selectChannelName);
  const channelId = useSelector(selectChannelId);
  const voiceChannel = useSelector(selectVoiceChannel);
  const vcmeetingId = useSelector(selectMeetingId);
  const [token, setToken] = useState(null);
  const [meetingId, setMeetingId] = useState(null);

  /*const vcId = useEffect(() => {
    if (voiceChannel) {
        alert(vcmeetingId);
      };
  }, [channelId]);*/

  const getMeetingAndToken = async () => {
    const token = await getToken();
    //const meetingId = await createMeeting({ token });

    setToken(token);
    setMeetingId(vcmeetingId);
  };
  return (
    <div>
      <input
        type="text"
        value={channelName}
        onChange={(e) => {
          setMeetingId(e.target.value);
        }}
      />
      <button onClick={getMeetingAndToken}>Join</button>
    </div>
  );
}

const chunk = (arr) => {
  const newArr = [];
  while (arr.length) newArr.push(arr.splice(0, 3));
  return newArr;
};
function JoinedSnackbar(displayName) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={`${displayName} has joined`}
        action={action}
      />
    </div>
  );
}

function MeetingGrid(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [joined, setJoined] = useState(false);
  const voiceChannel = useSelector(selectVoiceChannel);
  const {
    join,
    leave,
    toggleMic,
    toggleWebcam,
    toggleScreenShare
  } = useMeeting();
  const {
    webcamStream,
    micStream,
    screenShareStream,
    webcamOn,
    micOn,
    screenShareOn
  } = useParticipant(props.participantId);
  const { participants } = useMeeting({
    onParticipantJoined(participant) {
      handleOpen;
    }
  });
  const joinMeeting = () => {
    setJoined(true);
    join();
  };
  const leaveMeeting = () => {
    setJoined(false);
    leave();
  };

  useEffect(() => {
    if (!voiceChannel) {
      setJoined(false);
      leave();
    }
  }, [voiceChannel, leave]);

  return (
    <div>
      {joined ? (
        <div className="videoControls">
          <Grow in={joined}>
            <Stack className="controlStack" direction="row" spacing={0}>
              <IconButton aria-label="leave">
                <ExitToAppIcon
                  className="leave"
                  onClick={leaveMeeting}
                  data-tip="Leave"
                  data-type="dark"
                  data-delay-show="10"
                  data-effect="solid"
                  data-place="top"
                />
              </IconButton>
              <IconButton aria-label="toggle-Mic">
                <MicIcon
                  className="toggleMic"
                  onClick={toggleMic}
                  data-tip={micOn ? "Mute" : "Unmute"}
                  data-type="dark"
                  data-delay-show="10"
                  data-effect="solid"
                  data-place="top"
                />
              </IconButton>
              <IconButton aria-label="toggle-Cam">
                <CameraAltIcon
                  className="toggleCam"
                  onClick={toggleWebcam}
                  data-tip={webcamOn ? "Turn Off Camera" : "Turn On Camera"}
                  data-type="dark"
                  data-delay-show="10"
                  data-effect="solid"
                  data-place="top"
                />
              </IconButton>
              <IconButton aria-label="toggle-Screeshare">
                <ScreenShareIcon
                  className="toggleScreenshare"
                  onClick={toggleScreenShare}
                  data-tip={screenShareOn ? "Stop Sharing" : "Share screen"}
                  data-type="dark"
                  data-delay-show="10"
                  data-effect="solid"
                  data-place="top"
                />
              </IconButton>
            </Stack>
          </Grow>
          <ReactTooltip globalEventOff="click" />
          <JoinedSnackbar />
        </div>
      ) : (
        <button className="joinButton" onClick={joinMeeting}>
          Join
        </button>
      )}
      <div className="wrapper">
        {chunk([...participants.keys()]).map((k) => (
          <div className="box" key={k} style={{ display: "flex" }}>
            {k.map((l) => (
              <ParticipantView key={l} participantId={l} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function VideoChat() {
  const user = useSelector(selectUser);
  const displayName = user.displayName;
  const photo = user.photo;
  const vcmeetingId = useSelector(selectMeetingId);
  const [token, setToken] = useState(null);
  const [meetingId, setMeetingId] = useState(null);

  const getMeetingAndToken = async () => {
    const token = await getToken();
    //const meetingId = await createMeeting({ token });

    setToken(token);
    setMeetingId(vcmeetingId);
  };

  useEffect(getMeetingAndToken, []);
  return (
    <div className="videoChat">
      {token && meetingId ? (
        <>
          <MeetingProvider
            config={{
              meetingId,
              micEnabled: false,
              webcamEnabled: false,
              Avatar: photo,
              name: displayName
            }}
            token={token}
          >
            <MeetingConsumer>{() => <MeetingGrid />}</MeetingConsumer>
          </MeetingProvider>
        </>
      ) : (
        <>
          <JoinScreen />
        </>
      )}
    </div>
  );
}

export default VideoChat;
