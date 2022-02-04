import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import Video from "twilio-video";
import firebase from "firebase";
import Token from "./token";
import db from "./firebase";
import { selectUser } from "../data/data_components/userSlice";
import { selectChannelName } from "../data/data_components/appSlice";
import { selectVoiceChannel } from "../data/data_components/appSlice";
import { selectChannelId } from "../data/data_components/appSlice";
import Lobby from "./Lobby";
import Room from "./Room";
import "./VC.css";
require('dotenv').config();

const VideoChat = () => {
  const channelName = useSelector(selectChannelName);
  const user = useSelector(selectUser);
  const Username = user.displayName;
  const identity = Username;
  const channelId = useSelector(selectChannelId);
  const voiceChannel = useSelector(selectVoiceChannel);

  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");
  const [room, setRoom] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [token, setToken] = useState(null);
  var tokenUrl = `https://quartz-pug-5654.twil.io/video-token?identity=#${Username}`;

  const handleRoomNameChange = useEffect(() => {
    if (channelId) {
      db.collection("Voicechannels")
        .doc(channelId)
        .onSnapshot((snapshot) => setRoomName(channelName));
    }
  }, [channelId, channelName]);

  const handleUsernameChange = useEffect(() => {
    if (voiceChannel) {
      db.collection("Voicechannels")
        .doc(channelId)
        .onSnapshot((snapshot) => setUsername(Username));
    }
  }, [voiceChannel, channelId, Username]);

  /*const handleUsernameChange = useCallback((event) => {
    setUsername(event.target.value);
  }, []);

  const handleRoomNameChange = useCallback((event) => {
    setRoomName(event.target.value);
  }, []); */

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setConnecting(true);
      const token = Token(identity, room);
      setToken(token);
      Video.connect(token, {
        name: roomName
      })
        .then((room) => {
          setConnecting(false);
          setRoom(room);
        })
        .catch((err) => {
          console.error(err);
          setConnecting(false);
        });
    },
    [roomName, username]
  );

  /*const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzQ2ZGFkNGMzNDMwMzU0YzAwNTQzZDY0NTMwZWQwMWM2LTE2NDM4NTA5NjQiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJhbGkiLCJ2aWRlbyI6eyJyb29tIjoiZ2VuZXJhbCJ9fSwiaWF0IjoxNjQzODUwOTY0LCJleHAiOjE2NDM4NTQ1NjQsImlzcyI6IlNLNDZkYWQ0YzM0MzAzNTRjMDA1NDNkNjQ1MzBlZDAxYzYiLCJzdWIiOiJBQzVlZTc4YTk5ZWYwMjA0ZDhkMGViMDIzY2RlYzkzNDAzIn0.73K7-op8NQcq6q2ZG97QsaLSGGVIxzTpHH_Mi2FPCYM");
    },
    [username, roomName]
  );*/

  const handleLogout = useCallback(() => {
    setRoom((prevRoom) => {
      if (prevRoom) {
        prevRoom.localParticipant.tracks.forEach((trackPub) => {
          trackPub.track.stop();
        });
        prevRoom.disconnect();
      }
      return null;
    });
  }, []);

  useEffect(() => {
    if (room) {
      const tidyUp = (event) => {
        if (event.persisted) {
          return;
        }
        if (room) {
          handleLogout();
        }
      };
      window.addEventListener("pagehide", tidyUp);
      window.addEventListener("beforeunload", tidyUp);
      return () => {
        window.removeEventListener("pagehide", tidyUp);
        window.removeEventListener("beforeunload", tidyUp);
      };
    }
  }, [room, handleLogout]);

  let render;
  if (token) {
    render = (
      <Room roomName={roomName} token={token} handleLogout={handleLogout} />
    );
  } else {
    render = (
      <Lobby
        username={username}
        roomName={roomName}
        handleUsernameChange={handleUsernameChange}
        handleRoomNameChange={handleRoomNameChange}
        handleSubmit={handleSubmit}
        connecting={connecting}
      />
    );
  }
  return render;

  /*return (
    <div>
      {token? (
        <Room roomName={roomName} token={token} handleLogout={handleLogout} />
      ):(
        <Lobby
          username={username}
          roomName={roomName}
          handleUsernameChange={handleUsernameChange}
          handleRoomNameChange={handleRoomNameChange}
          handleSubmit={handleSubmit}
        />
      )}
    </ div>
  )*/
};

export default VideoChat;
