/* eslint-disable */
import React, { useEffect, useCallback, useState, useRef } from "react";
import "./Chat.css";
import ChatHeader from "./ChatHeader";

// Icons
import AddCircleIcon from "@mui/icons-material/AddCircle";
import GifIcon from "@mui/icons-material/Gif";
import ImageIcon from "@mui/icons-material/Image";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
// Icons

// MUI Components
import TextareaAutosize from "@mui/material/TextareaAutosize";
import CircularProgress from "@mui/material/CircularProgress";
import Popover from "@mui/material/Popover";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import Menu from "@mui/material/Menu";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
// MUI Components

import { styled } from "@mui/material/styles";

import { DiscordEmojiButton } from "discord-emoji-button";
import { Hint } from "react-autocomplete-hint";
import axios from "axios";
import {
  fetchFromCDN,
  fetchEmojis,
  fetchMessages,
  fetchShortcodes
} from "emojibase";
import data from "emojibase-data/en/shortcodes/cldr-native.json";
import ReactTextareaAutocomplete from "@webscopeio/react-textarea-autocomplete";
import {
  DiscordMessage,
  DiscordMessages,
  DiscordAttachment,
  DiscordSystemMessage
} from "@skyra/discord-components-react/dist/index.js";

import ReactTooltip from "react-tooltip";

import Message from "./Message";
import { useSelector } from "react-redux";
import { selectUser } from "../data/data_components/userSlice";
import {
  selectChannelId,
  selectChannelName,
  selectVoiceChannel,
  selectReadOnly,
  selectChannelType
} from "../data/data_components/appSlice";
import ShowcaseCardDemo from "./showcase";
import db, { auth } from "./firebase";
import firebase from "firebase";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import emoji from "@jukben/emoji-search";
import Dropzone from "react-dropzone";

//import ReactMarkdown from "react-markdown";
import VideoChat from "./VC";

