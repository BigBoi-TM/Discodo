/* eslint-disable */
import React, { useEffect, useCallback, useState, useRef } from "react";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import GifIcon from "@mui/icons-material/Gif";
import Popover from "@mui/material/Popover";

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
import Typography from "@mui/material/Typography";
import Picker from "emoji-picker-react";
import { emojify } from "react-emojione";
import {
  ImageTooltips,
  ImageTooltipsItem,
  ImageTooltipsTrigger
} from "react-image-tooltips";

//import ReactMarkdown from "react-markdown";
//import { useAutocomplete } from "@mui/base/AutocompleteUnstyled";

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
  const [showPicker, setShowPicker] = useState(false);
  const dummy = useRef();
  /*const options = [
    
  ]
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: 'use-autocomplete-demo',
    options: options,
    getOptionLabel: (option) => option.title,
  });*/
  const handleShowPicker = (event) => {
    setPlacement(event.currentTarget);
    setShowPicker(true);
  };
  const handleClose = () => {
    setPlacement(null);
    setShowPicker(false);
  };
  const open = Boolean(showPicker);

  const handleInputChnage = (e) => {
    setInput(e.target.value);
  };
  const onEmojiClick = (event, emojiObject) => {
    setInput((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };

  //const picker = <Picker className="Picker" pickerStyle={{ width: "50%" }} onEmojiClick={onEmojiClick}/>;

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
  const info = {
    uid: User.uid,
    photo: User.photoURL,
    displayName: User.displayName,
    online: true
  };

  const handlePlus = (e) => {
    e.preventDefault();
    /*db.collection("Users")
      .doc(`${uid}`)
      .set(info)
      .then(() => console.log("Set information successfully!"));*/
    alert(channelId);
  };

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("channels").doc(channelId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user
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
          <div className="chat__messages" ref={dummy}>
            {!channelId ? (
              <ShowcaseCardDemo />
            ) : (
              <DiscordMessages>
                <DiscordSystemMessage>yeet</DiscordSystemMessage>
              </DiscordMessages>
            )}

            <p ref={dummy} />
            {messages.map((message) => (
              <Message
                //timestamp={message.timestamp}
                message={emojify(message.message)}
                user={message.user}
              />
            ))}
          </div>

          <div className="chat__input">
            <AddCircleIcon
              className="AddCircleIcon"
              fontSize="large"
              disabled={true}
              //onClick={handlePlus}
            />
            <form>
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
              <GifIcon fontSize="large" disabled={true}/>
              <Popover
                className="Picker"
                open={open}
                anchorEl={placement}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
              >
                <Typography sx={{ p: 2 }}>
                  <Picker
                    pickerStyle={{ width: "100%" }}
                    onEmojiClick={onEmojiClick}
                  />
                </Typography>
              </Popover>
              <EmojiEmotionsIcon
                className="emoji_picker"
                fontSize="large"
                data-tip="Emoji"
                data-effect="solid"
                data-place="top"
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