function Chat() {
  const user = useSelector(selectUser);
  const User = auth.currentUser;
  const uid = auth.currentUser.uid;
  const channelName = useSelector(selectChannelName);
  const channelId = useSelector(selectChannelId);
  const voiceChannel = useSelector(selectVoiceChannel);
  const channelType = useSelector(selectChannelType);
  const [placeholder, setPlaceholder] = useState("");
  const [input, setInput] = useState("");
  const readonly = useSelector(selectReadOnly);
  const [messages, setMessages] = useState([]);
  const [placement, setPlacement] = useState(null);
  const [eplacement, setEplacement] = useState(null);
  const [showE, setShowE] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const dummy = useRef();
  const [imgShow, setImgShow] = useState(false);
  const [image, setImage] = useState(null);
  const [vidShow, setVidShow] = useState(false);
  const [vid, setVid] = useState(null);
  const [audShow, setAudShow] = useState(false);
  const [aud, setAud] = useState(null);
  const [fileShow, setFileShow] = useState(false);
  const [fil, setFil] = useState(null);
  const [backdrop, setBackdrop] = useState(false);
  const [loading, setLoading] = useState(false);
  const [floading, setFLoading] = useState(false);
  const [blob, setBlob] = useState(null);
  const [fanchorEl, setFAnchorEl] = useState(null);
  const [err, setErr] = useState(false);
  const handleErr = () => setErr(true);
  const handleErrClose = () => {
    setErr(false);
  };
  const fopen = Boolean(fanchorEl);
  const handleFClick = (event) => {
    if (!channelId || !readonly) {
      setFAnchorEl(event.currentTarget);
    }
  };
  const handleFClose = () => {
    setFAnchorEl(null);
  };

  const handleBackdrop = () => {
    setBackdrop(true);
    setFLoading(false);
  };
  const handleBackdropClose = () => {
    setBackdrop(false);
    setFLoading(false);
  };

  const handleShowPicker = (event) => {
    if (!channelId || !readonly) {
      setPlacement(event.currentTarget);
      setShowPicker(true);
    }
  };
  const handleClose = () => {
    setPlacement(null);
    setShowPicker(false);
  };
  const open = Boolean(showPicker);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    color: "white",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
  };

  const handleInputChnage = (e) => {
    setInput(e.target.value);
  };
  const onEmojiClick = (emoji) => {
    setInput((prevInput) => prevInput + emoji.native);
    setShowPicker(false);
  };

  useEffect(() => {
    if (!channelId) {
      setPlaceholder("Select a channel to begin");
    } else if (readonly) {
      setPlaceholder(
        "You do not have permission to send messages in this channel"
      );
    } else {
      setPlaceholder(`Message #${channelName}`);
    }
  }, [channelId, channelName, readonly]);

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [channelId]);
  const Input = styled("input")({
    display: "none"
  });
  /* const handlePlus = (e) => {
    e.preventDefault();
    db.collection("Users")
      .doc(`${uid}`)
      .set(info)
      .then(() => console.log("Set information successfully!"));
    console.log(hintData);
  }; */
  const Item = ({ entity: { name, char } }) => (
    <div className="emoji-list">{`${char} :${name}: `}</div>
  );
  const handleImgShow = (event) => setImgShow(true);
  const handleImgClose = (event) => {
    setImgShow(false);
    setInput("");
    setImage(null);
  };
  const handleVidShow = (event) => setVidShow(true);
  const handleVidClose = (event) => {
    setVidShow(false);
    setInput("");
    setVid(null);
  };
  const handleAudShow = (event) => setAudShow(true);
  const handleAudClose = (event) => {
    setAudShow(false);
    setInput("");
    setAud(null);
    setFil(null);
  };
  const handleFilShow = (event) => setVidShow(true);
  const handleFilClose = (event) => {
    setFilShow(false);
    setInput("");
    setFil(null);
  };

  const renderImage = (file) => {
    console.info(file);
    const blob = new Blob([file], { type: file.type });
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      function () {
        // convert image file to base64 string
        setImage(reader.result);
      },
      false
    );
    reader.readAsDataURL(blob);
    setFLoading(false);
    handleBackdropClose();
    handleImgShow();
  };
  const renderVideo = (file) => {
    console.info(file);
    const blob = new Blob([file], { type: file.type });
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      function () {
        // convert image file to base64 string
        setVid(reader.result);
      },
      false
    );
    reader.readAsDataURL(blob);
    setFLoading(false);
    handleBackdropClose();
    handleVidShow();
  };
  const renderAudio = (file) => {
    console.info(file);
    const blob = new Blob([file], { type: file.type });
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      function () {
        // convert image file to base64 string
        setAud(reader.result);
      },
      false
    );
    reader.readAsDataURL(blob);
    setFLoading(false);
    handleBackdropClose();
    handleAudShow();
    setFil(file.name);
  };
  const onDrop = useCallback((acceptedFiles) => {
    setFLoading(true);
    acceptedFiles.forEach((file) => {
      console.info(file);
      const type = file["type"].split("/")[0];
      if (type === "image") {
        renderImage(file);
      } else if (type === "video") {
        renderVideo(file);
      } else if (type === "audio") {
        renderAudio(file);
      } else {
        handleBackdropClose();
        handleErr();
      };
    });
  }, []);
  const sendImage = (e) => {
    e.preventDefault();

    db.collection("channels").doc(channelId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: image,
      user: user,
      messageType: "Image",
      file: null
    });
    handleImgClose();
  };
  const sendVideo = (e) => {
    e.preventDefault();

    db.collection("channels").doc(channelId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: vid,
      user: user,
      messageType: "Video",
      file: null
    });
    handleVidClose();
  };
  const sendAudio = (e) => {
    e.preventDefault();

    db.collection("channels").doc(channelId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: aud,
      user: user,
      messageType: "Audio",
      file: fil
    });
    handleAudClose();
  };
  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("channels").doc(channelId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user,
      messageType: "Message",
      file: null
    });
    setInput("");
  };

  useCallback(
    useEffect(() => {
      if (channelId) {
        if (!voiceChannel) {
          dummy.current.addEventListener("DOMNodeInserted", (event) => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: "smooth" });
          });
        }
      }
    }, [channelId, voiceChannel])
  );

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />
      {voiceChannel ? (
        <>
          <VideoChat />
        </>
      ) : (
        <>
          <Dropzone
            onDrop={onDrop}
            onDragOver={handleBackdrop}
            onDragLeave={handleBackdropClose}
            maxFiles={1}
            //accept="image/*"
            disabled={!channelId || readonly}
          >
            {({ getRootProps, getInputProps }) => (
              <div className="chat__messages" {...getRootProps()} ref={dummy}>
                {!channelId ? (
                  <ShowcaseCardDemo />
                ) : (
                  <DiscordMessages>
                    <DiscordSystemMessage>
                      This is the begining of the chat.
                      <input className="d-d" {...getInputProps()} disabled />
                    </DiscordSystemMessage>
                  </DiscordMessages>
                )}
                <Modal
                  open={err}
                  onClose={handleErrClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Error!
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      The file you tried dropping isn't valid. We only take
                      pics, vids, and sweet tunes (audio)~
                    </Typography>
                  </Box>
                </Modal>
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1
                  }}
                  open={backdrop}
                  onClick={handleBackdropClose}
                >
                  {floading ? (
                    <>
                      <CircularProgress color="inherit" />
                    </>
                  ) : (
                    <>
                      <Stack direction="column" alignItems="center" spacing={1}>
                        <Typography variant="h3">
                          Drag & Drop
                        </Typography>
                        <Typography variant="subtitle1">
                          Drop Some Files! (Images, Videos, & Audio)
                        </Typography>
                      </Stack>
                    </>
                  )}
                </Backdrop>

                <p ref={dummy} />
                {messages.map((message) => (
                  <Message
                    // timestamp={message.timestamp}
                    message={message.message}
                    user={message.user}
                    messageType={message.messageType}
                    file={message.file}
                  />
                ))}
              </div>
            )}
          </Dropzone>
          <Dialog
            open={imgShow}
            onClose={handleImgShow}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <DialogTitle sx={{ color: "lightgrey" }}>Send Image</DialogTitle>
            <DialogContent>
              <img src={image} />
            </DialogContent>
            <DialogActions>
              <ButtonGroup>
                <Button onClick={handleImgClose}>Cancel</Button>
                <Button type="submit" onClick={sendImage}>
                  Send
                </Button>
              </ButtonGroup>
            </DialogActions>
          </Dialog>
          <Dialog
            open={vidShow}
            onClose={handleVidShow}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <DialogTitle sx={{ color: "lightgrey" }}>Send Video</DialogTitle>
            <DialogContent>
              <video src={vid} controls />
            </DialogContent>
            <DialogActions>
              <ButtonGroup>
                <Button onClick={handleVidClose}>Cancel</Button>
                <Button type="submit" onClick={sendVideo}>
                  Send
                </Button>
              </ButtonGroup>
            </DialogActions>
          </Dialog>
          <Dialog
            open={audShow}
            onClose={handleAudShow}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <DialogTitle sx={{ color: "lightgrey" }}>Send Audio</DialogTitle>
            <DialogContent>
              <audio src={aud} controls />
            </DialogContent>
            <DialogActions>
              <ButtonGroup>
                <Button onClick={handleAudClose}>Cancel</Button>
                <Button type="submit" onClick={sendAudio}>
                  Send
                </Button>
              </ButtonGroup>
            </DialogActions>
          </Dialog>

          <div className="chat__input">
            <Menu
              sx={{ width: 320, maxWidth: "100%" }}
              anchorEl={fanchorEl}
              open={fopen}
              onClose={handleFClose}
            >
              <MenuList>
                <label htmlFor="icon-button-file">
                  <Input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    onChange={(e) => renderImage(e.target.files[0])}
                  />
                  <MenuItem>
                    <ListItemIcon>
                      <ImageIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Image</ListItemText>
                  </MenuItem>
                </label>
                <label htmlFor="icon-button-vid">
                  <Input
                    accept="video/*"
                    id="icon-button-vid"
                    type="file"
                    onChange={(e) => renderVideo(e.target.files[0])}
                  />
                  <MenuItem>
                    <ListItemIcon>
                      <VideoFileIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Video</ListItemText>
                  </MenuItem>
                </label>
                <label htmlFor="icon-aud-file">
                  <Input
                    accept="audio/*"
                    id="icon-aud-file"
                    type="file"
                    onChange={(e) => renderAudio(e.target.files[0])}
                  />
                  <MenuItem>
                    <ListItemIcon>
                      <AudioFileIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Audio</ListItemText>
                  </MenuItem>
                </label>
                {/* <label htmlFor="icon-button-file">
                  <Input
                    accept="text/*, .zip"
                    id="icon-button-file"
                    type="file"
                    onChange={(e) => renderFile(e.target.files[0])}
                  />
                  <MenuItem>
                    <ListItemIcon>
                      <InsertDriveFileIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Other</ListItemText>
                  </MenuItem>
                </label> */}
              </MenuList>
            </Menu>
            <AddCircleIcon
              className="AddCircleIcon"
              fontSize="large"
              // disabled={true}
              disabled={!channelId || readonly}
              onClick={handleFClick}
            />
            <form
            /* onKeyPress={(e) => {
                if (e.key === "Enter") {
                  sendMessage(e);
                }
              }} */
            >
              {/* <ReactTextareaAutocomplete
                loadingComponent={() => <span>Loading</span>}
                trigger={{
                  ":": {
                    dataProvider: (token) => {
                      return emoji(token)
                        .slice(0, 5)
                        .map(({ name, char }) => ({ name, char }));
                    },
                    component: Item,
                    output: (item, trigger) => item.char
                  }
                }}
                style={{
                  fontSize: "18px",
                  lineHeight: "20px",
                  padding: 5
                }}
                channelName={channelName}
                disabled={!channelId || readonly}
                value={input}
                onChange={handleInputChnage}
                type="button"
                // dropdownStyle={{ overflow: "auto" }}
                // onSubmit={sendMessage}
                className="chat-field"
                placeholder={placeholder}
              /> */}
              <input
                channelName={channelName}
                disabled={!channelId || readonly}
                value={input}
                onChange={handleInputChnage}
                type="text"
                className="chat-field"
                placeholder={placeholder}
              />
              <button
                className="chat__inputButton"
                type="submit"
                disabled={!channelId || readonly || !input}
                onClick={sendMessage}
              >
                Send Message
              </button>
            </form>

            <div class="chat__inputIcons">
              <GifIcon fontSize="large" disabled={true} />
              <Popover
                className="Picker"
                open={open}
                anchorEl={placement}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center"
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "right"
                }}
                sx={{ padding: 1, textAlign: "center" }}
              >
                <Typography sx={{ p: 2 }}>
                  <Picker
                    //pickerStyle={{ width: "100%" }}
                    autoFocus={true}
                    title="Select an emoji"
                    emoji="point_up_2"
                    set="twitter"
                    theme="dark"
                    onSelect={onEmojiClick}
                  />
                </Typography>
              </Popover>
              <DiscordEmojiButton
                className="emoji_picker"
                size={28}
                set="twitter"
                onClick={handleShowPicker}
              />
              <ReactTooltip globalEventOff="click" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Chat;
